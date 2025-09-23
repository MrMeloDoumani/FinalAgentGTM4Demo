// Chinchilla Visual Intelligence - Interprets, researches, and generates images
// Uses internal data + web search for comprehensive visual generation

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

class ChinchillaVisualIntelligence {
  private internalVisualDB: any[] = [];
  private brandAssets: any[] = [];
  private industryPatterns: any[] = [];

  // Main visual intelligence processing
  async generateIntelligentImage(specification: VisualSpecification): Promise<VisualGenerationResult> {
    console.log('🎨 Chinchilla Visual Intelligence processing:', specification.prompt);

    // Step 1: INTERPRET the specifications
    const interpretedSpec = this.interpretSpecification(specification);
    console.log('🔍 Specifications interpreted:', interpretedSpec);

    // Step 2: RESEARCH using internal data and web
    const research = await this.researchVisualReferences(interpretedSpec);
    console.log('📚 Visual research complete:', research.confidence);

    // Step 3: GENERATE based on comprehensive understanding
    const result = await this.generateBasedOnResearch(interpretedSpec, research);
    console.log('✨ Image generated with elements:', result.elementsUsed);

    return result;
  }

  private interpretSpecification(spec: VisualSpecification): any {
    const lowerPrompt = spec.prompt.toLowerCase();
    
    // Extract visual elements
    const elements = [];
    
    // Check for specific element names that Jammy sends
    if (lowerPrompt.includes('smartphone') || lowerPrompt.includes('phone') || lowerPrompt.includes('mobile')) elements.push('smartphone');
    if (lowerPrompt.includes('chinchilla')) elements.push('chinchilla');
    if (lowerPrompt.includes('building') || lowerPrompt.includes('office')) elements.push('building');
    if (lowerPrompt.includes('people') || lowerPrompt.includes('team')) elements.push('people');
    if (lowerPrompt.includes('chart') || lowerPrompt.includes('graph')) elements.push('chart');
    if (lowerPrompt.includes('network')) elements.push('network');
    if (lowerPrompt.includes('data_visualization') || lowerPrompt.includes('data')) elements.push('data_visualization');
    if (lowerPrompt.includes('security')) elements.push('security');
    if (lowerPrompt.includes('cloud')) elements.push('cloud');
    
    // Also check for "draw these elements:" pattern from Jammy
    if (lowerPrompt.includes('draw these elements:')) {
      const elementsText = lowerPrompt.split('draw these elements:')[1];
      if (elementsText) {
        const elementList = elementsText.split(',').map(e => e.trim());
        elementList.forEach(element => {
          if (element === 'smartphone' && !elements.includes('smartphone')) elements.push('smartphone');
          if (element === 'building' && !elements.includes('building')) elements.push('building');
          if (element === 'people' && !elements.includes('people')) elements.push('people');
          if (element === 'chart' && !elements.includes('chart')) elements.push('chart');
          if (element === 'network' && !elements.includes('network')) elements.push('network');
          if (element === 'chinchilla' && !elements.includes('chinchilla')) elements.push('chinchilla');
        });
      }
    }

    // Determine style preferences
    let style = 'professional';
    if (lowerPrompt.includes('creative') || lowerPrompt.includes('artistic')) style = 'creative';
    if (lowerPrompt.includes('minimal') || lowerPrompt.includes('clean')) style = 'minimal';
    if (lowerPrompt.includes('corporate') || lowerPrompt.includes('business')) style = 'corporate';

    // Determine color scheme
    let colorScheme = this.getIndustryColor(spec.industry);
    if (lowerPrompt.includes('blue')) colorScheme = 'blue';
    if (lowerPrompt.includes('green')) colorScheme = 'green';
    if (lowerPrompt.includes('purple')) colorScheme = 'purple';

    return {
      elements,
      style,
      colorScheme,
      industry: spec.industry,
      contentType: spec.contentType,
      requirements: spec.requirements,
      context: spec.context
    };
  }

  private async researchVisualReferences(interpretedSpec: any): Promise<VisualResearch> {
    // Step 1: Search internal visual database
    const internalReferences = this.searchInternalVisuals(interpretedSpec);
    
    // Step 2: Search brand assets
    const brandGuidelines = this.getBrandGuidelines(interpretedSpec.industry);
    
    // Step 3: Search industry patterns
    const industryPatterns = this.getIndustryPatterns(interpretedSpec.industry);
    
    // Step 4: Web search for visual references (mock for now)
    const webReferences = await this.searchWebVisuals(interpretedSpec);
    
    // Calculate confidence
    const confidence = this.calculateVisualConfidence(internalReferences, webReferences, brandGuidelines);

    return {
      internalReferences,
      webReferences,
      brandGuidelines,
      industryPatterns,
      confidence
    };
  }

  private searchInternalVisuals(interpretedSpec: any): any[] {
    const references = [];
    
    // Search for matching elements
    for (const element of interpretedSpec.elements) {
      const matchingVisuals = this.internalVisualDB.filter(visual => 
        visual.elements.includes(element) || visual.tags.includes(element)
      );
      references.push(...matchingVisuals);
    }
    
    // Search by industry
    const industryVisuals = this.internalVisualDB.filter(visual => 
      visual.industry === interpretedSpec.industry
    );
    references.push(...industryVisuals);
    
    return references.slice(0, 5); // Limit to top 5
  }

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

  private getIndustryPatterns(industry: string): any[] {
    const patterns = {
      'retail': [
        { name: 'shopping_cart', icon: '🛒', color: '#e30613' },
        { name: 'store_front', icon: '🏪', color: '#e30613' },
        { name: 'payment', icon: '💳', color: '#e30613' }
      ],
      'education': [
        { name: 'graduation_cap', icon: '🎓', color: '#2E7D32' },
        { name: 'book', icon: '📚', color: '#2E7D32' },
        { name: 'laptop', icon: '💻', color: '#2E7D32' }
      ],
      'healthcare': [
        { name: 'medical_cross', icon: '➕', color: '#1976D2' },
        { name: 'hospital', icon: '🏥', color: '#1976D2' },
        { name: 'stethoscope', icon: '🩺', color: '#1976D2' }
      ],
      'tech_telecom': [
        { name: 'network', icon: '🌐', color: '#e30613' },
        { name: 'server', icon: '🖥️', color: '#e30613' },
        { name: 'smartphone', icon: '📱', color: '#e30613' }
      ]
    };
    
    return patterns[industry] || patterns['tech_telecom'];
  }

  private async searchWebVisuals(interpretedSpec: any): Promise<any[]> {
    // Mock web search results
    // In production, integrate with Unsplash API or similar
    return [
      { type: 'web', source: 'unsplash', url: 'https://example.com/image1.jpg', tags: ['professional', 'business'] },
      { type: 'web', source: 'pixabay', url: 'https://example.com/image2.jpg', tags: ['corporate', 'modern'] }
    ];
  }

  private calculateVisualConfidence(internal: any[], web: any[], brand: any): number {
    let confidence = 0;
    
    if (internal.length > 0) confidence += 0.5;
    if (web.length > 0) confidence += 0.3;
    if (brand) confidence += 0.2;
    
    return Math.min(confidence, 1.0);
  }

  private async generateBasedOnResearch(interpretedSpec: any, research: VisualResearch): Promise<VisualGenerationResult> {
    try {
      // Create sophisticated SVG based on research
      const svg = this.createIntelligentSVG(interpretedSpec, research);
      
      // Convert to base64
      const base64 = Buffer.from(svg).toString('base64');
      const imageUrl = `data:image/svg+xml;base64,${base64}`;
      
      return {
        success: true,
        imageUrl,
        title: `${interpretedSpec.industry} ${interpretedSpec.contentType} - Intelligent Design`,
        description: `Generated using ${research.confidence * 100}% confidence with ${interpretedSpec.elements.length} visual elements`,
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

  private createIntelligentSVG(interpretedSpec: any, research: VisualResearch): string {
    const width = 400;
    const height = 300;
    const brand = research.brandGuidelines;
    
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Background with brand colors
    svg += `<rect width="${width}" height="${height}" fill="${brand.backgroundColor}"/>`;
    svg += `<rect x="0" y="0" width="${width}" height="60" fill="${brand.primaryColor}"/>`;
    
    // e& branding
    svg += `<text x="20" y="35" font-family="${brand.fonts.primary}" font-size="18" font-weight="bold" fill="white">${brand.logo}</text>`;
    
    // Main content area
    svg += `<rect x="20" y="80" width="${width-40}" height="${height-100}" fill="white" stroke="${brand.primaryColor}" stroke-width="2" rx="8"/>`;
    
    // Add visual elements based on research
    let x = 50;
    let y = 120;
    
    for (const element of interpretedSpec.elements) {
      svg += this.drawElement(element, x, y, brand);
      x += 80;
      if (x > width - 100) {
        x = 50;
        y += 80;
      }
    }
    
    // Add industry patterns
    const patterns = research.industryPatterns;
    for (let i = 0; i < Math.min(patterns.length, 3); i++) {
      const pattern = patterns[i];
      svg += `<text x="${width - 100 + i * 30}" y="${height - 40}" font-size="20" fill="${pattern.color}">${pattern.icon}</text>`;
    }
    
    // Footer
    svg += `<text x="${width/2}" y="${height-10}" font-family="${brand.fonts.primary}" font-size="12" text-anchor="middle" fill="${brand.textColor}">Generated by Chinchilla AI • ${Math.round(research.confidence * 100)}% confidence</text>`;
    
    svg += `</svg>`;
    return svg;
  }

  private drawElement(element: string, x: number, y: number, brand: any): string {
    switch (element) {
      case 'smartphone':
        return `
          <rect x="${x}" y="${y}" width="60" height="100" fill="#333" rx="8"/>
          <rect x="${x+5}" y="${y+10}" width="50" height="70" fill="#000"/>
          <circle cx="${x+30}" cy="${y+85}" r="8" fill="#666"/>
        `;
      case 'chinchilla':
        return `
          <ellipse cx="${x+30}" cy="${y+20}" rx="25" ry="15" fill="#8B4513"/>
          <circle cx="${x+15}" cy="${y+15}" r="3" fill="#000"/>
          <circle cx="${x+45}" cy="${y+15}" r="3" fill="#000"/>
          <ellipse cx="${x+30}" cy="${y+25}" rx="8" ry="4" fill="#000"/>
        `;
      case 'building':
        return `
          <rect x="${x}" y="${y}" width="60" height="80" fill="#666"/>
          <rect x="${x+5}" y="${y+5}" width="50" height="15" fill="#999"/>
          <rect x="${x+5}" y="${y+25}" width="50" height="15" fill="#999"/>
          <rect x="${x+5}" y="${y+45}" width="50" height="15" fill="#999"/>
        `;
      case 'people':
        return `
          <circle cx="${x+15}" cy="${y+10}" r="8" fill="#FFDBAC"/>
          <rect x="${x+9}" y="${y+18}" width="12" height="20" fill="#4A90E2"/>
          <circle cx="${x+45}" cy="${y+10}" r="8" fill="#FFDBAC"/>
          <rect x="${x+39}" y="${y+18}" width="12" height="20" fill="#4A90E2"/>
        `;
      case 'chart':
        return `
          <rect x="${x}" y="${y+20}" width="60" height="40" fill="#f0f0f0" stroke="#333"/>
          <rect x="${x+5}" y="${y+50}" width="8" height="10" fill="${brand.primaryColor}"/>
          <rect x="${x+15}" y="${y+40}" width="8" height="20" fill="${brand.primaryColor}"/>
          <rect x="${x+25}" y="${y+35}" width="8" height="25" fill="${brand.primaryColor}"/>
          <rect x="${x+35}" y="${y+45}" width="8" height="15" fill="${brand.primaryColor}"/>
        `;
      case 'network':
        return `
          <circle cx="${x+15}" cy="${y+20}" r="5" fill="${brand.primaryColor}"/>
          <circle cx="${x+35}" cy="${y+10}" r="5" fill="${brand.primaryColor}"/>
          <circle cx="${x+55}" cy="${y+25}" r="5" fill="${brand.primaryColor}"/>
          <line x1="${x+15}" y1="${y+20}" x2="${x+35}" y2="${y+10}" stroke="${brand.primaryColor}" stroke-width="2"/>
          <line x1="${x+35}" y1="${y+10}" x2="${x+55}" y2="${y+25}" stroke="${brand.primaryColor}" stroke-width="2"/>
          <line x1="${x+15}" y1="${y+20}" x2="${x+55}" y2="${y+25}" stroke="${brand.primaryColor}" stroke-width="2"/>
        `;
      default:
        return `<rect x="${x}" y="${y}" width="60" height="40" fill="${brand.primaryColor}" rx="4"/>`;
    }
  }

  private getIndustryColor(industry: string): string {
    const colors = {
      'retail': 'e30613',
      'education': '2E7D32',
      'healthcare': '1976D2',
      'finance': '7B1FA2',
      'manufacturing': 'F57C00',
      'government': '5D4037',
      'hospitality': 'C62828',
      'logistics': '2E7D32',
      'real_estate': '795548',
      'tech_telecom': 'e30613'
    };
    return colors[industry] || 'e30613';
  }

  // Methods to manage visual database
  addInternalVisual(visual: any) {
    this.internalVisualDB.push({
      ...visual,
      timestamp: new Date().toISOString(),
      id: `visual_${Date.now()}`
    });
    console.log('🎨 Visual added to internal database');
  }

  getInternalVisuals(): any[] {
    return this.internalVisualDB;
  }
}

export const chinchillaVisualIntelligence = new ChinchillaVisualIntelligence();
