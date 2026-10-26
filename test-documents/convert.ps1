$docxPath = "P:\Project\rag-application\test-documents\RAG_Test_Knowledge_Base.docx"
$pdfPath = "P:\Project\rag-application\test-documents\RAG_Test_Knowledge_Base.pdf"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $doc = $word.Documents.Open($docxPath)
    $doc.SaveAs([ref]$pdfPath, [ref]17)
    $doc.Close()
    Write-Host "PDF exported successfully to $pdfPath"
} catch {
    Write-Error $_.Exception.Message
} finally {
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
