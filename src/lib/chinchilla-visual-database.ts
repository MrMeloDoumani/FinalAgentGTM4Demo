/**
 * 🎨 CHINCHILLA VISUAL DATABASE - The Complete Visual Knowledge System
 * 
 * This is Chinchilla's comprehensive database for understanding and generating
 * professional B2B visuals for e& products and services.
 */

export interface VisualElement {
  id: string;
  name: string;
  category: string;
  industry: string;
  svgPath: string;
  colors: string[];
  size: { width: number; height: number };
  description: string;
  keywords: string[];
  context: string[];
}

export interface VisualTemplate {
  id: string;
  name: string;
  industry: string;
  layout: string;
  elements: string[];
  colors: string[];
  dimensions: { width: number; height: number };
  description: string;
  useCases: string[];
}

export interface ProductVisualMapping {
  productId: string;
  productName: string;
  industry: string;
  primaryElements: string[];
  secondaryElements: string[];
  layout: string;
  colors: string[];
  context: string;
}

class ChinchillaVisualDatabase {
  private visualElements: Map<string, VisualElement> = new Map();
  private visualTemplates: Map<string, VisualTemplate> = new Map();
  private productMappings: Map<string, ProductVisualMapping> = new Map();
  private industryPatterns: Map<string, string[]> = new Map();

  constructor() {
    this.initializeVisualElements();
    this.initializeVisualTemplates();
    this.initializeProductMappings();
    this.initializeIndustryPatterns();
  }

  /**
   * 🎨 Initialize all visual elements that Chinchilla can draw
   */
  private initializeVisualElements() {
    // Business Infrastructure Elements
    this.addVisualElement({
      id: 'office_building',
      name: 'Office Building',
      category: 'infrastructure',
      industry: 'tech_telecom',
      svgPath: 'M10,10 L50,10 L50,40 L10,40 Z M15,15 L45,15 L45,35 L15,35 Z M20,20 L40,20 L40,30 L20,30 Z',
      colors: ['#e30613', '#666666', '#f0f0f0'],
      size: { width: 60, height: 50 },
      description: 'Modern office building representing business infrastructure',
      keywords: ['office', 'building', 'business', 'corporate', 'infrastructure'],
      context: ['tech_telecom', 'business', 'corporate', 'professional']
    });

    this.addVisualElement({
      id: 'network_cloud',
      name: 'Network Cloud',
      category: 'connectivity',
      industry: 'tech_telecom',
      svgPath: 'M30,20 Q20,10 10,20 Q20,30 30,20 Q40,10 50,20 Q40,30 30,20',
      colors: ['#e30613', '#4CAF50', '#2196F3'],
      size: { width: 60, height: 40 },
      description: 'Cloud network representing connectivity and cloud services',
      keywords: ['cloud', 'network', 'connectivity', 'internet', 'data'],
      context: ['tech_telecom', 'cloud', 'connectivity', 'digital']
    });

    this.addVisualElement({
      id: 'server_rack',
      name: 'Server Rack',
      category: 'infrastructure',
      industry: 'tech_telecom',
      svgPath: 'M10,10 L50,10 L50,50 L10,50 Z M15,15 L45,15 L45,20 L15,20 Z M15,25 L45,25 L45,30 L15,30 Z M15,35 L45,35 L45,40 L15,40 Z',
      colors: ['#e30613', '#333333', '#666666'],
      size: { width: 60, height: 60 },
      description: 'Server rack representing data center infrastructure',
      keywords: ['server', 'rack', 'data', 'center', 'infrastructure'],
      context: ['tech_telecom', 'data', 'infrastructure', 'enterprise']
    });

    this.addVisualElement({
      id: 'smartphone',
      name: 'Smartphone',
      category: 'devices',
      industry: 'tech_telecom',
      svgPath: 'M20,10 L40,10 L40,50 L20,50 Z M25,15 L35,15 L35,45 L25,45 Z M30,20 L30,25 M30,30 L30,35',
      colors: ['#e30613', '#333333', '#666666'],
      size: { width: 40, height: 60 },
      description: 'Smartphone representing mobile connectivity',
      keywords: ['phone', 'mobile', 'smartphone', 'device', 'communication'],
      context: ['tech_telecom', 'mobile', 'communication', 'devices']
    });

    this.addVisualElement({
      id: 'laptop',
      name: 'Laptop',
      category: 'devices',
      industry: 'tech_telecom',
      svgPath: 'M10,20 L50,20 L50,40 L10,40 Z M15,25 L45,25 L45,35 L15,35 Z M20,30 L40,30 L40,32 L20,32 Z',
      colors: ['#e30613', '#333333', '#666666'],
      size: { width: 60, height: 40 },
      description: 'Laptop representing business productivity',
      keywords: ['laptop', 'computer', 'productivity', 'business', 'work'],
      context: ['tech_telecom', 'productivity', 'business', 'devices']
    });

    this.addVisualElement({
      id: 'wifi_signal',
      name: 'WiFi Signal',
      category: 'connectivity',
      industry: 'tech_telecom',
      svgPath: 'M10,40 L15,35 L20,30 L25,25 L30,20 L35,15 L40,10 M10,40 L15,35 L20,30 L25,25 L30,20 M10,40 L15,35 L20,30 L25,25 M10,40 L15,35 L20,30 M10,40 L15,35 M10,40',
      colors: ['#e30613', '#4CAF50'],
      size: { width: 50, height: 40 },
      description: 'WiFi signal representing wireless connectivity',
      keywords: ['wifi', 'wireless', 'signal', 'connectivity', 'internet'],
      context: ['tech_telecom', 'wireless', 'connectivity', 'internet']
    });

    this.addVisualElement({
      id: 'security_shield',
      name: 'Security Shield',
      category: 'security',
      industry: 'tech_telecom',
      svgPath: 'M30,10 L40,20 L40,35 L30,45 L20,35 L20,20 Z M25,25 L35,25 L35,30 L25,30 Z',
      colors: ['#e30613', '#4CAF50', '#FF9800'],
      size: { width: 50, height: 50 },
      description: 'Security shield representing cybersecurity',
      keywords: ['security', 'shield', 'protection', 'cybersecurity', 'safety'],
      context: ['tech_telecom', 'security', 'cybersecurity', 'protection']
    });

    this.addVisualElement({
      id: 'data_analytics',
      name: 'Data Analytics',
      category: 'analytics',
      industry: 'tech_telecom',
      svgPath: 'M10,40 L20,30 L30,35 L40,25 L50,30 L50,40 L10,40 Z M15,35 L25,30 L35,32 L45,27',
      colors: ['#e30613', '#4CAF50', '#2196F3'],
      size: { width: 60, height: 40 },
      description: 'Data analytics chart representing business intelligence',
      keywords: ['analytics', 'data', 'chart', 'intelligence', 'insights'],
      context: ['tech_telecom', 'analytics', 'data', 'intelligence']
    });

    this.addVisualElement({
      id: 'etisalat_logo',
      name: 'e& Logo',
      category: 'branding',
      industry: 'tech_telecom',
      svgPath: 'M20,20 L40,20 L40,30 L20,30 Z M25,25 L35,25 L35,28 L25,28 Z',
      colors: ['#e30613', '#FFFFFF'],
      size: { width: 40, height: 20 },
      description: 'e& (Etisalat) logo for branding',
      keywords: ['etisalat', 'logo', 'brand', 'e&', 'company'],
      context: ['tech_telecom', 'branding', 'etisalat', 'corporate']
    });

    this.addVisualElement({
      id: 'business_people',
      name: 'Business People',
      category: 'people',
      industry: 'tech_telecom',
      svgPath: 'M15,30 C15,25 20,20 25,20 C30,20 35,25 35,30 L35,40 L15,40 Z M20,25 C20,23 22,21 25,21 C28,21 30,23 30,25 M25,35 L25,40',
      colors: ['#e30613', '#666666', '#333333'],
      size: { width: 50, height: 40 },
      description: 'Business people representing team collaboration',
      keywords: ['people', 'team', 'business', 'collaboration', 'staff'],
      context: ['tech_telecom', 'people', 'team', 'collaboration']
    });
  }

  /**
   * 🎨 Initialize visual templates for different layouts
   */
  private initializeVisualTemplates() {
    // Tech Telecom Business Layout
    this.addVisualTemplate({
      id: 'tech_telecom_business',
      name: 'Tech Telecom Business Layout',
      industry: 'tech_telecom',
      layout: 'professional_grid',
      elements: ['office_building', 'network_cloud', 'server_rack', 'etisalat_logo'],
      colors: ['#e30613', '#666666', '#f0f0f0', '#FFFFFF'],
      dimensions: { width: 400, height: 300 },
      description: 'Professional layout for tech telecom business solutions',
      useCases: ['business_pro_fiber', 'cloud_connect', 'enterprise_solutions']
    });

    // Mobile Solutions Layout
    this.addVisualTemplate({
      id: 'mobile_solutions',
      name: 'Mobile Solutions Layout',
      industry: 'tech_telecom',
      layout: 'mobile_centric',
      elements: ['smartphone', 'wifi_signal', 'network_cloud', 'etisalat_logo'],
      colors: ['#e30613', '#4CAF50', '#2196F3', '#FFFFFF'],
      dimensions: { width: 400, height: 300 },
      description: 'Layout focused on mobile connectivity solutions',
      useCases: ['business_mobile', 'mobile_data', '5g_solutions']
    });

    // Security Solutions Layout
    this.addVisualTemplate({
      id: 'security_solutions',
      name: 'Security Solutions Layout',
      industry: 'tech_telecom',
      layout: 'security_focused',
      elements: ['security_shield', 'server_rack', 'network_cloud', 'etisalat_logo'],
      colors: ['#e30613', '#FF9800', '#4CAF50', '#FFFFFF'],
      dimensions: { width: 400, height: 300 },
      description: 'Layout emphasizing cybersecurity and protection',
      useCases: ['sase', 'cybersecurity', 'data_protection']
    });

    // Analytics & Intelligence Layout
    this.addVisualTemplate({
      id: 'analytics_intelligence',
      name: 'Analytics & Intelligence Layout',
      industry: 'tech_telecom',
      layout: 'data_centric',
      elements: ['data_analytics', 'server_rack', 'business_people', 'etisalat_logo'],
      colors: ['#e30613', '#2196F3', '#4CAF50', '#FFFFFF'],
      dimensions: { width: 400, height: 300 },
      description: 'Layout focused on data analytics and business intelligence',
      useCases: ['data_analytics', 'business_intelligence', 'insights']
    });
  }

  /**
   * 🎨 Initialize product-specific visual mappings
   */
  private initializeProductMappings() {
    // Business Pro Fiber
    this.addProductMapping({
      productId: 'business_pro_fiber',
      productName: 'Business Pro Fiber',
      industry: 'tech_telecom',
      primaryElements: ['office_building', 'network_cloud', 'wifi_signal'],
      secondaryElements: ['etisalat_logo', 'business_people'],
      layout: 'tech_telecom_business',
      colors: ['#e30613', '#4CAF50', '#f0f0f0'],
      context: 'All-in-one SME bundle with fiber internet and collaboration tools'
    });

    // Cloud Connect
    this.addProductMapping({
      productId: 'cloud_connect',
      productName: 'Cloud Connect',
      industry: 'tech_telecom',
      primaryElements: ['network_cloud', 'server_rack', 'security_shield'],
      secondaryElements: ['etisalat_logo', 'data_analytics'],
      layout: 'security_solutions',
      colors: ['#e30613', '#2196F3', '#4CAF50'],
      context: 'Private connectivity to major clouds from UAE'
    });

    // SASE Advanced
    this.addProductMapping({
      productId: 'sase_advanced',
      productName: 'Secure Access Service Edge — Advanced',
      industry: 'tech_telecom',
      primaryElements: ['security_shield', 'network_cloud', 'server_rack'],
      secondaryElements: ['etisalat_logo', 'data_analytics'],
      layout: 'security_solutions',
      colors: ['#e30613', '#FF9800', '#4CAF50'],
      context: 'Full SASE with CASB, DLP, FWaaS, and advanced threat protection'
    });

    // Business Mobile
    this.addProductMapping({
      productId: 'business_mobile',
      productName: 'Business Mobile Solutions',
      industry: 'tech_telecom',
      primaryElements: ['smartphone', 'wifi_signal', 'network_cloud'],
      secondaryElements: ['etisalat_logo', 'business_people'],
      layout: 'mobile_solutions',
      colors: ['#e30613', '#4CAF50', '#2196F3'],
      context: 'Essential mobile connectivity for business teams'
    });
  }

  /**
   * 🎨 Initialize industry-specific patterns
   */
  private initializeIndustryPatterns() {
    this.industryPatterns.set('tech_telecom', [
      'office_building', 'network_cloud', 'server_rack', 'wifi_signal', 'etisalat_logo'
    ]);
    this.industryPatterns.set('retail', [
      'business_people', 'data_analytics', 'smartphone', 'etisalat_logo'
    ]);
    this.industryPatterns.set('education', [
      'business_people', 'laptop', 'network_cloud', 'etisalat_logo'
    ]);
    this.industryPatterns.set('healthcare', [
      'security_shield', 'server_rack', 'business_people', 'etisalat_logo'
    ]);
  }

  /**
   * 🎨 Add visual element to database
   */
  private addVisualElement(element: VisualElement) {
    this.visualElements.set(element.id, element);
  }

  /**
   * 🎨 Add visual template to database
   */
  private addVisualTemplate(template: VisualTemplate) {
    this.visualTemplates.set(template.id, template);
  }

  /**
   * 🎨 Add product mapping to database
   */
  private addProductMapping(mapping: ProductVisualMapping) {
    this.productMappings.set(mapping.productId, mapping);
  }

  /**
   * 🔍 Get visual elements for a specific product
   */
  public getElementsForProduct(productId: string): VisualElement[] {
    const mapping = this.productMappings.get(productId);
    if (!mapping) {
      return this.getDefaultElements();
    }

    const elements: VisualElement[] = [];
    
    // Add primary elements
    mapping.primaryElements.forEach(elementId => {
      const element = this.visualElements.get(elementId);
      if (element) elements.push(element);
    });

    // Add secondary elements
    mapping.secondaryElements.forEach(elementId => {
      const element = this.visualElements.get(elementId);
      if (element && !elements.find(e => e.id === elementId)) {
        elements.push(element);
      }
    });

    return elements;
  }

  /**
   * 🔍 Get visual elements for an industry
   */
  public getElementsForIndustry(industry: string): VisualElement[] {
    const pattern = this.industryPatterns.get(industry);
    if (!pattern) {
      return this.getDefaultElements();
    }

    const elements: VisualElement[] = [];
    pattern.forEach(elementId => {
      const element = this.visualElements.get(elementId);
      if (element) elements.push(element);
    });

    return elements;
  }

  /**
   * 🔍 Get visual template for a product
   */
  public getTemplateForProduct(productId: string): VisualTemplate | null {
    const mapping = this.productMappings.get(productId);
    if (!mapping) {
      return this.getDefaultTemplate();
    }

    return this.visualTemplates.get(mapping.layout) || this.getDefaultTemplate();
  }

  /**
   * 🔍 Get default elements when no specific mapping is found
   */
  private getDefaultElements(): VisualElement[] {
    return [
      this.visualElements.get('office_building')!,
      this.visualElements.get('network_cloud')!,
      this.visualElements.get('etisalat_logo')!
    ];
  }

  /**
   * 🔍 Get default template when no specific mapping is found
   */
  private getDefaultTemplate(): VisualTemplate | null {
    return this.visualTemplates.get('tech_telecom_business') || null;
  }

  /**
   * 🔍 Search elements by keywords
   */
  public searchElementsByKeywords(keywords: string[]): VisualElement[] {
    const results: VisualElement[] = [];
    
    this.visualElements.forEach(element => {
      const hasKeyword = keywords.some(keyword => 
        element.keywords.some(elementKeyword => 
          elementKeyword.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      
      if (hasKeyword) {
        results.push(element);
      }
    });

    return results;
  }

  /**
   * 🔍 Get all available elements
   */
  public getAllElements(): VisualElement[] {
    return Array.from(this.visualElements.values());
  }

  /**
   * 🔍 Get all available templates
   */
  public getAllTemplates(): VisualTemplate[] {
    return Array.from(this.visualTemplates.values());
  }

  /**
   * 🔍 Get database statistics
   */
  public getDatabaseStats() {
    return {
      totalElements: this.visualElements.size,
      totalTemplates: this.visualTemplates.size,
      totalProductMappings: this.productMappings.size,
      industries: Array.from(this.industryPatterns.keys())
    };
  }
}

// Export singleton instance
export const chinchillaVisualDatabase = new ChinchillaVisualDatabase();
