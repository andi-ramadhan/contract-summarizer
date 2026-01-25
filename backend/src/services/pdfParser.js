import { PDFParse } from 'pdf-parse';

export async function extractPDFText(buffer) {
  try {
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    
    // get raw text
    let text = data.text;
    
    // cleanup text
    text = text
      .replace(/\s+/g, ' ')      // Normalize whitespace
      .replace(/\n+/g, '\n')     // Normalize line breaks
      .trim();
    
    // validation
    if (text.length < 100) {
      throw new Error(
        'PDF appears to be scanned or image-based. ' +
        'Please use a text-based PDF.'
      );
    }

    await parser.destroy();  
    console.log(`✅ Extracted ${text.length} characters from PDF`);
    
    return text;
    
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

export async function getPDFMetadata(buffer) {
  try {
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getInfo({ parsePageInfo: true });
    await parser.destroy();
    return {
      pages: data.total,
      info: data.info,
    };
  } catch (error) {
    return null;
  }
}