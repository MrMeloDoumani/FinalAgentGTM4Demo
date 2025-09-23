// Knowledge-to-Visual Dictionary for Jammy AI
// Maps GTM_CONTEXT knowledge to Chinchilla's visual elements

export interface VisualElement {
  name: string;
  keywords: string[];
  industry: string;
  description: string;
}

export interface IndustryVisualMapping {
  industry: string;
  primaryElements: string[];
  secondaryElements: string[];
  colorScheme: string;
  style: string;
}

export class KnowledgeVisualDictionary {
  private visualElements: VisualElement[] = [
    // Retail Elements
    { name: 'smartphone', keywords: ['pos', 'payment', 'mobile', 'terminal'], industry: 'retail', description: 'Mobile payment terminal' },
    { name: 'chart', keywords: ['analytics', 'data', 'insights', 'reporting'], industry: 'retail', description: 'Customer analytics dashboard' },
    { name: 'building', keywords: ['store', 'shop', 'retail', 'outlet'], industry: 'retail', description: 'Retail store building' },
    { name: 'people', keywords: ['customers', 'shoppers', 'staff'], industry: 'retail', description: 'Retail staff and customers' },
    { name: 'network', keywords: ['wifi', 'connectivity', 'infrastructure'], industry: 'retail', description: 'Store connectivity network' },

    // Healthcare Elements
    { name: 'building', keywords: ['hospital', 'clinic', 'medical', 'healthcare'], industry: 'healthcare', description: 'Healthcare facility' },
    { name: 'people', keywords: ['doctors', 'patients', 'medical staff'], industry: 'healthcare', description: 'Medical professionals' },
    { name: 'chart', keywords: ['patient data', 'medical records', 'analytics'], industry: 'healthcare', description: 'Patient data visualization' },
    { name: 'network', keywords: ['telemedicine', 'remote care', 'connectivity'], industry: 'healthcare', description: 'Telemedicine network' },

    // Education Elements
    { name: 'building', keywords: ['school', 'university', 'campus', 'education'], industry: 'education', description: 'Educational institution' },
    { name: 'people', keywords: ['students', 'teachers', 'faculty'], industry: 'education', description: 'Students and educators' },
    { name: 'network', keywords: ['campus wifi', 'e-learning', 'connectivity'], industry: 'education', description: 'Campus network infrastructure' },
    { name: 'chart', keywords: ['learning analytics', 'progress', 'data'], industry: 'education', description: 'Learning analytics dashboard' },

    // Tech/Telecom Elements
    { name: 'network', keywords: ['5g', 'fiber', 'connectivity', 'infrastructure'], industry: 'tech_telecom', description: 'Telecom network infrastructure' },
    { name: 'building', keywords: ['data center', 'tower', 'facility'], industry: 'tech_telecom', description: 'Telecom facility' },
    { name: 'chart', keywords: ['network analytics', 'performance', 'monitoring'], industry: 'tech_telecom', description: 'Network performance dashboard' },
    { name: 'people', keywords: ['engineers', 'technicians', 'customers'], industry: 'tech_telecom', description: 'Technical team and customers' },

    // Finance Elements
    { name: 'building', keywords: ['bank', 'financial', 'office'], industry: 'finance', description: 'Financial institution' },
    { name: 'chart', keywords: ['financial data', 'transactions', 'analytics'], industry: 'finance', description: 'Financial analytics dashboard' },
    { name: 'network', keywords: ['secure network', 'transactions', 'connectivity'], industry: 'finance', description: 'Secure financial network' },
    { name: 'people', keywords: ['bankers', 'customers', 'financial advisors'], industry: 'finance', description: 'Financial professionals' },

    // Manufacturing Elements
    { name: 'building', keywords: ['factory', 'plant', 'manufacturing'], industry: 'manufacturing', description: 'Manufacturing facility' },
    { name: 'chart', keywords: ['production data', 'efficiency', 'analytics'], industry: 'manufacturing', description: 'Production analytics dashboard' },
    { name: 'network', keywords: ['iot', 'automation', 'connectivity'], industry: 'manufacturing', description: 'Industrial IoT network' },
    { name: 'people', keywords: ['workers', 'engineers', 'operators'], industry: 'manufacturing', description: 'Manufacturing workforce' },

    // Government Elements
    { name: 'building', keywords: ['government', 'ministry', 'office'], industry: 'government', description: 'Government building' },
    { name: 'chart', keywords: ['citizen data', 'services', 'analytics'], industry: 'government', description: 'Citizen services dashboard' },
    { name: 'network', keywords: ['secure network', 'citizen services', 'connectivity'], industry: 'government', description: 'Government network' },
    { name: 'people', keywords: ['officials', 'citizens', 'staff'], industry: 'government', description: 'Government officials and citizens' }
  ];

  private industryMappings: IndustryVisualMapping[] = [
    {
      industry: 'retail',
      primaryElements: ['smartphone', 'chart', 'building'],
      secondaryElements: ['people', 'network'],
      colorScheme: 'e30613',
      style: 'professional'
    },
    {
      industry: 'healthcare',
      primaryElements: ['building', 'people', 'chart'],
      secondaryElements: ['network'],
      colorScheme: '1976D2',
      style: 'professional'
    },
    {
      industry: 'education',
      primaryElements: ['building', 'people', 'network'],
      secondaryElements: ['chart'],
      colorScheme: '2E7D32',
      style: 'professional'
    },
    {
      industry: 'tech_telecom',
      primaryElements: ['network', 'building', 'chart'],
      secondaryElements: ['people'],
      colorScheme: 'e30613',
      style: 'professional'
    },
    {
      industry: 'finance',
      primaryElements: ['building', 'chart', 'network'],
      secondaryElements: ['people'],
      colorScheme: '7B1FA2',
      style: 'professional'
    },
    {
      industry: 'manufacturing',
      primaryElements: ['building', 'chart', 'network'],
      secondaryElements: ['people'],
      colorScheme: 'F57C00',
      style: 'professional'
    },
    {
      industry: 'government',
      primaryElements: ['building', 'chart', 'network'],
      secondaryElements: ['people'],
      colorScheme: '5D4037',
      style: 'professional'
    }
  ];

  // Translate knowledge base products to visual elements
  translateKnowledgeToVisual(industry: string, products: any[], userRequest: string): {
    elements: string[];
    style: string;
    colorScheme: string;
    industry: string;
    contentType: string;
    requirements: string[];
  } {
    console.log('🔍 KnowledgeVisualDictionary translating:', { industry, products: products.length, userRequest });

    // Get industry mapping
    const industryMapping = this.industryMappings.find(m => m.industry === industry) || this.industryMappings[0];
    
    // Start with primary elements for the industry
    let elements = [...industryMapping.primaryElements];
    
    // Add elements based on products found
    for (const product of products) {
      const productElements = this.findElementsForProduct(product, industry);
      elements.push(...productElements);
    }
    
    // Add elements based on user request keywords
    const requestElements = this.findElementsForRequest(userRequest, industry);
    elements.push(...requestElements);
    
    // Remove duplicates
    elements = [...new Set(elements)];
    
    // If no elements found, use industry defaults
    if (elements.length === 0) {
      elements = industryMapping.primaryElements;
    }

    console.log('🎨 Translated to visual elements:', elements);

    return {
      elements,
      style: industryMapping.style,
      colorScheme: industryMapping.colorScheme,
      industry,
      contentType: 'visual',
      requirements: ['professional', 'industry-specific']
    };
  }

  private findElementsForProduct(product: any, industry: string): string[] {
    const elements: string[] = [];
    
    // Check product name and description for keywords
    const text = `${product.name} ${product.short_desc || ''} ${product.key_features?.join(' ') || ''}`.toLowerCase();
    
    // For tech_telecom products, always include network and building elements
    if (industry === 'tech_telecom') {
      elements.push('network');
      elements.push('building');
    }
    
    // Check for specific product features
    if (text.includes('fiber') || text.includes('internet') || text.includes('connectivity')) {
      elements.push('network');
    }
    if (text.includes('mobile') || text.includes('phone') || text.includes('pos')) {
      elements.push('smartphone');
    }
    if (text.includes('analytics') || text.includes('data') || text.includes('insights')) {
      elements.push('chart');
    }
    if (text.includes('business') || text.includes('office') || text.includes('site')) {
      elements.push('building');
    }
    
    // Fallback to general element matching
    for (const visualElement of this.visualElements) {
      if (visualElement.industry === industry || visualElement.industry === 'general') {
        for (const keyword of visualElement.keywords) {
          if (text.includes(keyword.toLowerCase()) && !elements.includes(visualElement.name)) {
            elements.push(visualElement.name);
            break;
          }
        }
      }
    }
    
    return elements;
  }

  private findElementsForRequest(userRequest: string, industry: string): string[] {
    const elements: string[] = [];
    const lowerRequest = userRequest.toLowerCase();
    
    for (const visualElement of this.visualElements) {
      if (visualElement.industry === industry || visualElement.industry === 'general') {
        for (const keyword of visualElement.keywords) {
          if (lowerRequest.includes(keyword.toLowerCase())) {
            elements.push(visualElement.name);
            break;
          }
        }
      }
    }
    
    return elements;
  }

  // Get all available visual elements for an industry
  getIndustryElements(industry: string): VisualElement[] {
    return this.visualElements.filter(element => 
      element.industry === industry || element.industry === 'general'
    );
  }

  // Add new visual element (for learning from user uploads)
  addVisualElement(element: VisualElement): void {
    this.visualElements.push(element);
    console.log('📚 Added new visual element:', element.name);
  }

  // Get industry mapping
  getIndustryMapping(industry: string): IndustryVisualMapping | undefined {
    return this.industryMappings.find(m => m.industry === industry);
  }
}

export const knowledgeVisualDictionary = new KnowledgeVisualDictionary();
