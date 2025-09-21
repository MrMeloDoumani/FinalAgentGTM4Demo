import { NextRequest, NextResponse } from 'next/server';
import { pdfGenerator } from '@/lib/pdf-generator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'brochure';
    const industry = searchParams.get('industry') || 'retail';
    const title = searchParams.get('title') || `${industry} Industry ${type}`;

    let pdfAsset;

    switch (type) {
      case 'brochure':
        pdfAsset = await pdfGenerator.generateBrochure(industry, '', title);
        break;
      case 'whitepaper':
        pdfAsset = await pdfGenerator.generateWhitePaper(industry, '', title);
        break;
      case 'battlecard':
        pdfAsset = await pdfGenerator.generateBattlecard(industry, '', title);
        break;
      default:
        pdfAsset = await pdfGenerator.generateBrochure(industry, '', title);
    }

    return NextResponse.json({
      success: true,
      pdf: pdfAsset,
      message: `Generated ${type} PDF for ${industry} industry`
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate PDF' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, industry, title, content } = await request.json();

    if (!type || !industry) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Type and industry are required' 
        },
        { status: 400 }
      );
    }

    let pdfAsset;

    switch (type) {
      case 'brochure':
        pdfAsset = await pdfGenerator.generateBrochure(industry, content || '', title || `${industry} Industry Brochure`);
        break;
      case 'whitepaper':
        pdfAsset = await pdfGenerator.generateWhitePaper(industry, content || '', title || `${industry} Industry White Paper`);
        break;
      case 'battlecard':
        pdfAsset = await pdfGenerator.generateBattlecard(industry, content || '', title || `${industry} Competitive Battlecard`);
        break;
      default:
        pdfAsset = await pdfGenerator.generateBrochure(industry, content || '', title || `${industry} Industry Brochure`);
    }

    return NextResponse.json({
      success: true,
      pdf: pdfAsset,
      message: `Generated ${type} PDF for ${industry} industry`
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate PDF' 
      },
      { status: 500 }
    );
  }
}
