// Jammy AI Service - Intelligent AI for e& GTM
// Custom AI service with learning capabilities and media asset generation

import { GTM_CONTEXT } from './data/gtm-context';
import { styleLearningEngine, StylePattern } from './style-learning';
import { enhancedStyleLearningEngine } from './enhanced-style-learning';
import { simpleImageGenerator } from './simple-image-generator';
import { templateLearningEngine } from './template-learning-engine';
import { chinchillaImageAI, ChinchillaRequest } from './chinchilla-image-ai';
import { jammyIntelligenceEngine } from './jammy-intelligence-engine';
import { chinchillaVisualIntelligence, VisualSpecification } from './chinchilla-visual-intelligence';
// import { smartExecutionEngine } from './smart-execution-engine';
import { Buffer } from 'buffer';

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
  type: 'brochure' | 'whitepaper' | 'battlecard' | 'presentation' | 'email' | 'sms' | 'infographic' | 'image';
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
    
    // Initialize template learning engine with default e& templates
    templateLearningEngine.initializeWithDefaultTemplates();
    console.log('🎨 Template learning engine initialized');
    
    // Load any existing memory from localStorage
    this.loadMemory();
    
    this.isInitialized = true;
    console.log('✅ Jammy AI ready with creative learning capabilities!');
  }

  async processMessage(
    message: string, 
    context: Record<string, unknown> = {}, 
    uploadedFiles: File[] = []
  ): Promise<JammyResponse> {
    await this.initialize();

    console.log('🤖 Jammy AI processing message with intelligence system:', message);

    try {
      // Use the smart execution engine for intelligent processing
      const executionContext = {
        query: message,
        industry: context.industry as string,
        contentType: context.contentType as string,
        userPreferences: context.userPreferences as Record<string, unknown> || {},
        conversationHistory: this.memory.conversationHistory || [],
        uploadedFiles: uploadedFiles
      };

      // Use the new intelligence engine for structured thinking
      const intelligenceResult = await jammyIntelligenceEngine.processIntelligently(message, context);
      
      // Store conversation in memory
      jammyIntelligenceEngine.addConversation({
        message,
        response: intelligenceResult,
        timestamp: new Date().toISOString()
      });
      
      // Generate response based on intelligence analysis
      return await this.generateIntelligentResponse(intelligenceResult, message);

    } catch (error) {
      console.error('❌ Jammy AI intelligent processing failed:', error);
      
      // Fallback to basic processing
      return this.fallbackProcessing(message, context, uploadedFiles);
    }
  }

  // Fallback processing when smart execution fails
  private async fallbackProcessing(
    message: string, 
    context: Record<string, unknown> = {}, 
    uploadedFiles: File[] = []
  ): Promise<JammyResponse> {
    console.log('🔄 Using fallback processing...');
    
    try {
      // Learn from uploaded files if any
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

    } catch (error) {
      console.error('❌ Fallback processing also failed:', error);
      
      return {
        id: `jammy_${Date.now()}`,
        content: "I apologize, but I encountered an issue processing your request. Please try again or contact support if the problem persists.",
        mediaAssets: [],
        learningData: {
          industry: 'general',
          contentType: 'general',
          userPreferences: {},
          knowledgeExtracted: [],
          improvements: []
        },
        confidence: 0.1,
        timestamp: new Date().toISOString(),
        jammyId: `jammy_${Date.now()}`
      };
    }
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
      'insights': ['insights', 'insight', 'market insights', 'industry insights', 'provide insights', 'give insights', 'connectivity', 'internet', 'market analysis', 'sector analysis', 'analyze markets', 'provide industry insights', 'uae market', 'market trends', 'industry trends', 'market intelligence', 'sector intelligence'],
      'compare': ['compare', 'contrast', 'versus', 'vs', 'difference'],
      'learn': ['learn', 'teach', 'explain', 'understand', 'know'],
      'help': ['help', 'assist', 'support', 'guide', 'advice']
    };

    // Check for insights first with higher priority
    if (intents.insights.some(keyword => message.toLowerCase().includes(keyword))) {
      return 'insights';
    }

    for (const [intent, keywords] of Object.entries(intents)) {
      if (intent !== 'insights' && keywords.some(keyword => message.toLowerCase().includes(keyword))) {
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

    // Check for specific industry keywords first
    for (const [industry, keywords] of Object.entries(industryKeywords)) {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        return industry;
      }
    }

    // If no specific industry detected, check for UAE market context
    if (message.toLowerCase().includes('uae') || message.toLowerCase().includes('emirates') || 
        message.toLowerCase().includes('dubai') || message.toLowerCase().includes('abu dhabi')) {
      return 'tech_telecom'; // Default to tech/telecom for UAE market insights
    }

    // For general market analysis requests, default to tech_telecom
    if (message.toLowerCase().includes('market') || message.toLowerCase().includes('industry') || 
        message.toLowerCase().includes('insights') || message.toLowerCase().includes('analysis')) {
      return 'tech_telecom';
    }

    return 'retail'; // Default fallback
  }

  private detectContentType(message: string): string {
    const contentTypes = {
      'image': ['image', 'picture', 'photo', 'visual', 'generate image', 'create image', 'draw', 'illustration'],
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
    try {
      // Get relevant GTM context
      const sectorInfo = GTM_CONTEXT.sectors.find(s => s.key === analysis.industry);
      const relevantProducts = this.findRelevantProducts(analysis.industry as string);
      
      // Generate intelligent response based on analysis and GTM context
      let response = '';
      let confidence = 0.9;
      
      // Use GTM_CONTEXT to provide specific, relevant information
      if (analysis.intent === 'insights' || analysis.intent === 'analysis') {
        response = this.generateInsightsResponse(message, analysis, sectorInfo, relevantProducts);
      } else if (analysis.intent === 'create' || analysis.intent === 'generate') {
        response = await this.generateCreationResponse(analysis, sectorInfo, relevantProducts);
      } else if (analysis.intent === 'compare' || analysis.intent === 'competitor') {
        response = await this.generateComparisonResponse(analysis, sectorInfo, relevantProducts);
      } else {
        response = await this.generateGeneralResponse(message, analysis, sectorInfo, relevantProducts);
      }

      // Add learning insights
      const learningInsights = this.getLearningInsights(analysis);
      if (learningInsights.length > 0) {
        response += `\n\n## Learning Insights\n${learningInsights.join('\n')}`;
      }

      return { content: response, confidence };
    } catch (error) {
      console.error('Error in generateResponse:', error);
      return { 
        content: `I apologize, but I encountered an error while processing your request. Please try again or rephrase your question.`, 
        confidence: 0.1 
      };
    }
  }

  private generateInsightsResponse(message: string, analysis: Record<string, unknown>, sectorInfo: unknown, products: unknown[]): string {
    try {
      const industry = (analysis.industry as string) || 'general';
      const sector = sectorInfo as { name?: string; description?: string; opportunities?: string[]; challenges?: string[] };
      
      let response = `# Industry Insights for ${sector?.name || industry.charAt(0).toUpperCase() + industry.slice(1)} Sector\n\n`;
      
      if (sector?.description) {
        response += `## Market Overview\n${sector.description}\n\n`;
      }
      
      if (sector?.opportunities && Array.isArray(sector.opportunities) && sector.opportunities.length > 0) {
        response += `## Key Opportunities\n`;
        sector.opportunities.forEach(opportunity => {
          response += `• ${opportunity}\n`;
        });
        response += '\n';
      }
      
      if (sector?.challenges && Array.isArray(sector.challenges) && sector.challenges.length > 0) {
        response += `## Market Challenges\n`;
        sector.challenges.forEach(challenge => {
          response += `• ${challenge}\n`;
        });
        response += '\n';
      }
      
      if (products && Array.isArray(products) && products.length > 0) {
        response += `## e& Solutions for ${sector?.name || industry}\n`;
        products.slice(0, 3).forEach((product: any) => {
          if (product && product.name) {
            response += `### ${product.name}\n`;
            if (product.short_desc) {
              response += `${product.short_desc}\n\n`;
            }
            if (product.key_features && Array.isArray(product.key_features) && product.key_features.length > 0) {
              response += `**Key Features:**\n`;
              product.key_features.forEach((feature: string) => {
                response += `• ${feature}\n`;
              });
              response += '\n';
            }
          }
        });
      }
      
      response += `## Strategic Recommendations\n`;
      response += `• Focus on digital transformation initiatives\n`;
      response += `• Leverage e&'s comprehensive solution portfolio\n`;
      response += `• Target high-growth market segments\n`;
      response += `• Implement data-driven decision making\n\n`;
      
      response += `*This analysis is based on e&'s market intelligence and industry expertise.*`;
      
      return response;
    } catch (error) {
      console.error('Error in generateInsightsResponse:', error);
      return `# Industry Insights\n\nI apologize, but I encountered an error while generating insights. Please try again or rephrase your question.`;
    }
  }

  private async generateCreationResponse(analysis: Record<string, unknown>, sectorInfo: unknown, products: unknown[]): Promise<string> {
    const industryName = (sectorInfo as { name?: string })?.name || (analysis.industry as string).charAt(0).toUpperCase() + (analysis.industry as string).slice(1);
    const contentType = (analysis.contentType as string).charAt(0).toUpperCase() + (analysis.contentType as string).slice(1);
    
    // Handle image generation requests
    if (analysis.contentType === 'image') {
      return `I'll generate a visual representation for the ${industryName} sector. Let me create an image that showcases e&'s solutions and capabilities for your industry.`;
    }
    
    let response = `# e& Business Solutions - ${industryName} ${contentType}\n\n`;
    
    // Executive Summary
    response += `## Executive Summary\n`;
    response += `Transform your ${analysis.industry} operations with e&'s comprehensive digital solutions designed specifically for the ${industryName} sector. Our cutting-edge technology and expert support help businesses like yours achieve unprecedented growth and efficiency.\n\n`;
    
    // Industry-specific content
    if (sectorInfo) {
      response += `## Industry Challenges & Solutions\n\n`;
      response += `### Key Pain Points for ${industryName}:\n`;
      (sectorInfo as { pain_points?: string[] }).pain_points?.forEach((point: string) => {
        response += `• ${point}\n`;
      });
      response += `\n### e& Solutions Address These Challenges:\n`;
      (sectorInfo as { sector_goals?: string[] }).sector_goals?.forEach((goal: string) => {
        response += `• ${goal}\n`;
      });
    }
    
    // Product recommendations
    if (products.length > 0) {
      response += `\n## Recommended Solutions\n\n`;
      products.forEach(product => {
        const p = product as { name: string; short_desc: string; key_features: string[]; target_segments: string[]; availability: string };
        response += `### ${p.name}\n`;
        response += `**${p.short_desc}**\n\n`;
        response += `**Key Features:**\n`;
        p.key_features.forEach((feature: string) => {
          response += `• ${feature}\n`;
        });
        response += `\n**Target Segments:** ${p.target_segments.join(', ')}\n`;
        response += `**Availability:** ${p.availability}\n\n`;
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
    const sectorName = (sectorInfo as { name?: string })?.name || (analysis.industry as string);
    return `# Market Analysis - ${sectorName} Sector

## Market Overview
Based on current market trends and e&'s capabilities, here's my analysis of the ${sectorName} sector:

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
    const sectorName = (sectorInfo as { name?: string })?.name || (analysis.industry as string);
    return `# Competitive Analysis - ${sectorName} Sector

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
    const sectorName = (sectorInfo as { name?: string })?.name || (analysis.industry as string);
    return `# Learning Center - ${sectorName} Sector

## What I Know About ${sectorName}

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

  private async generateGeneralResponse(message: string, analysis: Record<string, unknown>, sectorInfo: unknown, products: unknown[]): Promise<string> {
    const industry = analysis.industry as string;
    const sector = sectorInfo as { name?: string; description?: string };
    
    // Get relevant products for the industry
    const relevantProducts = this.findRelevantProducts(industry);
    
    let response = `# Jammy AI - Your GTM Assistant\n\n`;
    
    // Personalized greeting based on context
    if (industry && industry !== 'general') {
      response += `Hello! I see you're interested in the **${sector?.name || industry.charAt(0).toUpperCase() + industry.slice(1)}** sector. `;
    } else {
      response += `Hello! `;
    }
    
    response += `I'm Jammy, your intelligent AI assistant for e& GTM team. I'm here to help you with:\n\n`;
    
    // Dynamic content based on industry
    if (sector?.description) {
      response += `## Market Overview for ${sector.name}\n`;
      response += `${sector.description}\n\n`;
    }
    
    // Show relevant products
    if (relevantProducts.length > 0) {
      response += `## Recommended Solutions for ${sector?.name || industry}\n`;
      relevantProducts.slice(0, 3).forEach((product: any) => {
        if (product && product.name) {
          response += `### ${product.name}\n`;
          if (product.short_desc) {
            response += `${product.short_desc}\n\n`;
          }
        }
      });
    }
    
    response += `## What I Can Do\n`;
    response += `• **Create Content**: Brochures, white papers, battlecards, presentations\n`;
    response += `• **Analyze Markets**: Industry insights, competitive analysis, opportunities\n`;
    response += `• **Generate Assets**: Visual content, documents, templates\n`;
    response += `• **Learn & Adapt**: I get smarter with every interaction\n\n`;
    
    response += `## My Knowledge\n`;
    response += `• **e& Product Portfolio**: Complete understanding of all solutions\n`;
    response += `• **Industry Expertise**: Deep knowledge of all 10 sectors\n`;
    response += `• **UAE Market Focus**: Local insights and cultural understanding\n`;
    response += `• **Learning Capabilities**: I learn from your uploads and conversations\n\n`;
    
    // Add conversation context
    if (this.memory.conversations.length > 0) {
      response += `## Our Conversation History\n`;
      response += `• I've had ${this.memory.conversations.length} conversations with you\n`;
      if (this.memory.knowledgeBase.length > 0) {
        response += `• I've learned from ${this.memory.knowledgeBase.length} documents you've shared\n`;
      }
      response += `• I'm continuously improving based on our interactions\n\n`;
    }
    
    // Personalized suggestions based on message content
    const keywords = analysis.keywords as string[];
    if (keywords && keywords.length > 0) {
      response += `## Based on Your Interest\n`;
      response += `I noticed you mentioned: ${keywords.slice(0, 3).join(', ')}\n\n`;
      
      if (keywords.some(k => ['brochure', 'flyer', 'marketing'].includes(k.toLowerCase()))) {
        response += `Would you like me to create a professional brochure for the ${sector?.name || industry} sector?\n\n`;
      } else if (keywords.some(k => ['analysis', 'insights', 'market'].includes(k.toLowerCase()))) {
        response += `Would you like me to provide detailed market insights for the ${sector?.name || industry} sector?\n\n`;
      } else if (keywords.some(k => ['image', 'visual', 'picture'].includes(k.toLowerCase()))) {
        response += `Would you like me to generate a visual representation for the ${sector?.name || industry} sector?\n\n`;
      }
    }
    
    response += `What would you like to work on today? I'm here to help you succeed!\n\n`;
    response += `---\n`;
    response += `*Powered by Jammy AI - Intelligent GTM Assistant for e&*`;
    
    return response;
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
      case 'image':
        assets.push(await this.generateImageAsset(analysis, response));
        break;
      case 'brochure':
        // Generate both image and brochure asset
        assets.push(await this.generateImageAsset(analysis, response));
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

  private async generateImageAsset(analysis: Record<string, unknown>, response: Record<string, unknown>): Promise<MediaAsset> {
    // Generate an image using the creative learning system
    try {
      const industry = analysis.industry as string;
      const contentType = analysis.contentType as string;
      
      console.log('🎨 Generating creative image for:', industry, contentType);
      
      // Analyze the user's specific image request
      const imagePrompt = this.analyzeImageRequest(message, industry, contentType);
      
      // Delegate to Chinchilla with specific instructions
      const chinchillaRequest: ChinchillaRequest = {
        prompt: imagePrompt,
        industry: industry,
        contentType: contentType,
        style: 'professional',
        recommendations: response.content as string
      };
      
      const chinchillaResponse = await chinchillaImageAI.generateImage(chinchillaRequest);
      
      if (!chinchillaResponse.success) {
        throw new Error('Chinchilla failed to generate image');
      }
      
      console.log('✅ Server-side image generated successfully');
      
      return {
        id: `image_${Date.now()}`,
        type: 'image',
        title: chinchillaResponse.title,
        industry: industry,
        content: response.content as string,
        fileUrl: chinchillaResponse.imageUrl,
        generatedAt: new Date().toISOString(),
        styleUsed: 'Chinchilla Generated'
      };
    } catch (error) {
      console.error('❌ Creative image generation failed:', error);
      
      // Fallback to simple generator
      try {
        const industry = analysis.industry as string;
        const contentType = analysis.contentType as string;
        
        // Fallback to Chinchilla with basic request
        const fallbackRequest: ChinchillaRequest = {
          prompt: `Generate a simple image for ${industry}`,
          industry: industry,
          contentType: 'visual',
          style: 'simple',
          recommendations: 'Basic visual representation'
        };
        
        const fallbackResponse = await chinchillaImageAI.generateImage(fallbackRequest);
        
        return {
          id: `image_${Date.now()}`,
          type: 'image',
          title: fallbackResponse.title,
          industry: industry,
          content: response.content as string,
          fileUrl: fallbackResponse.imageUrl,
          generatedAt: new Date().toISOString(),
          styleUsed: 'Chinchilla Fallback'
        };
      } catch (fallbackError) {
        console.error('❌ Fallback image generation also failed:', fallbackError);
        
        // Ultimate fallback - simple SVG
        const simpleSvg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#FFFFFF"/>
          <rect x="0" y="0" width="400" height="60" fill="#e30613"/>
          <text x="20" y="35" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">e& (Etisalat)</text>
          <text x="20" y="50" font-family="Arial, sans-serif" font-size="12" fill="white">Business Solutions</text>
          <rect x="20" y="80" width="360" height="180" fill="#FFFFFF" stroke="#e30613" stroke-width="2" rx="8"/>
          <text x="40" y="110" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1A1A1A">${analysis.industry} Industry Brochure</text>
          <text x="40" y="130" font-family="Arial, sans-serif" font-size="14" fill="#666666">Transform your business with e& digital solutions</text>
          <text x="40" y="150" font-family="Arial, sans-serif" font-size="12" fill="#1A1A1A">Comprehensive ICT solutions for ${analysis.industry} sector</text>
          <rect x="40" y="170" width="80" height="25" fill="#e30613" rx="4"/>
          <text x="50" y="185" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white">${(analysis.industry as string).toUpperCase()}</text>
          <circle cx="320" cy="200" r="25" fill="#e30613"/>
          <text x="310" y="205" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white">e&</text>
          <text x="20" y="280" font-family="Arial, sans-serif" font-size="10" fill="#666666">Generated by Jammy AI • ${new Date().toLocaleDateString()}</text>
        </svg>`;
        
        const simpleBase64 = Buffer.from(simpleSvg).toString('base64');
        
        return {
          id: `image_${Date.now()}`,
          type: 'image',
          title: `${analysis.industry} Visual Content`,
          industry: analysis.industry as string,
          content: response.content as string,
          fileUrl: `data:image/svg+xml;base64,${simpleBase64}`,
          generatedAt: new Date().toISOString(),
          styleUsed: 'Simple Fallback'
        };
      }
    }
  }

  private async generateBrochureAsset(analysis: Record<string, unknown>, response: Record<string, unknown>): Promise<MediaAsset> {
    // This would generate an actual PDF brochure
    // For now, we'll create a placeholder
    return {
      id: `brochure_${Date.now()}`,
      type: 'brochure',
      title: `${analysis.industry} Industry Brochure`,
      industry: analysis.industry as string,
      content: response.content as string,
      fileUrl: '/api/generate-pdf?type=brochure&industry=' + (analysis.industry as string),
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

  private analyzeImageRequest(message: string, industry: string, contentType: string): string {
    // Extract specific visual elements from the user's message
    const lowerMessage = message.toLowerCase();
    
    // Look for specific objects, concepts, or visual elements
    const visualElements = [];
    
    if (lowerMessage.includes('phone') || lowerMessage.includes('mobile')) {
      visualElements.push('smartphone device');
    }
    if (lowerMessage.includes('chinchilla')) {
      visualElements.push('chinchilla animal');
    }
    if (lowerMessage.includes('building') || lowerMessage.includes('office')) {
      visualElements.push('corporate building');
    }
    if (lowerMessage.includes('people') || lowerMessage.includes('team')) {
      visualElements.push('business people');
    }
    if (lowerMessage.includes('chart') || lowerMessage.includes('graph')) {
      visualElements.push('data visualization');
    }
    if (lowerMessage.includes('network') || lowerMessage.includes('connectivity')) {
      visualElements.push('network infrastructure');
    }
    
    // If no specific elements found, use industry context
    if (visualElements.length === 0) {
      visualElements.push(`${industry} business solution`);
    }
    
    // Create a detailed prompt for Chinchilla
    const prompt = `Create a professional ${contentType} image featuring: ${visualElements.join(', ')} for the ${industry} sector. Include e& branding and make it visually appealing.`;
    
    console.log('🎯 Jammy analyzed image request:', prompt);
    return prompt;
  }

  private async generateIntelligentResponse(intelligenceResult: any, message: string): Promise<JammyResponse> {
    // Build comprehensive response based on intelligence analysis
    let content = `# ${intelligenceResult.definition}\n\n`;
    
    content += `## Analysis\n${intelligenceResult.explanation}\n\n`;
    
    if (intelligenceResult.evidence.length > 0) {
      content += `## Evidence\n`;
      intelligenceResult.evidence.forEach((evidence: string, index: number) => {
        content += `${index + 1}. ${evidence}\n`;
      });
      content += `\n`;
    }
    
    if (intelligenceResult.anticipation.length > 0) {
      content += `## Future Considerations\n`;
      intelligenceResult.anticipation.forEach((scenario: string, index: number) => {
        content += `• ${scenario}\n`;
      });
      content += `\n`;
    }
    
    if (intelligenceResult.roadmap.length > 0) {
      content += `## Recommended Roadmap\n`;
      intelligenceResult.roadmap.forEach((step: string, index: number) => {
        content += `${index + 1}. ${step}\n`;
      });
      content += `\n`;
    }
    
    if (intelligenceResult.recommendations.length > 0) {
      content += `## Recommendations\n`;
      intelligenceResult.recommendations.forEach((rec: string, index: number) => {
        content += `• ${rec}\n`;
      });
      content += `\n`;
    }
    
    // Generate media assets if needed (but respect negative commands)
    let mediaAssets: MediaAsset[] = [];
    
    if (intelligenceResult.needsVisual && intelligenceResult.analysis.intent !== 'negative_command') {
      const visualSpec: VisualSpecification = {
        prompt: message,
        industry: intelligenceResult.analysis.industry,
        contentType: 'visual',
        style: 'professional',
        requirements: intelligenceResult.analysis.intent === 'creation' ? ['creative', 'professional'] : ['informative'],
        context: intelligenceResult.analysis.context
      };
      
      const visualResult = await chinchillaVisualIntelligence.generateIntelligentImage(visualSpec);
      
      if (visualResult.success) {
        mediaAssets.push({
          id: `visual_${Date.now()}`,
          type: 'image',
          title: visualResult.title,
          industry: intelligenceResult.analysis.industry,
          content: visualResult.description,
          fileUrl: visualResult.imageUrl,
          generatedAt: new Date().toISOString(),
          styleUsed: visualResult.styleApplied
        });
      }
    }
    
    return {
      id: `jammy_${Date.now()}`,
      content,
      mediaAssets,
      learningData: {
        industry: intelligenceResult.analysis.industry,
        contentType: 'analysis',
        userPreferences: {},
        knowledgeExtracted: intelligenceResult.evidence,
        improvements: []
      },
      confidence: intelligenceResult.knowledgeSearch.confidence,
      timestamp: new Date().toISOString()
    };
  }

  private extractLearningData(message: string, analysis: Record<string, unknown>, response: Record<string, unknown>): LearningData {
    return {
      industry: analysis.industry as string,
      contentType: analysis.contentType as string,
      userPreferences: this.memory.userPreferences,
      knowledgeExtracted: analysis.keywords as string[],
      improvements: this.generateImprovements(analysis, response)
    };
  }

  private generateImprovements(analysis: Record<string, unknown>, response: Record<string, unknown>): string[] {
    const improvements = [];
    
    if ((analysis.confidence as number) < 0.8) {
      improvements.push('Improve confidence in response generation');
    }
    
    if (analysis.complexity === 'complex' && (response.content as string).length < 1000) {
      improvements.push('Provide more detailed content for complex requests');
    }
    
    if (analysis.urgency === 'high') {
      improvements.push('Optimize for urgent request handling');
    }
    
    return improvements;
  }

  private async learnFromFiles(files: File[]): Promise<void> {
    console.log('📚 Learning from uploaded files...');
    
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
        
        // Learn style patterns using enhanced learning engine
        const { patterns, insights } = await enhancedStyleLearningEngine.processFile(file);
        this.memory.learnedPatterns.push(...patterns);
        
        // Add learning insights
        this.memory.learningProgress.improvements.push(...insights);
        
        // Also learn design patterns from the file for creative generation
        if (file.type.startsWith('image/') || file.name.endsWith('.pdf')) {
          // Create a visual template from the file
          const visualTemplate = {
            id: `uploaded_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            industry: this.detectIndustry(content),
            contentType: this.detectContentTypeFromFile(file),
            elements: [], // Would be extracted from file analysis
            layout: {
              type: 'absolute' as const,
              spacing: 16,
              alignment: 'center' as const,
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
              symmetry: 'vertical' as const,
              hierarchy: ['header', 'content', 'footer'],
              whitespace: 7
            },
            source: `Uploaded: ${file.name}`,
            createdAt: new Date().toISOString()
          };
          
          // Learn from the template
          await templateLearningEngine.learnFromTemplate(visualTemplate);
          console.log(`🎨 Learned design patterns from: ${file.name}`);
        }
        
        console.log(`✅ Learned from file: ${file.name}`);
        
      } catch (error) {
        console.error('Error learning from file:', error);
      }
    }
    
    // Save memory
    this.saveMemory();
  }

  private detectContentTypeFromFile(file: File): string {
    if (file.type.startsWith('image/')) return 'image';
    if (file.name.endsWith('.pdf')) return 'brochure';
    if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) return 'document';
    if (file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) return 'presentation';
    return 'document';
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
      // Only load from localStorage in browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('jammy_memory');
        if (stored) {
          this.memory = { ...this.memory, ...JSON.parse(stored) };
        }
      }
    } catch (error) {
      console.error('Error loading memory:', error);
    }
  }

  private saveMemory(): void {
    try {
      // Only save to localStorage in browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('jammy_memory', JSON.stringify(this.memory));
      }
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
