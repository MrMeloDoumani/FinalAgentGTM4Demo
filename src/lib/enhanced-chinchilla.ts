// Enhanced Chinchilla - Server-side image generation
import { freePhotoService, PhotoSearchResult } from './free-photo-service';
import { serverImageGenerator, ImageGenerationRequest } from './server-image-generator';

export interface EnhancedVisualSpecification {
  prompt: string;
  industry: string;
  contentType: string;
  style: string;
  requirements: string[];
  context: string;
  elements: string[]; // Specific elements from Jammy
}

export interface EnhancedVisualResult {
  success: boolean;
  imageUrl: string;
  title: string;
  description: string;
  elementsUsed: string[];
  styleApplied: string;
  generatedAt: string;
  source: 'stock_photo' | 'svg_generated' | 'hybrid';
  confidence: number;
}

class EnhancedChinchilla {
  private photoService = freePhotoService;

  /**
   * Generate enhanced visual using Canvas-based image generation
   */
  async generateEnhancedVisual(spec: EnhancedVisualSpecification): Promise<EnhancedVisualResult> {
    console.log('🎨 Enhanced Chinchilla processing:', spec.prompt);
    console.log('🔍 Elements to work with:', spec.elements);

    try {
      // Use Canvas Image Generator for reliable image creation
      const canvasRequest: ImageGenerationRequest = {
        title: this.getProductTitle(spec),
        industry: spec.industry,
        elements: spec.elements,
        branding: 'e&',
        style: spec.style || 'professional_b2b'
      };

      const canvasResult = await serverImageGenerator.generateImage(canvasRequest);
      
      console.log('✨ Canvas visual created:', canvasResult.title);
      
      return {
        success: true,
        imageUrl: canvasResult.fileUrl,
        title: canvasResult.title,
        description: canvasResult.content,
        elementsUsed: spec.elements,
        styleApplied: canvasResult.styleUsed,
        generatedAt: canvasResult.generatedAt,
        source: 'canvas_generated',
        confidence: 0.95
      };

    } catch (error) {
      console.error('❌ Canvas visual generation failed:', error);
      
      // Fallback to simple text-based result
      return this.generateFallbackResult(spec);
    }
  }


  /**
   * Generate fallback result when canvas generation fails
   */
  private generateFallbackResult(spec: EnhancedVisualSpecification): EnhancedVisualResult {
    return {
      success: false,
      imageUrl: '',
      title: `${this.getProductTitle(spec)} - Generation Failed`,
      description: `Unable to generate visual for ${spec.industry} sector. Please try again.`,
      elementsUsed: spec.elements,
      styleApplied: 'fallback',
      generatedAt: new Date().toISOString(),
      source: 'svg_generated',
      confidence: 0.0
    };
  }

  /**
   * Get product title based on specification
   */
  private getProductTitle(spec: EnhancedVisualSpecification): string {
    if (spec.prompt.includes('Business Pro Fiber')) {
      return 'Business Pro Fiber Internet';
    } else if (spec.prompt.includes('uTap')) {
      return 'uTap Payment Solutions';
    } else if (spec.prompt.includes('Mobile')) {
      return 'Business Mobile Plans';
    } else {
      return `${spec.industry.charAt(0).toUpperCase() + spec.industry.slice(1)} Business Solution`;
    }
  }

}

export const enhancedChinchilla = new EnhancedChinchilla();
