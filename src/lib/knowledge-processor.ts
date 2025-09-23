// Knowledge Base Processor - Jammy's brain for understanding GTM_CONTEXT
// This system gives Jammy deep understanding of e& business intelligence

import { GTM_CONTEXT } from './data/gtm-context';

export interface KnowledgeQuery {
  intent: string;
  industry?: string;
  contentType?: string;
  context?: string;
  userPreferences?: Record<string, unknown>;
}

export interface KnowledgeResponse {
  relevantProducts: any[];
  industryInsights: any;
  gtmPlays: any[];
  painPoints: string[];
  solutions: string[];
  confidence: number;
  reasoning: string;
}

export interface LearningMemory {
  id: string;
  type: 'interaction' | 'preference' | 'pattern' | 'feedback';
  content: string;
  industry?: string;
  context?: string;
  timestamp: string;
  importance: number; // 1-10 scale
  applied: boolean;
}

class KnowledgeProcessor {
  private learningMemory: LearningMemory[] = [];
  private userPreferences: Record<string, unknown> = {};
  private conversationHistory: string[] = [];

  // Main intelligence processor - Jammy's thinking engine
  async processQuery(query: KnowledgeQuery): Promise<KnowledgeResponse> {
    console.log('🧠 Knowledge Processor analyzing query:', query.intent);
    
    try {
      // Step 1: Analyze the query intent and context
      const analysis = this.analyzeQueryIntent(query);
      
      // Step 2: Search knowledge base for relevant information
      const knowledgeResults = this.searchKnowledgeBase(analysis);
      
      // Step 3: Apply learning from previous interactions
      const learnedInsights = this.applyLearning(analysis);
      
      // Step 4: Generate intelligent response
      const response = this.generateIntelligentResponse(analysis, knowledgeResults, learnedInsights);
      
      // Step 5: Store this interaction for future learning
      this.storeInteraction(query, response);
      
      console.log('✅ Knowledge processing complete, confidence:', response.confidence);
      return response;
      
    } catch (error) {
      console.error('❌ Knowledge processing failed:', error);
      return this.getFallbackResponse(query);
    }
  }

  // Analyze what the user really wants
  private analyzeQueryIntent(query: KnowledgeQuery): {
    primaryIntent: string;
    industry: string;
    contentType: string;
    urgency: 'low' | 'medium' | 'high';
    complexity: 'simple' | 'moderate' | 'complex';
    keywords: string[];
  } {
    const intent = query.intent.toLowerCase();
    
    // Detect primary intent
    const intents = {
      'create_content': ['create', 'generate', 'make', 'build', 'design'],
      'analyze_market': ['analyze', 'insights', 'market', 'industry', 'trends'],
      'find_solutions': ['solution', 'help', 'recommend', 'suggest', 'what should'],
      'compare_products': ['compare', 'difference', 'vs', 'versus', 'better'],
      'get_info': ['what is', 'tell me', 'explain', 'information', 'details']
    };
    
    let primaryIntent = 'get_info';
    for (const [intentKey, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => intent.includes(keyword))) {
        primaryIntent = intentKey;
        break;
      }
    }
    
    // Detect industry
    const industryKeywords = {
      'government': ['government', 'gov', 'public', 'agency', 'ministry'],
      'education': ['education', 'school', 'university', 'college', 'learning', 'student'],
      'finance': ['finance', 'banking', 'bank', 'financial', 'fintech'],
      'retail': ['retail', 'store', 'shop', 'commerce', 'customer', 'sales'],
      'logistics': ['logistics', 'shipping', 'delivery', 'supply chain', 'warehouse'],
      'manufacturing': ['manufacturing', 'factory', 'production', 'industrial'],
      'agriculture': ['agriculture', 'farming', 'crop', 'agricultural'],
      'tech_telecom': ['tech', 'technology', 'telecom', 'digital', 'software'],
      'healthcare': ['healthcare', 'health', 'medical', 'hospital', 'clinic'],
      'hospitality': ['hospitality', 'hotel', 'restaurant', 'tourism', 'guest']
    };
    
    let industry = query.industry || 'tech_telecom';
    for (const [industryKey, keywords] of Object.entries(industryKeywords)) {
      if (keywords.some(keyword => intent.includes(keyword))) {
        industry = industryKey;
        break;
      }
    }
    
    // Detect content type
    const contentTypes = {
      'image': ['image', 'picture', 'visual', 'graphic', 'design'],
      'brochure': ['brochure', 'flyer', 'leaflet', 'pamphlet'],
      'whitepaper': ['whitepaper', 'report', 'study', 'analysis', 'research'],
      'presentation': ['presentation', 'deck', 'slides', 'pitch'],
      'email': ['email', 'edm', 'newsletter', 'campaign'],
      'sms': ['sms', 'text', 'message', 'notification']
    };
    
    let contentType = query.contentType || 'brochure';
    for (const [typeKey, keywords] of Object.entries(contentTypes)) {
      if (keywords.some(keyword => intent.includes(keyword))) {
        contentType = typeKey;
        break;
      }
    }
    
    // Detect urgency and complexity
    const urgentKeywords = ['urgent', 'asap', 'immediately', 'quick', 'emergency'];
    const complexKeywords = ['comprehensive', 'detailed', 'thorough', 'complete', 'extensive'];
    
    const urgency = urgentKeywords.some(keyword => intent.includes(keyword)) ? 'high' : 'medium';
    const complexity = complexKeywords.some(keyword => intent.includes(keyword)) ? 'complex' : 'moderate';
    
    // Extract keywords
    const keywords = intent.split(' ').filter(word => word.length > 3);
    
    return {
      primaryIntent,
      industry,
      contentType,
      urgency,
      complexity,
      keywords
    };
  }

  // Search the knowledge base for relevant information
  private searchKnowledgeBase(analysis: any): {
    products: any[];
    sector: any;
    gtmPlays: any[];
    painPoints: string[];
    solutions: string[];
  } {
    console.log('🔍 Searching knowledge base for:', analysis.industry);
    
    // Find relevant products
    const relevantProducts = this.findRelevantProducts(analysis);
    
    // Find sector information
    const sector = GTM_CONTEXT.sectors.find(s => s.key === analysis.industry) || GTM_CONTEXT.sectors[0];
    
    // Find GTM plays for this sector
    const gtmPlays = sector.gtm_plays || [];
    
    // Extract pain points and solutions
    const painPoints = sector.pain_points || [];
    const solutions = this.extractSolutions(relevantProducts);
    
    return {
      products: relevantProducts,
      sector,
      gtmPlays,
      painPoints,
      solutions
    };
  }

  // Find products relevant to the query
  private findRelevantProducts(analysis: any): any[] {
    const relevantProducts: any[] = [];
    
    // Search through all product categories
    Object.values(GTM_CONTEXT.offerings.categories).forEach((category: any) => {
      if (category.items) {
        category.items.forEach((product: any) => {
          // Check if product matches industry or keywords
          const matchesIndustry = product.target_segments?.some((segment: string) => 
            segment.toLowerCase().includes(analysis.industry) || 
            analysis.industry.includes(segment.toLowerCase())
          );
          
          const matchesKeywords = analysis.keywords.some((keyword: string) =>
            product.name.toLowerCase().includes(keyword) ||
            product.short_desc.toLowerCase().includes(keyword) ||
            product.key_features?.some((feature: string) => feature.toLowerCase().includes(keyword))
          );
          
          if (matchesIndustry || matchesKeywords) {
            relevantProducts.push({
              ...product,
              category: category.key,
              relevanceScore: this.calculateRelevanceScore(product, analysis)
            });
          }
        });
      }
    });
    
    // Sort by relevance score
    return relevantProducts.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 5);
  }

  // Calculate how relevant a product is to the query
  private calculateRelevanceScore(product: any, analysis: any): number {
    let score = 0;
    
    // Industry match
    if (product.target_segments?.some((segment: string) => 
      segment.toLowerCase().includes(analysis.industry))) {
      score += 3;
    }
    
    // Keyword matches
    analysis.keywords.forEach((keyword: string) => {
      if (product.name.toLowerCase().includes(keyword)) score += 2;
      if (product.short_desc.toLowerCase().includes(keyword)) score += 1;
      if (product.key_features?.some((feature: string) => feature.toLowerCase().includes(keyword))) score += 1;
    });
    
    // Content type match
    if (analysis.contentType === 'image' && product.links?.brochure) score += 1;
    if (analysis.contentType === 'brochure' && product.links?.brochure) score += 2;
    
    return score;
  }

  // Extract solutions from products
  private extractSolutions(products: any[]): string[] {
    const solutions: string[] = [];
    
    products.forEach(product => {
      if (product.key_features) {
        solutions.push(...product.key_features);
      }
      if (product.short_desc) {
        solutions.push(product.short_desc);
      }
    });
    
    return [...new Set(solutions)]; // Remove duplicates
  }

  // Apply learning from previous interactions
  private applyLearning(analysis: any): {
    preferences: Record<string, unknown>;
    patterns: string[];
    insights: string[];
  } {
    console.log('🧠 Applying learning from', this.learningMemory.length, 'previous interactions');
    
    // Get user preferences
    const preferences = { ...this.userPreferences };
    
    // Find relevant patterns
    const patterns = this.learningMemory
      .filter(memory => 
        memory.industry === analysis.industry || 
        memory.type === 'pattern'
      )
      .map(memory => memory.content)
      .slice(0, 3);
    
    // Generate insights from conversation history
    const insights = this.generateInsightsFromHistory(analysis);
    
    return {
      preferences,
      patterns,
      insights
    };
  }

  // Generate insights from conversation history
  private generateInsightsFromHistory(analysis: any): string[] {
    const insights: string[] = [];
    
    // Add recent conversation context
    if (this.conversationHistory.length > 0) {
      insights.push(`Based on our previous conversation about ${this.conversationHistory[this.conversationHistory.length - 1]}`);
    }
    
    // Add industry-specific insights
    const industryInsights = this.getIndustryInsights(analysis.industry);
    insights.push(...industryInsights);
    
    return insights;
  }

  // Get industry-specific insights
  private getIndustryInsights(industry: string): string[] {
    const insights: Record<string, string[]> = {
      'retail': [
        'Retail sector is focusing on digital transformation and customer experience',
        'Point of sale systems and payment solutions are high priority',
        'Mobile commerce and omnichannel strategies are trending'
      ],
      'education': [
        'Education sector needs reliable connectivity for hybrid learning',
        'Student device management and content filtering are key concerns',
        'Campus-wide Wi-Fi and security are essential'
      ],
      'healthcare': [
        'Healthcare sector requires secure, compliant solutions',
        'Telemedicine and remote patient monitoring are growing',
        'Data protection and HIPAA compliance are critical'
      ],
      'government': [
        'Government sector needs secure, reliable infrastructure',
        'Citizen services digitization is a priority',
        'Compliance and data residency requirements are strict'
      ]
    };
    
    return insights[industry] || [
      'Digital transformation is a key focus across all sectors',
      'Reliable connectivity and security are essential',
      'Cost optimization and efficiency are important considerations'
    ];
  }

  // Generate intelligent response
  private generateIntelligentResponse(
    analysis: any, 
    knowledgeResults: any, 
    learnedInsights: any
  ): KnowledgeResponse {
    const confidence = this.calculateConfidence(analysis, knowledgeResults);
    
    let reasoning = `Analyzed query for ${analysis.industry} industry, found ${knowledgeResults.products.length} relevant products`;
    
    if (learnedInsights.insights.length > 0) {
      reasoning += `, applied ${learnedInsights.insights.length} learned insights`;
    }
    
    if (confidence > 0.8) {
      reasoning += ', high confidence based on strong matches';
    } else if (confidence > 0.6) {
      reasoning += ', medium confidence with some uncertainty';
    } else {
      reasoning += ', lower confidence, may need clarification';
    }
    
    return {
      relevantProducts: knowledgeResults.products,
      industryInsights: knowledgeResults.sector,
      gtmPlays: knowledgeResults.gtmPlays,
      painPoints: knowledgeResults.painPoints,
      solutions: knowledgeResults.solutions,
      confidence,
      reasoning
    };
  }

  // Calculate confidence score
  private calculateConfidence(analysis: any, knowledgeResults: any): number {
    let confidence = 0.5; // Base confidence
    
    // Industry match
    if (knowledgeResults.sector) confidence += 0.2;
    
    // Product matches
    if (knowledgeResults.products.length > 0) confidence += 0.2;
    if (knowledgeResults.products.length > 2) confidence += 0.1;
    
    // GTM plays available
    if (knowledgeResults.gtmPlays.length > 0) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  // Store interaction for learning
  private storeInteraction(query: KnowledgeQuery, response: KnowledgeResponse): void {
    const memory: LearningMemory = {
      id: `memory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'interaction',
      content: query.intent,
      industry: query.industry,
      context: query.context,
      timestamp: new Date().toISOString(),
      importance: response.confidence > 0.8 ? 8 : 5,
      applied: true
    };
    
    this.learningMemory.push(memory);
    this.conversationHistory.push(query.intent);
    
    // Keep only last 50 interactions
    if (this.learningMemory.length > 50) {
      this.learningMemory = this.learningMemory.slice(-50);
    }
    
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }
    
    console.log('💾 Stored interaction for learning');
  }

  // Get fallback response when processing fails
  private getFallbackResponse(query: KnowledgeQuery): KnowledgeResponse {
    return {
      relevantProducts: [],
      industryInsights: GTM_CONTEXT.sectors[0],
      gtmPlays: [],
      painPoints: ['Connectivity challenges', 'Digital transformation needs'],
      solutions: ['e& Business Solutions', 'Reliable connectivity'],
      confidence: 0.3,
      reasoning: 'Fallback response due to processing error'
    };
  }

  // Get learning statistics
  getLearningStats(): {
    totalInteractions: number;
    industryCoverage: string[];
    averageConfidence: number;
    recentPatterns: string[];
  } {
    const industries = [...new Set(this.learningMemory.map(m => m.industry).filter(Boolean))];
    const avgConfidence = this.learningMemory.length > 0 
      ? this.learningMemory.reduce((sum, m) => sum + m.importance, 0) / this.learningMemory.length / 10
      : 0;
    
    const recentPatterns = this.learningMemory
      .filter(m => m.type === 'pattern')
      .slice(-5)
      .map(m => m.content);
    
    return {
      totalInteractions: this.learningMemory.length,
      industryCoverage: industries,
      averageConfidence: avgConfidence,
      recentPatterns
    };
  }
}

export const knowledgeProcessor = new KnowledgeProcessor();
