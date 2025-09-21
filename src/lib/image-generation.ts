// Image Generation Service using Hugging Face Stable Diffusion
// Generates visual documents based on e& brand guidelines and learned styles

import { HfInference } from '@huggingface/inference';

export interface DocumentImageRequest {
  contentType: 'brochure' | 'whitepaper' | 'battlecard' | 'presentation' | 'email';
  industry: string;
  title: string;
  content: string;
  stylePattern?: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    fonts: {
      primary: string;
      heading: string;
    };
  };
}

export interface GeneratedImage {
  id: string;
  url: string;
  type: string;
  industry: string;
  title: string;
  generatedAt: string;
  styleUsed?: string;
}

class ImageGenerationService {
  private hf: HfInference;
  private generatedImages: Map<string, GeneratedImage> = new Map();

  constructor() {
    // Using Hugging Face's free inference API
    this.hf = new HfInference();
  }

  async generateDocumentImage(request: DocumentImageRequest): Promise<GeneratedImage> {
    try {
      // Create a detailed prompt based on the request
      const prompt = this.createImagePrompt(request);
      
      // Generate image using Stable Diffusion
      const imageBlob = await this.hf.textToImage({
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        inputs: prompt,
        parameters: {
          num_inference_steps: 20,
          guidance_scale: 7.5,
          width: 1024,
          height: 768,
        },
      });

      // Convert blob to base64
      const arrayBuffer = await imageBlob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const dataUrl = `data:image/png;base64,${base64}`;

      // Create image record
      const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const generatedImage: GeneratedImage = {
        id: imageId,
        url: dataUrl,
        type: request.contentType,
        industry: request.industry,
        title: request.title,
        generatedAt: new Date().toISOString(),
        styleUsed: request.stylePattern ? 'custom' : 'default'
      };

      this.generatedImages.set(imageId, generatedImage);
      return generatedImage;

    } catch (error) {
      console.error('Image generation error:', error);
      throw new Error('Failed to generate image. Please try again.');
    }
  }

  private createImagePrompt(request: DocumentImageRequest): string {
    const { contentType, industry, title, stylePattern } = request;
    
    // Base prompt for professional business documents
    let basePrompt = 'Professional business document, clean design, corporate style, high quality, detailed, ';
    
    // Add content type specific elements
    switch (contentType) {
      case 'brochure':
        basePrompt += 'marketing brochure, product showcase, colorful, engaging, ';
        break;
      case 'whitepaper':
        basePrompt += 'technical whitepaper, professional report, data visualization, charts, ';
        break;
      case 'battlecard':
        basePrompt += 'competitive analysis card, comparison table, strategic overview, ';
        break;
      case 'presentation':
        basePrompt += 'presentation slide, executive summary, key points, ';
        break;
      case 'email':
        basePrompt += 'email template, newsletter design, professional communication, ';
        break;
    }

    // Add industry context
    basePrompt += `${industry} industry, business solutions, `;

    // Add e& branding elements
    basePrompt += 'etisalat branding, UAE telecom, red and white color scheme, ';

    // Add style elements if available
    if (stylePattern) {
      basePrompt += `primary color ${stylePattern.colors.primary}, `;
      basePrompt += `secondary color ${stylePattern.colors.secondary}, `;
      basePrompt += `background ${stylePattern.colors.background}, `;
    }

    // Add title context
    basePrompt += `title: "${title}", `;

    // Add quality and style modifiers
    basePrompt += 'modern typography, professional layout, corporate identity, clean lines, ';
    basePrompt += 'high resolution, 4k quality, professional photography style';

    return basePrompt;
  }

  async generateBrochureImage(industry: string, title: string, content: string, stylePattern?: DocumentImageRequest['stylePattern']): Promise<GeneratedImage> {
    return this.generateDocumentImage({
      contentType: 'brochure',
      industry,
      title,
      content,
      stylePattern
    });
  }

  async generateWhitePaperImage(industry: string, title: string, content: string, stylePattern?: DocumentImageRequest['stylePattern']): Promise<GeneratedImage> {
    return this.generateDocumentImage({
      contentType: 'whitepaper',
      industry,
      title,
      content,
      stylePattern
    });
  }

  async generateBattlecardImage(industry: string, title: string, content: string, stylePattern?: DocumentImageRequest['stylePattern']): Promise<GeneratedImage> {
    return this.generateDocumentImage({
      contentType: 'battlecard',
      industry,
      title,
      content,
      stylePattern
    });
  }

  async generatePresentationImage(industry: string, title: string, content: string, stylePattern?: DocumentImageRequest['stylePattern']): Promise<GeneratedImage> {
    return this.generateDocumentImage({
      contentType: 'presentation',
      industry,
      title,
      content,
      stylePattern
    });
  }

  getGeneratedImage(imageId: string): GeneratedImage | undefined {
    return this.generatedImages.get(imageId);
  }

  getAllGeneratedImages(): GeneratedImage[] {
    return Array.from(this.generatedImages.values());
  }

  // Create a simple fallback image when API fails
  createFallbackImage(request: DocumentImageRequest): GeneratedImage {
    const imageId = `fallback_${Date.now()}`;
    
    // Create a simple SVG-based image
    const svg = this.createSVGImage(request);
    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    
    const fallbackImage: GeneratedImage = {
      id: imageId,
      url: dataUrl,
      type: request.contentType,
      industry: request.industry,
      title: request.title,
      generatedAt: new Date().toISOString(),
      styleUsed: 'fallback'
    };

    this.generatedImages.set(imageId, fallbackImage);
    return fallbackImage;
  }

  private createSVGImage(request: DocumentImageRequest): string {
    const { contentType, industry, title, stylePattern } = request;
    
    const primaryColor = stylePattern?.colors?.primary || '#e30613';
    const secondaryColor = stylePattern?.colors?.secondary || '#ffffff';
    const textColor = stylePattern?.colors?.text || '#000000';
    const backgroundColor = stylePattern?.colors?.background || '#ffffff';

    return `
      <svg width="1024" height="768" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect width="1024" height="768" fill="${backgroundColor}"/>
        
        <!-- Header -->
        <rect width="1024" height="120" fill="${primaryColor}"/>
        <text x="50" y="70" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="${secondaryColor}">
          e& (Etisalat)
        </text>
        <text x="50" y="100" font-family="Arial, sans-serif" font-size="18" fill="${secondaryColor}">
          ${title}
        </text>
        
        <!-- Content Area -->
        <rect x="50" y="150" width="924" height="500" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="2"/>
        
        <!-- Industry Badge -->
        <rect x="70" y="170" width="200" height="40" fill="${primaryColor}" rx="20"/>
        <text x="170" y="195" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${secondaryColor}" text-anchor="middle">
          ${industry.toUpperCase()}
        </text>
        
        <!-- Content Type Badge -->
        <rect x="300" y="170" width="150" height="40" fill="${primaryColor}" rx="20"/>
        <text x="375" y="195" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${secondaryColor}" text-anchor="middle">
          ${contentType.toUpperCase()}
        </text>
        
        <!-- Main Content -->
        <text x="70" y="250" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${textColor}">
          ${title}
        </text>
        
        <text x="70" y="300" font-family="Arial, sans-serif" font-size="16" fill="${textColor}">
          Professional ${contentType} for ${industry} industry
        </text>
        
        <text x="70" y="330" font-family="Arial, sans-serif" font-size="14" fill="${textColor}">
          Generated by e& AI Sales Enablement Assistant
        </text>
        
        <!-- Footer -->
        <rect x="50" y="670" width="924" height="60" fill="${primaryColor}"/>
        <text x="512" y="700" font-family="Arial, sans-serif" font-size="14" fill="${secondaryColor}" text-anchor="middle">
          e& (Etisalat) - AI-Powered Sales Enablement
        </text>
        <text x="512" y="720" font-family="Arial, sans-serif" font-size="12" fill="${secondaryColor}" text-anchor="middle">
          Generated on ${new Date().toLocaleDateString()}
        </text>
      </svg>
    `;
  }
}

export const imageGenerationService = new ImageGenerationService();
