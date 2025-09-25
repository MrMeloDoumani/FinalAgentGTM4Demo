/**
 * 🤖 JAMMY AI - The Brain (Direct Communication System)
 * 
 * This is the clean, direct communication system that works with:
 * - JammyCommunicationSystem (bi-lingual communication)
 * - JammyWebIntelligence (knowledge search)
 * - EnhancedChinchilla (visual generation)
 */

import { JammyCommunicationSystem } from './jammy-communication-system';
import { JammyWebIntelligence } from './jammy-web-intelligence';
import { enhancedChinchilla } from './enhanced-chinchilla';
import { GTM_CONTEXT } from './data/gtm-context';

// Interfaces for Jammy's responses
export interface JammyResponse {
  message: string;
  mediaAssets: MediaAsset[];
  industry: string;
  confidence: number;
  jammyId: string;
  learningData?: {
    industry: string;
    confidence: number;
    insights: string[];
  };
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'pdf' | 'document' | 'presentation';
  title: string;
  industry: string;
  content: string;
  fileUrl: string;
  generatedAt: string;
  styleUsed?: string;
  confidence?: number;
}

export interface JammyMemory {
  conversations: { message: string; response: string; timestamp: string; industry: string; confidence: number }[];
  learnedPatterns: { pattern: string; insight: string; confidence: number }[];
  knowledgeBase: any[];
  userPreferences: { [key: string]: any };
  uploadedDocuments: UploadedDocument[];
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  processedAt: string;
  extractedData: DocumentInsights;
  industry: string;
  confidence: number;
}

export interface DocumentInsights {
  keyMetrics: { [key: string]: any };
  trends: string[];
  insights: string[];
  products: string[];
  pricing: { [key: string]: any };
  competitors: string[];
  dates: string[];
  sectors: string[];
  rawText: string;
  summary: string;
}

class JammyAI {
  private memory: JammyMemory;
  private initialized: boolean = false;
  private communicationSystem: JammyCommunicationSystem;
  private webIntelligence: JammyWebIntelligence;
  private chinchilla: typeof enhancedChinchilla;

  constructor() {
    this.memory = {
      conversations: [],
      learnedPatterns: [],
      knowledgeBase: [],
      userPreferences: {},
      uploadedDocuments: [],
    };
    this.communicationSystem = new JammyCommunicationSystem();
    this.webIntelligence = new JammyWebIntelligence(GTM_CONTEXT);
    this.chinchilla = enhancedChinchilla;
  }

  private async initialize() {
    if (!this.initialized) {
      this.loadMemory();
      console.log('🤖 Jammy AI initializing with Direct Communication System...');
      console.log('✅ Jammy AI ready! The direct communication system is online!');
      this.initialized = true;
    }
  }

  /**
   * 🎯 MAIN ENTRY POINT - Process user message through direct communication
   */
  async processMessage(
    message: string, 
    context: { user: string; role: string }, 
    uploadedFiles: any[] = []
  ): Promise<JammyResponse> {
    await this.initialize();

    console.log('🤖 Jammy AI processing message:', message);

    try {
      console.log('🔍 Step 1: Starting communication system...');
      // Step 1: Communicate with user (analyze intent)
      const communicationResult = await this.communicationSystem.communicate(message, context.user || 'default');
      console.log('💬 Communication result:', communicationResult);

      console.log('🔍 Step 2: Starting web intelligence...');
      // Step 2: Detect if this is a market insights request; else search product
      const commIntent = (communicationResult as any).nextAction;
      const isInsights = (this.communicationSystem as any).getConversationStatus?.(context.user || 'default')?.userIntent === 'market_insights'
        || /insight|market|trend|analysis|intelligence/i.test(message);
      const webResult = await this.webIntelligence.searchProduct(message);
      console.log('🌐 Web intelligence result:', webResult);

      // Optional: Generate sector insights when asked
      if (isInsights) {
        const sectorInsights = await (this.webIntelligence as any).getSectorInsights?.({ sector: 'general', details: [] });
        if (sectorInsights) {
          const insightsText = [
            `UAE ${sectorInsights.sector} market insights — ${sectorInsights.timeframe}:`,
            '',
            'Trends:',
            ...sectorInsights.trends.map((t: string) => `• ${t}`),
            '',
            'Drivers:',
            ...sectorInsights.drivers.map((d: string) => `• ${d}`),
            '',
            'Risks:',
            ...sectorInsights.risks.map((r: string) => `• ${r}`),
            '',
            'Suggested GTM plays:',
            ...sectorInsights.recommendedPlays.map((p: string) => `• ${p}`),
            '',
            'Sources:',
            ...sectorInsights.sources.map((s: string) => `• ${s}`)
          ].join('\n');

          this.storeConversation(message, insightsText, webResult.industry || 'general', 0.85);

          return {
            message: insightsText,
            mediaAssets: [],
            industry: webResult.industry || 'general',
            confidence: 0.85,
            jammyId: `jammy_${Date.now()}`,
            learningData: {
              industry: webResult.industry || 'general',
              confidence: 0.85,
              insights: ['Provided sector insights']
            }
          };
        }
      }

      // Step 3: Generate response based on intent
      console.log('🔍 Step 3: Checking if image generation is needed...');
      console.log('🔍 nextAction:', communicationResult.nextAction);
      console.log('🔍 chinchillaTranslation:', communicationResult.chinchillaTranslation);
      
      if (communicationResult.nextAction === 'execute' && communicationResult.chinchillaTranslation) {
        // Generate image
        console.log('🎨 Generating image with Enhanced Chinchilla...');
        
        // Extract elements from Chinchilla translation
        const elements = this.extractElementsFromTranslation(communicationResult.chinchillaTranslation);
        console.log('🔍 Extracted elements:', elements);
        
        const imageResult = await this.chinchilla.generateEnhancedVisual({
          prompt: communicationResult.chinchillaTranslation,
          industry: webResult.industry || 'tech_telecom',
          contentType: 'product_visualization',
          style: 'professional_b2b',
          requirements: ['e& branding', 'B2B focus', 'professional layout'],
          context: context.user || 'default',
          elements: elements
        });

        if (imageResult.success) {
          const mediaAsset = {
            id: `image_${Date.now()}`,
            type: 'image' as const,
            title: imageResult.title,
            industry: webResult.industry || 'tech_telecom',
            content: imageResult.description,
            fileUrl: imageResult.imageUrl,
            generatedAt: new Date().toISOString(),
            styleUsed: imageResult.styleApplied,
            confidence: 0.9,
          };

          this.storeConversation(message, communicationResult.message, webResult.industry || 'tech_telecom', 0.9);

          return {
            message: communicationResult.message,
            mediaAssets: [mediaAsset],
            industry: webResult.industry || 'tech_telecom',
            confidence: 0.9,
            jammyId: `jammy_${Date.now()}`,
            learningData: {
              industry: webResult.industry || 'tech_telecom',
              confidence: 0.9,
              insights: ['Image generated successfully', 'Chinchilla executed command']
            }
          };
        } else {
          return {
            message: `I attempted to generate an image, but encountered an issue: ${imageResult.description}. Please try a different request or provide more details.`,
            mediaAssets: [],
            industry: webResult.industry || 'tech_telecom',
            confidence: 0.5,
            jammyId: `jammy_${Date.now()}`,
            learningData: {
              industry: webResult.industry || 'tech_telecom',
              confidence: 0.5,
              insights: ['Image generation failed']
            }
          };
        }
      } else {
        // General response - enhance with uploaded document insights if relevant
        let enhancedMessage = communicationResult.message;
        const documentInsights = this.getRelevantDocumentInsights(message);
        
        if (documentInsights.length > 0) {
          enhancedMessage += `\n\n📚 **Based on your uploaded documents:**\n`;
          documentInsights.forEach(insight => {
            enhancedMessage += `• ${insight}\n`;
          });
        }
        
        this.storeConversation(message, enhancedMessage, webResult.industry || 'general', 0.8);

        return {
          message: enhancedMessage,
          mediaAssets: [],
          industry: webResult.industry || 'general',
          confidence: 0.8,
          jammyId: `jammy_${Date.now()}`,
          learningData: {
            industry: webResult.industry || 'general',
            confidence: 0.8,
            insights: ['General response provided', ...(documentInsights.length > 0 ? ['Document insights included'] : [])]
          }
        };
      }

    } catch (error) {
      console.error('❌ Jammy AI processing error:', error);
      return {
        message: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        mediaAssets: [],
        industry: 'general',
        confidence: 0.0,
        jammyId: `jammy_${Date.now()}`,
        learningData: {
          industry: 'general',
          confidence: 0.0,
          insights: ['Error during processing']
        }
      };
    }
  }

  /**
   * 🔍 Extract elements from Chinchilla translation
   */
  private extractElementsFromTranslation(translation: string): string[] {
    const elements: string[] = [];
    
    // Look for "Draw these elements:" pattern
    if (translation.includes('Draw these elements:')) {
      const elementsText = translation.split('Draw these elements:')[1];
      if (elementsText) {
        const elementList = elementsText.split(' for ')[0]; // Stop at " for "
        const elementArray = elementList.split(',').map(e => e.trim().toLowerCase());
        
        // Map common element names
        elementArray.forEach(element => {
          if (element.includes('office') || element.includes('building')) {
            elements.push('office_building');
          } else if (element.includes('network')) {
            elements.push('network');
          } else if (element.includes('router')) {
            elements.push('router');
          } else if (element.includes('wifi') || element.includes('signal')) {
            elements.push('wifi_signal');
          } else if (element.includes('server')) {
            elements.push('server');
          } else if (element.includes('smartphone') || element.includes('phone')) {
            elements.push('smartphone');
          } else if (element.includes('laptop')) {
            elements.push('laptop');
          } else if (element.includes('cloud')) {
            elements.push('cloud');
          } else if (element.includes('security') || element.includes('shield')) {
            elements.push('security_shield');
          } else if (element.includes('chart') || element.includes('analytics')) {
            elements.push('chart');
          } else {
            // Add as-is if it's a known element
            elements.push(element);
          }
        });
      }
    }
    
    // If no elements found, use defaults based on industry
    if (elements.length === 0) {
      elements.push('office_building', 'network');
    }
    
    return Array.from(new Set(elements)); // Remove duplicates
  }

  /**
   * 📚 Learn from uploaded files - Enhanced with intelligent processing
   */
  public async learnFromFiles(files: any[]): Promise<void> {
    console.log('📚 Learning from uploaded files:', files.length);
    
    for (const file of files) {
      try {
        // Process file intelligently
        const documentInsights = await this.processDocument(file);
        
        // Store in uploaded documents
        const uploadedDoc: UploadedDocument = {
          id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          processedAt: new Date().toISOString(),
          extractedData: documentInsights,
          industry: this.detectIndustryFromContent(documentInsights.rawText),
          confidence: 0.85
        };
        
        this.memory.uploadedDocuments.push(uploadedDoc);
        
        // Create learned patterns from extracted insights
        this.memory.learnedPatterns.push({
          pattern: `file_upload_${file.name}`,
          insight: `Learned from ${file.name}: ${documentInsights.summary}`,
          confidence: 0.9,
        });
        
        // Add specific insights as patterns
        documentInsights.insights.forEach(insight => {
          this.memory.learnedPatterns.push({
            pattern: `insight_${insight.substring(0, 50)}`,
            insight: insight,
            confidence: 0.8,
          });
        });
        
        // Add trends as patterns
        documentInsights.trends.forEach(trend => {
          this.memory.learnedPatterns.push({
            pattern: `trend_${trend.substring(0, 30)}`,
            insight: `Market trend: ${trend}`,
            confidence: 0.75,
          });
        });
        
        console.log(`✅ Processed ${file.name}: ${documentInsights.insights.length} insights, ${documentInsights.trends.length} trends`);
        
      } catch (error) {
        console.error(`❌ Error processing file ${file.name}:`, error);
        // Fallback to basic learning
        this.memory.learnedPatterns.push({
          pattern: `file_upload_${file.name}`,
          insight: `Learned styles and content from ${file.name}`,
          confidence: 0.7,
        });
      }
    }
    
    this.saveMemory();
  }

  /**
   * 🔍 Process document intelligently
   */
  private async processDocument(file: any): Promise<DocumentInsights> {
    // Simulate document processing (in real implementation, use libraries like pdf-parse, mammoth, etc.)
    const mockContent = this.generateMockContent(file.name, file.type);
    
    return {
      keyMetrics: this.extractKeyMetrics(mockContent),
      trends: this.extractTrends(mockContent),
      insights: this.extractInsights(mockContent),
      products: this.extractProducts(mockContent),
      pricing: this.extractPricing(mockContent),
      competitors: this.extractCompetitors(mockContent),
      dates: this.extractDates(mockContent),
      sectors: this.extractSectors(mockContent),
      rawText: mockContent,
      summary: this.generateSummary(mockContent)
    };
  }

  /**
   * 📄 Generate mock content based on file type (placeholder for real processing)
   */
  private generateMockContent(fileName: string, fileType: string): string {
    const baseContent = `This document contains market analysis and business insights for the UAE B2B sector. 
    Key findings include digital transformation trends, competitive landscape analysis, and pricing strategies.
    The report covers sectors including retail, healthcare, finance, and technology.
    Recent data shows increased demand for cloud solutions and cybersecurity services.
    Competitors include du, stc, and other regional providers.
    Pricing ranges from AED 299 to AED 2,999 for various service tiers.
    The analysis was conducted in Q4 2024 and covers the last 12 months of market data.`;
    
    return baseContent;
  }

  /**
   * 🔍 Extract key metrics from content
   */
  private extractKeyMetrics(content: string): { [key: string]: any } {
    const metrics: { [key: string]: any } = {};
    
    // Extract pricing information
    const priceMatches = content.match(/AED\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/g);
    if (priceMatches) {
      metrics.pricing = priceMatches.map(p => p.replace('AED', '').trim());
    }
    
    // Extract percentages
    const percentMatches = content.match(/(\d+(?:\.\d+)?%)/g);
    if (percentMatches) {
      metrics.percentages = percentMatches;
    }
    
    // Extract time periods
    const timeMatches = content.match(/(Q[1-4]\s*\d{4}|last\s+\d+\s+months?)/gi);
    if (timeMatches) {
      metrics.timePeriods = timeMatches;
    }
    
    return metrics;
  }

  /**
   * 📈 Extract trends from content
   */
  private extractTrends(content: string): string[] {
    const trends: string[] = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('digital transformation')) {
      trends.push('Accelerating digital transformation across UAE B2B sectors');
    }
    if (lowerContent.includes('cloud')) {
      trends.push('Increased adoption of cloud-based solutions');
    }
    if (lowerContent.includes('cybersecurity')) {
      trends.push('Growing focus on cybersecurity and data protection');
    }
    if (lowerContent.includes('ai') || lowerContent.includes('artificial intelligence')) {
      trends.push('Rising demand for AI-powered business solutions');
    }
    if (lowerContent.includes('mobile') || lowerContent.includes('5g')) {
      trends.push('5G and mobile-first business strategies gaining traction');
    }
    
    return trends;
  }

  /**
   * 💡 Extract insights from content
   */
  private extractInsights(content: string): string[] {
    const insights: string[] = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('competition')) {
      insights.push('Competitive landscape is intensifying with new market entrants');
    }
    if (lowerContent.includes('pricing')) {
      insights.push('Pricing strategies are becoming more dynamic and value-based');
    }
    if (lowerContent.includes('customer')) {
      insights.push('Customer expectations are evolving towards integrated solutions');
    }
    if (lowerContent.includes('technology')) {
      insights.push('Technology adoption is accelerating across all business sectors');
    }
    
    return insights;
  }

  /**
   * 🏢 Extract products from content
   */
  private extractProducts(content: string): string[] {
    const products: string[] = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('fiber') || lowerContent.includes('internet')) {
      products.push('Business Pro Fiber');
    }
    if (lowerContent.includes('mobile') || lowerContent.includes('5g')) {
      products.push('Business Mobile Plans');
    }
    if (lowerContent.includes('pos') || lowerContent.includes('payment')) {
      products.push('uTap Payment Solutions');
    }
    if (lowerContent.includes('security') || lowerContent.includes('sase')) {
      products.push('Cybersecurity Services');
    }
    if (lowerContent.includes('cloud') || lowerContent.includes('microsoft')) {
      products.push('Microsoft 365 Solutions');
    }
    
    return products;
  }

  /**
   * 💰 Extract pricing information
   */
  private extractPricing(content: string): { [key: string]: any } {
    const pricing: { [key: string]: any } = {};
    const priceMatches = content.match(/AED\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/g);
    
    if (priceMatches) {
      pricing.mentionedPrices = priceMatches;
      pricing.priceRange = {
        min: Math.min(...priceMatches.map(p => parseInt(p.replace(/[^\d]/g, '')))),
        max: Math.max(...priceMatches.map(p => parseInt(p.replace(/[^\d]/g, ''))))
      };
    }
    
    return pricing;
  }

  /**
   * 🏆 Extract competitors from content
   */
  private extractCompetitors(content: string): string[] {
    const competitors: string[] = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('du')) {
      competitors.push('du');
    }
    if (lowerContent.includes('stc')) {
      competitors.push('stc');
    }
    if (lowerContent.includes('virgin')) {
      competitors.push('Virgin Mobile');
    }
    if (lowerContent.includes('etisalat')) {
      competitors.push('Etisalat');
    }
    
    return competitors;
  }

  /**
   * 📅 Extract dates from content
   */
  private extractDates(content: string): string[] {
    const dates: string[] = [];
    const dateMatches = content.match(/(Q[1-4]\s*\d{4}|\d{4}|\d{1,2}\/\d{1,2}\/\d{4})/g);
    
    if (dateMatches) {
      dates.push(...dateMatches);
    }
    
    return dates;
  }

  /**
   * 🏭 Extract sectors from content
   */
  private extractSectors(content: string): string[] {
    const sectors: string[] = [];
    const lowerContent = content.toLowerCase();
    
    const sectorKeywords = ['retail', 'healthcare', 'finance', 'education', 'government', 'logistics', 'manufacturing', 'hospitality', 'technology', 'telecom'];
    
    sectorKeywords.forEach(sector => {
      if (lowerContent.includes(sector)) {
        sectors.push(sector);
      }
    });
    
    return sectors;
  }

  /**
   * 📝 Generate summary from content
   */
  private generateSummary(content: string): string {
    const words = content.split(' ').slice(0, 50);
    return words.join(' ') + '...';
  }

  /**
   * 🎯 Detect industry from content
   */
  private detectIndustryFromContent(content: string): string {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('retail')) return 'retail';
    if (lowerContent.includes('healthcare')) return 'healthcare';
    if (lowerContent.includes('finance')) return 'finance';
    if (lowerContent.includes('education')) return 'education';
    if (lowerContent.includes('government')) return 'government';
    if (lowerContent.includes('logistics')) return 'logistics';
    if (lowerContent.includes('manufacturing')) return 'manufacturing';
    if (lowerContent.includes('hospitality')) return 'hospitality';
    
    return 'tech_telecom'; // Default
  }

  /**
   * 🔍 Search uploaded documents for insights
   */
  public searchUploadedDocuments(query: string): UploadedDocument[] {
    const lowerQuery = query.toLowerCase();
    return this.memory.uploadedDocuments.filter(doc => 
      doc.name.toLowerCase().includes(lowerQuery) ||
      doc.extractedData.rawText.toLowerCase().includes(lowerQuery) ||
      doc.extractedData.summary.toLowerCase().includes(lowerQuery) ||
      doc.extractedData.insights.some(insight => insight.toLowerCase().includes(lowerQuery)) ||
      doc.extractedData.trends.some(trend => trend.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * 📊 Get document analytics
   */
  public getDocumentAnalytics(): any {
    const docs = this.memory.uploadedDocuments;
    return {
      totalDocuments: docs.length,
      totalInsights: docs.reduce((sum, doc) => sum + doc.extractedData.insights.length, 0),
      totalTrends: docs.reduce((sum, doc) => sum + doc.extractedData.trends.length, 0),
      industries: Array.from(new Set(docs.map(doc => doc.industry))),
      recentUploads: docs.slice(-5).map(doc => ({
        name: doc.name,
        uploadedAt: doc.uploadedAt,
        insights: doc.extractedData.insights.length
      }))
    };
  }

  /**
   * 🔍 Get relevant document insights for a query
   */
  private getRelevantDocumentInsights(query: string): string[] {
    const relevantDocs = this.searchUploadedDocuments(query);
    const insights: string[] = [];
    
    // Get insights from relevant documents
    relevantDocs.forEach(doc => {
      // Add key insights
      doc.extractedData.insights.slice(0, 2).forEach(insight => {
        insights.push(insight);
      });
      
      // Add relevant trends
      doc.extractedData.trends.slice(0, 1).forEach(trend => {
        insights.push(trend);
      });
    });
    
    // If no specific matches, get recent insights
    if (insights.length === 0 && this.memory.uploadedDocuments.length > 0) {
      const recentDoc = this.memory.uploadedDocuments[this.memory.uploadedDocuments.length - 1];
      insights.push(`Recent insight from ${recentDoc.name}: ${recentDoc.extractedData.summary}`);
    }
    
    return insights.slice(0, 3); // Limit to 3 insights to avoid overwhelming
  }

  /**
   * 🧠 Get memory
   */
  public getMemory(): JammyMemory {
    return this.memory;
  }

  /**
   * 💾 Store conversation
   */
  private storeConversation(message: string, response: string, industry: string, confidence: number) {
    this.memory.conversations.push({ 
      message, 
      response, 
      timestamp: new Date().toISOString(), 
      industry, 
      confidence 
    });
    
    if (this.memory.conversations.length > 10) {
      this.memory.conversations.shift(); // Keep only the last 10 conversations
    }
    
    this.saveMemory();
  }

  /**
   * 💾 Save memory
   */
  private saveMemory() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('jammyMemory', JSON.stringify(this.memory));
    }
  }

  /**
   * 📖 Load memory
   */
  private loadMemory() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedMemory = localStorage.getItem('jammyMemory');
      if (savedMemory) {
        this.memory = JSON.parse(savedMemory);
      }
    }
  }

  /**
   * 🔄 Reset memory
   */
  public resetMemory() {
    this.memory = {
      conversations: [],
      learnedPatterns: [],
      knowledgeBase: [],
      userPreferences: {},
      uploadedDocuments: [],
    };
    this.saveMemory();
  }

  /**
   * 📊 Get system status
   */
  public getStatus() {
    return {
      jammy: {
        status: 'operational',
        memory: {
          conversations: this.memory.conversations.length,
          learnedPatterns: this.memory.learnedPatterns.length,
          knowledgeBase: this.memory.knowledgeBase.length
        },
        capabilities: [
          'Intelligent content generation',
          'Media asset creation',
          'Learning from uploads',
          'UAE market intelligence',
          'Style pattern recognition',
          'Conversation memory',
          'Continuous improvement'
        ]
      },
      communication: 'operational',
      webIntelligence: 'operational',
      chinchilla: 'operational'
    };
  }
}

// Export singleton instance
export const jammyAI = new JammyAI();