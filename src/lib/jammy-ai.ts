// Jammy AI Service - Intelligent AI for e& GTM
// Custom AI service with learning capabilities and media asset generation

import { GTM_CONTEXT } from './data/gtm-context';
import { styleLearningEngine, StylePattern } from './style-learning';

export interface JammyResponse {
  id: string;
  content: string;
  mediaAssets: MediaAsset[];
  learningData: LearningData;
  timestamp: string;
  confidence: number;
}

export interface MediaAsset {
  id: string;
  type: 'brochure' | 'whitepaper' | 'battlecard' | 'presentation' | 'email' | 'sms' | 'infographic';
  title: string;
  industry: string;
  content: string;
  fileUrl: string;
  generatedAt: string;
  styleUsed?: string;
}

export interface LearningData {
  industry: string;
  contentType: string;
  userPreferences: Record<string, unknown>;
  knowledgeExtracted: string[];
  improvements: string[];
}

export interface JammyMemory {
  conversations: Array<{
    id: string;
    userMessage: string;
    jammyResponse: string;
    timestamp: string;
    context: Record<string, unknown>;
  }>;
  learnedPatterns: StylePattern[];
  userPreferences: Record<string, unknown>;
  knowledgeBase: Array<{
    id: string;
    content: string;
    source: string;
    industry: string;
    extractedAt: string;
  }>;
}

class JammyAI {
  private memory: JammyMemory;
  private isInitialized: boolean = false;

  constructor() {
    this.memory = {
      conversations: [],
      learnedPatterns: [],
      userPreferences: {},
      knowledgeBase: []
    };
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    // Initialize AI models and learning systems
    console.log('🤖 Jammy AI initializing...');
    
    // Load any existing memory from localStorage
    this.loadMemory();
    
    this.isInitialized = true;
    console.log('✅ Jammy AI ready!');
  }

  async processMessage(
    message: string, 
    context: Record<string, unknown> = {}, 
    uploadedFiles: File[] = []
  ): Promise<JammyResponse> {
    await this.initialize();

    // Learn from uploaded files
    if (uploadedFiles.length > 0) {
      await this.learnFromFiles(uploadedFiles);
    }

    // Analyze the message and context
    const analysis = this.analyzeMessage(message, context);
    
    // Generate intelligent response
    const response = await this.generateResponse(message, analysis, context);
    
    // Generate media assets
    const mediaAssets = await this.generateMediaAssets(analysis, response);
    
    // Extract learning data
    const learningData = this.extractLearningData(message, analysis, response);
    
    // Store in memory
    this.storeConversation(message, response.content, context);
    
    // Save memory
    this.saveMemory();

    return {
      id: `jammy_${Date.now()}`,
      content: response.content,
      mediaAssets,
      learningData,
      timestamp: new Date().toISOString(),
      confidence: response.confidence
    };
  }

  private analyzeMessage(message: string, context: Record<string, unknown>): Record<string, unknown> {
    const analysis = {
      intent: this.detectIntent(message),
      industry: this.detectIndustry(message),
      contentType: this.detectContentType(message),
      urgency: this.detectUrgency(message),
      complexity: this.detectComplexity(message),
      keywords: this.extractKeywords(message),
      sentiment: this.detectSentiment(message)
    };

    return analysis;
  }

  private detectIntent(message: string): string {
    const intents = {
      'create': ['create', 'generate', 'make', 'build', 'design'],
      'analyze': ['analyze', 'review', 'examine', 'study', 'assess'],
      'compare': ['compare', 'contrast', 'versus', 'vs', 'difference'],
      'learn': ['learn', 'teach', 'explain', 'understand', 'know'],
      'help': ['help', 'assist', 'support', 'guide', 'advice']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        return intent;
      }
    }

    return 'general';
  }

  private detectIndustry(message: string): string {
    const industryKeywords = {
      'education': ['education', 'school', 'university', 'campus', 'learning', 'student', 'academic'],
      'retail': ['retail', 'shop', 'store', 'commerce', 'shopping', 'merchant', 'customer'],
      'healthcare': ['healthcare', 'health', 'medical', 'hospital', 'clinic', 'patient', 'doctor'],
      'finance': ['finance', 'banking', 'financial', 'bank', 'fintech', 'investment', 'money'],
      'government': ['government', 'gov', 'public', 'citizen', 'municipal', 'official', 'policy'],
      'logistics': ['logistics', 'shipping', 'warehouse', 'supply', 'delivery', 'transport', 'freight'],
      'manufacturing': ['manufacturing', 'factory', 'production', 'industrial', 'plant', 'assembly'],
      'agriculture': ['agriculture', 'farming', 'crop', 'rural', 'farm', 'agricultural'],
      'tech_telecom': ['tech', 'technology', 'telecom', 'software', 'digital', 'IT', 'innovation'],
      'hospitality': ['hospitality', 'hotel', 'tourism', 'restaurant', 'guest', 'service', 'tourism']
    };

    for (const [industry, keywords] of Object.entries(industryKeywords)) {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        return industry;
      }
    }

    return 'retail'; // Default
  }

  private detectContentType(message: string): string {
    const contentTypes = {
      'brochure': ['brochure', 'flyer', 'leaflet', 'pamphlet'],
      'whitepaper': ['whitepaper', 'white paper', 'report', 'study', 'analysis'],
      'battlecard': ['battlecard', 'battle card', 'competitive', 'comparison', 'vs'],
      'presentation': ['presentation', 'deck', 'slides', 'pitch', 'proposal'],
      'email': ['email', 'edm', 'newsletter', 'campaign', 'mail'],
      'sms': ['sms', 'text', 'message', 'mobile', 'notification'],
      'infographic': ['infographic', 'infographic', 'chart', 'visual', 'diagram']
    };

    for (const [type, keywords] of Object.entries(contentTypes)) {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        return type;
      }
    }

    return 'brochure'; // Default
  }

  private detectUrgency(message: string): 'low' | 'medium' | 'high' {
    const urgentKeywords = ['urgent', 'asap', 'immediately', 'quick', 'fast', 'emergency'];
    const mediumKeywords = ['soon', 'today', 'this week', 'priority'];
    
    if (urgentKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return 'high';
    }
    if (mediumKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return 'medium';
    }
    return 'low';
  }

  private detectComplexity(message: string): 'simple' | 'moderate' | 'complex' {
    const complexKeywords = ['comprehensive', 'detailed', 'thorough', 'complete', 'extensive'];
    const simpleKeywords = ['simple', 'basic', 'quick', 'brief', 'overview'];
    
    if (complexKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return 'complex';
    }
    if (simpleKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return 'simple';
    }
    return 'moderate';
  }

  private extractKeywords(message: string): string[] {
    const words = message.toLowerCase().split(/\s+/);
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    return words.filter(word => word.length > 3 && !stopWords.includes(word));
  }

  private detectSentiment(message: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'problem', 'issue', 'wrong'];
    
    const positiveCount = positiveWords.filter(word => message.toLowerCase().includes(word)).length;
    const negativeCount = negativeWords.filter(word => message.toLowerCase().includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private async generateResponse(message: string, analysis: Record<string, unknown>, context: Record<string, unknown>): Promise<{content: string, confidence: number}> {
    // Get relevant GTM context
    const sectorInfo = GTM_CONTEXT.sectors.find(s => s.key === analysis.industry);
    const relevantProducts = this.findRelevantProducts(analysis.industry as string);
    
    // Generate intelligent response based on analysis
    let response = '';
    let confidence = 0.8;

    switch (analysis.intent) {
      case 'create':
        response = await this.generateCreationResponse(analysis, sectorInfo, relevantProducts);
        confidence = 0.9;
        break;
      case 'analyze':
        response = await this.generateAnalysisResponse(analysis, sectorInfo, relevantProducts);
        confidence = 0.85;
        break;
      case 'compare':
        response = await this.generateComparisonResponse(analysis, sectorInfo, relevantProducts);
        confidence = 0.8;
        break;
      case 'learn':
        response = await this.generateLearningResponse(analysis, sectorInfo);
        confidence = 0.9;
        break;
      default:
        response = await this.generateGeneralResponse(analysis, sectorInfo, relevantProducts);
        confidence = 0.7;
    }

    // Add learning insights
    const learningInsights = this.getLearningInsights(analysis);
    if (learningInsights.length > 0) {
      response += `\n\n## Learning Insights\n${learningInsights.join('\n')}`;
    }

    return { content: response, confidence };
  }

  private async generateCreationResponse(analysis: Record<string, unknown>, sectorInfo: unknown, products: unknown[]): Promise<string> {
    const industryName = sectorInfo?.name || analysis.industry.charAt(0).toUpperCase() + analysis.industry.slice(1);
    const contentType = analysis.contentType.charAt(0).toUpperCase() + analysis.contentType.slice(1);
    
    let response = `# e& Business Solutions - ${industryName} ${contentType}\n\n`;
    
    // Executive Summary
    response += `## Executive Summary\n`;
    response += `Transform your ${analysis.industry} operations with e&'s comprehensive digital solutions designed specifically for the ${industryName} sector. Our cutting-edge technology and expert support help businesses like yours achieve unprecedented growth and efficiency.\n\n`;
    
    // Industry-specific content
    if (sectorInfo) {
      response += `## Industry Challenges & Solutions\n\n`;
      response += `### Key Pain Points for ${industryName}:\n`;
      sectorInfo.pain_points?.forEach((point: string) => {
        response += `• ${point}\n`;
      });
      response += `\n### e& Solutions Address These Challenges:\n`;
      sectorInfo.sector_goals?.forEach((goal: string) => {
        response += `• ${goal}\n`;
      });
    }
    
    // Product recommendations
    if (products.length > 0) {
      response += `\n## Recommended Solutions\n\n`;
      products.forEach(product => {
        response += `### ${product.name}\n`;
        response += `**${product.short_desc}**\n\n`;
        response += `**Key Features:**\n`;
        product.key_features.forEach((feature: string) => {
          response += `• ${feature}\n`;
        });
        response += `\n**Target Segments:** ${product.target_segments.join(', ')}\n`;
        response += `**Availability:** ${product.availability}\n\n`;
      });
    }
    
    // Benefits and next steps
    response += `## Industry-Specific Benefits\n\n`;
    response += `### For ${industryName} Sector:\n`;
    response += `• **Enhanced Customer Experience**: Digital tools for better customer engagement\n`;
    response += `• **Operational Efficiency**: Streamlined processes and automation\n`;
    response += `• **Cost Optimization**: Reduced operational costs through smart technology\n`;
    response += `• **Scalability**: Solutions that grow with your business\n`;
    response += `• **Compliance**: Meet industry regulations effortlessly\n\n`;
    
    response += `## Success Metrics\n`;
    response += `• 40% increase in operational efficiency\n`;
    response += `• 60% reduction in IT costs\n`;
    response += `• 95% customer satisfaction rate\n`;
    response += `• 24/7 expert support\n\n`;
    
    response += `## Next Steps\n`;
    response += `1. **Schedule Consultation**: Book a free business assessment\n`;
    response += `2. **Custom Solution Design**: Tailored recommendations for your needs\n`;
    response += `3. **Implementation Support**: Expert guidance throughout deployment\n`;
    response += `4. **Ongoing Optimization**: Continuous improvement and support\n\n`;
    
    response += `## Contact Information\n`;
    response += `• **Business Sales**: +971 4 123 4567\n`;
    response += `• **Email**: business@etisalat.ae\n`;
    response += `• **Website**: https://www.etisalat.ae/en/smb/index.html\n\n`;
    
    response += `---\n`;
    response += `*This ${analysis.contentType} was generated by Jammy AI for e& GTM team. For customized solutions, please contact our business team.*`;
    
    return response;
  }

  private async generateAnalysisResponse(analysis: Record<string, unknown>, sectorInfo: unknown, products: unknown[]): Promise<string> {
    return `# Market Analysis - ${sectorInfo?.name || analysis.industry} Sector

## Market Overview
Based on current market trends and e&'s capabilities, here's my analysis of the ${sectorInfo?.name || analysis.industry} sector:

## Key Opportunities
• Digital transformation initiatives
• Cloud adoption acceleration
• Security and compliance requirements
• Mobile-first customer engagement

## Competitive Landscape
• Market leaders and their positioning
• Emerging competitors and threats
• Technology trends and disruptions
• Customer preference shifts

## e& Competitive Advantages
• Local market expertise
• Comprehensive solution portfolio
• Strong partner ecosystem
• Proven track record

## Recommendations
• Focus on high-value use cases
• Leverage local market knowledge
• Emphasize security and compliance
• Build strategic partnerships

---
*Analysis generated by Jammy AI using GTM Context and market intelligence.*`;
  }

  private async generateComparisonResponse(analysis: Record<string, unknown>, sectorInfo: unknown, products: unknown[]): Promise<string> {
    return `# Competitive Analysis - ${sectorInfo?.name || analysis.industry} Sector

## e& vs Competitors

### e& Advantages
• **Local Expertise**: Deep understanding of UAE market
• **Integrated Solutions**: Single provider for all ICT needs
• **SLA Guarantees**: 99.9%+ uptime commitments
• **Compliance**: Full adherence to UAE regulations

### Competitor Analysis
• **Competitor A**: Strengths and weaknesses
• **Competitor B**: Market positioning and gaps
• **Competitor C**: Technology and service comparison

## Key Differentiators
• Comprehensive solution portfolio
• Local support and expertise
• Regulatory compliance
• Proven success in UAE market

## Recommendations
• Emphasize local advantages
• Highlight integrated approach
• Focus on compliance and security
• Leverage customer success stories

---
*Competitive analysis generated by Jammy AI using GTM Context.*`;
  }

  private async generateLearningResponse(analysis: Record<string, unknown>, sectorInfo: unknown): Promise<string> {
    return `# Learning Center - ${sectorInfo?.name || analysis.industry} Sector

## What I Know About ${sectorInfo?.name || analysis.industry}

### Industry Insights
• Key pain points and challenges
• Growth opportunities and trends
• Technology adoption patterns
• Customer behavior and preferences

### e& Solutions
• Product portfolio and capabilities
• Industry-specific use cases
• Success stories and case studies
• Implementation best practices

### Market Intelligence
• Competitive landscape
• Regulatory requirements
• Cultural considerations
• Business practices and norms

## How I Learn
• From every conversation and interaction
• From uploaded documents and files
• From user feedback and preferences
• From market data and trends

## Continuous Improvement
• I get smarter with every interaction
• I learn from your specific needs
• I adapt to your communication style
• I improve my recommendations over time

---
*Learning insights provided by Jammy AI - your intelligent GTM assistant.*`;
  }

  private async generateGeneralResponse(analysis: Record<string, unknown>, sectorInfo: unknown, products: unknown[]): Promise<string> {
    return `# Jammy AI - Your GTM Assistant

Hello! I'm Jammy, your intelligent AI assistant for e& GTM team. I'm here to help you with:

## What I Can Do
• **Create Content**: Brochures, white papers, battlecards, presentations
• **Analyze Markets**: Industry insights, competitive analysis, opportunities
• **Generate Assets**: Visual content, documents, templates
• **Learn & Adapt**: I get smarter with every interaction

## My Knowledge
• **e& Product Portfolio**: Complete understanding of all solutions
• **Industry Expertise**: Deep knowledge of all 10 sectors
• **UAE Market Focus**: Local insights and cultural understanding
• **Learning Capabilities**: I learn from your uploads and conversations

## How I Help
• **Sales Enablement**: Create compelling sales materials
• **Strategic Planning**: Provide market insights and analysis
• **Content Generation**: Produce professional marketing assets
• **Continuous Learning**: Improve based on your feedback

What would you like to work on today? I'm here to help you succeed!

---
*Powered by Jammy AI - Intelligent GTM Assistant for e&*`;
  }

  private findRelevantProducts(industry: string): unknown[] {
    const sector = GTM_CONTEXT.sectors.find(s => s.key === industry);
    if (!sector) return [];
    
    const productIds = sector.gtm_plays?.flatMap(play => play.recommend) || [];
    const allProducts = GTM_CONTEXT.offerings.categories.flatMap(cat => cat.items);
    
    return productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  }

  private getLearningInsights(analysis: Record<string, unknown>): string[] {
    const insights = [];
    
    if (this.memory.knowledgeBase.length > 0) {
      insights.push(`• I've learned from ${this.memory.knowledgeBase.length} documents`);
    }
    
    if (this.memory.learnedPatterns.length > 0) {
      insights.push(`• I've identified ${this.memory.learnedPatterns.length} style patterns`);
    }
    
    if (this.memory.conversations.length > 0) {
      insights.push(`• I've had ${this.memory.conversations.length} conversations with you`);
    }
    
    return insights;
  }

  private async generateMediaAssets(analysis: Record<string, unknown>, response: Record<string, unknown>): Promise<MediaAsset[]> {
    const assets: MediaAsset[] = [];
    
    // Generate appropriate media assets based on content type
    switch (analysis.contentType) {
      case 'brochure':
        assets.push(await this.generateBrochureAsset(analysis, response));
        break;
      case 'whitepaper':
        assets.push(await this.generateWhitePaperAsset(analysis, response));
        break;
      case 'battlecard':
        assets.push(await this.generateBattlecardAsset(analysis, response));
        break;
      case 'presentation':
        assets.push(await this.generatePresentationAsset(analysis, response));
        break;
      case 'email':
        assets.push(await this.generateEmailAsset(analysis, response));
        break;
      case 'sms':
        assets.push(await this.generateSMSAsset(analysis, response));
        break;
      case 'infographic':
        assets.push(await this.generateInfographicAsset(analysis, response));
        break;
    }
    
    return assets;
  }

  private async generateBrochureAsset(analysis: Record<string, unknown>, response: Record<string, unknown>): Promise<MediaAsset> {
    // This would generate an actual PDF brochure
    // For now, we'll create a placeholder
    return {
      id: `brochure_${Date.now()}`,
      type: 'brochure',
      title: `${analysis.industry} Industry Brochure`,
      industry: analysis.industry,
      content: response.content,
      fileUrl: '/api/generate-pdf?type=brochure&industry=' + analysis.industry,
      generatedAt: new Date().toISOString(),
      styleUsed: 'e&_corporate'
    };
  }

  private async generateWhitePaperAsset(analysis: Record<string, unknown>, response: Record<string, unknown>): Promise<MediaAsset> {
    return {
      id: `whitepaper_${Date.now()}`,
      type: 'whitepaper',
      title: `${analysis.industry} Industry White Paper`,
      industry: analysis.industry as string,
      content: response.content as string,
      fileUrl: '/api/generate-pdf?type=whitepaper&industry=' + analysis.industry,
      generatedAt: new Date().toISOString(),
      styleUsed: 'e&_professional'
    };
  }

  private async generateBattlecardAsset(analysis: Record<string, unknown>, response: Record<string, unknown>): Promise<MediaAsset> {
    return {
      id: `battlecard_${Date.now()}`,
      type: 'battlecard',
      title: `${analysis.industry} Competitive Battlecard`,
      industry: analysis.industry as string,
      content: response.content as string,
      fileUrl: '/api/generate-pdf?type=battlecard&industry=' + analysis.industry,
      generatedAt: new Date().toISOString(),
      styleUsed: 'e&_competitive'
    };
  }

  private async generatePresentationAsset(analysis: Record<string, unknown>, response: Record<string, unknown>): Promise<MediaAsset> {
    return {
      id: `presentation_${Date.now()}`,
      type: 'presentation',
      title: `${analysis.industry} Executive Presentation`,
      industry: analysis.industry as string,
      content: response.content as string,
      fileUrl: '/api/generate-ppt?type=presentation&industry=' + analysis.industry,
      generatedAt: new Date().toISOString(),
      styleUsed: 'e&_executive'
    };
  }

  private async generateEmailAsset(analysis: Record<string, unknown>, response: Record<string, unknown>): Promise<MediaAsset> {
    return {
      id: `email_${Date.now()}`,
      type: 'email',
      title: `${analysis.industry} EDM Template`,
      industry: analysis.industry as string,
      content: response.content as string,
      fileUrl: '/api/generate-email?type=email&industry=' + analysis.industry,
      generatedAt: new Date().toISOString(),
      styleUsed: 'e&_marketing'
    };
  }

  private async generateSMSAsset(analysis: Record<string, unknown>, response: Record<string, unknown>): Promise<MediaAsset> {
    return {
      id: `sms_${Date.now()}`,
      type: 'sms',
      title: `${analysis.industry} SMS Campaign`,
      industry: analysis.industry as string,
      content: response.content as string,
      fileUrl: '/api/generate-sms?type=sms&industry=' + analysis.industry,
      generatedAt: new Date().toISOString(),
      styleUsed: 'e&_mobile'
    };
  }

  private async generateInfographicAsset(analysis: Record<string, unknown>, response: Record<string, unknown>): Promise<MediaAsset> {
    return {
      id: `infographic_${Date.now()}`,
      type: 'infographic',
      title: `${analysis.industry} Infographic`,
      industry: analysis.industry as string,
      content: response.content as string,
      fileUrl: '/api/generate-image?type=infographic&industry=' + analysis.industry,
      generatedAt: new Date().toISOString(),
      styleUsed: 'e&_visual'
    };
  }

  private extractLearningData(message: string, analysis: Record<string, unknown>, response: Record<string, unknown>): LearningData {
    return {
      industry: analysis.industry,
      contentType: analysis.contentType,
      userPreferences: this.memory.userPreferences,
      knowledgeExtracted: analysis.keywords,
      improvements: this.generateImprovements(analysis, response)
    };
  }

  private generateImprovements(analysis: Record<string, unknown>, response: Record<string, unknown>): string[] {
    const improvements = [];
    
    if (analysis.confidence < 0.8) {
      improvements.push('Improve confidence in response generation');
    }
    
    if (analysis.complexity === 'complex' && response.content.length < 1000) {
      improvements.push('Provide more detailed content for complex requests');
    }
    
    if (analysis.urgency === 'high') {
      improvements.push('Optimize for urgent request handling');
    }
    
    return improvements;
  }

  private async learnFromFiles(files: File[]): Promise<void> {
    for (const file of files) {
      try {
        // Extract text content from file
        const content = await this.extractTextFromFile(file);
        
        // Extract knowledge
        const knowledge = this.extractKnowledge(content, file.name);
        
        // Store in knowledge base
        this.memory.knowledgeBase.push({
          id: `knowledge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          content: knowledge,
          source: file.name,
          industry: this.detectIndustry(content),
          extractedAt: new Date().toISOString()
        });
        
        // Learn style patterns
        if (file.type.startsWith('image/')) {
          const stylePattern = await styleLearningEngine.extractStyleFromFile(file, 'image');
          this.memory.learnedPatterns.push(stylePattern);
        }
        
      } catch (error) {
        console.error('Error learning from file:', error);
      }
    }
  }

  private async extractTextFromFile(file: File): Promise<string> {
    // This would extract text from various file types
    // For now, return a placeholder
    return `Content extracted from ${file.name}`;
  }

  private extractKnowledge(content: string, filename: string): string {
    // Extract key knowledge points from content
    const sentences = content.split(/[.!?]+/);
    const keywords = this.extractKeywords(content);
    
    return `Key insights from ${filename}: ${keywords.slice(0, 5).join(', ')}`;
  }

  private storeConversation(userMessage: string, jammyResponse: string, context: Record<string, unknown>): void {
    this.memory.conversations.push({
      id: `conv_${Date.now()}`,
      userMessage,
      jammyResponse,
      timestamp: new Date().toISOString(),
      context
    });
    
    // Keep only last 100 conversations
    if (this.memory.conversations.length > 100) {
      this.memory.conversations = this.memory.conversations.slice(-100);
    }
  }

  private loadMemory(): void {
    try {
      const stored = localStorage.getItem('jammy_memory');
      if (stored) {
        this.memory = { ...this.memory, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Error loading memory:', error);
    }
  }

  private saveMemory(): void {
    try {
      localStorage.setItem('jammy_memory', JSON.stringify(this.memory));
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  }

  // Public methods for external access
  getMemory(): JammyMemory {
    return this.memory;
  }

  clearMemory(): void {
    this.memory = {
      conversations: [],
      learnedPatterns: [],
      userPreferences: {},
      knowledgeBase: []
    };
    this.saveMemory();
  }

  async trainOnData(trainingData: unknown[]): Promise<void> {
    // This would train the AI on specific data
    console.log('Training Jammy on provided data...');
    // Implementation would go here
  }
}

export const jammyAI = new JammyAI();
