// Smart Execution Engine - Jammy's logical process flow
// This system orchestrates all components to execute intelligent responses

import { KnowledgeQuery, KnowledgeResponse, knowledgeProcessor } from './knowledge-processor';
import { DecisionContext, DecisionResult, decisionEngine } from './decision-engine';
import { LearningMemorySystem } from './learning-memory';
import { creativeImageGenerator } from './creative-image-generator';
import { templateLearningEngine } from './template-learning-engine';

export interface ExecutionResult {
  success: boolean;
  response: string;
  mediaAssets: any[];
  learningApplied: boolean;
  confidence: number;
  reasoning: string;
  executionTime: number;
  suggestions: string[];
}

export interface ExecutionContext {
  query: string;
  industry?: string;
  contentType?: string;
  userPreferences?: Record<string, unknown>;
  conversationHistory?: string[];
  uploadedFiles?: File[];
}

class SmartExecutionEngine {
  private learningMemory: LearningMemorySystem;
  private startTime: number = 0;

  constructor() {
    this.learningMemory = new LearningMemorySystem();
  }

  // Main execution function - Jammy's complete thinking process
  async execute(context: ExecutionContext): Promise<ExecutionResult> {
    this.startTime = Date.now();
    console.log('🚀 Smart Execution Engine starting for:', context.query);
    
    try {
      // Step 1: Process the query with knowledge base
      const knowledgeResponse = await this.processWithKnowledge(context);
      
      // Step 2: Make intelligent decision
      const decision = await this.makeIntelligentDecision(context, knowledgeResponse);
      
      // Step 3: Apply learning from previous interactions
      const learningApplied = await this.applyLearning(context, knowledgeResponse);
      
      // Step 4: Execute the decision
      const executionResult = await this.executeDecision(context, decision, knowledgeResponse);
      
      // Step 5: Learn from this interaction
      await this.learnFromExecution(context, executionResult);
      
      const executionTime = Date.now() - this.startTime;
      
      console.log('✅ Execution complete in', executionTime, 'ms');
      
      return {
        success: true,
        response: executionResult.response,
        mediaAssets: executionResult.mediaAssets,
        learningApplied,
        confidence: knowledgeResponse.confidence,
        reasoning: executionResult.reasoning,
        executionTime,
        suggestions: executionResult.suggestions
      };
      
    } catch (error) {
      console.error('❌ Execution failed:', error);
      return this.getFallbackResult(context, error);
    }
  }

  // Step 1: Process query with knowledge base
  private async processWithKnowledge(context: ExecutionContext): Promise<KnowledgeResponse> {
    console.log('🧠 Processing with knowledge base...');
    
    const knowledgeQuery: KnowledgeQuery = {
      intent: context.query,
      industry: context.industry,
      contentType: context.contentType,
      context: context.conversationHistory?.join(' | '),
      userPreferences: context.userPreferences
    };
    
    // Use knowledge processor directly
    return await knowledgeProcessor.processQuery(knowledgeQuery);
  }

  // Step 2: Make intelligent decision
  private async makeIntelligentDecision(
    context: ExecutionContext, 
    knowledgeResponse: KnowledgeResponse
  ): Promise<DecisionResult> {
    console.log('🎯 Making intelligent decision...');
    
    const decisionContext: DecisionContext = {
      query: context.query,
      industry: context.industry || 'tech_telecom',
      contentType: context.contentType || 'brochure',
      urgency: this.detectUrgency(context.query),
      complexity: this.detectComplexity(context.query),
      knowledgeResponse,
      userPreferences: context.userPreferences || {},
      conversationHistory: context.conversationHistory || []
    };
    
    return await decisionEngine.makeDecision(decisionContext);
  }

  // Step 3: Apply learning from previous interactions
  private async applyLearning(
    context: ExecutionContext, 
    knowledgeResponse: KnowledgeResponse
  ): Promise<boolean> {
    console.log('🧠 Applying learning from previous interactions...');
    
    const learning = this.learningMemory.applyLearning(
      context.query, 
      context.industry
    );
    
    if (learning.suggestions.length > 0) {
      console.log('💡 Learning suggestions:', learning.suggestions);
      return true;
    }
    
    return false;
  }

  // Step 4: Execute the decision
  private async executeDecision(
    context: ExecutionContext,
    decision: DecisionResult,
    knowledgeResponse: KnowledgeResponse
  ): Promise<{
    response: string;
    mediaAssets: any[];
    reasoning: string;
    suggestions: string[];
  }> {
    console.log('⚡ Executing decision:', decision.action);
    
    const mediaAssets: any[] = [];
    let response = '';
    let reasoning = decision.reasoning;
    const suggestions: string[] = [];
    
    // Execute based on decision
    switch (decision.action) {
      case 'generate_image':
        const imageResult = await this.generateImage(context, knowledgeResponse);
        mediaAssets.push(imageResult);
        response = this.generateImageResponse(context, knowledgeResponse, imageResult);
        reasoning += ' - Generated visual content';
        break;
        
      case 'generate_content':
        response = this.generateContentResponse(context, knowledgeResponse);
        reasoning += ' - Generated text content';
        break;
        
      case 'generate_both':
        const imageResult2 = await this.generateImage(context, knowledgeResponse);
        mediaAssets.push(imageResult2);
        response = this.generateComprehensiveResponse(context, knowledgeResponse, imageResult2);
        reasoning += ' - Generated both visual and text content';
        break;
        
      case 'provide_insights':
        response = this.generateInsightsResponse(context, knowledgeResponse);
        reasoning += ' - Provided detailed insights';
        break;
        
      case 'ask_clarification':
        response = this.generateClarificationResponse(context, knowledgeResponse);
        reasoning += ' - Asked for clarification';
        break;
    }
    
    // Add learning-based suggestions
    const learning = this.learningMemory.applyLearning(context.query, context.industry);
    suggestions.push(...learning.suggestions);
    
    return {
      response,
      mediaAssets,
      reasoning,
      suggestions
    };
  }

  // Generate image based on context and knowledge
  private async generateImage(
    context: ExecutionContext,
    knowledgeResponse: KnowledgeResponse
  ): Promise<any> {
    console.log('🎨 Generating image for', context.industry);
    
    const industry = context.industry || 'tech_telecom';
    const contentType = context.contentType || 'brochure';
    
    // Use creative image generator
    const imageResult = await creativeImageGenerator.generateCreativeImage(
      context.query,
      industry,
      contentType
    );
    
    return {
      id: `image_${Date.now()}`,
      type: 'image',
      title: imageResult.title,
      industry: industry,
      content: context.query,
      fileUrl: imageResult.url,
      generatedAt: new Date().toISOString(),
      styleUsed: `Creative (${Math.round(imageResult.creativityScore * 100)}%)`
    };
  }

  // Generate response for image generation
  private generateImageResponse(
    context: ExecutionContext,
    knowledgeResponse: KnowledgeResponse,
    imageResult: any
  ): string {
    const industry = context.industry || 'tech_telecom';
    const industryName = this.getIndustryDisplayName(industry);
    
    return `I've generated a creative visual representation for the ${industryName} sector. This image showcases e&'s solutions and capabilities for your industry.

## Learning Insights
• I've had ${this.learningMemory.getMemoryStats().totalMemories} interactions with you
• Generated with ${Math.round(imageResult.creativityScore * 100)}% creativity score
• Applied learned patterns from ${templateLearningEngine.getLearningStats().totalTemplates} templates

The visual includes industry-specific elements and follows e& brand guidelines for professional presentation.`;
  }

  // Generate comprehensive response (both content and image)
  private generateComprehensiveResponse(
    context: ExecutionContext,
    knowledgeResponse: KnowledgeResponse,
    imageResult: any
  ): string {
    const industry = context.industry || 'tech_telecom';
    const industryName = this.getIndustryDisplayName(industry);
    
    let response = `I've created a comprehensive solution for the ${industryName} sector, including both visual and detailed content.

## Market Analysis
${knowledgeResponse.industryInsights ? `• Sector Goals: ${knowledgeResponse.industryInsights.sector_goals?.join(', ')}` : ''}
${knowledgeResponse.painPoints.length > 0 ? `• Key Challenges: ${knowledgeResponse.painPoints.join(', ')}` : ''}

## Recommended Solutions
${knowledgeResponse.relevantProducts.slice(0, 3).map(product => 
  `• **${product.name}**: ${product.short_desc}`
).join('\n')}

## Visual Content
I've also generated a creative visual representation that showcases these solutions with industry-specific design elements.`;

    return response;
  }

  // Generate content-only response
  private generateContentResponse(
    context: ExecutionContext,
    knowledgeResponse: KnowledgeResponse
  ): string {
    const industry = context.industry || 'tech_telecom';
    const industryName = this.getIndustryDisplayName(industry);
    
    return `Based on my analysis of the ${industryName} sector, here's what I recommend:

## Industry Overview
${knowledgeResponse.industryInsights ? `• Sector Goals: ${knowledgeResponse.industryInsights.sector_goals?.join(', ')}` : ''}
${knowledgeResponse.painPoints.length > 0 ? `• Key Challenges: ${knowledgeResponse.painPoints.join(', ')}` : ''}

## Recommended Solutions
${knowledgeResponse.relevantProducts.slice(0, 5).map(product => 
  `• **${product.name}**: ${product.short_desc}`
).join('\n')}

## Next Steps
${knowledgeResponse.gtmPlays.length > 0 ? 
  `Consider these GTM strategies: ${knowledgeResponse.gtmPlays.map(play => play.hypothesis).join('; ')}` :
  'I recommend scheduling a consultation to discuss specific requirements.'}`;
  }

  // Generate insights response
  private generateInsightsResponse(
    context: ExecutionContext,
    knowledgeResponse: KnowledgeResponse
  ): string {
    const industry = context.industry || 'tech_telecom';
    const industryName = this.getIndustryDisplayName(industry);
    
    return `## ${industryName} Market Insights

### Current Market Trends
${knowledgeResponse.industryInsights ? `• **Sector Goals**: ${knowledgeResponse.industryInsights.sector_goals?.join(', ')}` : ''}
${knowledgeResponse.painPoints.length > 0 ? `• **Pain Points**: ${knowledgeResponse.painPoints.join(', ')}` : ''}

### e& Solutions Portfolio
${knowledgeResponse.relevantProducts.slice(0, 5).map(product => 
  `• **${product.name}**: ${product.short_desc}`
).join('\n')}

### Strategic Recommendations
${knowledgeResponse.gtmPlays.length > 0 ? 
  knowledgeResponse.gtmPlays.map(play => 
    `• **${play.hypothesis}**: ${play.recommend?.join(', ')}`
  ).join('\n') :
  'Based on current market analysis, I recommend focusing on digital transformation and connectivity solutions.'}

### Learning Applied
I've applied insights from ${this.learningMemory.getMemoryStats().totalMemories} previous interactions to provide this analysis.`;
  }

  // Generate clarification response
  private generateClarificationResponse(
    context: ExecutionContext,
    knowledgeResponse: KnowledgeResponse
  ): string {
    return `I'd like to provide you with the most accurate and relevant information. Could you help me understand:

• **Specific industry focus**: Which sector are you most interested in?
• **Content type**: Are you looking for visual content, detailed analysis, or both?
• **Use case**: How will this content be used (presentation, marketing, internal planning)?

This will help me generate exactly what you need with higher confidence and relevance.`;
  }

  // Step 5: Learn from this execution
  private async learnFromExecution(
    context: ExecutionContext,
    result: any
  ): Promise<void> {
    console.log('📚 Learning from this execution...');
    
    // Store the interaction
    this.learningMemory.learnFromInteraction(
      context.query,
      result.response,
      context.industry || 'general',
      result.success,
      context.conversationHistory?.join(' | ')
    );
    
    // Learn from uploaded files if any
    if (context.uploadedFiles && context.uploadedFiles.length > 0) {
      console.log('📁 Learning from uploaded files...');
      // This would integrate with the file learning system
    }
  }

  // Helper methods
  private detectUrgency(query: string): 'low' | 'medium' | 'high' {
    const urgentKeywords = ['urgent', 'asap', 'immediately', 'quick', 'emergency', 'now'];
    const mediumKeywords = ['soon', 'today', 'this week', 'priority'];
    
    if (urgentKeywords.some(keyword => query.toLowerCase().includes(keyword))) {
      return 'high';
    }
    if (mediumKeywords.some(keyword => query.toLowerCase().includes(keyword))) {
      return 'medium';
    }
    return 'low';
  }

  private detectComplexity(query: string): 'simple' | 'moderate' | 'complex' {
    const complexKeywords = ['comprehensive', 'detailed', 'thorough', 'complete', 'extensive', 'analysis'];
    const simpleKeywords = ['simple', 'basic', 'quick', 'brief', 'overview'];
    
    if (complexKeywords.some(keyword => query.toLowerCase().includes(keyword))) {
      return 'complex';
    }
    if (simpleKeywords.some(keyword => query.toLowerCase().includes(keyword))) {
      return 'simple';
    }
    return 'moderate';
  }

  private getIndustryDisplayName(industry: string): string {
    const industryNames: Record<string, string> = {
      'retail': 'Retail',
      'education': 'Education',
      'healthcare': 'Healthcare',
      'government': 'Government',
      'finance': 'Finance',
      'tech_telecom': 'Technology & Telecom',
      'manufacturing': 'Manufacturing',
      'logistics': 'Logistics',
      'agriculture': 'Agriculture',
      'hospitality': 'Hospitality'
    };
    
    return industryNames[industry] || 'Business';
  }

  private getFallbackResult(context: ExecutionContext, error: any): ExecutionResult {
    return {
      success: false,
      response: `I apologize, but I encountered an issue processing your request. Please try rephrasing your question or contact support if the problem persists.`,
      mediaAssets: [],
      learningApplied: false,
      confidence: 0.1,
      reasoning: `Error: ${error.message}`,
      executionTime: Date.now() - this.startTime,
      suggestions: ['Try rephrasing your question', 'Check your internet connection', 'Contact support if issue persists']
    };
  }

  // Get execution statistics
  getExecutionStats(): {
    totalExecutions: number;
    successRate: number;
    averageExecutionTime: number;
    learningProgress: any;
  } {
    const memoryStats = this.learningMemory.getMemoryStats();
    
    return {
      totalExecutions: memoryStats.totalMemories,
      successRate: memoryStats.averageConfidence,
      averageExecutionTime: 0, // Would track this in real implementation
      learningProgress: memoryStats
    };
  }
}

export const smartExecutionEngine = new SmartExecutionEngine();
