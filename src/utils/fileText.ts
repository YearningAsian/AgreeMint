// Extract plain text from uploaded files (txt, pdf, docx).
// Uses PDF.js and Mammoth if available on window (loaded via CDN in index.html).

export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name || '';
  const ext = name.slice(name.lastIndexOf('.')).toLowerCase();

  if (ext === '.txt') {
    return await file.text();
  }

  const arrayBuffer = await file.arrayBuffer();

  if (ext === '.pdf') {
    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib || !pdfjsLib.getDocument) {
      throw new Error('PDF.js not available. Ensure the CDN script is loaded in index.html');
    }

    // Use PDF.js to extract text from each page
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      // eslint-disable-next-line no-await-in-loop
      const page = await pdf.getPage(i);
      // eslint-disable-next-line no-await-in-loop
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');
      fullText += '\n\n' + pageText;
    }
    return fullText.trim();
  }

  if (ext === '.docx') {
    const mammoth = (window as any).mammoth;
    if (!mammoth || !mammoth.extractRawText) {
      throw new Error('Mammoth.js not available. Ensure the CDN script is loaded in index.html');
    }

    const result = await mammoth.extractRawText({ arrayBuffer });
    // result.value contains the plaintext
    return (result && result.value) ? result.value : '';
  }

  throw new Error('Unsupported file type. Supported: .txt, .pdf, .docx');
}

export default extractTextFromFile;
