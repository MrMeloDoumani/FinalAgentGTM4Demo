/**
 * 🎨 CHINCHILLA VISUAL INTELLIGENCE V2 - Database-Powered Image Generation
 * 
 * This is the enhanced version that uses the comprehensive visual database
 * to generate professional B2B images for e& products and services.
 */

import { chinchillaVisualDatabase, VisualElement, VisualTemplate } from './chinchilla-visual-database';

export interface VisualSpecification {
  prompt: string;
  industry: string;
  contentType: string;
  style: string;
  requirements: string[];
  context: string;
}

export interface VisualResearch {
  internalReferences: any[];
  webReferences: any[];
  brandGuidelines: any;
  industryPatterns: any[];
  confidence: number;
}

export interface VisualGenerationResult {
  success: boolean;
  imageUrl: string;
  title: string;
  description: string;
  elementsUsed: string[];
  styleApplied: string;
  generatedAt: string;
}

class ChinchillaVisualIntelligenceV2 {
  private internalVisualDB: any[] = [];
  private brandAssets: any[] = [];
  private industryPatterns: any[] = [];

  /**
   * 🎨 Main visual intelligence processing with database integration
   */
  async generateIntelligentImage(specification: VisualSpecification): Promise<VisualGenerationResult> {
    console.log('🎨 Chinchilla Visual Intelligence V2 processing:', specification.prompt);

    // Step 1: INTERPRET the specifications using database
    const interpretedSpec = this.interpretSpecification(specification);
    console.log('🔍 Specifications interpreted:', interpretedSpec);

    // Step 2: RESEARCH using database and internal data
    const research = await this.researchVisualReferences(interpretedSpec);
    console.log('📚 Visual research complete:', research.confidence);

    // Step 3: GENERATE based on comprehensive understanding
    const result = await this.generateBasedOnResearch(interpretedSpec, research);
    console.log('✨ Image generated with elements:', result.elementsUsed);

    return result;
  }

  /**
   * 🔍 Interpret specifications using the visual database
   */
  private interpretSpecification(spec: VisualSpecification): any {
    console.log('🔍 Interpreting visual specification with comprehensive database...');
    
    const lowerPrompt = spec.prompt.toLowerCase();
    let elements: string[] = [];
    
    // Look for "Draw these elements:" pattern from Jammy
    if (lowerPrompt.includes('draw these elements:')) {
      const elementMatch = lowerPrompt.match(/draw these elements:\s*(.+)/i);
      if (elementMatch) {
        const elementString = elementMatch[1];
        elements = elementString.split(',').map(e => e.trim().toLowerCase());
        console.log('🎯 Found specific elements from Jammy:', elements);
      }
    }
    
    // If no elements found, use database to find relevant elements
    if (elements.length === 0) {
      console.log('🔍 No specific elements found, searching database for relevant elements...');
      
      // Search by industry
      const industryElements = chinchillaVisualDatabase.getElementsForIndustry(spec.industry);
      if (industryElements.length > 0) {
        elements = industryElements.slice(0, 4).map(el => el.id);
        console.log('🎯 Found industry elements:', elements);
      }
      
      // Search by keywords in prompt
      const promptKeywords = lowerPrompt.split(' ').filter(word => 
        word.length > 3 && !['the', 'and', 'for', 'with', 'this', 'that', 'from', 'draw', 'these', 'elements'].includes(word)
      );
      
      if (promptKeywords.length > 0) {
        const keywordElements = chinchillaVisualDatabase.searchElementsByKeywords(promptKeywords);
        if (keywordElements.length > 0) {
          elements = [...elements, ...keywordElements.slice(0, 2).map(el => el.id)];
          console.log('🔍 Found keyword elements:', elements);
        }
      }
    }
    
    // Map common element names to internal elements
    const elementMapping: { [key: string]: string } = {
      'office_building': 'office_building',
      'building': 'office_building',
      'network': 'network_cloud',
      'cloud': 'network_cloud',
      'server': 'server_rack',
      'phone': 'smartphone',
      'mobile': 'smartphone',
      'laptop': 'laptop',
      'wifi': 'wifi_signal',
      'security': 'security_shield',
      'analytics': 'data_analytics',
      'people': 'business_people',
      'etisalat': 'etisalat_logo',
      'logo': 'etisalat_logo'
    };
    
    // Map elements to internal names
    elements = elements.map(element => elementMapping[element] || element);
    
    // Remove duplicates
    elements = [...new Set(elements)];
    
    // Ensure we have at least some elements
    if (elements.length === 0) {
      elements = ['office_building', 'network_cloud', 'etisalat_logo'];
      console.log('⚠️ No elements found, using default elements:', elements);
    }
    
    // Determine style preferences
    let style = 'professional';
    if (lowerPrompt.includes('creative') || lowerPrompt.includes('artistic')) style = 'creative';
    if (lowerPrompt.includes('minimal') || lowerPrompt.includes('clean')) style = 'minimal';
    if (lowerPrompt.includes('corporate') || lowerPrompt.includes('business')) style = 'corporate';
    if (lowerPrompt.includes('modern') || lowerPrompt.includes('contemporary')) style = 'modern';
    if (lowerPrompt.includes('elegant') || lowerPrompt.includes('sophisticated')) style = 'elegant';
    if (lowerPrompt.includes('bold') || lowerPrompt.includes('dramatic')) style = 'bold';
    if (lowerPrompt.includes('subtle') || lowerPrompt.includes('soft')) style = 'subtle';

    // Determine color scheme (default to e& branding)
    let colorScheme = 'e30613'; // Default e& red
    if (lowerPrompt.includes('blue') || lowerPrompt.includes('azure')) colorScheme = 'blue';
    if (lowerPrompt.includes('green') || lowerPrompt.includes('emerald')) colorScheme = 'green';
    if (lowerPrompt.includes('purple') || lowerPrompt.includes('violet')) colorScheme = 'purple';
    if (lowerPrompt.includes('orange') || lowerPrompt.includes('amber')) colorScheme = 'orange';
    if (lowerPrompt.includes('monochrome') || lowerPrompt.includes('grayscale')) colorScheme = 'monochrome';
    if (lowerPrompt.includes('pastel') || lowerPrompt.includes('soft')) colorScheme = 'pastel';
    if (lowerPrompt.includes('e& branding') || lowerPrompt.includes('etisalat')) colorScheme = 'e30613';

    console.log('✅ Final elements for generation:', elements);
    console.log('✅ Style:', style, 'Color:', colorScheme);
    
    return {
      elements,
      style,
      colorScheme,
      industry: spec.industry,
      contentType: spec.contentType,
      requirements: spec.requirements || [],
      context: spec.context
    };
  }

  /**
   * 📚 Research visual references using the database
   */
  private async researchVisualReferences(interpretedSpec: any): Promise<VisualResearch> {
    console.log('📚 Researching visual references using database...');
    
    // Get elements from database
    const elements: VisualElement[] = [];
    interpretedSpec.elements.forEach((elementId: string) => {
      const element = chinchillaVisualDatabase.getAllElements().find(el => el.id === elementId);
      if (element) elements.push(element);
    });
    
    // Get template for layout
    const template = chinchillaVisualDatabase.getTemplateForProduct(interpretedSpec.industry);
    
    // Get brand guidelines
    const brandGuidelines = this.getBrandGuidelines(interpretedSpec.industry);
    
    // Get industry patterns
    const industryPatterns = chinchillaVisualDatabase.getElementsForIndustry(interpretedSpec.industry);
    
    // Calculate confidence based on available data
    let confidence = 0.5; // Base confidence
    if (elements.length > 0) confidence += 0.3;
    if (template) confidence += 0.2;
    if (brandGuidelines) confidence += 0.1;
    
    console.log('📚 Research complete - Elements:', elements.length, 'Template:', !!template, 'Confidence:', confidence);
    
    return {
      internalReferences: elements,
      webReferences: [], // Not used in this version
      brandGuidelines,
      industryPatterns,
      confidence: Math.min(confidence, 1.0)
    };
  }

  /**
   * 🎨 Generate image based on research
   */
  private async generateBasedOnResearch(interpretedSpec: any, research: VisualResearch): Promise<VisualGenerationResult> {
    try {
      console.log('🎨 Generating image with database elements...');
      
      // Create sophisticated SVG using database elements
      const svg = this.createIntelligentSVG(interpretedSpec, research);
      
      // Convert to base64
      const base64 = Buffer.from(svg).toString('base64');
      const imageUrl = `data:image/svg+xml;base64,${base64}`;
      
      console.log('✅ Image generated successfully with', interpretedSpec.elements.length, 'elements');
      
      return {
        success: true,
        imageUrl,
        title: `${interpretedSpec.industry} ${interpretedSpec.contentType} - Professional Design`,
        description: `Generated using ${research.confidence * 100}% confidence with ${interpretedSpec.elements.length} visual elements from database`,
        elementsUsed: interpretedSpec.elements,
        styleApplied: interpretedSpec.style,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Visual generation failed:', error);
      return {
        success: false,
        imageUrl: '',
        title: 'Generation Failed',
        description: 'Unable to generate image',
        elementsUsed: [],
        styleApplied: 'none',
        generatedAt: new Date().toISOString()
      };
    }
  }

  /**
   * 🎨 Create intelligent SVG using database elements
   */
  private createIntelligentSVG(interpretedSpec: any, research: VisualResearch): string {
    const width = 400;
    const height = 300;
    const brand = research.brandGuidelines;
    
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    
    // e& Professional B2B Background
    svg += `<rect width="${width}" height="${height}" fill="white"/>`;
    svg += `<rect x="0" y="0" width="${width}" height="60" fill="#e30613"/>`;
    
    // e& Branding with B2B focus
    svg += `<text x="20" y="35" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">e& (Etisalat)</text>`;
    svg += `<text x="20" y="50" font-family="Arial, sans-serif" font-size="12" fill="white">B2B Solutions</text>`;
    
    // Main content area with professional styling
    svg += `<rect x="20" y="80" width="${width-40}" height="${height-100}" fill="white" stroke="#e30613" stroke-width="2" rx="8"/>`;
    
    // Professional B2B Layout using database elements
    if (interpretedSpec.elements.length === 0) {
      // Fallback: Show industry context
      svg += `<text x="${width/2}" y="${height/2-20}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#333">${interpretedSpec.industry.toUpperCase()}</text>`;
      svg += `<text x="${width/2}" y="${height/2+10}" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#666">Business Solutions</text>`;
    } else {
      // Create professional composition using database elements
      const layout = this.createProfessionalB2BLayout(interpretedSpec.elements, width, height);
      
      // Add elements with proper positioning
      interpretedSpec.elements.forEach((elementId: string, index: number) => {
        const position = layout.positions[index] || { x: 50, y: 120 };
        const element = research.internalReferences.find((el: VisualElement) => el.id === elementId);
        if (element) {
          svg += this.drawDatabaseElement(element, position.x, position.y, brand);
        } else {
          // Fallback element
          svg += this.drawFallbackElement(elementId, position.x, position.y, brand);
        }
      });
      
      // Add product context
      if (interpretedSpec.industry) {
        svg += `<text x="${width/2}" y="${height-30}" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#666">${interpretedSpec.industry} Business Solutions</text>`;
      }
    }
    
    // Professional footer
    svg += `<text x="${width/2}" y="${height-10}" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#999">Generated by Chinchilla AI for e& B2B • ${Math.round(research.confidence * 100)}% confidence</text>`;
    
    svg += `</svg>`;
    return svg;
  }

  /**
   * 🎨 Draw element from database
   */
  private drawDatabaseElement(element: VisualElement, x: number, y: number, brand: any): string {
    const scale = 0.8;
    const scaledWidth = element.size.width * scale;
    const scaledHeight = element.size.height * scale;
    
    let svg = `<g transform="translate(${x}, ${y}) scale(${scale})">`;
    
    // Draw the element using its SVG path
    svg += `<path d="${element.svgPath}" fill="${element.colors[0]}" stroke="${element.colors[1] || '#333'}" stroke-width="1"/>`;
    
    // Add element label
    svg += `<text x="${element.size.width/2}" y="${element.size.height + 15}" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#666">${element.name}</text>`;
    
    svg += `</g>`;
    return svg;
  }

  /**
   * 🎨 Draw fallback element when not found in database
   */
  private drawFallbackElement(elementId: string, x: number, y: number, brand: any): string {
    const size = 40;
    const color = brand.primaryColor || '#e30613';
    
    return `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" stroke="#333" stroke-width="1" rx="4"/>
            <text x="${x + size/2}" y="${y + size/2 + 5}" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="white">${elementId}</text>`;
  }

  /**
   * 🎨 Create professional B2B layout
   */
  private createProfessionalB2BLayout(elements: string[], width: number, height: number): { positions: { x: number, y: number }[] } {
    const positions: { x: number, y: number }[] = [];
    const startY = 120;
    const spacing = 80;
    
    // Intelligent layout based on element types
    if (elements.includes('office_building') && elements.includes('network_cloud')) {
      // Business connectivity layout
      positions.push({ x: width/2 - 100, y: startY }); // Building on left
      positions.push({ x: width/2 + 20, y: startY });  // Network on right
      if (elements.includes('wifi_signal')) {
        positions.push({ x: width/2 - 40, y: startY + 60 }); // WiFi signal
      }
      if (elements.includes('etisalat_logo')) {
        positions.push({ x: width/2 + 60, y: startY + 60 }); // Logo
      }
    } else if (elements.includes('smartphone') && elements.includes('laptop')) {
      // Mobile/device layout
      positions.push({ x: width/2 - 80, y: startY }); // Smartphone
      positions.push({ x: width/2 + 20, y: startY }); // Laptop
      if (elements.includes('wifi_signal')) {
        positions.push({ x: width/2 - 30, y: startY + 60 }); // WiFi signal
      }
    } else {
      // Default professional grid layout
      if (elements.length === 1) {
        positions.push({ x: width/2 - 30, y: startY });
      } else if (elements.length === 2) {
        positions.push({ x: width/2 - 60, y: startY });
        positions.push({ x: width/2 + 20, y: startY });
      } else if (elements.length === 3) {
        positions.push({ x: width/2 - 60, y: startY });
        positions.push({ x: width/2 - 20, y: startY });
        positions.push({ x: width/2 + 20, y: startY });
      } else {
        // Grid layout for 4+ elements
        elements.forEach((_, index) => {
          const row = Math.floor(index / 2);
          const col = index % 2;
          positions.push({ 
            x: width/2 - 60 + (col * 80), 
            y: startY + (row * 60) 
          });
        });
      }
    }
    
    return { positions };
  }

  /**
   * 🎨 Get brand guidelines
   */
  private getBrandGuidelines(industry: string): any {
    return {
      primaryColor: '#e30613',
      secondaryColor: '#666666',
      accentColor: '#e30613',
      backgroundColor: '#FFFFFF',
      textColor: '#1A1A1A',
      fonts: {
        primary: 'Arial, sans-serif',
        heading: 'Arial, sans-serif'
      },
      logo: 'e& (Etisalat)',
      industry: industry
    };
  }
}

// Export singleton instance
export const chinchillaVisualIntelligenceV2 = new ChinchillaVisualIntelligenceV2();
