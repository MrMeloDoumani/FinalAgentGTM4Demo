// Style Learning System for AI Agent
// Extracts and stores visual style patterns from uploaded files

export interface StylePattern {
  id: string;
  name: string;
  type: 'brochure' | 'presentation' | 'email' | 'social' | 'banner' | 'other';
  extractedAt: string;
  source: string; // filename or URL
  
  // Typography
  fonts: {
    primary: string;
    secondary?: string;
    heading: string;
    body: string;
    accent?: string;
  };
  
  // Colors
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    highlight?: string;
  };
  
  // Layout
  layout: {
    grid: 'single' | 'two-column' | 'three-column' | 'multi-panel' | 'custom';
    spacing: 'tight' | 'normal' | 'loose';
    alignment: 'left' | 'center' | 'justified';
    hierarchy: 'strong' | 'moderate' | 'subtle';
  };
  
  // Visual Elements
  elements: {
    logoPlacement: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'custom';
    iconStyle: 'line' | 'filled' | 'outline' | 'gradient';
    imageStyle: 'photography' | 'illustration' | 'abstract' | 'mixed';
    borderStyle: 'none' | 'thin' | 'thick' | 'dashed' | 'gradient';
  };
  
  // Brand Elements
  brand: {
    logoUsage: boolean;
    taglineStyle?: string;
    colorConsistency: number; // 0-1 score
    brandCompliance: number; // 0-1 score
  };
  
  // Content Structure
  content: {
    titleStyle: 'large-bold' | 'medium-bold' | 'small-bold' | 'custom';
    bulletStyle: 'dash' | 'dot' | 'number' | 'icon' | 'custom';
    tableStyle: 'bordered' | 'striped' | 'minimal' | 'custom';
    callToActionStyle: 'button' | 'link' | 'highlight' | 'custom';
  };
  
  // Usage Statistics
  usage: {
    timesUsed: number;
    lastUsed: string;
    successRate: number; // 0-1 score
    userRating?: number; // 1-5 stars
  };
}

export interface StyleLearningEngine {
  extractStyleFromFile(file: File, type: string): Promise<StylePattern>;
  findMatchingStyles(contentType: string, industry?: string): StylePattern[];
  combineStyles(styles: StylePattern[]): StylePattern;
  updateStyleUsage(styleId: string, success: boolean): void;
  getStyleRecommendations(userRequest: string): StylePattern[];
}

class StyleLearningEngineImpl implements StyleLearningEngine {
  private styles: Map<string, StylePattern> = new Map();
  
  async extractStyleFromFile(file: File, type: string): Promise<StylePattern> {
    // This would integrate with actual file processing libraries
    // For now, we'll create a mock extraction based on file type
    
    const styleId = `style_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Mock style extraction - in real implementation, this would:
    // 1. Parse PDF/Word/PPT files
    // 2. Extract fonts using font detection libraries
    // 3. Analyze color palettes
    // 4. Detect layout patterns
    // 5. Identify brand elements
    
    const mockStyle: StylePattern = {
      id: styleId,
      name: `${file.name} Style`,
      type: type as StylePattern['type'],
      extractedAt: new Date().toISOString(),
      source: file.name,
      
      fonts: {
        primary: 'Arial, sans-serif',
        secondary: 'Helvetica, sans-serif',
        heading: 'Arial Bold, sans-serif',
        body: 'Arial Regular, sans-serif',
        accent: 'Arial Light, sans-serif'
      },
      
      colors: {
        primary: '#e30613', // e& red
        secondary: '#ffffff',
        accent: '#00a651', // e& green
        background: '#ffffff',
        text: '#000000',
        highlight: '#e30613'
      },
      
      layout: {
        grid: 'two-column',
        spacing: 'normal',
        alignment: 'left',
        hierarchy: 'strong'
      },
      
      elements: {
        logoPlacement: 'top-left',
        iconStyle: 'line',
        imageStyle: 'photography',
        borderStyle: 'thin'
      },
      
      brand: {
        logoUsage: true,
        taglineStyle: 'etisalat and',
        colorConsistency: 0.95,
        brandCompliance: 0.98
      },
      
      content: {
        titleStyle: 'large-bold',
        bulletStyle: 'dash',
        tableStyle: 'bordered',
        callToActionStyle: 'button'
      },
      
      usage: {
        timesUsed: 0,
        lastUsed: new Date().toISOString(),
        successRate: 0.8
      }
    };
    
    this.styles.set(styleId, mockStyle);
    return mockStyle;
  }
  
  findMatchingStyles(contentType: string, industry?: string): StylePattern[] {
    const allStyles = Array.from(this.styles.values());
    
    return allStyles.filter(style => {
      const typeMatch = style.type === contentType || style.type === 'other';
      const industryMatch = !industry || style.source.toLowerCase().includes(industry.toLowerCase());
      
      return typeMatch && industryMatch;
    }).sort((a, b) => b.usage.successRate - a.usage.successRate);
  }
  
  combineStyles(styles: StylePattern[]): StylePattern {
    if (styles.length === 0) {
      throw new Error('No styles to combine');
    }
    
    if (styles.length === 1) {
      return styles[0];
    }
    
    // Combine the most successful aspects of each style
    const combined: StylePattern = {
      id: `combined_${Date.now()}`,
      name: 'Combined Style',
      type: styles[0].type,
      extractedAt: new Date().toISOString(),
      source: 'Combined from multiple sources',
      
      fonts: this.combineFonts(styles),
      colors: this.combineColors(styles),
      layout: this.combineLayout(styles),
      elements: this.combineElements(styles),
      brand: this.combineBrand(styles),
      content: this.combineContent(styles),
      usage: {
        timesUsed: 0,
        lastUsed: new Date().toISOString(),
        successRate: styles.reduce((acc, s) => acc + s.usage.successRate, 0) / styles.length
      }
    };
    
    return combined;
  }
  
  updateStyleUsage(styleId: string, success: boolean): void {
    const style = this.styles.get(styleId);
    if (style) {
      style.usage.timesUsed++;
      style.usage.lastUsed = new Date().toISOString();
      
      // Update success rate with exponential moving average
      const alpha = 0.1;
      style.usage.successRate = alpha * (success ? 1 : 0) + (1 - alpha) * style.usage.successRate;
    }
  }
  
  getStyleRecommendations(userRequest: string): StylePattern[] {
    const allStyles = Array.from(this.styles.values());
    
    // Simple keyword matching - in real implementation, this would use NLP
    const keywords = userRequest.toLowerCase().split(' ');
    
    return allStyles.filter(style => {
      return keywords.some(keyword => 
        style.name.toLowerCase().includes(keyword) ||
        style.type.toLowerCase().includes(keyword) ||
        style.source.toLowerCase().includes(keyword)
      );
    }).sort((a, b) => b.usage.successRate - a.usage.successRate);
  }
  
  private combineFonts(styles: StylePattern[]): StylePattern['fonts'] {
    // Use the most successful style's fonts
    const bestStyle = styles.reduce((best, current) => 
      current.usage.successRate > best.usage.successRate ? current : best
    );
    return bestStyle.fonts;
  }
  
  private combineColors(styles: StylePattern[]): StylePattern['colors'] {
    // Average color values or use the most brand-compliant
    const brandCompliant = styles.find(s => s.brand.brandCompliance > 0.9);
    if (brandCompliant) {
      return brandCompliant.colors;
    }
    
    return styles[0].colors;
  }
  
  private combineLayout(styles: StylePattern[]): StylePattern['layout'] {
    // Use the most successful layout
    const bestStyle = styles.reduce((best, current) => 
      current.usage.successRate > best.usage.successRate ? current : best
    );
    return bestStyle.layout;
  }
  
  private combineElements(styles: StylePattern[]): StylePattern['elements'] {
    // Combine elements from all styles
    return {
      logoPlacement: styles[0].elements.logoPlacement,
      iconStyle: styles[0].elements.iconStyle,
      imageStyle: styles[0].elements.imageStyle,
      borderStyle: styles[0].elements.borderStyle
    };
  }
  
  private combineBrand(styles: StylePattern[]): StylePattern['brand'] {
    // Use the most brand-compliant style
    const bestBrand = styles.reduce((best, current) => 
      current.brand.brandCompliance > best.brand.brandCompliance ? current : best
    );
    return bestBrand.brand;
  }
  
  private combineContent(styles: StylePattern[]): StylePattern['content'] {
    // Use the most successful content style
    const bestStyle = styles.reduce((best, current) => 
      current.usage.successRate > best.usage.successRate ? current : best
    );
    return bestStyle.content;
  }
}

export const styleLearningEngine = new StyleLearningEngineImpl();
