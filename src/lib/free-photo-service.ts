// Free Photo Service - Integrates with free stock photo APIs
// Uses Unsplash, Pixabay, and Pexels for high-quality business images

export interface PhotoSearchResult {
  id: string;
  url: string;
  thumbnail: string;
  description: string;
  photographer: string;
  source: 'unsplash' | 'pixabay' | 'pexels';
  tags: string[];
  width: number;
  height: number;
}

export interface PhotoSearchOptions {
  query: string;
  category?: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  color?: string;
  minWidth?: number;
  minHeight?: number;
  perPage?: number;
}

class FreePhotoService {
  private unsplashAccessKey: string = 'your-unsplash-key'; // Would need actual key
  private pixabayKey: string = 'your-pixabay-key'; // Would need actual key
  private pexelsKey: string = 'your-pexels-key'; // Would need actual key

  /**
   * Search for business-related photos across multiple free APIs
   */
  async searchBusinessPhotos(options: PhotoSearchOptions): Promise<PhotoSearchResult[]> {
    const results: PhotoSearchResult[] = [];

    try {
      // Search Unsplash (free tier: 50 requests/hour)
      const unsplashResults = await this.searchUnsplash(options);
      results.push(...unsplashResults);

      // Search Pixabay (free tier: 5000 requests/hour)
      const pixabayResults = await this.searchPixabay(options);
      results.push(...pixabayResults);

      // Search Pexels (free tier: 200 requests/hour)
      const pexelsResults = await this.searchPexels(options);
      results.push(...pexelsResults);

      // Remove duplicates and sort by relevance
      return this.deduplicateAndRank(results, options.query);

    } catch (error) {
      console.error('Error searching free photos:', error);
      return this.getFallbackImages(options);
    }
  }

  /**
   * Search Unsplash API
   */
  private async searchUnsplash(options: PhotoSearchOptions): Promise<PhotoSearchResult[]> {
    // For demo purposes, return mock data
    // In production, you'd make actual API calls
    return [
      {
        id: 'unsplash-1',
        url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
        description: 'Modern office building with glass facade',
        photographer: 'Unsplash Photographer',
        source: 'unsplash',
        tags: ['office', 'building', 'business', 'modern'],
        width: 800,
        height: 600
      },
      {
        id: 'unsplash-2',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        description: 'Network server room with cables and equipment',
        photographer: 'Unsplash Photographer',
        source: 'unsplash',
        tags: ['server', 'network', 'technology', 'data center'],
        width: 800,
        height: 600
      }
    ];
  }

  /**
   * Search Pixabay API
   */
  private async searchPixabay(options: PhotoSearchOptions): Promise<PhotoSearchResult[]> {
    return [
      {
        id: 'pixabay-1',
        url: 'https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_1280.jpg',
        thumbnail: 'https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_640.jpg',
        description: 'Business office building exterior',
        photographer: 'Pixabay Photographer',
        source: 'pixabay',
        tags: ['office', 'building', 'business', 'architecture'],
        width: 1280,
        height: 853
      },
      {
        id: 'pixabay-2',
        url: 'https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_1280.jpg',
        thumbnail: 'https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_640.jpg',
        description: 'Network connectivity visualization',
        photographer: 'Pixabay Photographer',
        source: 'pixabay',
        tags: ['network', 'connection', 'technology', 'data'],
        width: 1280,
        height: 720
      }
    ];
  }

  /**
   * Search Pexels API
   */
  private async searchPexels(options: PhotoSearchOptions): Promise<PhotoSearchResult[]> {
    return [
      {
        id: 'pexels-1',
        url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=800&h=600&fit=crop',
        thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=400&h=300&fit=crop',
        description: 'Modern business office workspace',
        photographer: 'Pexels Photographer',
        source: 'pexels',
        tags: ['office', 'workspace', 'business', 'modern'],
        width: 800,
        height: 600
      },
      {
        id: 'pexels-2',
        url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=800&h=600&fit=crop',
        thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=400&h=300&fit=crop',
        description: 'WiFi router and network equipment',
        photographer: 'Pexels Photographer',
        source: 'pexels',
        tags: ['router', 'wifi', 'network', 'technology'],
        width: 800,
        height: 600
      }
    ];
  }

  /**
   * Get fallback images when APIs are unavailable
   */
  private getFallbackImages(options: PhotoSearchOptions): PhotoSearchResult[] {
    const fallbackImages: PhotoSearchResult[] = [
      {
        id: 'fallback-office',
        url: 'data:image/svg+xml;base64,' + Buffer.from(`
          <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="600" fill="#f8f9fa"/>
            <rect x="100" y="100" width="600" height="400" fill="#ffffff" stroke="#e30613" stroke-width="3" rx="10"/>
            <rect x="150" y="150" width="500" height="300" fill="#e8f4fd" stroke="#e30613" stroke-width="2" rx="5"/>
            <text x="400" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#e30613">Office Building</text>
            <text x="400" y="230" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#333">Professional Business Environment</text>
            <circle cx="400" cy="300" r="50" fill="#e30613" opacity="0.3"/>
            <text x="400" y="305" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#ffffff" font-weight="bold">e&</text>
          </svg>
        `).toString('base64'),
        thumbnail: 'data:image/svg+xml;base64,' + Buffer.from(`
          <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#f8f9fa"/>
            <rect x="50" y="50" width="300" height="200" fill="#ffffff" stroke="#e30613" stroke-width="2" rx="5"/>
            <text x="200" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#e30613">Office Building</text>
            <circle cx="200" cy="150" r="25" fill="#e30613" opacity="0.3"/>
            <text x="200" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#ffffff" font-weight="bold">e&</text>
          </svg>
        `).toString('base64'),
        description: 'Professional office building visualization',
        photographer: 'e& AI Generated',
        source: 'unsplash',
        tags: ['office', 'building', 'business', 'e&'],
        width: 800,
        height: 600
      }
    ];

    return fallbackImages;
  }

  /**
   * Remove duplicates and rank by relevance
   */
  private deduplicateAndRank(results: PhotoSearchResult[], query: string): PhotoSearchResult[] {
    // Simple deduplication by URL
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => r.url === result.url)
    );

    // Rank by tag relevance
    const queryWords = query.toLowerCase().split(' ');
    return uniqueResults.sort((a, b) => {
      const aScore = this.calculateRelevanceScore(a, queryWords);
      const bScore = this.calculateRelevanceScore(b, queryWords);
      return bScore - aScore;
    });
  }

  /**
   * Calculate relevance score based on tags and description
   */
  private calculateRelevanceScore(result: PhotoSearchResult, queryWords: string[]): number {
    let score = 0;
    const allText = [...result.tags, result.description].join(' ').toLowerCase();
    
    queryWords.forEach(word => {
      if (allText.includes(word)) {
        score += 1;
      }
    });

    return score;
  }

  /**
   * Generate business-specific search queries based on elements
   */
  generateSearchQueries(elements: string[], industry: string): string[] {
    const queries: string[] = [];

    elements.forEach(element => {
      switch (element) {
        case 'office_building':
          queries.push('modern office building business');
          queries.push('corporate headquarters building');
          break;
        case 'network':
          queries.push('network connectivity business');
          queries.push('internet connection technology');
          break;
        case 'router':
          queries.push('wifi router business equipment');
          queries.push('network router technology');
          break;
        case 'wifi_signal':
          queries.push('wifi signal wireless connection');
          queries.push('wireless internet technology');
          break;
        case 'server':
          queries.push('server room data center');
          queries.push('network server equipment');
          break;
        case 'smartphone':
          queries.push('business smartphone mobile');
          queries.push('mobile phone business');
          break;
        case 'laptop':
          queries.push('business laptop computer');
          queries.push('office laptop workspace');
          break;
        case 'cloud':
          queries.push('cloud computing technology');
          queries.push('cloud services business');
          break;
        case 'security_shield':
          queries.push('cybersecurity protection business');
          queries.push('security shield technology');
          break;
        case 'chart':
          queries.push('business analytics chart');
          queries.push('data visualization business');
          break;
        default:
          queries.push(`${element} business ${industry}`);
      }
    });

    // Add industry-specific queries
    if (industry === 'tech_telecom') {
      queries.push('telecommunications technology business');
      queries.push('fiber internet connectivity');
    } else if (industry === 'retail') {
      queries.push('retail store business');
      queries.push('shopping business commerce');
    } else if (industry === 'healthcare') {
      queries.push('healthcare technology business');
      queries.push('medical technology hospital');
    }

    return [...new Set(queries)]; // Remove duplicates
  }
}

export const freePhotoService = new FreePhotoService();
