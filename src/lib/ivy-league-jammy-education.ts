// Ivy-League Jammy Education System
// Advanced multi-layered learning architecture for expert-level AI

import { GTM_CONTEXT } from './data/gtm-context';

export interface IvyLeagueModule {
  name: string;
  level: 'foundational' | 'intermediate' | 'advanced' | 'expert';
  learningObjectives: string[];
  knowledgeGraph: KnowledgeNode[];
  assessmentCriteria: AssessmentCriteria;
  practicalApplications: PracticalApplication[];
}

export interface KnowledgeNode {
  id: string;
  concept: string;
  definition: string;
  relationships: string[];
  examples: string[];
  visualMappings: string[];
  industryContext: string[];
  confidence: number;
}

export interface AssessmentCriteria {
  accuracy: number;
  completeness: number;
  reasoning: number;
  creativity: number;
  contextAwareness: number;
}

export interface PracticalApplication {
  scenario: string;
  expectedBehavior: string;
  successMetrics: string[];
  failureAnalysis: string[];
}

export class IvyLeagueJammyEducation {
  private knowledgeGraph: Map<string, KnowledgeNode> = new Map();
  private learningModules: IvyLeagueModule[] = [];
  private masteryLevels: Map<string, number> = new Map();
  private learningHistory: LearningSession[] = [];
  private expertPatterns: Map<string, ExpertPattern> = new Map();

  constructor() {
    this.initializeIvyLeagueCurriculum();
    this.buildKnowledgeGraph();
    this.establishExpertPatterns();
  }

  private buildKnowledgeGraph(): void {
    // Build comprehensive knowledge graph from GTM_CONTEXT
    console.log('🧠 Building comprehensive knowledge graph...');
    
    // Add product knowledge nodes
    GTM_CONTEXT.offerings.categories.forEach(category => {
      category.items.forEach(product => {
        const node: KnowledgeNode = {
          id: `product_${product.id}`,
          concept: product.name,
          definition: product.description,
          relationships: [category.label, 'e&_products'],
          examples: product.features || [],
          visualMappings: this.generateVisualMappings(product),
          industryContext: this.determineIndustryContext(product),
          confidence: 0.9
        };
        this.knowledgeGraph.set(node.id, node);
      });
    });

    // Add sector knowledge nodes
    GTM_CONTEXT.sectors.forEach(sector => {
      const node: KnowledgeNode = {
        id: `sector_${sector.id}`,
        concept: sector.name,
        definition: sector.description,
        relationships: ['market_segments', 'industry_analysis'],
        examples: sector.opportunities || [],
        visualMappings: this.generateSectorVisualMappings(sector),
        industryContext: [sector.name],
        confidence: 0.95
      };
      this.knowledgeGraph.set(node.id, node);
    });

    console.log(`✅ Knowledge graph built with ${this.knowledgeGraph.size} nodes`);
  }

  private establishExpertPatterns(): void {
    // Establish expert-level patterns for advanced reasoning
    console.log('🎓 Establishing expert patterns...');
    
    const expertPatterns = [
      {
        id: 'market_analysis',
        pattern: 'analyze_market_context',
        description: 'Deep market analysis with industry insights',
        confidence: 0.95
      },
      {
        id: 'product_mapping',
        pattern: 'map_products_to_visuals',
        description: 'Intelligent product to visual element mapping',
        confidence: 0.9
      },
      {
        id: 'context_awareness',
        pattern: 'maintain_context_throughout',
        description: 'Consistent context awareness across interactions',
        confidence: 0.95
      }
    ];

    expertPatterns.forEach(pattern => {
      this.expertPatterns.set(pattern.id, pattern);
    });

    console.log(`✅ Established ${expertPatterns.length} expert patterns`);
  }

  private generateVisualMappings(product: any): string[] {
    const mappings = ['office_building']; // Always include B2B context
    
    // Product-specific visual mappings
    if (product.name.toLowerCase().includes('fiber') || product.name.toLowerCase().includes('internet')) {
      mappings.push('network', 'router', 'wifi_signal');
    }
    if (product.name.toLowerCase().includes('mobile') || product.name.toLowerCase().includes('pos')) {
      mappings.push('smartphone', 'payment_terminal');
    }
    if (product.name.toLowerCase().includes('security')) {
      mappings.push('security_shield', 'server');
    }
    if (product.name.toLowerCase().includes('cloud')) {
      mappings.push('cloud', 'server');
    }
    if (product.name.toLowerCase().includes('analytics')) {
      mappings.push('analytics_dashboard', 'chart');
    }
    
    return mappings;
  }

  private generateSectorVisualMappings(sector: any): string[] {
    const mappings = ['office_building'];
    
    // Sector-specific visual mappings
    if (sector.name.toLowerCase().includes('retail')) {
      mappings.push('retail_store', 'smartphone');
    }
    if (sector.name.toLowerCase().includes('healthcare')) {
      mappings.push('hospital', 'security_shield');
    }
    if (sector.name.toLowerCase().includes('education')) {
      mappings.push('school', 'laptop');
    }
    if (sector.name.toLowerCase().includes('finance')) {
      mappings.push('analytics_dashboard', 'chart');
    }
    
    return mappings;
  }

  private determineIndustryContext(product: any): string[] {
    const contexts = ['tech_telecom']; // Default B2B context
    
    // Determine specific industry context
    if (product.name.toLowerCase().includes('retail') || product.name.toLowerCase().includes('pos')) {
      contexts.push('retail');
    }
    if (product.name.toLowerCase().includes('healthcare') || product.name.toLowerCase().includes('medical')) {
      contexts.push('healthcare');
    }
    if (product.name.toLowerCase().includes('education') || product.name.toLowerCase().includes('school')) {
      contexts.push('education');
    }
    if (product.name.toLowerCase().includes('finance') || product.name.toLowerCase().includes('banking')) {
      contexts.push('finance');
    }
    
    return contexts;
  }

  private initializeIvyLeagueCurriculum() {
    console.log('🎓 Initializing Ivy-League Jammy Education System...');

    // FOUNDATIONAL LEVEL - Core Knowledge
    this.learningModules.push({
      name: 'e& Business Ecosystem Mastery',
      level: 'foundational',
      learningObjectives: [
        'Master e& product portfolio and service offerings',
        'Understand UAE B2B market dynamics',
        'Learn industry-specific solution mapping',
        'Develop brand identity recognition'
      ],
      knowledgeGraph: this.buildBusinessEcosystemGraph(),
      assessmentCriteria: {
        accuracy: 0.95,
        completeness: 0.90,
        reasoning: 0.85,
        creativity: 0.70,
        contextAwareness: 0.90
      },
      practicalApplications: [
        {
          scenario: 'Product identification from user query',
          expectedBehavior: 'Accurate product recognition with 95%+ confidence',
          successMetrics: ['Correct industry detection', 'Proper visual mapping', 'Brand consistency'],
          failureAnalysis: ['Generic responses', 'Wrong industry classification', 'Missing context']
        }
      ]
    });

    // INTERMEDIATE LEVEL - Analytical Thinking
    this.learningModules.push({
      name: 'Advanced Pattern Recognition & Analysis',
      level: 'intermediate',
      learningObjectives: [
        'Develop sophisticated pattern recognition capabilities',
        'Master contextual analysis and inference',
        'Learn multi-dimensional problem solving',
        'Build predictive reasoning models'
      ],
      knowledgeGraph: this.buildPatternRecognitionGraph(),
      assessmentCriteria: {
        accuracy: 0.98,
        completeness: 0.95,
        reasoning: 0.95,
        creativity: 0.85,
        contextAwareness: 0.95
      },
      practicalApplications: [
        {
          scenario: 'Complex multi-industry query analysis',
          expectedBehavior: 'Break down complex queries into component parts and synthesize solutions',
          successMetrics: ['Multi-dimensional analysis', 'Contextual synthesis', 'Creative solutions'],
          failureAnalysis: ['Oversimplification', 'Missing nuances', 'Linear thinking']
        }
      ]
    });

    // ADVANCED LEVEL - Strategic Thinking
    this.learningModules.push({
      name: 'Strategic Business Intelligence',
      level: 'advanced',
      learningObjectives: [
        'Master strategic business analysis',
        'Develop market intelligence capabilities',
        'Learn competitive analysis frameworks',
        'Build predictive business modeling'
      ],
      knowledgeGraph: this.buildStrategicIntelligenceGraph(),
      assessmentCriteria: {
        accuracy: 0.99,
        completeness: 0.98,
        reasoning: 0.98,
        creativity: 0.90,
        contextAwareness: 0.98
      },
      practicalApplications: [
        {
          scenario: 'Strategic market analysis and recommendations',
          expectedBehavior: 'Provide comprehensive market insights with actionable recommendations',
          successMetrics: ['Strategic depth', 'Market insights', 'Actionable recommendations'],
          failureAnalysis: ['Surface-level analysis', 'Generic recommendations', 'Missing strategic context']
        }
      ]
    });

    // EXPERT LEVEL - Mastery
    this.learningModules.push({
      name: 'Master-Level AI Intelligence',
      level: 'expert',
      learningObjectives: [
        'Achieve expert-level domain mastery',
        'Develop creative problem-solving capabilities',
        'Master advanced reasoning and synthesis',
        'Build predictive and prescriptive intelligence'
      ],
      knowledgeGraph: this.buildMasteryGraph(),
      assessmentCriteria: {
        accuracy: 0.995,
        completeness: 0.99,
        reasoning: 0.99,
        creativity: 0.95,
        contextAwareness: 0.99
      },
      practicalApplications: [
        {
          scenario: 'Complex business challenge resolution',
          expectedBehavior: 'Provide innovative, comprehensive solutions with deep insights',
          successMetrics: ['Innovation', 'Comprehensive solutions', 'Deep insights', 'Predictive accuracy'],
          failureAnalysis: ['Conventional thinking', 'Incomplete solutions', 'Shallow analysis']
        }
      ]
    });

    console.log(`✅ Initialized ${this.learningModules.length} Ivy-League modules`);
  }

  private buildBusinessEcosystemGraph(): KnowledgeNode[] {
    const nodes: KnowledgeNode[] = [];
    
    // Core e& Products
    for (const category of GTM_CONTEXT.offerings.categories) {
      for (const item of category.items) {
        nodes.push({
          id: `product_${item.name.toLowerCase().replace(/\s+/g, '_')}`,
          concept: item.name,
          definition: item.description || 'e& business service',
          relationships: this.findProductRelationships(item),
          examples: this.generateProductExamples(item),
          visualMappings: this.mapProductToVisuals(item),
          industryContext: item.target_segments,
          confidence: 0.95
        });
      }
    }

    // Industry Contexts
    for (const sector of GTM_CONTEXT.sectors) {
      nodes.push({
        id: `sector_${sector.name.toLowerCase().replace(/\s+/g, '_')}`,
        concept: sector.name,
        definition: `Business sector focused on ${sector.sector_goals.join(', ')}`,
        relationships: this.findSectorRelationships(sector),
        examples: this.generateSectorExamples(sector),
        visualMappings: this.mapSectorToVisuals(sector),
        industryContext: [sector.name],
        confidence: 0.90
      });
    }

    return nodes;
  }

  private buildPatternRecognitionGraph(): KnowledgeNode[] {
    return [
      {
        id: 'pattern_product_analysis',
        concept: 'Product Analysis Pattern',
        definition: 'Systematic approach to analyzing product queries and mapping to solutions',
        relationships: ['product_identification', 'feature_extraction', 'context_analysis'],
        examples: [
          'Business Pro Fiber → internet connectivity → tech_telecom → network visuals',
          'Mobile POS → payment solution → retail → mobile payment visuals'
        ],
        visualMappings: ['analytical_framework', 'pattern_recognition'],
        industryContext: ['all'],
        confidence: 0.98
      },
      {
        id: 'pattern_context_synthesis',
        concept: 'Context Synthesis Pattern',
        definition: 'Ability to synthesize multiple contextual clues into coherent understanding',
        relationships: ['context_analysis', 'synthesis', 'reasoning'],
        examples: [
          'User query + industry context + product features → comprehensive solution',
          'Multiple requirements → integrated solution approach'
        ],
        visualMappings: ['synthesis_framework', 'context_mapping'],
        industryContext: ['all'],
        confidence: 0.95
      }
    ];
  }

  private buildStrategicIntelligenceGraph(): KnowledgeNode[] {
    return [
      {
        id: 'strategy_market_analysis',
        concept: 'Market Intelligence Strategy',
        definition: 'Advanced capability to analyze market dynamics and provide strategic insights',
        relationships: ['market_analysis', 'competitive_intelligence', 'strategic_planning'],
        examples: [
          'UAE B2B market trends → strategic recommendations',
          'Competitive landscape → differentiation strategies'
        ],
        visualMappings: ['strategic_framework', 'market_intelligence'],
        industryContext: ['all'],
        confidence: 0.99
      }
    ];
  }

  private buildMasteryGraph(): KnowledgeNode[] {
    return [
      {
        id: 'mastery_creative_synthesis',
        concept: 'Creative Synthesis Mastery',
        definition: 'Highest level ability to creatively synthesize complex information into innovative solutions',
        relationships: ['creativity', 'synthesis', 'innovation', 'mastery'],
        examples: [
          'Complex business challenge → innovative multi-dimensional solution',
          'Unconventional request → creative adaptation of existing knowledge'
        ],
        visualMappings: ['creative_framework', 'innovation_engine'],
        industryContext: ['all'],
        confidence: 0.995
      }
    ];
  }

  private findProductRelationships(item: any): string[] {
    const relationships = [];
    
    // Industry relationships
    if (item.target_segments) {
      relationships.push(...item.target_segments.map((seg: string) => `industry_${seg}`));
    }
    
    // Feature relationships
    if (item.key_features) {
      relationships.push(...item.key_features.map((feature: string) => `feature_${feature.toLowerCase().replace(/\s+/g, '_')}`));
    }
    
    // Category relationships
    relationships.push(`category_${item.category?.toLowerCase().replace(/\s+/g, '_') || 'general'}`);
    
    return relationships;
  }

  private generateProductExamples(item: any): string[] {
    const examples = [];
    
    // Basic usage examples
    examples.push(`${item.name} for ${item.target_segments?.[0] || 'business'} sector`);
    
    // Feature-based examples
    if (item.key_features) {
      examples.push(`${item.name} with ${item.key_features[0]} capabilities`);
    }
    
    // Industry-specific examples
    if (item.target_segments?.includes('retail')) {
      examples.push(`${item.name} for retail store operations`);
    }
    if (item.target_segments?.includes('healthcare')) {
      examples.push(`${item.name} for healthcare facilities`);
    }
    
    return examples;
  }

  private mapProductToVisuals(item: any): string[] {
    const visuals = [];
    const text = `${item.name} ${item.description || ''} ${(item.key_features || []).join(' ')}`.toLowerCase();
    
    // Always include B2B context
    visuals.push('office_building');
    
    // Product-specific mappings
    if (text.includes('fiber') || text.includes('internet') || text.includes('connectivity')) {
      visuals.push('network', 'router', 'wifi_signal');
    }
    if (text.includes('mobile') || text.includes('phone')) {
      visuals.push('smartphone', 'network');
    }
    if (text.includes('pos') || text.includes('payment')) {
      visuals.push('payment_terminal', 'retail_store');
    }
    if (text.includes('security') || text.includes('protection')) {
      visuals.push('security_shield', 'server');
    }
    if (text.includes('cloud') || text.includes('microsoft')) {
      visuals.push('cloud', 'server');
    }
    if (text.includes('analytics') || text.includes('data')) {
      visuals.push('analytics_dashboard', 'chart');
    }
    
    // Industry-specific buildings
    const industry = this.determineIndustryFromSegments(item.target_segments);
    if (industry === 'retail') visuals.push('retail_store');
    else if (industry === 'healthcare') visuals.push('hospital');
    else if (industry === 'education') visuals.push('school');
    
    return [...new Set(visuals)].slice(0, 4);
  }

  private findSectorRelationships(sector: any): string[] {
    return [
      `sector_goals_${sector.sector_goals.join('_')}`,
      `industry_${sector.name.toLowerCase()}`,
      'business_context',
      'market_segment'
    ];
  }

  private generateSectorExamples(sector: any): string[] {
    return [
      `${sector.name} businesses requiring ${sector.sector_goals[0]}`,
      `e& solutions for ${sector.name} sector`,
      `${sector.name} market opportunities`
    ];
  }

  private mapSectorToVisuals(sector: any): string[] {
    const sectorVisuals = {
      'retail': ['retail_store', 'shopping_cart', 'customers'],
      'healthcare': ['hospital', 'medical_equipment', 'healthcare_workers'],
      'education': ['school', 'students', 'classroom'],
      'tech_telecom': ['office_building', 'network', 'servers'],
      'finance': ['office_building', 'financial_charts', 'banking'],
      'manufacturing': ['factory', 'industrial_equipment', 'production'],
      'government': ['office_building', 'government_building', 'administrative'],
      'hospitality': ['hotel', 'restaurant', 'guest_services'],
      'logistics': ['warehouse', 'trucks', 'shipping'],
      'real_estate': ['construction_site', 'buildings', 'property']
    };
    
    return sectorVisuals[sector.name.toLowerCase()] || ['office_building', 'business_environment'];
  }

  private determineIndustryFromSegments(segments: string[]): string {
    if (segments.includes('retail')) return 'retail';
    if (segments.includes('healthcare')) return 'healthcare';
    if (segments.includes('education')) return 'education';
    if (segments.includes('hospitality')) return 'hospitality';
    if (segments.includes('logistics')) return 'logistics';
    if (segments.includes('real_estate')) return 'real_estate';
    if (segments.includes('trading')) return 'trading';
    return 'tech_telecom';
  }

  private establishExpertPatterns() {
    // Expert pattern for product analysis
    this.expertPatterns.set('product_analysis', {
      name: 'Expert Product Analysis Pattern',
      steps: [
        'Parse user query for product indicators',
        'Extract key features and characteristics',
        'Map to e& product portfolio',
        'Determine industry context',
        'Generate visual mappings',
        'Synthesize comprehensive response'
      ],
      successCriteria: ['95%+ accuracy', 'Complete context understanding', 'Appropriate visual mapping'],
      examples: [
        'Business Pro Fiber → internet connectivity → tech_telecom → network visuals',
        'Mobile POS → payment solution → retail → mobile payment visuals'
      ]
    });

    // Expert pattern for industry analysis
    this.expertPatterns.set('industry_analysis', {
      name: 'Expert Industry Analysis Pattern',
      steps: [
        'Identify industry indicators in query',
        'Map to sector characteristics',
        'Determine business context',
        'Select appropriate visual environment',
        'Apply industry-specific knowledge'
      ],
      successCriteria: ['Correct industry classification', 'Appropriate business context', 'Industry-specific visuals'],
      examples: [
        'retail → customer-facing → retail_store visuals',
        'tech_telecom → business infrastructure → office_building visuals'
      ]
    });
  }

  // Main education method - Ivy League level
  async educateJammy(message: string): Promise<{
    analysis: ExpertAnalysis;
    visualElements: string[];
    industry: string;
    reasoning: string;
    confidence: number;
    masteryLevel: string;
  }> {
    console.log('🎓 Ivy-League Jammy Education analyzing:', message);
    
    // Step 1: Multi-level analysis
    const analysis = await this.performMultiLevelAnalysis(message);
    
    // Step 2: Expert pattern matching
    const patternMatch = this.matchExpertPatterns(message, analysis);
    
    // Step 3: Knowledge graph traversal
    const knowledgeInsights = this.traverseKnowledgeGraph(message, analysis);
    
    // Step 4: Synthesis and reasoning
    const synthesis = this.synthesizeExpertResponse(analysis, patternMatch, knowledgeInsights);
    
    // Step 5: Mastery assessment
    const masteryLevel = this.assessMasteryLevel(synthesis);
    
    console.log('🎓 Ivy-League Analysis Complete:', {
      industry: synthesis.industry,
      visualElements: synthesis.visualElements,
      confidence: synthesis.confidence,
      masteryLevel: masteryLevel
    });
    
    return synthesis;
  }

  private async performMultiLevelAnalysis(message: string): Promise<ExpertAnalysis> {
    const analysis: ExpertAnalysis = {
      productMatch: null,
      industryMatch: null,
      contextMatch: null,
      visualMatch: null,
      confidence: 0,
      reasoning: []
    };

    // Level 1: Product Analysis
    const productAnalysis = this.analyzeProductLevel(message);
    if (productAnalysis.confidence > analysis.confidence) {
      Object.assign(analysis, productAnalysis);
    }

    // Level 2: Industry Analysis
    const industryAnalysis = this.analyzeIndustryLevel(message);
    if (industryAnalysis.confidence > analysis.confidence) {
      Object.assign(analysis, industryAnalysis);
    }

    // Level 3: Context Analysis
    const contextAnalysis = this.analyzeContextLevel(message);
    if (contextAnalysis.confidence > analysis.confidence) {
      Object.assign(analysis, contextAnalysis);
    }

    // Level 4: Visual Analysis
    const visualAnalysis = this.analyzeVisualLevel(message);
    if (visualAnalysis.confidence > analysis.confidence) {
      Object.assign(analysis, visualAnalysis);
    }

    return analysis;
  }

  private analyzeProductLevel(message: string): ExpertAnalysis {
    const lowerMessage = message.toLowerCase();
    let bestMatch = null;
    let confidence = 0;
    let reasoning = [];

    // Search through knowledge graph
    for (const [id, node] of this.knowledgeGraph) {
      if (node.concept && lowerMessage.includes(node.concept.toLowerCase())) {
        const similarity = this.calculateAdvancedSimilarity(lowerMessage, node.concept.toLowerCase());
        if (similarity > confidence) {
          confidence = similarity;
          bestMatch = node;
          reasoning.push(`Product match: ${node.concept} (${similarity.toFixed(2)} similarity)`);
        }
      }
    }

    return {
      productMatch: bestMatch,
      confidence,
      reasoning
    };
  }

  private analyzeIndustryLevel(message: string): ExpertAnalysis {
    const lowerMessage = message.toLowerCase();
    let bestMatch = null;
    let confidence = 0;
    let reasoning = [];

    // Industry keyword analysis
    const industryKeywords = {
      'retail': ['retail', 'shopping', 'store', 'commerce', 'pos', 'payment'],
      'healthcare': ['healthcare', 'medical', 'hospital', 'health', 'patient'],
      'education': ['education', 'school', 'university', 'learning', 'student'],
      'tech_telecom': ['tech', 'technology', 'telecom', 'digital', 'software', 'business', 'fiber', 'internet', 'pro', 'connectivity'],
      'finance': ['finance', 'banking', 'financial', 'money', 'investment'],
      'manufacturing': ['manufacturing', 'production', 'factory', 'industrial'],
      'government': ['government', 'public', 'civic', 'municipal'],
      'hospitality': ['hospitality', 'hotel', 'restaurant', 'tourism'],
      'logistics': ['logistics', 'shipping', 'transport', 'supply chain'],
      'real_estate': ['real estate', 'property', 'construction', 'building']
    };

    for (const [industry, keywords] of Object.entries(industryKeywords)) {
      const matches = keywords.filter(keyword => lowerMessage.includes(keyword)).length;
      const industryConfidence = matches / keywords.length;
      
      if (industryConfidence > confidence) {
        confidence = industryConfidence;
        bestMatch = { industry, confidence: industryConfidence };
        reasoning.push(`Industry match: ${industry} (${matches}/${keywords.length} keywords)`);
      }
    }

    return {
      industryMatch: bestMatch,
      confidence,
      reasoning
    };
  }

  private analyzeContextLevel(message: string): ExpertAnalysis {
    const lowerMessage = message.toLowerCase();
    let bestMatch = null;
    let confidence = 0;
    let reasoning = [];

    // Context analysis patterns
    const contextPatterns = {
      'product_request': ['generate', 'create', 'make', 'show', 'image', 'visual'],
      'information_request': ['what', 'how', 'tell', 'explain', 'describe'],
      'comparison_request': ['compare', 'vs', 'versus', 'difference', 'better'],
      'solution_request': ['solution', 'help', 'need', 'want', 'looking for']
    };

    for (const [context, patterns] of Object.entries(contextPatterns)) {
      const matches = patterns.filter(pattern => lowerMessage.includes(pattern)).length;
      const contextConfidence = matches / patterns.length;
      
      if (contextConfidence > confidence) {
        confidence = contextConfidence;
        bestMatch = { context, confidence: contextConfidence };
        reasoning.push(`Context match: ${context} (${matches}/${patterns.length} patterns)`);
      }
    }

    return {
      contextMatch: bestMatch,
      confidence,
      reasoning
    };
  }

  private analyzeVisualLevel(message: string): ExpertAnalysis {
    const lowerMessage = message.toLowerCase();
    let bestMatch = null;
    let confidence = 0;
    let reasoning = [];

    // Visual element analysis
    const visualKeywords = {
      'network': ['fiber', 'internet', 'connectivity', 'network', 'wifi'],
      'mobile': ['mobile', 'phone', 'smartphone', 'pos'],
      'security': ['security', 'protection', 'sase', 'shield'],
      'cloud': ['cloud', 'microsoft', '365', 'server'],
      'analytics': ['analytics', 'data', 'insights', 'reporting', 'chart'],
      'business': ['business', 'office', 'corporate', 'professional']
    };

    const visualElements = [];
    for (const [element, keywords] of Object.entries(visualKeywords)) {
      const matches = keywords.filter(keyword => lowerMessage.includes(keyword)).length;
      if (matches > 0) {
        visualElements.push(element);
        reasoning.push(`Visual element: ${element} (${matches} keywords)`);
      }
    }

    if (visualElements.length > 0) {
      bestMatch = { elements: visualElements };
      confidence = Math.min(0.95, visualElements.length * 0.2);
    }

    return {
      visualMatch: bestMatch,
      confidence,
      reasoning
    };
  }

  private calculateAdvancedSimilarity(str1: string, str2: string): number {
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    
    let exactMatches = 0;
    let partialMatches = 0;
    
    for (const word1 of words1) {
      for (const word2 of words2) {
        if (word1 === word2) {
          exactMatches++;
        } else if (word1.includes(word2) || word2.includes(word1)) {
          partialMatches += 0.5;
        }
      }
    }
    
    const totalWords = Math.max(words1.length, words2.length);
    return (exactMatches + partialMatches) / totalWords;
  }

  private matchExpertPatterns(message: string, analysis: ExpertAnalysis): PatternMatch {
    const lowerMessage = message.toLowerCase();
    let bestPattern = null;
    let confidence = 0;

    for (const [patternId, pattern] of this.expertPatterns) {
      const patternConfidence = this.evaluatePatternMatch(message, pattern);
      if (patternConfidence > confidence) {
        confidence = patternConfidence;
        bestPattern = pattern;
      }
    }

    return {
      pattern: bestPattern,
      confidence,
      reasoning: [`Matched pattern: ${bestPattern?.name || 'none'} (${confidence.toFixed(2)} confidence)`]
    };
  }

  private evaluatePatternMatch(message: string, pattern: ExpertPattern): number {
    const lowerMessage = message.toLowerCase();
    let matches = 0;
    
    for (const step of pattern.steps) {
      const stepKeywords = step.toLowerCase().split(/\s+/);
      const stepMatches = stepKeywords.filter(keyword => 
        lowerMessage.includes(keyword) || 
        message.toLowerCase().includes(keyword)
      ).length;
      matches += stepMatches / stepKeywords.length;
    }
    
    return matches / pattern.steps.length;
  }

  private traverseKnowledgeGraph(message: string, analysis: ExpertAnalysis): KnowledgeInsights {
    const insights: KnowledgeInsights = {
      relatedConcepts: [],
      visualMappings: [],
      industryContext: [],
      confidence: 0
    };

    // Find related concepts
    if (analysis.productMatch) {
      insights.relatedConcepts.push(...analysis.productMatch.relationships);
      insights.visualMappings.push(...analysis.productMatch.visualMappings);
      insights.industryContext.push(...analysis.productMatch.industryContext);
      insights.confidence = Math.max(insights.confidence, analysis.productMatch.confidence);
    }

    return insights;
  }

  private synthesizeExpertResponse(
    analysis: ExpertAnalysis, 
    patternMatch: PatternMatch, 
    knowledgeInsights: KnowledgeInsights
  ): {
    analysis: ExpertAnalysis;
    visualElements: string[];
    industry: string;
    reasoning: string;
    confidence: number;
    masteryLevel: string;
  } {
    // Determine industry
    let industry = 'tech_telecom'; // Default
    if (analysis.industryMatch?.industry) {
      industry = analysis.industryMatch.industry;
    } else if (analysis.productMatch?.industryContext?.[0]) {
      industry = analysis.productMatch.industryContext[0];
    }

    // Determine visual elements
    const visualElements = [];
    if (analysis.visualMatch?.elements) {
      visualElements.push(...analysis.visualMatch.elements);
    }
    if (analysis.productMatch?.visualMappings) {
      visualElements.push(...analysis.productMatch.visualMappings);
    }
    if (knowledgeInsights.visualMappings) {
      visualElements.push(...knowledgeInsights.visualMappings);
    }

    // Always include B2B context
    if (!visualElements.includes('office_building')) {
      visualElements.unshift('office_building');
    }

    // Remove duplicates and limit
    const uniqueVisuals = [...new Set(visualElements)].slice(0, 4);

    // Calculate overall confidence
    const confidence = Math.min(0.99, 
      (analysis.confidence + patternMatch.confidence + knowledgeInsights.confidence) / 3
    );

    // Generate reasoning
    const reasoning = [
      ...analysis.reasoning,
      ...patternMatch.reasoning,
      `Industry determined: ${industry}`,
      `Visual elements: ${uniqueVisuals.join(', ')}`,
      `Overall confidence: ${(confidence * 100).toFixed(1)}%`
    ].join('. ');

    return {
      analysis,
      visualElements: uniqueVisuals,
      industry,
      reasoning,
      confidence,
      masteryLevel: this.assessMasteryLevel({ confidence, analysis, patternMatch })
    };
  }

  private assessMasteryLevel(synthesis: any): string {
    const confidence = synthesis.confidence;
    
    if (confidence >= 0.99) return 'Expert';
    if (confidence >= 0.95) return 'Advanced';
    if (confidence >= 0.85) return 'Intermediate';
    if (confidence >= 0.70) return 'Foundational';
    return 'Learning';
  }

  // Get education status
  getEducationStatus() {
    return {
      modulesLoaded: this.learningModules.length,
      knowledgeNodes: this.knowledgeGraph.size,
      expertPatterns: this.expertPatterns.size,
      masteryLevels: Object.fromEntries(this.masteryLevels),
      capabilities: [
        'Multi-level analysis',
        'Expert pattern matching',
        'Knowledge graph traversal',
        'Advanced reasoning',
        'Mastery assessment',
        'Ivy-League intelligence'
      ]
    };
  }
}

// Supporting interfaces
interface ExpertAnalysis {
  productMatch?: any;
  industryMatch?: any;
  contextMatch?: any;
  visualMatch?: any;
  confidence: number;
  reasoning: string[];
}

interface PatternMatch {
  pattern?: ExpertPattern;
  confidence: number;
  reasoning: string[];
}

interface KnowledgeInsights {
  relatedConcepts: string[];
  visualMappings: string[];
  industryContext: string[];
  confidence: number;
}

interface ExpertPattern {
  name: string;
  steps: string[];
  successCriteria: string[];
  examples: string[];
}

interface LearningSession {
  timestamp: string;
  message: string;
  analysis: ExpertAnalysis;
  masteryLevel: string;
  improvement: string[];
}

// Export singleton instance
export const ivyLeagueJammyEducation = new IvyLeagueJammyEducation();
