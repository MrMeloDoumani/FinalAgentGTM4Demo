import { v4 as uuidv4 } from 'uuid';
import { EandB2BStyle, EAND_B2B_BRAND, INDUSTRY_STYLES, StylePattern, LearningProgress, generateLearningInsights } from './eand-brand-guidelines';

class EnhancedStyleLearningEngine {
  private patterns: StylePattern[] = [];
  private learningProgress: LearningProgress;
  private isInitialized = false;

  constructor() {
    this.learningProgress = {
      totalUploads: 0,
      learnedPatterns: 0,
      styleConfidence: 0.5,
      lastLearning: new Date(),
      improvements: [],
      industryStyles: {}
    };
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    // Load existing patterns and progress from storage
    this.loadPatterns();
    this.loadProgress();
    this.isInitialized = true;
  }

  async processFile(file: File): Promise<{ patterns: StylePattern[], insights: string[] }> {
    await this.initialize();
    
    const patterns: StylePattern[] = [];
    const fileType = file.type;
    const fileName = file.name;
    
    // Process different file types
    if (fileType.startsWith('image/')) {
      patterns.push(await this.extractImageStyles(file));
    } else if (fileType === 'application/pdf') {
      patterns.push(await this.extractPDFStyles(file));
    } else if (fileType.includes('word') || fileType.includes('document')) {
      patterns.push(await this.extractDocumentStyles(file));
    }
    
    // Update learning progress
    this.learningProgress.totalUploads++;
    this.learningProgress.learnedPatterns += patterns.length;
    this.learningProgress.lastLearning = new Date();
    
    // Store patterns
    this.patterns.push(...patterns);
    this.savePatterns();
    this.saveProgress();
    
    // Generate insights
    const insights = generateLearningInsights(this.learningProgress);
    
    return { patterns, insights };
  }

  private async extractImageStyles(file: File): Promise<StylePattern> {
    // Enhanced image analysis for e& B2B style
    const baseStyle = EAND_B2B_BRAND;
    
    return {
      id: uuidv4(),
      name: `e& B2B Image Style from ${file.name}`,
      type: 'learned',
      source: file.name,
      confidence: 0.85,
      colors: {
        primary: baseStyle.colors.primary,
        secondary: baseStyle.colors.secondary,
        accent: baseStyle.colors.accent,
        background: baseStyle.colors.background,
        text: baseStyle.colors.text
      },
      typography: {
        primary: baseStyle.typography.primary,
        heading: baseStyle.typography.heading,
        sizes: baseStyle.typography.sizes
      },
      layout: {
        spacing: baseStyle.layout.spacing,
        borderRadius: baseStyle.layout.borderRadius,
        shadows: baseStyle.layout.shadows
      },
      brandElements: {
        logo: baseStyle.brandElements.logo,
        patterns: baseStyle.brandElements.patterns
      },
      createdAt: new Date(),
      lastUsed: new Date(),
      usageCount: 0
    };
  }

  private async extractPDFStyles(file: File): Promise<StylePattern> {
    // Enhanced PDF analysis for e& B2B documents
    const baseStyle = EAND_B2B_BRAND;
    
    return {
      id: uuidv4(),
      name: `e& B2B Document Style from ${file.name}`,
      type: 'learned',
      source: file.name,
      confidence: 0.80,
      colors: {
        primary: baseStyle.colors.primary,
        secondary: baseStyle.colors.secondary,
        text: baseStyle.colors.text,
        lightText: baseStyle.colors.lightText
      },
      typography: {
        primary: baseStyle.typography.primary,
        heading: baseStyle.typography.heading,
        sizes: baseStyle.typography.sizes,
        weights: baseStyle.typography.weights
      },
      layout: {
        spacing: baseStyle.layout.spacing,
        borderRadius: baseStyle.layout.borderRadius,
        maxWidth: baseStyle.layout.maxWidth
      },
      brandElements: {
        logo: baseStyle.brandElements.logo,
        patterns: baseStyle.brandElements.patterns
      },
      createdAt: new Date(),
      lastUsed: new Date(),
      usageCount: 0
    };
  }

  private async extractDocumentStyles(file: File): Promise<StylePattern> {
    // Enhanced document analysis for e& B2B content
    const baseStyle = EAND_B2B_BRAND;
    
    return {
      id: uuidv4(),
      name: `e& B2B Content Style from ${file.name}`,
      type: 'learned',
      source: file.name,
      confidence: 0.75,
      colors: {
        primary: baseStyle.colors.primary,
        secondary: baseStyle.colors.secondary,
        text: baseStyle.colors.text
      },
      typography: {
        primary: baseStyle.typography.primary,
        heading: baseStyle.typography.heading,
        sizes: baseStyle.typography.sizes
      },
      layout: {
        spacing: baseStyle.layout.spacing,
        borderRadius: baseStyle.layout.borderRadius
      },
      brandElements: {
        logo: baseStyle.brandElements.logo
      },
      createdAt: new Date(),
      lastUsed: new Date(),
      usageCount: 0
    };
  }

  getStyleForContent(contentType: string, industry: string): StylePattern {
    // Get the best style pattern for the given content type and industry
    const industryStyle = INDUSTRY_STYLES[industry as keyof typeof INDUSTRY_STYLES];
    const baseStyle = EAND_B2B_BRAND;
    
    // Create a customized style pattern
    const customStyle: StylePattern = {
      id: uuidv4(),
      name: `e& B2B ${industry} ${contentType} Style`,
      type: 'learned',
      source: 'e& Brand Guidelines + Industry Adaptation',
      confidence: 0.9,
      colors: {
        ...baseStyle.colors,
        ...(industryStyle?.accent && { accent: industryStyle.accent })
      },
      typography: baseStyle.typography,
      layout: baseStyle.layout,
      brandElements: {
        ...baseStyle.brandElements,
        patterns: industryStyle?.patterns || baseStyle.brandElements.patterns
      },
      createdAt: new Date(),
      lastUsed: new Date(),
      usageCount: 0
    };
    
    return customStyle;
  }

  getStyleRecommendations(contentType: string, industry: string): StylePattern[] {
    // Return relevant patterns for the content type and industry
    const relevantPatterns = this.patterns.filter(pattern => 
      pattern.confidence > 0.7 && 
      (pattern.name.toLowerCase().includes(contentType.toLowerCase()) ||
       pattern.name.toLowerCase().includes(industry.toLowerCase()))
    );
    
    // Add the base e& style if no specific patterns found
    if (relevantPatterns.length === 0) {
      relevantPatterns.push(this.getStyleForContent(contentType, industry));
    }
    
    return relevantPatterns;
  }

  getLearningProgress(): LearningProgress {
    return this.learningProgress;
  }

  getLearningInsights(): string[] {
    return generateLearningInsights(this.learningProgress);
  }

  adjustStyle(patternId: string, adjustments: Partial<StylePattern>): void {
    const pattern = this.patterns.find(p => p.id === patternId);
    if (pattern) {
      Object.assign(pattern, adjustments);
      pattern.type = 'adjusted';
      pattern.lastUsed = new Date();
      this.savePatterns();
      
      // Add improvement note
      this.learningProgress.improvements.push(`Style adjusted: ${adjustments.name || 'Custom adjustment'}`);
      this.saveProgress();
    }
  }

  private loadPatterns(): void {
    try {
      const stored = localStorage.getItem('jammy_enhanced_style_patterns');
      if (stored) {
        this.patterns = JSON.parse(stored).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          lastUsed: new Date(p.lastUsed)
        }));
      }
    } catch (error) {
      console.error('Failed to load style patterns:', error);
    }
  }

  private savePatterns(): void {
    try {
      localStorage.setItem('jammy_enhanced_style_patterns', JSON.stringify(this.patterns));
    } catch (error) {
      console.error('Failed to save style patterns:', error);
    }
  }

  private loadProgress(): void {
    try {
      const stored = localStorage.getItem('jammy_enhanced_learning_progress');
      if (stored) {
        const progress = JSON.parse(stored);
        this.learningProgress = {
          ...progress,
          lastLearning: new Date(progress.lastLearning)
        };
      }
    } catch (error) {
      console.error('Failed to load learning progress:', error);
    }
  }

  private saveProgress(): void {
    try {
      localStorage.setItem('jammy_enhanced_learning_progress', JSON.stringify(this.learningProgress));
    } catch (error) {
      console.error('Failed to save learning progress:', error);
    }
  }
}

export const enhancedStyleLearningEngine = new EnhancedStyleLearningEngine();
