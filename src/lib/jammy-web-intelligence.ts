import { GTM_CONTEXT } from './data/gtm-context';

export interface ProductSearchResult {
  name: string;
  description: string;
  industry: string;
  features: string[];
  targetSegments: string[];
  visualElements: string[];
  confidence: number;
  source: 'website' | 'gtm_context' | 'hybrid';
}

export interface WebsiteProductData {
  name: string;
  description: string;
  category: string;
  features: string[];
  targetAudience: string[];
  pricing?: string;
  availability?: string;
}

export class JammyWebIntelligence {
  private baseUrl = 'https://www.etisalat.ae/en/smb';
  private cache = new Map<string, ProductSearchResult>();
  private cacheExpiry = 30 * 60 * 1000; // 30 minutes

  async searchProduct(query: string): Promise<ProductSearchResult> {
    const cacheKey = query.toLowerCase();
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.confidence < this.cacheExpiry) {
      console.log('🎯 Using cached result for:', query);
      return cached;
    }

    console.log('🔍 Searching for product:', query);
    
    try {
      // Step 1: Search e& website
      const websiteData = await this.searchEtisalatWebsite(query);
      
      // Step 2: Search GTM_CONTEXT
      const gtmData = this.searchGTMContext(query);
      
      // Step 3: Combine and enhance
      const result = this.combineKnowledge(websiteData, gtmData, query);
      
      // Cache the result
      this.cache.set(cacheKey, result);
      
      console.log('✅ Product search completed:', result);
      return result;
      
    } catch (error) {
      console.error('❌ Error searching product:', error);
      // Fallback to GTM_CONTEXT only
      return this.searchGTMContext(query);
    }
  }

  private async searchEtisalatWebsite(query: string): Promise<WebsiteProductData | null> {
    try {
      // Simulate web scraping - in production, use Puppeteer/Playwright
      console.log('🌐 Simulating e& website search for:', query);
      
      // Mock data based on actual e& website structure
      const mockWebsiteData: WebsiteProductData = {
        name: 'Business Pro Fiber',
        description: 'High-speed fiber internet solution for small and medium businesses',
        category: 'Internet Services',
        features: [
          'High-speed fiber connectivity',
          'Dedicated bandwidth',
          '24/7 technical support',
          'SLA guarantee',
          'Business-grade security'
        ],
        targetAudience: ['Small Business', 'Medium Business', 'Startups'],
        pricing: 'Starting from AED 299/month',
        availability: 'Available nationwide'
      };

      // Simulate search logic
      if (query.toLowerCase().includes('business pro fiber') || 
          query.toLowerCase().includes('fiber') ||
          query.toLowerCase().includes('internet')) {
        return mockWebsiteData;
      }

      return null;
    } catch (error) {
      console.error('❌ Website search error:', error);
      return null;
    }
  }

  private searchGTMContext(query: string): ProductSearchResult {
    console.log('📚 Searching GTM_CONTEXT for:', query);
    
    const lowerQuery = query.toLowerCase();
    let bestMatch: ProductSearchResult | null = null;
    let highestScore = 0;

    // Search through all offerings
    for (const category of GTM_CONTEXT.offerings.categories) {
      for (const item of category.items) {
        const score = this.calculateRelevanceScore(item, lowerQuery);
        
        if (score > highestScore) {
          highestScore = score;
          bestMatch = {
            name: item.name,
            description: item.description || 'No description available',
            industry: this.determineIndustry(item.target_segments),
            features: item.key_features || [],
            targetSegments: item.target_segments,
            visualElements: this.mapToVisualElements(item, lowerQuery),
            confidence: score,
            source: 'gtm_context'
          };
        }
      }
    }

    if (bestMatch) {
      console.log('✅ Found in GTM_CONTEXT:', bestMatch.name);
      return bestMatch;
    }

    // Fallback: create generic result
    return {
      name: query,
      description: 'Product information not found in knowledge base',
      industry: 'tech_telecom',
      features: [],
      targetSegments: ['SMB'],
      visualElements: ['office_building', 'network'],
      confidence: 0.3,
      source: 'gtm_context'
    };
  }

  private combineKnowledge(
    websiteData: WebsiteProductData | null, 
    gtmData: ProductSearchResult, 
    query: string
  ): ProductSearchResult {
    if (!websiteData) {
      return gtmData;
    }

    // Combine website data with GTM data
    const combined: ProductSearchResult = {
      name: websiteData.name,
      description: websiteData.description || gtmData.description,
      industry: this.determineIndustry(websiteData.targetAudience),
      features: [...new Set([...websiteData.features, ...gtmData.features])],
      targetSegments: [...new Set([...websiteData.targetAudience, ...gtmData.targetSegments])],
      visualElements: this.mapToVisualElements(websiteData, query),
      confidence: Math.min(0.95, gtmData.confidence + 0.2), // Boost confidence with website data
      source: 'hybrid'
    };

    console.log('🔄 Combined knowledge:', combined);
    return combined;
  }

  private calculateRelevanceScore(item: any, query: string): number {
    let score = 0;
    
    // Name match
    if (item.name.toLowerCase().includes(query)) score += 0.8;
    
    // Description match
    if (item.description && item.description.toLowerCase().includes(query)) score += 0.6;
    
    // Feature match
    if (item.key_features) {
      const featureMatches = item.key_features.filter((feature: string) => 
        feature.toLowerCase().includes(query)
      ).length;
      score += featureMatches * 0.3;
    }
    
    // Category match
    if (item.category && item.category.toLowerCase().includes(query)) score += 0.4;
    
    return Math.min(1, score);
  }

  private determineIndustry(targetSegments: string[]): string {
    if (targetSegments.includes('retail')) return 'retail';
    if (targetSegments.includes('healthcare')) return 'healthcare';
    if (targetSegments.includes('education')) return 'education';
    if (targetSegments.includes('hospitality')) return 'hospitality';
    if (targetSegments.includes('logistics')) return 'logistics';
    if (targetSegments.includes('real_estate')) return 'real_estate';
    if (targetSegments.includes('trading')) return 'trading';
    
    // Default to tech_telecom for SMB products
    return 'tech_telecom';
  }

  private mapToVisualElements(data: any, query: string): string[] {
    const elements: string[] = [];
    const text = `${data.name} ${data.description || ''} ${(data.key_features || []).join(' ')}`.toLowerCase();
    
    // e& B2B Focus: Always include professional business elements
    elements.push('office_building');
    
    // Product-specific mapping
    if (text.includes('fiber') || text.includes('internet') || text.includes('connectivity')) {
      elements.push('network');
      elements.push('router');
      elements.push('wifi_signal');
    }
    
    if (text.includes('mobile') || text.includes('phone') || text.includes('pos')) {
      elements.push('smartphone');
      elements.push('network');
    }
    
    if (text.includes('analytics') || text.includes('data') || text.includes('insights')) {
      elements.push('analytics_dashboard');
      elements.push('chart');
    }
    
    if (text.includes('security') || text.includes('protection') || text.includes('sase')) {
      elements.push('security_shield');
      elements.push('server');
    }
    
    if (text.includes('cloud') || text.includes('microsoft') || text.includes('365')) {
      elements.push('cloud');
      elements.push('server');
    }
    
    if (text.includes('data center') || text.includes('server') || text.includes('infrastructure')) {
      elements.push('data_center');
      elements.push('server');
      elements.push('tower');
    }
    
    // Industry-specific building types
    const industry = this.determineIndustry(data.target_segments || []);
    if (industry === 'retail') {
      elements.push('retail_store');
    } else if (industry === 'healthcare') {
      elements.push('hospital');
    } else if (industry === 'education') {
      elements.push('school');
    }
    
    // Remove duplicates and limit to 4 elements for clarity
    return [...new Set(elements)].slice(0, 4);
  }

  async searchMultipleProducts(queries: string[]): Promise<ProductSearchResult[]> {
    const results = await Promise.all(
      queries.map(query => this.searchProduct(query))
    );
    return results;
  }

  clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Cache cleared');
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export singleton instance
export const jammyWebIntelligence = new JammyWebIntelligence();
