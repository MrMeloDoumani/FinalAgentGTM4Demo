// Jammy Education System - Comprehensive Knowledge Training
// Teaches Jammy how to read, analyze, memorize, and execute

import { GTM_CONTEXT } from './data/gtm-context';

export interface EducationModule {
  name: string;
  description: string;
  knowledge: any;
  patterns: string[];
  examples: EducationExample[];
}

export interface EducationExample {
  input: string;
  expectedOutput: string;
  reasoning: string;
  visualElements?: string[];
}

export class JammyEducationSystem {
  private educationModules: EducationModule[] = [];
  private learnedPatterns: Map<string, any> = new Map();

  constructor() {
    this.initializeEducationModules();
  }

  private initializeEducationModules() {
    console.log('🎓 Initializing Jammy Education System...');

    // Module 1: Product Knowledge Education
    this.educationModules.push({
      name: 'Product Knowledge',
      description: 'Teaching Jammy about e& products and services',
      knowledge: this.extractProductKnowledge(),
      patterns: [
        'product_name → industry → visual_elements',
        'service_type → target_segment → business_context',
        'feature_keywords → product_mapping → visual_representation'
      ],
      examples: [
        {
          input: 'Business Pro Fiber',
          expectedOutput: 'tech_telecom internet service for SMB',
          reasoning: 'Fiber = internet connectivity, Pro = business grade, Business = SMB target',
          visualElements: ['office_building', 'network', 'router', 'wifi_signal']
        },
        {
          input: 'Mobile POS',
          expectedOutput: 'retail payment solution for retail businesses',
          reasoning: 'POS = point of sale, Mobile = portable, typically used in retail',
          visualElements: ['retail_store', 'smartphone', 'network', 'payment_terminal']
        }
      ]
    });

    // Module 2: Industry Context Education
    this.educationModules.push({
      name: 'Industry Context',
      description: 'Teaching Jammy industry-specific knowledge',
      knowledge: this.extractIndustryKnowledge(),
      patterns: [
        'industry_keywords → business_type → visual_context',
        'sector_goals → solution_mapping → visual_elements',
        'target_audience → business_environment → visual_representation'
      ],
      examples: [
        {
          input: 'retail sector',
          expectedOutput: 'shopping, commerce, customer-facing business',
          reasoning: 'Retail involves selling to consumers, requires customer interaction',
          visualElements: ['retail_store', 'shopping_cart', 'customers', 'products']
        },
        {
          input: 'tech_telecom sector',
          expectedOutput: 'technology, connectivity, business infrastructure',
          reasoning: 'Tech/telecom provides business infrastructure and connectivity',
          visualElements: ['office_building', 'network', 'servers', 'connectivity']
        }
      ]
    });

    // Module 3: Visual Intelligence Education
    this.educationModules.push({
      name: 'Visual Intelligence',
      description: 'Teaching Jammy how to map knowledge to visual elements',
      knowledge: this.extractVisualKnowledge(),
      patterns: [
        'product_features → visual_metaphors → drawing_elements',
        'business_context → environment_elements → composition',
        'industry_type → building_type → professional_layout'
      ],
      examples: [
        {
          input: 'fiber internet connectivity',
          expectedOutput: 'network cables, routers, wifi signals, office buildings',
          reasoning: 'Fiber = physical cables, internet = network equipment, connectivity = signals',
          visualElements: ['network', 'router', 'wifi_signal', 'office_building']
        },
        {
          input: 'mobile payment solution',
          expectedOutput: 'smartphones, payment terminals, retail environment',
          reasoning: 'Mobile = smartphone, payment = terminal, solution = retail context',
          visualElements: ['smartphone', 'payment_terminal', 'retail_store', 'network']
        }
      ]
    });

    // Module 4: e& Brand Education
    this.educationModules.push({
      name: 'e& Brand Knowledge',
      description: 'Teaching Jammy about e& branding and B2B focus',
      knowledge: this.extractBrandKnowledge(),
      patterns: [
        'e&_branding → professional_b2b → red_color_scheme',
        'business_focus → corporate_environment → professional_layout',
        'uae_market → local_context → business_culture'
      ],
      examples: [
        {
          input: 'e& corporate identity',
          expectedOutput: 'Professional B2B branding with red (#e30613) color scheme',
          reasoning: 'e& is a telecom company focused on B2B services in UAE',
          visualElements: ['office_building', 'professional_layout', 'red_branding']
        }
      ]
    });

    console.log(`✅ Initialized ${this.educationModules.length} education modules`);
  }

  private extractProductKnowledge() {
    const products = [];
    
    for (const category of GTM_CONTEXT.offerings.categories) {
      for (const item of category.items) {
        products.push({
          name: item.name,
          description: item.description,
          features: item.key_features || [],
          targetSegments: item.target_segments,
          category: category.name,
          industry: this.determineIndustryFromSegments(item.target_segments)
        });
      }
    }
    
    return products;
  }

  private extractIndustryKnowledge() {
    return GTM_CONTEXT.sectors.map(sector => ({
      name: sector.name,
      goals: sector.sector_goals,
      characteristics: this.getIndustryCharacteristics(sector.name),
      visualContext: this.getIndustryVisualContext(sector.name)
    }));
  }

  private extractVisualKnowledge() {
    return {
      elementMappings: {
        'fiber': ['network', 'router', 'cables'],
        'internet': ['wifi_signal', 'network', 'connectivity'],
        'mobile': ['smartphone', 'mobile_device'],
        'pos': ['payment_terminal', 'retail_store'],
        'security': ['security_shield', 'protection'],
        'cloud': ['cloud', 'server'],
        'analytics': ['chart', 'analytics_dashboard'],
        'business': ['office_building', 'corporate']
      },
      industryBuildings: {
        'retail': 'retail_store',
        'healthcare': 'hospital',
        'education': 'school',
        'tech_telecom': 'office_building',
        'finance': 'office_building',
        'manufacturing': 'factory',
        'government': 'office_building'
      }
    };
  }

  private extractBrandKnowledge() {
    return {
      brandColor: '#e30613',
      brandName: 'e& (Etisalat)',
      focus: 'B2B Telecom Services',
      market: 'UAE',
      style: 'Professional, Corporate, Business-focused',
      visualElements: ['red_branding', 'professional_layout', 'corporate_environment']
    };
  }

  private determineIndustryFromSegments(segments: string[]): string {
    if (segments.includes('retail')) return 'retail';
    if (segments.includes('healthcare')) return 'healthcare';
    if (segments.includes('education')) return 'education';
    if (segments.includes('hospitality')) return 'hospitality';
    if (segments.includes('logistics')) return 'logistics';
    if (segments.includes('real_estate')) return 'real_estate';
    if (segments.includes('trading')) return 'trading';
    return 'tech_telecom'; // Default for SMB products
  }

  private getIndustryCharacteristics(industry: string): string[] {
    const characteristics = {
      'retail': ['customer-facing', 'commerce', 'shopping', 'sales'],
      'healthcare': ['medical', 'patient care', 'health services', 'clinical'],
      'education': ['learning', 'academic', 'student-focused', 'institutional'],
      'tech_telecom': ['connectivity', 'infrastructure', 'business services', 'digital'],
      'finance': ['financial services', 'banking', 'investment', 'monetary'],
      'manufacturing': ['production', 'industrial', 'factory', 'manufacturing'],
      'government': ['public sector', 'civic', 'administrative', 'municipal'],
      'hospitality': ['tourism', 'hotel', 'restaurant', 'guest services'],
      'logistics': ['shipping', 'transport', 'supply chain', 'distribution'],
      'real_estate': ['property', 'construction', 'building', 'development']
    };
    
    return characteristics[industry] || ['business', 'corporate', 'professional'];
  }

  private getIndustryVisualContext(industry: string): string[] {
    const visualContexts = {
      'retail': ['retail_store', 'shopping_cart', 'customers', 'products'],
      'healthcare': ['hospital', 'medical_equipment', 'healthcare_workers'],
      'education': ['school', 'students', 'classroom', 'learning_materials'],
      'tech_telecom': ['office_building', 'network', 'servers', 'connectivity'],
      'finance': ['office_building', 'financial_charts', 'banking_equipment'],
      'manufacturing': ['factory', 'industrial_equipment', 'production_line'],
      'government': ['office_building', 'government_building', 'administrative'],
      'hospitality': ['hotel', 'restaurant', 'guest_services', 'tourism'],
      'logistics': ['warehouse', 'trucks', 'shipping', 'distribution'],
      'real_estate': ['construction_site', 'buildings', 'property', 'development']
    };
    
    return visualContexts[industry] || ['office_building', 'business_environment'];
  }

  // Main education method
  async educateJammy(message: string): Promise<{
    analysis: any;
    visualElements: string[];
    industry: string;
    reasoning: string;
  }> {
    console.log('🎓 Jammy Education System analyzing:', message);
    
    // Step 1: Analyze the message using all education modules
    const analysis = await this.analyzeWithEducation(message);
    
    // Step 2: Extract visual elements based on education
    const visualElements = this.extractVisualElements(analysis);
    
    // Step 3: Determine industry based on education
    const industry = this.determineIndustry(analysis);
    
    // Step 4: Generate reasoning
    const reasoning = this.generateReasoning(analysis, visualElements, industry);
    
    console.log('🎓 Education Analysis Result:', {
      industry,
      visualElements,
      reasoning: reasoning.substring(0, 100) + '...'
    });
    
    return {
      analysis,
      visualElements,
      industry,
      reasoning
    };
  }

  private async analyzeWithEducation(message: string): Promise<any> {
    const analysis = {
      productMatch: null,
      industryMatch: null,
      visualMatch: null,
      brandMatch: null,
      confidence: 0
    };

    // Analyze with each education module
    for (const module of this.educationModules) {
      const moduleAnalysis = this.analyzeWithModule(message, module);
      if (moduleAnalysis.confidence > analysis.confidence) {
        Object.assign(analysis, moduleAnalysis);
      }
    }

    return analysis;
  }

  private analyzeWithModule(message: string, module: EducationModule): any {
    const lowerMessage = message.toLowerCase();
    let bestMatch = null;
    let confidence = 0;

    // Check against module examples
    for (const example of module.examples) {
      const similarity = this.calculateSimilarity(lowerMessage, example.input.toLowerCase());
      if (similarity > confidence) {
        confidence = similarity;
        bestMatch = example;
      }
    }

    // Check against module knowledge
    if (module.knowledge && Array.isArray(module.knowledge)) {
      for (const item of module.knowledge) {
        const similarity = this.calculateSimilarity(lowerMessage, item.name?.toLowerCase() || '');
        if (similarity > confidence) {
          confidence = similarity;
          bestMatch = item;
        }
      }
    }

    return {
      [module.name.toLowerCase().replace(' ', '_')]: bestMatch,
      confidence
    };
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    
    let matches = 0;
    for (const word1 of words1) {
      for (const word2 of words2) {
        if (word1.includes(word2) || word2.includes(word1)) {
          matches++;
          break;
        }
      }
    }
    
    return matches / Math.max(words1.length, words2.length);
  }

  private extractVisualElements(analysis: any): string[] {
    const elements = new Set<string>();
    
    // Extract from product analysis
    if (analysis.product_knowledge?.visualElements) {
      analysis.product_knowledge.visualElements.forEach((el: string) => elements.add(el));
    }
    
    // Extract from industry analysis
    if (analysis.industry_context?.visualContext) {
      analysis.industry_context.visualContext.forEach((el: string) => elements.add(el));
    }
    
    // Extract from visual analysis
    if (analysis.visual_intelligence?.elementMappings) {
      const mappings = analysis.visual_intelligence.elementMappings;
      for (const [key, values] of Object.entries(mappings)) {
        if (analysis.product_knowledge?.features?.some((feature: string) => 
          feature.toLowerCase().includes(key))) {
          (values as string[]).forEach((el: string) => elements.add(el));
        }
      }
    }
    
    // Add e& branding elements
    elements.add('office_building'); // Always include B2B context
    elements.add('red_branding'); // e& brand color
    
    return Array.from(elements).slice(0, 4); // Limit to 4 elements
  }

  private determineIndustry(analysis: any): string {
    // Priority order: product knowledge > industry context > default
    if (analysis.product_knowledge?.industry) {
      return analysis.product_knowledge.industry;
    }
    
    if (analysis.industry_context?.name) {
      return analysis.industry_context.name.toLowerCase();
    }
    
    // Default to tech_telecom for business products
    return 'tech_telecom';
  }

  private generateReasoning(analysis: any, visualElements: string[], industry: string): string {
    const reasons = [];
    
    if (analysis.product_knowledge) {
      reasons.push(`Product identified: ${analysis.product_knowledge.name}`);
    }
    
    if (analysis.industry_context) {
      reasons.push(`Industry context: ${analysis.industry_context.name}`);
    }
    
    reasons.push(`Visual elements selected: ${visualElements.join(', ')}`);
    reasons.push(`Industry determined: ${industry}`);
    
    return reasons.join('. ') + '.';
  }

  // Get education status
  getEducationStatus() {
    return {
      modulesLoaded: this.educationModules.length,
      patternsLearned: this.learnedPatterns.size,
      capabilities: [
        'Product knowledge analysis',
        'Industry context understanding',
        'Visual element mapping',
        'e& brand awareness',
        'B2B focus recognition'
      ]
    };
  }
}

// Export singleton instance
export const jammyEducationSystem = new JammyEducationSystem();
