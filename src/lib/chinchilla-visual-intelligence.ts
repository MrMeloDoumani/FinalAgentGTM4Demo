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
    if (lowerPrompt.includes('chart') || lowerPrompt.includes('graph') || lowerPrompt.includes('analytics')) elements.push('chart');
    if (lowerPrompt.includes('network')) elements.push('network');
    if (lowerPrompt.includes('router') || lowerPrompt.includes('equipment')) elements.push('router');
    if (lowerPrompt.includes('server') || lowerPrompt.includes('data_center')) elements.push('server');
    if (lowerPrompt.includes('laptop') || lowerPrompt.includes('computer')) elements.push('laptop');
    if (lowerPrompt.includes('tower') || lowerPrompt.includes('antenna')) elements.push('tower');
    if (lowerPrompt.includes('wifi') || lowerPrompt.includes('signal')) elements.push('wifi_signal');
    if (lowerPrompt.includes('security') || lowerPrompt.includes('shield')) elements.push('security_shield');
    if (lowerPrompt.includes('cloud')) elements.push('cloud');
    if (lowerPrompt.includes('office_building') || lowerPrompt.includes('corporate')) elements.push('office_building');
    if (lowerPrompt.includes('retail') || lowerPrompt.includes('store')) elements.push('retail_store');
    if (lowerPrompt.includes('hospital') || lowerPrompt.includes('medical')) elements.push('hospital');
    if (lowerPrompt.includes('school') || lowerPrompt.includes('education')) elements.push('school');
    if (lowerPrompt.includes('analytics_dashboard') || lowerPrompt.includes('dashboard')) elements.push('analytics_dashboard');
    if (lowerPrompt.includes('data_center')) elements.push('data_center');
    
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
          if (element === 'router' && !elements.includes('router')) elements.push('router');
          if (element === 'server' && !elements.includes('server')) elements.push('server');
          if (element === 'laptop' && !elements.includes('laptop')) elements.push('laptop');
          if (element === 'tower' && !elements.includes('tower')) elements.push('tower');
          if (element === 'wifi_signal' && !elements.includes('wifi_signal')) elements.push('wifi_signal');
          if (element === 'security_shield' && !elements.includes('security_shield')) elements.push('security_shield');
          if (element === 'cloud' && !elements.includes('cloud')) elements.push('cloud');
          if (element === 'office_building' && !elements.includes('office_building')) elements.push('office_building');
          if (element === 'retail_store' && !elements.includes('retail_store')) elements.push('retail_store');
          if (element === 'hospital' && !elements.includes('hospital')) elements.push('hospital');
          if (element === 'school' && !elements.includes('school')) elements.push('school');
          if (element === 'analytics_dashboard' && !elements.includes('analytics_dashboard')) elements.push('analytics_dashboard');
          if (element === 'data_center' && !elements.includes('data_center')) elements.push('data_center');
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
    
    // e& Professional B2B Background
    svg += `<rect width="${width}" height="${height}" fill="white"/>`;
    svg += `<rect x="0" y="0" width="${width}" height="60" fill="#e30613"/>`;
    
    // e& Branding with B2B focus
    svg += `<text x="20" y="35" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">e& (Etisalat)</text>`;
    svg += `<text x="20" y="50" font-family="Arial, sans-serif" font-size="12" fill="white">B2B Solutions</text>`;
    
    // Main content area with professional styling
    svg += `<rect x="20" y="80" width="${width-40}" height="${height-100}" fill="white" stroke="#e30613" stroke-width="2" rx="8"/>`;
    
    // Professional B2B Layout
    if (interpretedSpec.elements.length === 0) {
      // Fallback: Show industry context
      svg += `<text x="${width/2}" y="${height/2-20}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#333">${interpretedSpec.industry.toUpperCase()}</text>`;
      svg += `<text x="${width/2}" y="${height/2+10}" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#666">Business Solutions</text>`;
    } else {
      // Create professional composition for B2B
      const layout = this.createProfessionalB2BLayout(interpretedSpec.elements, width, height);
      
      // Add elements with proper positioning
      interpretedSpec.elements.forEach((element: string, index: number) => {
        const position = layout.positions[index] || { x: 50, y: 120 };
        svg += this.drawElement(element, position.x, position.y, brand);
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

  private createProfessionalB2BLayout(elements: string[], width: number, height: number): { positions: { x: number, y: number }[] } {
    const positions: { x: number, y: number }[] = [];
    const startY = 120;
    const spacing = 80;
    
    // Professional grid layout for B2B
    if (elements.length === 1) {
      positions.push({ x: width/2 - 30, y: startY });
    } else if (elements.length === 2) {
      positions.push({ x: width/2 - 60, y: startY });
      positions.push({ x: width/2 + 20, y: startY });
    } else if (elements.length === 3) {
      positions.push({ x: width/2 - 60, y: startY });
      positions.push({ x: width/2 - 10, y: startY });
      positions.push({ x: width/2 + 40, y: startY });
    } else {
      // 4+ elements: 2x2 grid
      positions.push({ x: width/2 - 80, y: startY });
      positions.push({ x: width/2 - 20, y: startY });
      positions.push({ x: width/2 - 80, y: startY + spacing });
      positions.push({ x: width/2 - 20, y: startY + spacing });
    }
    
    return { positions };
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
      case 'router':
        return `
          <rect x="${x}" y="${y}" width="50" height="30" fill="${brand.primaryColor}" rx="3"/>
          <rect x="${x+5}" y="${y+5}" width="40" height="20" fill="white" rx="2"/>
          <circle cx="${x+10}" cy="${y+15}" r="2" fill="${brand.primaryColor}"/>
          <circle cx="${x+20}" cy="${y+15}" r="2" fill="${brand.primaryColor}"/>
          <circle cx="${x+30}" cy="${y+15}" r="2" fill="${brand.primaryColor}"/>
          <circle cx="${x+40}" cy="${y+15}" r="2" fill="${brand.primaryColor}"/>
        `;
      case 'server':
        return `
          <rect x="${x}" y="${y}" width="60" height="40" fill="#333" rx="2"/>
          <rect x="${x+5}" y="${y+5}" width="50" height="8" fill="${brand.primaryColor}"/>
          <rect x="${x+5}" y="${y+15}" width="50" height="8" fill="${brand.primaryColor}"/>
          <rect x="${x+5}" y="${y+25}" width="50" height="8" fill="${brand.primaryColor}"/>
          <circle cx="${x+55}" cy="${y+10}" r="3" fill="green"/>
        `;
      case 'laptop':
        return `
          <rect x="${x}" y="${y+15}" width="50" height="30" fill="#333" rx="2"/>
          <rect x="${x+5}" y="${y+20}" width="40" height="20" fill="white" rx="1"/>
          <rect x="${x+10}" y="${y+25}" width="30" height="10" fill="${brand.primaryColor}"/>
          <rect x="${x+20}" y="${y+5}" width="10" height="15" fill="#666" rx="1"/>
        `;
      case 'tower':
        return `
          <rect x="${x+20}" y="${y}" width="8" height="50" fill="#333"/>
          <rect x="${x+15}" y="${y+10}" width="18" height="8" fill="${brand.primaryColor}"/>
          <rect x="${x+12}" y="${y+20}" width="24" height="8" fill="${brand.primaryColor}"/>
          <rect x="${x+10}" y="${y+30}" width="28" height="8" fill="${brand.primaryColor}"/>
        `;
      case 'wifi_signal':
        return `
          <path d="M${x+20} ${y+30} Q${x+10} ${y+20} ${x+20} ${y+10}" stroke="${brand.primaryColor}" stroke-width="3" fill="none"/>
          <path d="M${x+20} ${y+30} Q${x+15} ${y+25} ${x+20} ${y+20}" stroke="${brand.primaryColor}" stroke-width="2" fill="none"/>
          <circle cx="${x+20}" cy="${y+30}" r="2" fill="${brand.primaryColor}"/>
        `;
      case 'security_shield':
        return `
          <path d="M${x+20} ${y+5} L${x+10} ${y+15} L${x+10} ${y+25} Q${x+10} ${y+35} ${x+20} ${y+35} Q${x+30} ${y+35} ${x+30} ${y+25} L${x+30} ${y+15} Z" fill="${brand.primaryColor}"/>
          <path d="M${x+15} ${y+20} L${x+18} ${y+23} L${x+25} ${y+16}" stroke="white" stroke-width="2" fill="none"/>
        `;
      case 'cloud':
        return `
          <path d="M${x+10} ${y+20} Q${x+5} ${y+15} ${x+10} ${y+10} Q${x+15} ${y+5} ${x+25} ${y+5} Q${x+35} ${y+5} ${x+40} ${y+10} Q${x+45} ${y+15} ${x+40} ${y+20} L${x+10} ${y+20} Z" fill="${brand.primaryColor}"/>
          <circle cx="${x+20}" cy="${y+15}" r="2" fill="white"/>
          <circle cx="${x+30}" cy="${y+15}" r="2" fill="white"/>
        `;
      case 'office_building':
        return `
          <rect x="${x}" y="${y+20}" width="60" height="40" fill="#666"/>
          <rect x="${x+5}" y="${y+5}" width="50" height="15" fill="${brand.primaryColor}"/>
          <rect x="${x+10}" y="${y+25}" width="15" height="10" fill="#999"/>
          <rect x="${x+30}" y="${y+25}" width="15" height="10" fill="#999"/>
          <rect x="${x+10}" y="${y+40}" width="15" height="10" fill="#999"/>
          <rect x="${x+30}" y="${y+40}" width="15" height="10" fill="#999"/>
        `;
      case 'retail_store':
        return `
          <rect x="${x}" y="${y+20}" width="60" height="40" fill="#e30613"/>
          <rect x="${x+5}" y="${y+5}" width="50" height="15" fill="white"/>
          <text x="${x+30}" y="${y+15}" font-family="Arial" font-size="8" text-anchor="middle" fill="#e30613">e&</text>
          <rect x="${x+10}" y="${y+30}" width="40" height="25" fill="white" opacity="0.8"/>
          <rect x="${x+15}" y="${y+35}" width="8" height="8" fill="${brand.primaryColor}"/>
          <rect x="${x+25}" y="${y+35}" width="8" height="8" fill="${brand.primaryColor}"/>
          <rect x="${x+35}" y="${y+35}" width="8" height="8" fill="${brand.primaryColor}"/>
        `;
      case 'hospital':
        return `
          <rect x="${x}" y="${y+20}" width="60" height="40" fill="white" stroke="#1976D2" stroke-width="2"/>
          <rect x="${x+5}" y="${y+5}" width="50" height="15" fill="#1976D2"/>
          <circle cx="${x+30}" cy="${y+12}" r="8" fill="white"/>
          <path d="M${x+25} ${y+8} L${x+30} ${y+12} L${x+35} ${y+8}" stroke="#1976D2" stroke-width="2" fill="none"/>
          <rect x="${x+10}" y="${y+30}" width="15" height="10" fill="#f0f0f0"/>
          <rect x="${x+30}" y="${y+30}" width="15" height="10" fill="#f0f0f0"/>
        `;
      case 'school':
        return `
          <rect x="${x}" y="${y+20}" width="60" height="40" fill="white" stroke="#2E7D32" stroke-width="2"/>
          <rect x="${x+5}" y="${y+5}" width="50" height="15" fill="#2E7D32"/>
          <circle cx="${x+30}" cy="${y+12}" r="6" fill="white"/>
          <text x="${x+30}" y="${y+16}" font-family="Arial" font-size="8" text-anchor="middle" fill="#2E7D32">e&</text>
          <rect x="${x+10}" y="${y+30}" width="15" height="10" fill="#f0f0f0"/>
          <rect x="${x+30}" y="${y+30}" width="15" height="10" fill="#f0f0f0"/>
          <rect x="${x+10}" y="${y+45}" width="15" height="10" fill="#f0f0f0"/>
          <rect x="${x+30}" y="${y+45}" width="15" height="10" fill="#f0f0f0"/>
        `;
      case 'analytics_dashboard':
        return `
          <rect x="${x}" y="${y}" width="60" height="40" fill="#f0f0f0" stroke="#333" stroke-width="1"/>
          <rect x="${x+5}" y="${y+5}" width="50" height="8" fill="${brand.primaryColor}"/>
          <rect x="${x+5}" y="${y+15}" width="12" height="20" fill="${brand.primaryColor}"/>
          <rect x="${x+20}" y="${y+25}" width="12" height="10" fill="${brand.primaryColor}"/>
          <rect x="${x+35}" y="${y+20}" width="12" height="15" fill="${brand.primaryColor}"/>
          <rect x="${x+50}" y="${y+30}" width="5" height="5" fill="${brand.primaryColor}"/>
        `;
      case 'data_center':
        return `
          <rect x="${x}" y="${y+10}" width="60" height="30" fill="#333" rx="2"/>
          <rect x="${x+5}" y="${y+5}" width="50" height="5" fill="${brand.primaryColor}"/>
          <rect x="${x+10}" y="${y+15}" width="15" height="8" fill="#666"/>
          <rect x="${x+30}" y="${y+15}" width="15" height="8" fill="#666"/>
          <rect x="${x+10}" y="${y+25}" width="15" height="8" fill="#666"/>
          <rect x="${x+30}" y="${y+25}" width="15" height="8" fill="#666"/>
          <circle cx="${x+55}" cy="${y+20}" r="3" fill="green"/>
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
