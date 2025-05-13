import { PDFDocumentProxy, getDocument } from 'pdfjs-dist';

export const extractTextFromPdf = async (file: File): Promise<string> => {
  const pdf = await getDocument(URL.createObjectURL(file)).promise;
  let text = '';
  
  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(' ');
  }
  
  return text;
};
