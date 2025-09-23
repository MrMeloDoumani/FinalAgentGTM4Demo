// Template Learning Engine - Jammy learns design patterns from templates
// This system allows Jammy to study visual patterns and generate creative variations

export interface DesignPattern {
  id: string;
  name: string;
  type: 'layout' | 'color' | 'typography' | 'element' | 'composition';
  industry: string;
  confidence: number;
  learnedFrom: string;
  createdAt: string;
  usageCount: number;
}

export interface VisualTemplate {
  id: string;
  name: string;
  industry: string;
  contentType: string;
  elements: VisualElement[];
  layout: LayoutPattern;
  colors: ColorScheme;
  typography: TypographyScheme;
  composition: CompositionRules;
  source: string; // Where it was learned from
  createdAt: string;
}

export interface VisualElement {
  type: 'header' | 'content' | 'footer' | 'logo' | 'image' | 'text' | 'button' | 'icon';
  position: { x: number; y: number; width: number; height: number };
  style: {
    backgroundColor?: string;
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    borderRadius?: number;
    border?: string;
  };
  content?: string;
  importance: number; // 1-10 scale
}

export interface LayoutPattern {
  type: 'grid' | 'flex' | 'absolute' | 'flow';
  columns?: number;
  spacing: number;
  alignment: 'left' | 'center' | 'right' | 'justify';
  padding: { top: number; right: number; bottom: number; left: number };
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  success?: string;
  warning?: string;
  error?: string;
}

export interface TypographyScheme {
  primary: string;
  heading: string;
  sizes: { small: number; medium: number; large: number; xlarge: number };
  weights: { normal: number; medium: number; bold: number };
}

export interface CompositionRules {
  ruleOfThirds: boolean;
  goldenRatio: boolean;
  symmetry: 'none' | 'horizontal' | 'vertical' | 'both';
  hierarchy: string[]; // Order of importance
  whitespace: number; // 1-10 scale
}

class TemplateLearningEngine {
  private learnedPatterns: DesignPattern[] = [];
  private visualTemplates: VisualTemplate[] = [];
  private industryPreferences: Record<string, DesignPattern[]> = {};

  // Learn from a template (could be uploaded file or existing design)
  async learnFromTemplate(template: VisualTemplate): Promise<void> {
    try {
      // Store the template
      this.visualTemplates.push(template);
      
      // Extract patterns from the template
      const patterns = this.extractPatterns(template);
      
      // Add patterns to learned knowledge
      this.learnedPatterns.push(...patterns);
      
      // Update industry preferences
      this.updateIndustryPreferences(template.industry, patterns);
      
      console.log(`🎨 Learned ${patterns.length} patterns from template: ${template.name}`);
    } catch (error) {
      console.error('Error learning from template:', error);
    }
  }

  // Extract design patterns from a template
  private extractPatterns(template: VisualTemplate): DesignPattern[] {
    const patterns: DesignPattern[] = [];
    
    // Extract layout patterns
    patterns.push({
      id: `layout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${template.industry} Layout Pattern`,
      type: 'layout',
      industry: template.industry,
      confidence: 0.9,
      learnedFrom: template.source,
      createdAt: new Date().toISOString(),
      usageCount: 0
    });

    // Extract color patterns
    patterns.push({
      id: `color_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${template.industry} Color Scheme`,
      type: 'color',
      industry: template.industry,
      confidence: 0.8,
      learnedFrom: template.source,
      createdAt: new Date().toISOString(),
      usageCount: 0
    });

    // Extract typography patterns
    patterns.push({
      id: `typography_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${template.industry} Typography`,
      type: 'typography',
      industry: template.industry,
      confidence: 0.8,
      learnedFrom: template.source,
      createdAt: new Date().toISOString(),
      usageCount: 0
    });

    // Extract element patterns
    template.elements.forEach((element, index) => {
      patterns.push({
        id: `element_${Date.now()}_${index}`,
        name: `${element.type} Element Pattern`,
        type: 'element',
        industry: template.industry,
        confidence: 0.7,
        learnedFrom: template.source,
        createdAt: new Date().toISOString(),
        usageCount: 0
      });
    });

    return patterns;
  }

  // Update industry-specific preferences
  private updateIndustryPreferences(industry: string, patterns: DesignPattern[]): void {
    if (!this.industryPreferences[industry]) {
      this.industryPreferences[industry] = [];
    }
    this.industryPreferences[industry].push(...patterns);
  }

  // Get the best patterns for a specific industry and content type
  getBestPatterns(industry: string, contentType: string): DesignPattern[] {
    const industryPatterns = this.industryPreferences[industry] || [];
    
    // Filter by content type relevance and sort by confidence
    return industryPatterns
      .filter(pattern => this.isRelevantForContentType(pattern, contentType))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5); // Top 5 patterns
  }

  // Check if a pattern is relevant for a content type
  private isRelevantForContentType(pattern: DesignPattern, contentType: string): boolean {
    // Simple relevance logic - can be enhanced
    const contentTypeKeywords = {
      'brochure': ['layout', 'element', 'composition'],
      'infographic': ['layout', 'element', 'color'],
      'presentation': ['layout', 'typography', 'composition'],
      'email': ['layout', 'typography', 'element'],
      'image': ['composition', 'color', 'element']
    };

    const relevantTypes = contentTypeKeywords[contentType] || ['layout', 'color', 'typography'];
    return relevantTypes.includes(pattern.type);
  }

  // Generate a creative variation based on learned patterns
  generateCreativeVariation(
    industry: string, 
    contentType: string, 
    content: string
  ): VisualTemplate {
    const bestPatterns = this.getBestPatterns(industry, contentType);
    
    // Create a new template based on learned patterns
    const newTemplate: VisualTemplate = {
      id: `generated_${Date.now()}`,
      name: `${industry} ${contentType} - Generated`,
      industry,
      contentType,
      elements: this.generateElements(bestPatterns, content),
      layout: this.generateLayout(bestPatterns),
      colors: this.generateColorScheme(bestPatterns),
      typography: this.generateTypography(bestPatterns),
      composition: this.generateComposition(bestPatterns),
      source: 'Jammy AI Generated',
      createdAt: new Date().toISOString()
    };

    return newTemplate;
  }

  // Generate visual elements based on patterns
  private generateElements(patterns: DesignPattern[], content: string): VisualElement[] {
    const elements: VisualElement[] = [];
    
    // Header element
    elements.push({
      type: 'header',
      position: { x: 0, y: 0, width: 400, height: 60 },
      style: {
        backgroundColor: '#e30613',
        color: 'white',
        fontSize: 18,
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold'
      },
      content: 'e& (Etisalat)',
      importance: 10
    });

    // Main content area
    elements.push({
      type: 'content',
      position: { x: 20, y: 80, width: 360, height: 180 },
      style: {
        backgroundColor: 'white',
        color: '#1A1A1A',
        fontSize: 14,
        fontFamily: 'Arial, sans-serif',
        border: '2px solid #e30613',
        borderRadius: 8
      },
      content: content.substring(0, 200) + '...',
      importance: 8
    });

    // Footer element
    elements.push({
      type: 'footer',
      position: { x: 20, y: 280, width: 360, height: 20 },
      style: {
        color: '#666666',
        fontSize: 10,
        fontFamily: 'Arial, sans-serif'
      },
      content: `Generated by Jammy AI • ${new Date().toLocaleDateString()}`,
      importance: 3
    });

    return elements;
  }

  // Generate layout based on patterns
  private generateLayout(patterns: DesignPattern[]): LayoutPattern {
    return {
      type: 'absolute',
      spacing: 16,
      alignment: 'center',
      padding: { top: 20, right: 20, bottom: 20, left: 20 }
    };
  }

  // Generate color scheme based on patterns
  private generateColorScheme(patterns: DesignPattern[]): ColorScheme {
    return {
      primary: '#e30613',
      secondary: '#02D9C7',
      accent: '#FF6B35',
      background: '#FFFFFF',
      text: '#1A1A1A',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    };
  }

  // Generate typography based on patterns
  private generateTypography(patterns: DesignPattern[]): TypographyScheme {
    return {
      primary: 'Arial, sans-serif',
      heading: 'Arial, sans-serif',
      sizes: { small: 12, medium: 14, large: 16, xlarge: 20 },
      weights: { normal: 400, medium: 500, bold: 700 }
    };
  }

  // Generate composition rules based on patterns
  private generateComposition(patterns: DesignPattern[]): CompositionRules {
    return {
      ruleOfThirds: true,
      goldenRatio: false,
      symmetry: 'vertical',
      hierarchy: ['header', 'content', 'footer'],
      whitespace: 7
    };
  }

  // Get learning statistics
  getLearningStats(): {
    totalPatterns: number;
    totalTemplates: number;
    industryCoverage: string[];
    mostLearnedType: string;
  } {
    const typeCounts = this.learnedPatterns.reduce((acc, pattern) => {
      acc[pattern.type] = (acc[pattern.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostLearnedType = Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'none';

    return {
      totalPatterns: this.learnedPatterns.length,
      totalTemplates: this.visualTemplates.length,
      industryCoverage: Object.keys(this.industryPreferences),
      mostLearnedType
    };
  }

  // Initialize with some default e& templates
  initializeWithDefaultTemplates(): void {
    // Add some default e& brand templates
    const defaultTemplates: VisualTemplate[] = [
      {
        id: 'eand_brochure_template',
        name: 'e& Corporate Brochure Template',
        industry: 'corporate',
        contentType: 'brochure',
        elements: [
          {
            type: 'header',
            position: { x: 0, y: 0, width: 400, height: 60 },
            style: {
              backgroundColor: '#e30613',
              color: 'white',
              fontSize: 18,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold'
            },
            content: 'e& (Etisalat)',
            importance: 10
          }
        ],
        layout: {
          type: 'absolute',
          spacing: 16,
          alignment: 'center',
          padding: { top: 20, right: 20, bottom: 20, left: 20 }
        },
        colors: {
          primary: '#e30613',
          secondary: '#02D9C7',
          accent: '#FF6B35',
          background: '#FFFFFF',
          text: '#1A1A1A'
        },
        typography: {
          primary: 'Arial, sans-serif',
          heading: 'Arial, sans-serif',
          sizes: { small: 12, medium: 14, large: 16, xlarge: 20 },
          weights: { normal: 400, medium: 500, bold: 700 }
        },
        composition: {
          ruleOfThirds: true,
          goldenRatio: false,
          symmetry: 'vertical',
          hierarchy: ['header', 'content', 'footer'],
          whitespace: 7
        },
        source: 'e& Brand Guidelines',
        createdAt: new Date().toISOString()
      }
    ];

    // Learn from default templates
    defaultTemplates.forEach(template => {
      this.learnFromTemplate(template);
    });
  }
}

export const templateLearningEngine = new TemplateLearningEngine();
