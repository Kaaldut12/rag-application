import test from 'node:test'
import assert from 'node:assert/strict'
import {
  splitIntoChunks,
  cosineSimilarity,
  retrieveRelevantChunks,
} from './rag.js'

test('empty text produces no chunks', () => {
  assert.deepEqual(splitIntoChunks('   '), [])
})

test('long text is split with overlap', () => {
  const chunks = splitIntoChunks('abcdefghij'.repeat(10), 30, 5)
  assert.ok(chunks.length > 1)
  assert.ok(chunks.every((chunk) => chunk.length <= 30))
  assert.ok(chunks[0].length > 0)
})

test('invalid chunk overlap is rejected', () => {
  assert.throws(() => splitIntoChunks('hello', 10, 10), /Invalid chunk/)
})

test('cosine similarity is one for identical vectors', () => {
  assert.ok(Math.abs(cosineSimilarity([1, 0], [1, 0]) - 1) < 1e-9)
})

test('cosine similarity is zero for perpendicular vectors', () => {
  assert.equal(cosineSimilarity([1, 0], [0, 1]), 0)
})

test('mismatched vector lengths return zero', () => {
  assert.equal(cosineSimilarity([1, 2], [1]), 0)
})

test('retrieval ranks the most relevant chunk first', () => {
  const chunks = [
    { text: 'other', embedding: [0, 1], filename: 'b.txt' },
    { text: 'match', embedding: [1, 0], filename: 'a.txt' },
  ]
  const result = retrieveRelevantChunks([1, 0], chunks, 1)
  assert.equal(result.length, 1)
  assert.equal(result[0].text, 'match')
})
