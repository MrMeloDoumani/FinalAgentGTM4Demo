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

export interface SectorInsights {
  sector: string;
  region: string;
  timeframe: string;
  trends: string[];
  drivers: string[];
  risks: string[];
  recommendedPlays: string[];
  sources: string[]; // short source notes/links
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
      console.log('🌐 Website search result:', websiteData);
      
      // Step 2: Search GTM_CONTEXT
      const gtmData = this.searchGTMContext(query);
      console.log('📚 GTM search result:', gtmData);
      
      // Step 3: Combine and enhance
      const result = this.combineKnowledge(websiteData, gtmData, query);
      console.log('🔄 Combined result:', result);
      
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

  // New: Sector insights generator based on GTM_CONTEXT + heuristics
  async getSectorInsights(rawQuery: string): Promise<SectorInsights> {
    const q = rawQuery.toLowerCase();
    const sectorMap: Record<string, string> = {
      retail: 'retail',
      healthcare: 'healthcare',
      education: 'education',
      finance: 'finance',
      banking: 'finance',
      government: 'government',
      logistics: 'logistics',
      manufacturing: 'manufacturing',
      hospitality: 'hospitality',
      telecom: 'tech_telecom',
      technology: 'tech_telecom'
    };

    let sector = 'tech_telecom';
    for (const key of Object.keys(sectorMap)) {
      if (q.includes(key)) { sector = sectorMap[key]; break; }
    }

    const ctxSector = GTM_CONTEXT.sectors.find(s => s.key === sector) || GTM_CONTEXT.sectors.find(s => s.key === 'tech_telecom');
    const plays = (ctxSector?.gtm_plays || []).slice(0, 3);

    const insights: SectorInsights = {
      sector: ctxSector?.name || 'Tech and Telecom',
      region: 'UAE',
      timeframe: 'last 12-18 months',
      trends: this.buildTrends(sector),
      drivers: this.buildDrivers(sector),
      risks: this.buildRisks(sector),
      recommendedPlays: plays.map(p => p.hypothesis),
      sources: [
        'Etisalat e& SMB — public pages',
        'UAE gov digital/AI announcements',
        'Analyst notes (regional press)'
      ]
    };

    return insights;
  }

  private buildTrends(sector: string): string[] {
    const base = [
      'Accelerating digital transformation and cloud adoption',
      'Heightened focus on cybersecurity and zero-trust',
      'Data-driven decisions via analytics and AI'
    ];
    if (sector === 'retail') return [
      'Omnichannel commerce and contactless payments',
      'In-store analytics: footfall, heatmaps, queueing',
      'Wi‑Fi marketing and loyalty programs'
    ];
    if (sector === 'healthcare') return [
      'Telemedicine and secure patient data workflows',
      'Branch resilience and uptime for clinics',
      'IoT cameras for safety and compliance'
    ];
    if (sector === 'education') return [
      'Hybrid learning and campus Wi‑Fi densification',
      'UEM/MDM for device programs',
      'Content filtering and student safety'
    ];
    return base;
  }

  private buildDrivers(sector: string): string[] {
    const base = [
      'Productivity and cost efficiency',
      'Customer experience and speed',
      'Regulatory compliance and data residency'
    ];
    if (sector === 'retail') return [
      'Faster checkout and reduced queue times',
      'Inventory and sales visibility',
      'Payments flexibility (POS, SoftPOS)'
    ];
    if (sector === 'finance') return [
      'Fraud prevention and SLA connectivity',
      'Secure remote access for staff',
      'Data protection and auditability'
    ];
    return base;
  }

  private buildRisks(sector: string): string[] {
    const base = [
      'Cyber threats and data loss',
      'Vendor lock-in and cost overruns',
      'Skills gaps and change management'
    ];
    if (sector === 'retail') return [
      'Payment fraud and chargebacks',
      'Shrinkage and loss prevention gaps',
      'Network dead zones impacting POS'
    ];
    if (sector === 'healthcare') return [
      'PHI privacy breaches',
      'Connectivity downtime affecting care',
      'Legacy systems interoperability'
    ];
    return base;
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

      // Simulate search logic - be more specific
      const lowerQuery = query.toLowerCase();
      console.log('🔍 Checking query:', lowerQuery);
      
      if (lowerQuery.includes('business pro fiber') || 
          lowerQuery.includes('business pro') ||
          lowerQuery.includes('pro fiber') ||
          lowerQuery.includes('fiber') ||
          lowerQuery.includes('internet')) {
        console.log('✅ Found match for Business Pro Fiber');
        return mockWebsiteData;
      }
      
      console.log('❌ No match found for:', query);

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
      console.log('🔍 Checking category:', category.label);
      for (const item of category.items) {
        const score = this.calculateRelevanceScore(item, lowerQuery);
        console.log(`  - ${item.name}: score ${score}`);
        
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
      console.log('✅ Found in GTM_CONTEXT:', bestMatch.name, 'score:', bestMatch.confidence);
      return bestMatch;
    }

    console.log('❌ No match found in GTM_CONTEXT, using fallback');
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
    
    // Name match (exact)
    if (item.name.toLowerCase().includes(query)) score += 0.8;
    
    // Short description match
    if (item.short_desc && item.short_desc.toLowerCase().includes(query)) score += 0.6;
    
    // Description match
    if (item.description && item.description.toLowerCase().includes(query)) score += 0.6;
    
    // Feature match
    if (item.key_features) {
      const featureMatches = item.key_features.filter((feature: string) => 
        feature.toLowerCase().includes(query)
      ).length;
      score += featureMatches * 0.3;
    }
    
    // Target segments match
    if (item.target_segments) {
      const segmentMatches = item.target_segments.filter((segment: string) => 
        segment.toLowerCase().includes(query)
      ).length;
      score += segmentMatches * 0.2;
    }
    
    // Category match
    if (item.category && item.category.toLowerCase().includes(query)) score += 0.4;
    
    // Partial word matches for better discovery
    const queryWords = query.split(' ');
    for (const word of queryWords) {
      if (word.length > 2) { // Only match words longer than 2 characters
        if (item.name.toLowerCase().includes(word)) score += 0.2;
        if (item.short_desc && item.short_desc.toLowerCase().includes(word)) score += 0.1;
      }
    }
    
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
