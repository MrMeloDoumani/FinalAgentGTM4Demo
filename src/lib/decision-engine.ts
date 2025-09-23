// Intelligent Decision Engine - Jammy's logic for making smart decisions
// This system gives Jammy clear rules for when to generate what

import { KnowledgeResponse } from './knowledge-processor';

export interface DecisionContext {
  query: string;
  industry: string;
  contentType: string;
  urgency: 'low' | 'medium' | 'high';
  complexity: 'simple' | 'moderate' | 'complex';
  knowledgeResponse: KnowledgeResponse;
  userPreferences: Record<string, unknown>;
  conversationHistory: string[];
}

export interface DecisionResult {
  action: 'generate_image' | 'generate_content' | 'generate_both' | 'ask_clarification' | 'provide_insights';
  priority: 'high' | 'medium' | 'low';
  reasoning: string;
  mediaTypes: string[];
  contentFocus: string;
  industryFocus: string;
  estimatedTime: string;
}

class DecisionEngine {
  private decisionRules: Map<string, Function> = new Map();
  
  constructor() {
    this.initializeDecisionRules();
  }

  // Main decision making function
  async makeDecision(context: DecisionContext): Promise<DecisionResult> {
    console.log('🎯 Decision Engine analyzing context for', context.industry, context.contentType);
    
    try {
      // Step 1: Analyze the context
      const analysis = this.analyzeContext(context);
      
      // Step 2: Apply decision rules
      const decision = this.applyDecisionRules(analysis, context);
      
      // Step 3: Validate and optimize decision
      const optimizedDecision = this.optimizeDecision(decision, context);
      
      console.log('✅ Decision made:', optimizedDecision.action, 'Priority:', optimizedDecision.priority);
      return optimizedDecision;
      
    } catch (error) {
      console.error('❌ Decision making failed:', error);
      return this.getFallbackDecision(context);
    }
  }

  // Initialize decision rules
  private initializeDecisionRules(): void {
    // Rule 1: Image generation rules
    this.decisionRules.set('image_generation', (context: DecisionContext) => {
      const imageKeywords = ['image', 'picture', 'visual', 'graphic', 'design', 'brochure', 'flyer'];
      const hasImageIntent = imageKeywords.some(keyword => 
        context.query.toLowerCase().includes(keyword)
      );
      
      const hasVisualContent = context.contentType === 'image' || context.contentType === 'brochure';
      const hasHighConfidence = context.knowledgeResponse.confidence > 0.7;
      
      return {
        shouldGenerateImage: hasImageIntent || hasVisualContent,
        priority: hasHighConfidence ? 'high' : 'medium',
        reasoning: hasImageIntent ? 'Explicit image request' : 'Content type suggests visual'
      };
    });

    // Rule 2: Content generation rules
    this.decisionRules.set('content_generation', (context: DecisionContext) => {
      const contentKeywords = ['create', 'generate', 'write', 'make', 'build'];
      const hasContentIntent = contentKeywords.some(keyword => 
        context.query.toLowerCase().includes(keyword)
      );
      
      const needsExplanation = context.knowledgeResponse.confidence < 0.6;
      const isComplex = context.complexity === 'complex';
      
      return {
        shouldGenerateContent: hasContentIntent || needsExplanation || isComplex,
        priority: needsExplanation ? 'high' : 'medium',
        reasoning: hasContentIntent ? 'Explicit content request' : 'Need to explain or clarify'
      };
    });

    // Rule 3: Industry-specific rules
    this.decisionRules.set('industry_specific', (context: DecisionContext) => {
      const industryRules: Record<string, any> = {
        'retail': {
          preferredMedia: ['image', 'brochure'],
          focus: 'customer experience and sales',
          urgency: 'high'
        },
        'education': {
          preferredMedia: ['whitepaper', 'presentation'],
          focus: 'learning outcomes and technology',
          urgency: 'medium'
        },
        'healthcare': {
          preferredMedia: ['whitepaper', 'brochure'],
          focus: 'compliance and security',
          urgency: 'high'
        },
        'government': {
          preferredMedia: ['whitepaper', 'presentation'],
          focus: 'security and compliance',
          urgency: 'high'
        }
      };
      
      return industryRules[context.industry] || {
        preferredMedia: ['brochure'],
        focus: 'general business solutions',
        urgency: 'medium'
      };
    });

    // Rule 4: Urgency rules
    this.decisionRules.set('urgency_rules', (context: DecisionContext) => {
      const urgencyRules: Record<string, any> = {
        'high': {
          action: 'generate_both',
          priority: 'high',
          estimatedTime: 'immediate'
        },
        'medium': {
          action: 'generate_image',
          priority: 'medium',
          estimatedTime: '2-3 minutes'
        },
        'low': {
          action: 'ask_clarification',
          priority: 'low',
          estimatedTime: '5-10 minutes'
        }
      };
      
      return urgencyRules[context.urgency] || urgencyRules['medium'];
    });

    // Rule 5: Learning rules
    this.decisionRules.set('learning_rules', (context: DecisionContext) => {
      const hasLowConfidence = context.knowledgeResponse.confidence < 0.5;
      const isNewIndustry = !context.conversationHistory.some(h => 
        h.toLowerCase().includes(context.industry)
      );
      
      return {
        shouldLearn: hasLowConfidence || isNewIndustry,
        shouldAskQuestions: hasLowConfidence,
        reasoning: hasLowConfidence ? 'Low confidence, need more information' : 'New industry, learning opportunity'
      };
    });
  }

  // Analyze the context to understand what's needed
  private analyzeContext(context: DecisionContext): {
    hasImageIntent: boolean;
    hasContentIntent: boolean;
    hasUrgentIntent: boolean;
    hasLearningIntent: boolean;
    industrySpecific: any;
    confidence: number;
  } {
    const query = context.query.toLowerCase();
    
    // Check for image intent
    const imageKeywords = ['image', 'picture', 'visual', 'graphic', 'design', 'brochure', 'flyer'];
    const hasImageIntent = imageKeywords.some(keyword => query.includes(keyword));
    
    // Check for content intent
    const contentKeywords = ['create', 'generate', 'write', 'make', 'build', 'develop'];
    const hasContentIntent = contentKeywords.some(keyword => query.includes(keyword));
    
    // Check for urgent intent
    const urgentKeywords = ['urgent', 'asap', 'immediately', 'quick', 'emergency', 'now'];
    const hasUrgentIntent = urgentKeywords.some(keyword => query.includes(keyword));
    
    // Check for learning intent
    const learningKeywords = ['learn', 'understand', 'explain', 'tell me', 'what is', 'how does'];
    const hasLearningIntent = learningKeywords.some(keyword => query.includes(keyword));
    
    // Get industry-specific rules
    const industrySpecific = this.decisionRules.get('industry_specific')?.(context) || {};
    
    return {
      hasImageIntent,
      hasContentIntent,
      hasUrgentIntent,
      hasLearningIntent,
      industrySpecific,
      confidence: context.knowledgeResponse.confidence
    };
  }

  // Apply decision rules to determine action
  private applyDecisionRules(analysis: any, context: DecisionContext): DecisionResult {
    let action: string = 'generate_content';
    let priority: string = 'medium';
    let reasoning: string = '';
    let mediaTypes: string[] = [];
    let contentFocus: string = 'general';
    let industryFocus: string = context.industry;
    let estimatedTime: string = '2-3 minutes';

    // Rule 1: Urgency takes precedence
    if (analysis.hasUrgentIntent || context.urgency === 'high') {
      action = 'generate_both';
      priority = 'high';
      reasoning = 'Urgent request detected, generating both content and media';
      mediaTypes = ['image', 'brochure'];
      estimatedTime = 'immediate';
    }
    // Rule 2: Learning intent
    else if (analysis.hasLearningIntent || analysis.confidence < 0.5) {
      action = 'provide_insights';
      priority = 'high';
      reasoning = 'Learning request or low confidence, providing detailed insights';
      contentFocus = 'educational';
      estimatedTime = '1-2 minutes';
    }
    // Rule 3: Image intent
    else if (analysis.hasImageIntent || context.contentType === 'image') {
      action = 'generate_image';
      priority = 'high';
      reasoning = 'Image generation requested';
      mediaTypes = ['image'];
      estimatedTime = '1-2 minutes';
    }
    // Rule 4: Content intent
    else if (analysis.hasContentIntent) {
      action = 'generate_content';
      priority = 'medium';
      reasoning = 'Content generation requested';
      contentFocus = analysis.industrySpecific.focus || 'general';
      estimatedTime = '2-3 minutes';
    }
    // Rule 5: Industry-specific defaults
    else {
      const industryRules = analysis.industrySpecific;
      action = 'generate_both';
      priority = industryRules.urgency || 'medium';
      reasoning = `Industry-specific approach for ${context.industry}`;
      mediaTypes = industryRules.preferredMedia || ['brochure'];
      contentFocus = industryRules.focus || 'general';
      estimatedTime = priority === 'high' ? '1-2 minutes' : '3-5 minutes';
    }

    return {
      action: action as any,
      priority: priority as any,
      reasoning,
      mediaTypes,
      contentFocus,
      industryFocus: industryFocus,
      estimatedTime
    };
  }

  // Optimize the decision based on context
  private optimizeDecision(decision: DecisionResult, context: DecisionContext): DecisionResult {
    // Optimize based on user preferences
    if (context.userPreferences.preferredMedia) {
      decision.mediaTypes = context.userPreferences.preferredMedia as string[];
    }

    // Optimize based on conversation history
    if (context.conversationHistory.length > 0) {
      const lastTopic = context.conversationHistory[context.conversationHistory.length - 1];
      if (lastTopic.toLowerCase().includes('image')) {
        decision.mediaTypes = ['image'];
        decision.action = 'generate_image';
      }
    }

    // Optimize based on complexity
    if (context.complexity === 'complex') {
      decision.action = 'generate_both';
      decision.priority = 'high';
      decision.estimatedTime = '5-10 minutes';
    }

    // Optimize based on available knowledge
    if (context.knowledgeResponse.relevantProducts.length === 0) {
      decision.action = 'ask_clarification';
      decision.reasoning += ' - No relevant products found, need clarification';
    }

    return decision;
  }

  // Get fallback decision when decision making fails
  private getFallbackDecision(context: DecisionContext): DecisionResult {
    return {
      action: 'generate_content',
      priority: 'medium',
      reasoning: 'Fallback decision due to processing error',
      mediaTypes: ['brochure'],
      contentFocus: 'general',
      industryFocus: context.industry,
      estimatedTime: '3-5 minutes'
    };
  }

  // Get decision statistics
  getDecisionStats(): {
    totalDecisions: number;
    actionDistribution: Record<string, number>;
    averageConfidence: number;
    commonPatterns: string[];
  } {
    // This would track decision statistics in a real implementation
    return {
      totalDecisions: 0,
      actionDistribution: {},
      averageConfidence: 0.7,
      commonPatterns: []
    };
  }
}

export const decisionEngine = new DecisionEngine();
