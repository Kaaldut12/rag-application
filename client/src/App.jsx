import { useEffect, useRef, useState } from 'react'
import './App.css'

const API = (import.meta.env.VITE_API_URL || '') + '/api'

async function apiRequest(url, options = {}) {
  const response = await fetch(`${API}${url}`, options)
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed (${response.status})`)
  }

  return data
}

function App() {
  const [health, setHealth] = useState(null)
  const [documents, setDocuments] = useState([])
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! Upload a document and ask me questions about its contents.',
    },
  ])
  const [question, setQuestion] = useState('')
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileInput = useRef(null)
  const chatEnd = useRef(null)

  async function refreshData() {
    try {
      const [status, docs] = await Promise.all([
        apiRequest('/health'),
        apiRequest('/documents'),
      ])
      setHealth(status)
      setDocuments(docs.documents || [])
    } catch (err) {
      setHealth(null)
      setError(`Cannot connect to the backend: ${err.message}`)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  async function uploadFile(file) {
    if (!file || uploading) return

    const allowed = /\.(pdf|txt|docx)$/i.test(file.name)
    if (!allowed) {
      setError('Choose a PDF, TXT or DOCX file.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be 10 MB or less.')
      return
    }

    setError('')
    setUploading(true)

    try {
      const form = new FormData()
      form.append('file', file)

      const result = await apiRequest('/documents', {
        method: 'POST',
        body: form,
      })

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: `Successfully indexed "${result.document.filename}". You can now ask questions about it.`,
          sources: [result.document.filename],
        },
      ])

      await refreshData()
    } catch (err) {
      setError(`Upload failed: ${err.message}`)
    } finally {
      setUploading(false)
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  async function sendMessage(event) {
    event.preventDefault()
    const text = question.trim()

    if (!text || sending) return

    setError('')
    setQuestion('')
    setMessages((current) => [...current, { role: 'user', content: text }])
    setSending(true)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 90000)

      let result
      try {
        result = await apiRequest('/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: text }),
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timeout)
      }

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: result.answer || 'No answer was returned.',
          sources: result.sources || [],
        },
      ])
    } catch (err) {
      const message = err.name === 'AbortError'
        ? 'The request took too long. Please try again.'
        : err.message

      setError(`Chat failed: ${message}`)
    } finally {
      setSending(false)
    }
  }

  async function deleteDocument(doc) {
    if (!window.confirm(`Delete "${doc.filename}" and its indexed chunks?`)) return

    setError('')
    try {
      await apiRequest(`/documents/${encodeURIComponent(doc.id)}`, {
        method: 'DELETE',
      })
      await refreshData()
    } catch (err) {
      setError(`Delete failed: ${err.message}`)
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Knowledge Assistant home">
          <span className="brand-icon">K</span>
          <span>Knowledge<span className="brand-light">AI</span></span>
        </a>
        <div className="connection">
          <span className={`status-dot ${health?.ragReady ? 'online' : ''}`} />
          {health?.ragReady ? 'Backend connected' : 'Connecting to backend'}
        </div>
      </header>

      <section className="welcome">
        <div className="eyebrow"><span /> YOUR DOCUMENTS, YOUR ANSWERS</div>
        <h1>Knowledge, at your<br /><span>fingertips.</span></h1>
        <p>Upload your documents. Ask questions. Get answers grounded in your own knowledge.</p>
      </section>

      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setError('')} aria-label="Dismiss error">×</button>
        </div>
      )}

      <section className="workspace">
        <aside className="sidebar">
          <div className="section-heading">
            <div>
              <span className="section-kicker">YOUR LIBRARY</span>
              <h2>Documents <span className="count">{documents.length}</span></h2>
            </div>
            <button
              className="icon-button"
              type="button"
              onClick={refreshData}
              title="Refresh documents"
              aria-label="Refresh documents"
            >↻</button>
          </div>

          <button
            className={`upload-zone ${dragging ? 'dragging' : ''}`}
            type="button"
            onClick={() => fileInput.current?.click()}
            onDragOver={(event) => {
              event.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setDragging(false)
              uploadFile(event.dataTransfer.files?.[0])
            }}
            disabled={uploading}
          >
            <span className="upload-icon">{uploading ? '…' : '↑'}</span>
            <strong>{uploading ? 'Uploading and indexing…' : 'Add a document'}</strong>
            <span>Drop a file here or browse</span>
            <small>PDF, TXT, DOCX · Up to 10 MB</small>
          </button>

          <input
            ref={fileInput}
            type="file"
            accept=".pdf,.txt,.docx"
            hidden
            onChange={(event) => uploadFile(event.target.files?.[0])}
          />

          <div className="document-list">
            {documents.length === 0 ? (
              <div className="empty-library">
                <span className="empty-icon">▤</span>
                <p>Your library is empty.</p>
                <span>Upload a document to get started.</span>
              </div>
            ) : documents.map((doc) => (
              <article className="document-card" key={doc.id}>
                <span className="file-icon">
                  {doc.filename.toLowerCase().endsWith('.pdf') ? 'PDF' :
                    doc.filename.toLowerCase().endsWith('.docx') ? 'DOC' : 'TXT'}
                </span>
                <div className="document-info">
                  <strong title={doc.filename}>{doc.filename}</strong>
                  <span>{doc.chunkCount} indexed chunk{doc.chunkCount === 1 ? '' : 's'}</span>
                </div>
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteDocument(doc)}
                  aria-label={`Delete ${doc.filename}`}
                  title="Delete document"
                >×</button>
              </article>
            ))}
          </div>

          <div className="library-footer">
            <span className="status-dot online" />
            {health ? `${health.chunkCount} searchable chunk${health.chunkCount === 1 ? '' : 's'}` : 'Checking index…'}
          </div>
        </aside>

        <section className="chat-panel">
          <div className="chat-header">
            <div className="chat-avatar">✳</div>
            <div>
              <h2>Knowledge Assistant</h2>
              <p>Powered by Gemini · Retrieval-Augmented Generation</p>
            </div>
            <span className="ai-badge">AI ASSISTANT</span>
          </div>

          <div className="chat-messages" aria-live="polite">
            <div className="date-divider"><span>YOUR CONVERSATION</span></div>

            {messages.map((message, index) => (
              <div className={`message-row ${message.role}`} key={`${index}-${message.role}`}>
                {message.role === 'assistant' && <div className="message-avatar">✳</div>}
                <div className="message-content">
                  <div className="message-label">
                    {message.role === 'user' ? 'YOU' : 'KNOWLEDGE AI'}
                  </div>
                  <div className="message-bubble">{message.content}</div>
                  {message.sources?.length > 0 && (
                    <div className="sources">
                      <span>Sources</span>
                      {message.sources.map((source, sourceIndex) => (
                        <span className="source-chip" key={`${source}-${sourceIndex}`}>
                          ▤ {typeof source === 'string' ? source : source.filename || source.name || 'Document'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {sending && (
              <div className="message-row assistant">
                <div className="message-avatar">✳</div>
                <div className="message-content">
                  <div className="message-label">KNOWLEDGE AI</div>
                  <div className="message-bubble thinking">
                    <span className="loader-dots"><i /><i /><i /></span>
                    Searching your documents and generating an answer…
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEnd} />
          </div>

          <form className="chat-composer" onSubmit={sendMessage}>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  event.currentTarget.form?.requestSubmit()
                }
              }}
              placeholder="Ask a question about your documents…"
              aria-label="Ask a question"
              rows={2}
              disabled={sending}
            />
            <div className="composer-bottom">
              <span>Answers are based on your indexed documents.</span>
              <button className="send-button" type="submit" disabled={sending || !question.trim()}>
                {sending ? 'Thinking…' : 'Ask AI'} <span>↗</span>
              </button>
            </div>
          </form>
        </section>
      </section>

      <footer className="app-footer">
        <span>KnowledgeAI</span>
        <span>Private document search · Powered by Gemini</span>
      </footer>
    </main>
  )
}

export default App

