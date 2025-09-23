// Creative Image Generator - Uses learned patterns to generate creative images
// This system generates SVG images based on Jammy's learned design patterns

import { templateLearningEngine, VisualTemplate, DesignPattern } from './template-learning-engine';

export interface GeneratedImage {
  id: string;
  url: string;
  title: string;
  industry: string;
  contentType: string;
  generatedAt: string;
  patternsUsed: string[];
  creativityScore: number;
}

class CreativeImageGenerator {
  private creativityLevel: number = 0.7; // 0-1 scale, how creative vs conservative

  // Generate a creative image based on learned patterns
  async generateCreativeImage(
    content: string,
    industry: string,
    contentType: string
  ): Promise<GeneratedImage> {
    try {
      // Get the best patterns for this industry and content type
      const patterns = templateLearningEngine.getBestPatterns(industry, contentType);
      
      // Generate a creative variation
      const template = templateLearningEngine.generateCreativeVariation(
        industry, 
        contentType, 
        content
      );

      // Create SVG based on the template
      const svg = this.createSVGFromTemplate(template, content);
      
      // Calculate creativity score
      const creativityScore = this.calculateCreativityScore(patterns, template);

      // Generate base64 data URL - simpler approach
      const base64Svg = Buffer.from(svg).toString('base64');
      const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;

      return {
        id: `creative_${Date.now()}`,
        url: dataUrl,
        title: `${industry} ${contentType} - Creative Design`,
        industry,
        contentType,
        generatedAt: new Date().toISOString(),
        patternsUsed: patterns.map(p => p.name),
        creativityScore
      };
    } catch (error) {
      console.error('Error generating creative image:', error);
      // Fallback to simple SVG
      return this.generateFallbackImage(content, industry, contentType);
    }
  }

  // Create SVG from template
  private createSVGFromTemplate(template: VisualTemplate, content: string): string {
    const { elements, colors, typography, layout } = template;
    
    // Start building SVG
    let svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">`;
    
    // Add background
    svg += `<rect width="400" height="300" fill="${colors.background}"/>`;
    
    // Add elements in order of importance
    const sortedElements = elements.sort((a, b) => b.importance - a.importance);
    
    sortedElements.forEach(element => {
      svg += this.createElementSVG(element, colors, typography);
    });
    
    // Add creative enhancements
    svg += this.addCreativeEnhancements(template, content);
    
    svg += `</svg>`;
    
    return svg;
  }

  // Create SVG for a single element
  private createElementSVG(element: any, colors: any, typography: any): string {
    const { position, style, content } = element;
    const { x, y, width, height } = position;
    
    let elementSvg = '';
    
    // Create background rectangle if needed
    if (style.backgroundColor && style.backgroundColor !== 'transparent') {
      elementSvg += `<rect x="${x}" y="${y}" width="${width}" height="${height}" `;
      elementSvg += `fill="${style.backgroundColor}"`;
      if (style.borderRadius) {
        elementSvg += ` rx="${style.borderRadius}"`;
      }
      if (style.border) {
        elementSvg += ` stroke="${style.border.split(' ')[2]}" stroke-width="${style.border.split(' ')[0]}"`;
      }
      elementSvg += `/>`;
    }
    
    // Add text content
    if (content && element.type !== 'image') {
      elementSvg += `<text x="${x + 10}" y="${y + (height / 2) + 5}" `;
      elementSvg += `font-family="${style.fontFamily || typography.primary}" `;
      elementSvg += `font-size="${style.fontSize || typography.sizes.medium}" `;
      elementSvg += `font-weight="${style.fontWeight || typography.weights.normal}" `;
      elementSvg += `fill="${style.color || colors.text}">`;
      elementSvg += this.escapeXml(content);
      elementSvg += `</text>`;
    }
    
    // Add special elements based on type
    if (element.type === 'logo') {
      elementSvg += this.createLogoElement(x, y, width, height, colors);
    } else if (element.type === 'button') {
      elementSvg += this.createButtonElement(x, y, width, height, colors, content);
    }
    
    return elementSvg;
  }

  // Create logo element
  private createLogoElement(x: number, y: number, width: number, height: number, colors: any): string {
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const radius = Math.min(width, height) / 4;
    
    return `
      <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="${colors.primary}"/>
      <text x="${centerX - 10}" y="${centerY + 5}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white">e&</text>
    `;
  }

  // Create button element
  private createButtonElement(x: number, y: number, width: number, height: number, colors: any, content: string): string {
    return `
      <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${colors.primary}" rx="4"/>
      <text x="${x + width/2}" y="${y + height/2 + 5}" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">${this.escapeXml(content)}</text>
    `;
  }

  // Add creative enhancements
  private addCreativeEnhancements(template: VisualTemplate, content: string): string {
    let enhancements = '';
    
    // Add subtle patterns or decorations
    if (template.composition.ruleOfThirds) {
      // Add rule of thirds grid lines (subtle)
      enhancements += `<line x1="133" y1="0" x2="133" y2="300" stroke="#e0e0e0" stroke-width="0.5" opacity="0.3"/>`;
      enhancements += `<line x1="266" y1="0" x2="266" y2="300" stroke="#e0e0e0" stroke-width="0.5" opacity="0.3"/>`;
      enhancements += `<line x1="0" y1="100" x2="400" y2="100" stroke="#e0e0e0" stroke-width="0.5" opacity="0.3"/>`;
      enhancements += `<line x1="0" y1="200" x2="400" y2="200" stroke="#e0e0e0" stroke-width="0.5" opacity="0.3"/>`;
    }
    
    // Add industry-specific decorative elements
    if (template.industry === 'retail') {
      enhancements += `<circle cx="350" cy="50" r="3" fill="${template.colors.accent}" opacity="0.6"/>`;
      enhancements += `<circle cx="370" cy="70" r="2" fill="${template.colors.secondary}" opacity="0.4"/>`;
    } else if (template.industry === 'tech_telecom') {
      enhancements += `<rect x="350" y="40" width="20" height="20" fill="${template.colors.primary}" opacity="0.2" rx="2"/>`;
      enhancements += `<rect x="360" y="50" width="10" height="10" fill="${template.colors.secondary}" opacity="0.3" rx="1"/>`;
    }
    
    return enhancements;
  }

  // Calculate creativity score
  private calculateCreativityScore(patterns: DesignPattern[], template: VisualTemplate): number {
    let score = 0.5; // Base score
    
    // More patterns = more creative
    score += Math.min(patterns.length * 0.1, 0.3);
    
    // More elements = more complex
    score += Math.min(template.elements.length * 0.05, 0.2);
    
    // Industry-specific creativity
    if (template.industry === 'retail') score += 0.1;
    if (template.industry === 'tech_telecom') score += 0.15;
    
    return Math.min(score, 1.0);
  }

  // Generate fallback image if creative generation fails
  private generateFallbackImage(content: string, industry: string, contentType: string): GeneratedImage {
    const fallbackSvg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#FFFFFF"/>
      <rect x="0" y="0" width="400" height="60" fill="#e30613"/>
      <text x="20" y="35" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">e& (Etisalat)</text>
      <text x="20" y="50" font-family="Arial, sans-serif" font-size="12" fill="white">Business Solutions</text>
      <rect x="20" y="80" width="360" height="180" fill="#FFFFFF" stroke="#e30613" stroke-width="2" rx="8"/>
      <text x="40" y="110" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1A1A1A">${industry} ${contentType}</text>
      <text x="40" y="130" font-family="Arial, sans-serif" font-size="14" fill="#666666">${this.escapeXml(content.substring(0, 100))}...</text>
      <rect x="40" y="170" width="80" height="25" fill="#e30613" rx="4"/>
      <text x="50" y="185" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white">${industry.toUpperCase()}</text>
      <circle cx="320" cy="200" r="25" fill="#e30613"/>
      <text x="310" y="205" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white">e&</text>
      <text x="20" y="280" font-family="Arial, sans-serif" font-size="10" fill="#666666">Generated by Jammy AI • ${new Date().toLocaleDateString()}</text>
    </svg>`;
    
    const base64Svg = Buffer.from(fallbackSvg).toString('base64');
    const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;
    
    return {
      id: `fallback_${Date.now()}`,
      url: dataUrl,
      title: `${industry} ${contentType} - Fallback`,
      industry,
      contentType,
      generatedAt: new Date().toISOString(),
      patternsUsed: ['fallback'],
      creativityScore: 0.3
    };
  }

  // Escape XML special characters
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Set creativity level
  setCreativityLevel(level: number): void {
    this.creativityLevel = Math.max(0, Math.min(1, level));
  }

  // Get current creativity level
  getCreativityLevel(): number {
    return this.creativityLevel;
  }
}

export const creativeImageGenerator = new CreativeImageGenerator();
