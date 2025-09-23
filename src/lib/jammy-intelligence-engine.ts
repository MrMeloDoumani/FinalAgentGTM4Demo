// Jammy Intelligence Engine - The structured thinking framework
// Implements: Analyze → Search → Define → Explain → Prove → Anticipate → Create → Suggest

import { GTM_CONTEXT } from './data/gtm-context';

export interface IntelligenceAnalysis {
  intent: string;
  urgency: 'low' | 'medium' | 'high';
  complexity: 'simple' | 'moderate' | 'complex';
  industry: string;
  context: string;
}

export interface KnowledgeSearchResult {
  internal: any[];
  userData: any[];
  webSearch: any[];
  confidence: number;
}

export interface StructuredResponse {
  analysis: IntelligenceAnalysis;
  knowledgeSearch: KnowledgeSearchResult;
  definition: string;
  explanation: string;
  evidence: string[];
  anticipation: string[];
  roadmap: string[];
  recommendations: string[];
  needsVisual: boolean;
}

class JammyIntelligenceEngine {
  private userKnowledgeBase: any[] = [];
  private conversationHistory: any[] = [];

  // Main intelligence processing method
  async processIntelligently(message: string, context?: any): Promise<StructuredResponse> {
    console.log('🧠 Jammy Intelligence Engine processing:', message);

    // Step 1: ANALYZE what is being received
    const analysis = this.analyzeRequest(message, context);
    console.log('📊 Analysis complete:', analysis);

    // Step 2: SEARCH knowledge base (Internal → User Data → Web)
    const knowledgeSearch = await this.searchKnowledge(message, analysis);
    console.log('🔍 Knowledge search complete:', knowledgeSearch.confidence);

    // Step 3: DEFINE the problem/opportunity
    const definition = this.defineProblem(message, analysis, knowledgeSearch);
    console.log('🎯 Problem defined:', definition);

    // Step 4: EXPLAIN context and implications
    const explanation = this.explainContext(analysis, knowledgeSearch);
    console.log('💡 Context explained');

    // Step 5: PROVE with evidence
    const evidence = this.provideEvidence(knowledgeSearch, analysis);
    console.log('📈 Evidence provided:', evidence.length, 'points');

    // Step 6: ANTICIPATE future scenarios
    const anticipation = this.anticipateScenarios(analysis, knowledgeSearch);
    console.log('🔮 Anticipation complete:', anticipation.length, 'scenarios');

    // Step 7: CREATE roadmap
    const roadmap = this.createRoadmap(analysis, knowledgeSearch);
    console.log('🗺️ Roadmap created:', roadmap.length, 'steps');

    // Step 8: SUGGEST visual generation
    const needsVisual = this.shouldGenerateVisual(message, analysis);
    console.log('🎨 Visual needed:', needsVisual);

    return {
      analysis,
      knowledgeSearch,
      definition,
      explanation,
      evidence,
      anticipation,
      roadmap,
      recommendations: this.generateRecommendations(analysis, knowledgeSearch),
      needsVisual
    };
  }

  private analyzeRequest(message: string, context?: any): IntelligenceAnalysis {
    const lowerMessage = message.toLowerCase();
    
    // Determine urgency
    let urgency: 'low' | 'medium' | 'high' = 'medium';
    if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('immediately')) {
      urgency = 'high';
    } else if (lowerMessage.includes('when you have time') || lowerMessage.includes('no rush')) {
      urgency = 'low';
    }

    // Determine complexity
    let complexity: 'simple' | 'moderate' | 'complex' = 'moderate';
    if (lowerMessage.includes('simple') || lowerMessage.includes('basic') || lowerMessage.includes('quick')) {
      complexity = 'simple';
    } else if (lowerMessage.includes('comprehensive') || lowerMessage.includes('detailed') || lowerMessage.includes('complex')) {
      complexity = 'complex';
    }

    // Determine industry
    const industry = this.detectIndustry(lowerMessage, context?.industry);

    // Determine intent
    const intent = this.detectIntent(lowerMessage);

    return {
      intent,
      urgency,
      complexity,
      industry,
      context: context || 'general inquiry'
    };
  }

  private detectIndustry(message: string, existingIndustry?: string): string {
    // If industry is already set by web intelligence, use it
    if (existingIndustry && existingIndustry !== 'retail') {
      console.log('🎯 Using existing industry from web intelligence:', existingIndustry);
      return existingIndustry;
    }

    const industries = {
      'retail': ['retail', 'shopping', 'store', 'commerce'],
      'education': ['education', 'school', 'university', 'learning', 'student'],
      'healthcare': ['healthcare', 'medical', 'hospital', 'health', 'patient'],
      'finance': ['finance', 'banking', 'financial', 'money', 'investment'],
      'manufacturing': ['manufacturing', 'production', 'factory', 'industrial'],
      'government': ['government', 'public', 'civic', 'municipal'],
      'hospitality': ['hospitality', 'hotel', 'restaurant', 'tourism'],
      'logistics': ['logistics', 'shipping', 'transport', 'supply chain'],
      'real_estate': ['real estate', 'property', 'construction', 'building'],
      'tech_telecom': ['tech', 'technology', 'telecom', 'digital', 'software', 'business', 'fiber', 'internet', 'pro']
    };

    for (const [industry, keywords] of Object.entries(industries)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        console.log('🔍 Detected industry:', industry, 'for message:', message);
        return industry;
      }
    }

    console.log('🔍 No specific industry detected, defaulting to tech_telecom');
    return 'tech_telecom'; // Default
  }

  private detectIntent(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Check for negative commands first
    if (lowerMessage.includes('do not') || lowerMessage.includes('don\'t') || lowerMessage.includes('stop')) {
      return 'negative_command';
    }
    
    if (lowerMessage.includes('generate') || lowerMessage.includes('create') || lowerMessage.includes('make')) {
      return 'creation';
    } else if (lowerMessage.includes('analyze') || lowerMessage.includes('insights') || lowerMessage.includes('understand')) {
      return 'analysis';
    } else if (lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('versus')) {
      return 'comparison';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
      return 'assistance';
    } else if (lowerMessage.includes('saved') || lowerMessage.includes('stored') || lowerMessage.includes('files')) {
      return 'retrieval';
    }
    return 'general';
  }

  private async searchKnowledge(message: string, analysis: IntelligenceAnalysis): Promise<KnowledgeSearchResult> {
    // Step 1: Search internal knowledge base
    const internal = this.searchInternalKnowledge(message, analysis);
    
    // Step 2: Search user data
    const userData = this.searchUserData(message, analysis);
    
    // Step 3: Web search (if needed)
    const webSearch = await this.searchWeb(message, analysis);
    
    // Calculate confidence based on results
    const confidence = this.calculateConfidence(internal, userData, webSearch);

    return {
      internal,
      userData,
      webSearch,
      confidence
    };
  }

  private searchInternalKnowledge(message: string, analysis: IntelligenceAnalysis): any[] {
    const results = [];
    const lowerMessage = message.toLowerCase();

    // Search offerings (products and services)
    for (const category of GTM_CONTEXT.offerings.categories) {
      for (const item of category.items) {
        // Check if the product matches the industry or general tech_telecom
        const isIndustryMatch = item.target_segments.includes(industry) || 
                               industry === 'tech_telecom' || 
                               lowerMessage.includes('product') ||
                               lowerMessage.includes('tech') ||
                               lowerMessage.includes('telecom');
        
        if (isIndustryMatch && (lowerMessage.includes(item.name.toLowerCase()) || 
            (item.key_features && item.key_features.some((feature: string) => lowerMessage.includes(feature.toLowerCase()))))) {
          results.push({ type: 'offering', data: item, relevance: 0.9 });
        }
      }
    }

    // Search sectors
    for (const sector of GTM_CONTEXT.sectors) {
      if (lowerMessage.includes(sector.name.toLowerCase()) || 
          sector.sector_goals.some((goal: string) => lowerMessage.includes(goal.toLowerCase()))) {
        results.push({ type: 'sector', data: sector, relevance: 0.8 });
      }
    }

    // Search partnerships
    if (GTM_CONTEXT.partnerships && Array.isArray(GTM_CONTEXT.partnerships)) {
      for (const partnership of GTM_CONTEXT.partnerships) {
        if (lowerMessage.includes(partnership.name.toLowerCase()) || 
            partnership.description.toLowerCase().includes(lowerMessage)) {
          results.push({ type: 'partnership', data: partnership, relevance: 0.7 });
        }
      }
    }

    return results.sort((a, b) => b.relevance - a.relevance);
  }

  private searchUserData(message: string, analysis: IntelligenceAnalysis): any[] {
    const results = [];
    const lowerMessage = message.toLowerCase();

    // Search user knowledge base
    for (const item of this.userKnowledgeBase) {
      if (item.content && item.content.toLowerCase().includes(lowerMessage)) {
        results.push({ type: 'user_data', data: item, relevance: 0.8 });
      }
    }

    // Search conversation history
    for (const conversation of this.conversationHistory) {
      if (conversation.content && conversation.content.toLowerCase().includes(lowerMessage)) {
        results.push({ type: 'conversation', data: conversation, relevance: 0.6 });
      }
    }

    return results.sort((a, b) => b.relevance - a.relevance);
  }

  private async searchWeb(message: string, analysis: IntelligenceAnalysis): Promise<any[]> {
    // For now, return mock web search results
    // In production, integrate with Google Custom Search API
    return [
      { type: 'web', data: { title: 'Market Trends', content: 'Latest industry insights' }, relevance: 0.5 }
    ];
  }

  private calculateConfidence(internal: any[], userData: any[], webSearch: any[]): number {
    let confidence = 0;
    
    if (internal.length > 0) confidence += 0.6;
    if (userData.length > 0) confidence += 0.3;
    if (webSearch.length > 0) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  private defineProblem(message: string, analysis: IntelligenceAnalysis, knowledgeSearch: KnowledgeSearchResult): string {
    const industry = analysis.industry;
    const intent = analysis.intent;
    
    if (intent === 'negative_command') {
      return `User has requested to stop or avoid certain actions. Understanding and respecting user preferences.`;
    } else if (intent === 'creation') {
      return `Create ${analysis.complexity} ${industry} solution based on user requirements`;
    } else if (intent === 'analysis') {
      return `Analyze ${industry} market opportunities and provide strategic insights`;
    } else if (intent === 'retrieval') {
      return `Retrieve and display saved information, files, or conversations`;
    }
    
    return `Address ${industry} sector inquiry with ${analysis.complexity} complexity`;
  }

  private explainContext(analysis: IntelligenceAnalysis, knowledgeSearch: KnowledgeSearchResult): string {
    const industry = analysis.industry;
    const urgency = analysis.urgency;
    const complexity = analysis.complexity;
    
    let explanation = `Based on your ${urgency} priority ${complexity} request for the ${industry} sector, `;
    
    if (knowledgeSearch.internal.length > 0) {
      explanation += `I found ${knowledgeSearch.internal.length} relevant internal resources. `;
    }
    
    if (knowledgeSearch.userData.length > 0) {
      explanation += `I also have ${knowledgeSearch.userData.length} pieces of your saved data. `;
    }
    
    explanation += `This gives me a ${Math.round(knowledgeSearch.confidence * 100)}% confidence level in my response.`;
    
    return explanation;
  }

  private provideEvidence(knowledgeSearch: KnowledgeSearchResult, analysis: IntelligenceAnalysis): string[] {
    const evidence = [];
    
    // Add internal evidence with more detailed information
    for (const item of knowledgeSearch.internal.slice(0, 3)) {
      if (item.type === 'offering') {
        evidence.push(`**${item.data.name}**: ${item.data.short_desc} - Key features: ${item.data.key_features ? item.data.key_features.slice(0, 2).join(', ') : 'Available'}`);
      } else if (item.type === 'sector') {
        evidence.push(`**${item.data.name} Sector**: ${item.data.sector_goals[0]} - Goals: ${item.data.sector_goals.slice(0, 2).join(', ')}`);
      } else if (item.type === 'partnership') {
        evidence.push(`**${item.data.name} Partnership**: ${item.data.description} - Focus: ${item.data.focus_area}`);
      }
    }
    
    // Add user data evidence
    for (const item of knowledgeSearch.userData.slice(0, 2)) {
      evidence.push(`**Your Data**: ${item.data.content?.substring(0, 100)}...`);
    }
    
    return evidence;
  }

  private anticipateScenarios(analysis: IntelligenceAnalysis, knowledgeSearch: KnowledgeSearchResult): string[] {
    const scenarios = [];
    const industry = analysis.industry;
    
    scenarios.push(`Market growth in ${industry} sector over next 12 months`);
    scenarios.push(`Competitive landscape changes and new entrants`);
    scenarios.push(`Technology adoption trends in ${industry}`);
    scenarios.push(`Regulatory changes affecting ${industry} operations`);
    
    return scenarios;
  }

  private createRoadmap(analysis: IntelligenceAnalysis, knowledgeSearch: KnowledgeSearchResult): string[] {
    const roadmap = [];
    const industry = analysis.industry;
    const urgency = analysis.urgency;
    
    if (urgency === 'high') {
      roadmap.push('Immediate action required - prioritize this request');
    }
    
    roadmap.push(`Research ${industry} market trends and opportunities`);
    roadmap.push('Identify key stakeholders and decision makers');
    roadmap.push('Develop comprehensive solution strategy');
    roadmap.push('Create implementation timeline and milestones');
    roadmap.push('Establish success metrics and KPIs');
    
    return roadmap;
  }

  private shouldGenerateVisual(message: string, analysis: IntelligenceAnalysis): boolean {
    const lowerMessage = message.toLowerCase();
    return lowerMessage.includes('image') || 
           lowerMessage.includes('visual') || 
           lowerMessage.includes('generate') || 
           lowerMessage.includes('create') ||
           lowerMessage.includes('show me');
  }

  private generateRecommendations(analysis: IntelligenceAnalysis, knowledgeSearch: KnowledgeSearchResult): string[] {
    const recommendations = [];
    const industry = analysis.industry;
    
    recommendations.push(`Focus on ${industry} sector-specific solutions`);
    recommendations.push('Leverage e& competitive advantages');
    recommendations.push('Consider partnership opportunities');
    recommendations.push('Develop targeted marketing strategy');
    
    return recommendations;
  }

  // User data management methods
  addUserData(data: any) {
    this.userKnowledgeBase.push({
      ...data,
      timestamp: new Date().toISOString(),
      id: `user_${Date.now()}`
    });
    console.log('📚 User data added to knowledge base');
  }

  addConversation(conversation: any) {
    this.conversationHistory.push({
      ...conversation,
      timestamp: new Date().toISOString(),
      id: `conv_${Date.now()}`
    });
    console.log('💬 Conversation added to history');
  }

  getUserData(query?: string): any[] {
    if (query) {
      return this.userKnowledgeBase.filter(item => 
        item.content && item.content.toLowerCase().includes(query.toLowerCase())
      );
    }
    return this.userKnowledgeBase;
  }

  getConversationHistory(): any[] {
    return this.conversationHistory;
  }
}

export const jammyIntelligenceEngine = new JammyIntelligenceEngine();
