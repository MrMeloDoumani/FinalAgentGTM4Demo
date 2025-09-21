import { NextRequest, NextResponse } from 'next/server';
import { imageGenerationService } from '@/lib/image-generation';

export async function POST(request: NextRequest) {
  try {
    const { contentType, industry, title, content, stylePattern } = await request.json();

    if (!contentType || !industry || !title) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required parameters: contentType, industry, title' 
        },
        { status: 400 }
      );
    }

    // Generate the image
    const generatedImage = await imageGenerationService.generateDocumentImage({
      contentType,
      industry,
      title,
      content: content || '',
      stylePattern
    });

    return NextResponse.json({
      success: true,
      image: generatedImage,
      message: `Successfully generated ${contentType} image for ${industry} industry`
    });

  } catch (error) {
    console.error('Image generation API error:', error);
    
    // Try fallback generation
    try {
      const { contentType, industry, title, content, stylePattern } = await request.json();
      const fallbackImage = imageGenerationService.createFallbackImage({
        contentType,
        industry,
        title,
        content: content || '',
        stylePattern
      });

      return NextResponse.json({
        success: true,
        image: fallbackImage,
        message: `Generated fallback ${contentType} image for ${industry} industry`,
        fallback: true
      });
    } catch (fallbackError) {
      console.error('Fallback generation error:', fallbackError);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to generate image. Please try again later.',
          response: "I apologize, but I'm experiencing technical difficulties with image generation. Please try again in a moment."
        },
        { status: 500 }
      );
    }
  }
}

export async function GET() {
  try {
    const allImages = imageGenerationService.getAllGeneratedImages();
    
    return NextResponse.json({
      success: true,
      images: allImages,
      count: allImages.length,
      message: 'Retrieved all generated images'
    });
  } catch (error) {
    console.error('Get images error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve images' 
      },
      { status: 500 }
    );
  }
}
