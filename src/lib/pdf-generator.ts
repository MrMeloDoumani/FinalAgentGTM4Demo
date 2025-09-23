// PDF Generation Service for Jammy AI
// Creates actual PDF documents for media assets

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface PDFAsset {
  id: string;
  title: string;
  industry: string;
  content: string;
  type: 'brochure' | 'whitepaper' | 'battlecard' | 'presentation';
  fileUrl: string;
  generatedAt: string;
}

export class PDFGenerator {
  private eandColors = {
    primary: rgb(0.89, 0.024, 0.075), // e& red
    secondary: rgb(1, 1, 1), // white
    accent: rgb(0, 0.65, 0.32), // e& green
    text: rgb(0, 0, 0), // black
    gray: rgb(0.5, 0.5, 0.5) // gray
  };

  async generateBrochure(industry: string, content: string, title: string): Promise<PDFAsset> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    
    // Add fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Header
    this.addHeader(page, font, boldFont, title);
    
    // Content
    this.addContent(page, font, content);
    
    // Footer
    this.addFooter(page, font);
    
    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();
    const base64 = Buffer.from(pdfBytes).toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64}`;
    
    return {
      id: `brochure_${Date.now()}`,
      title,
      industry,
      content,
      type: 'brochure',
      fileUrl: dataUrl,
      generatedAt: new Date().toISOString()
    };
  }

  async generateWhitePaper(industry: string, content: string, title: string): Promise<PDFAsset> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Professional header
    this.addProfessionalHeader(page, font, boldFont, title);
    
    // Structured content
    this.addStructuredContent(page, font, content);
    
    // Professional footer
    this.addProfessionalFooter(page, font);
    
    const pdfBytes = await pdfDoc.save();
    const base64 = Buffer.from(pdfBytes).toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64}`;
    
    return {
      id: `whitepaper_${Date.now()}`,
      title,
      industry,
      content,
      type: 'whitepaper',
      fileUrl: dataUrl,
      generatedAt: new Date().toISOString()
    };
  }

  async generateBattlecard(industry: string, content: string, title: string): Promise<PDFAsset> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Battlecard header
    this.addBattlecardHeader(page, font, boldFont, title);
    
    // Competitive content
    this.addCompetitiveContent(page, font, content);
    
    // Battlecard footer
    this.addBattlecardFooter(page, font);
    
    const pdfBytes = await pdfDoc.save();
    const base64 = Buffer.from(pdfBytes).toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64}`;
    
    return {
      id: `battlecard_${Date.now()}`,
      title,
      industry,
      content,
      type: 'battlecard',
      fileUrl: dataUrl,
      generatedAt: new Date().toISOString()
    };
  }

  private addHeader(page: any, font: any, boldFont: any, title: string) {
    // e& logo area
    page.drawRectangle({
      x: 50,
      y: 750,
      width: 495,
      height: 60,
      color: this.eandColors.primary,
    });
    
    // e& text
    page.drawText('e& (Etisalat)', {
      x: 60,
      y: 780,
      size: 24,
      font: boldFont,
      color: this.eandColors.secondary,
    });
    
    // Title
    page.drawText(title, {
      x: 60,
      y: 760,
      size: 16,
      font: font,
      color: this.eandColors.secondary,
    });
  }

  private addContent(page: any, font: any, content: string) {
    const lines = content.split('\n');
    let yPosition = 700;
    
    for (const line of lines) {
      if (yPosition < 100) break; // Prevent overflow
      
      if (line.startsWith('# ')) {
        // Main heading
        page.drawText(line.substring(2), {
          x: 60,
          y: yPosition,
          size: 18,
          font: font,
          color: this.eandColors.primary,
        });
        yPosition -= 30;
      } else if (line.startsWith('## ')) {
        // Sub heading
        page.drawText(line.substring(3), {
          x: 60,
          y: yPosition,
          size: 14,
          font: font,
          color: this.eandColors.primary,
        });
        yPosition -= 25;
      } else if (line.startsWith('### ')) {
        // Sub sub heading
        page.drawText(line.substring(4), {
          x: 60,
          y: yPosition,
          size: 12,
          font: font,
          color: this.eandColors.text,
        });
        yPosition -= 20;
      } else if (line.startsWith('• ')) {
        // Bullet point
        page.drawText('•', {
          x: 60,
          y: yPosition,
          size: 10,
          font: font,
          color: this.eandColors.text,
        });
        page.drawText(line.substring(2), {
          x: 80,
          y: yPosition,
          size: 10,
          font: font,
          color: this.eandColors.text,
        });
        yPosition -= 15;
      } else if (line.trim()) {
        // Regular text
        page.drawText(line, {
          x: 60,
          y: yPosition,
          size: 10,
          font: font,
          color: this.eandColors.text,
        });
        yPosition -= 15;
      } else {
        // Empty line
        yPosition -= 10;
      }
    }
  }

  private addFooter(page: any, font: any) {
    // Footer background
    page.drawRectangle({
      x: 50,
      y: 50,
      width: 495,
      height: 40,
      color: this.eandColors.primary,
    });
    
    // Footer text
    page.drawText('e& (Etisalat) - AI-Powered Sales Enablement', {
      x: 60,
      y: 65,
      size: 10,
      font: font,
      color: this.eandColors.secondary,
    });
    
    page.drawText(`Generated by Jammy AI on ${new Date().toLocaleDateString()}`, {
      x: 60,
      y: 55,
      size: 8,
      font: font,
      color: this.eandColors.secondary,
    });
  }

  private addProfessionalHeader(page: any, font: any, boldFont: any, title: string) {
    // Professional header with more space
    page.drawRectangle({
      x: 50,
      y: 750,
      width: 495,
      height: 80,
      color: this.eandColors.primary,
    });
    
    page.drawText('e& (Etisalat)', {
      x: 60,
      y: 810,
      size: 20,
      font: boldFont,
      color: this.eandColors.secondary,
    });
    
    page.drawText('Business Solutions', {
      x: 60,
      y: 790,
      size: 14,
      font: font,
      color: this.eandColors.secondary,
    });
    
    page.drawText(title, {
      x: 60,
      y: 770,
      size: 16,
      font: boldFont,
      color: this.eandColors.secondary,
    });
  }

  private addStructuredContent(page: any, font: any, content: string) {
    // Similar to addContent but with more professional formatting
    this.addContent(page, font, content);
  }

  private addProfessionalFooter(page: any, font: any) {
    this.addFooter(page, font);
  }

  private addBattlecardHeader(page: any, font: any, boldFont: any, title: string) {
    // Competitive battlecard header
    page.drawRectangle({
      x: 50,
      y: 750,
      width: 495,
      height: 60,
      color: this.eandColors.primary,
    });
    
    page.drawText('e& Competitive Battlecard', {
      x: 60,
      y: 780,
      size: 18,
      font: boldFont,
      color: this.eandColors.secondary,
    });
    
    page.drawText(title, {
      x: 60,
      y: 760,
      size: 14,
      font: font,
      color: this.eandColors.secondary,
    });
  }

  private addCompetitiveContent(page: any, font: any, content: string) {
    // Format content for competitive analysis
    this.addContent(page, font, content);
  }

  private addBattlecardFooter(page: any, font: any) {
    this.addFooter(page, font);
  }
}

export const pdfGenerator = new PDFGenerator();
