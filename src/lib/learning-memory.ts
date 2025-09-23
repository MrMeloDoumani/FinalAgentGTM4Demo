// Learning Memory System - Jammy's ability to learn and remember
// This system stores and applies knowledge from every interaction

export interface MemoryEntry {
  id: string;
  type: 'interaction' | 'preference' | 'pattern' | 'feedback' | 'insight' | 'correction';
  content: string;
  industry?: string;
  context?: string;
  timestamp: string;
  importance: number; // 1-10 scale
  applied: boolean;
  source: string; // 'user', 'system', 'upload', 'conversation'
  tags: string[];
  confidence: number; // 0-1 scale
}

export interface LearningPattern {
  id: string;
  pattern: string;
  industry: string;
  frequency: number;
  successRate: number;
  lastUsed: string;
  examples: string[];
}

export interface UserPreference {
  key: string;
  value: any;
  industry?: string;
  context?: string;
  confidence: number;
  lastUpdated: string;
}

class LearningMemorySystem {
  private memories: MemoryEntry[] = [];
  private patterns: LearningPattern[] = [];
  private preferences: UserPreference[] = [];
  private conversationContext: string[] = [];

  // Store a new memory entry
  storeMemory(entry: Omit<MemoryEntry, 'id' | 'timestamp'>): string {
    const memory: MemoryEntry = {
      ...entry,
      id: `memory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    this.memories.push(memory);
    this.updatePatterns(memory);
    this.updatePreferences(memory);
    
    console.log('💾 Stored memory:', memory.type, memory.content.substring(0, 50) + '...');
    return memory.id;
  }

  // Retrieve relevant memories for a query
  getRelevantMemories(query: string, industry?: string, limit: number = 5): MemoryEntry[] {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(' ').filter(word => word.length > 3);
    
    // Score memories based on relevance
    const scoredMemories = this.memories.map(memory => {
      let score = 0;
      
      // Industry match
      if (industry && memory.industry === industry) {
        score += 3;
      }
      
      // Content similarity
      const contentLower = memory.content.toLowerCase();
      queryWords.forEach(word => {
        if (contentLower.includes(word)) {
          score += 2;
        }
      });
      
      // Tag matches
      memory.tags.forEach(tag => {
        if (queryLower.includes(tag.toLowerCase())) {
          score += 1;
        }
      });
      
      // Recency bonus
      const daysSince = (Date.now() - new Date(memory.timestamp).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) score += 1;
      if (daysSince < 1) score += 2;
      
      // Importance weight
      score += memory.importance / 2;
      
      return { memory, score };
    });
    
    // Sort by score and return top results
    return scoredMemories
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.memory);
  }

  // Learn from an interaction
  learnFromInteraction(
    query: string,
    response: string,
    industry: string,
    success: boolean,
    context?: string
  ): void {
    console.log('🧠 Learning from interaction:', success ? 'SUCCESS' : 'NEEDS IMPROVEMENT');
    
    // Store the interaction
    this.storeMemory({
      type: 'interaction',
      content: `${query} → ${response}`,
      industry,
      context,
      importance: success ? 7 : 4,
      applied: true,
      source: 'conversation',
      tags: this.extractTags(query),
      confidence: success ? 0.8 : 0.4
    });
    
    // Extract patterns
    this.extractPatterns(query, response, industry, success);
    
    // Update conversation context
    this.conversationContext.push(query);
    if (this.conversationContext.length > 10) {
      this.conversationContext = this.conversationContext.slice(-10);
    }
  }

  // Extract patterns from interactions
  private extractPatterns(
    query: string,
    response: string,
    industry: string,
    success: boolean
  ): void {
    const queryLower = query.toLowerCase();
    
    // Look for common patterns
    const patterns = [
      'create.*image',
      'generate.*brochure',
      'analyze.*market',
      'find.*solution',
      'compare.*product',
      'explain.*feature'
    ];
    
    patterns.forEach(patternStr => {
      const regex = new RegExp(patternStr, 'i');
      if (regex.test(queryLower)) {
        const existingPattern = this.patterns.find(p => p.pattern === patternStr && p.industry === industry);
        
        if (existingPattern) {
          existingPattern.frequency += 1;
          existingPattern.successRate = (existingPattern.successRate * (existingPattern.frequency - 1) + (success ? 1 : 0)) / existingPattern.frequency;
          existingPattern.lastUsed = new Date().toISOString();
          existingPattern.examples.push(query);
        } else {
          this.patterns.push({
            id: `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            pattern: patternStr,
            industry,
            frequency: 1,
            successRate: success ? 1 : 0,
            lastUsed: new Date().toISOString(),
            examples: [query]
          });
        }
      }
    });
  }

  // Update patterns based on new memory
  private updatePatterns(memory: MemoryEntry): void {
    if (memory.type === 'interaction' && memory.industry) {
      // This would analyze the memory for new patterns
      // For now, we'll keep it simple
    }
  }

  // Update user preferences based on new memory
  private updatePreferences(memory: MemoryEntry): void {
    if (memory.type === 'preference') {
      const existingPref = this.preferences.find(p => p.key === memory.content);
      
      if (existingPref) {
        existingPref.value = memory.content;
        existingPref.confidence = Math.min(existingPref.confidence + 0.1, 1.0);
        existingPref.lastUpdated = new Date().toISOString();
      } else {
        this.preferences.push({
          key: memory.content,
          value: memory.content,
          industry: memory.industry,
          context: memory.context,
          confidence: 0.7,
          lastUpdated: new Date().toISOString()
        });
      }
    }
  }

  // Extract tags from content
  private extractTags(content: string): string[] {
    const tags: string[] = [];
    const contentLower = content.toLowerCase();
    
    // Industry tags
    const industries = ['retail', 'education', 'healthcare', 'government', 'finance', 'tech', 'manufacturing'];
    industries.forEach(industry => {
      if (contentLower.includes(industry)) {
        tags.push(industry);
      }
    });
    
    // Content type tags
    const contentTypes = ['image', 'brochure', 'whitepaper', 'presentation', 'email', 'sms'];
    contentTypes.forEach(type => {
      if (contentLower.includes(type)) {
        tags.push(type);
      }
    });
    
    // Intent tags
    const intents = ['create', 'analyze', 'compare', 'explain', 'find', 'generate'];
    intents.forEach(intent => {
      if (contentLower.includes(intent)) {
        tags.push(intent);
      }
    });
    
    return tags;
  }

  // Get learning insights
  getLearningInsights(industry?: string): {
    totalMemories: number;
    industryMemories: number;
    topPatterns: LearningPattern[];
    userPreferences: UserPreference[];
    recentInsights: string[];
    confidence: number;
  } {
    const industryMemories = industry 
      ? this.memories.filter(m => m.industry === industry)
      : this.memories;
    
    const topPatterns = this.patterns
      .filter(p => !industry || p.industry === industry)
      .sort((a, b) => b.frequency * b.successRate - a.frequency * a.successRate)
      .slice(0, 5);
    
    const recentInsights = this.memories
      .filter(m => m.type === 'insight' && (!industry || m.industry === industry))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 3)
      .map(m => m.content);
    
    const avgConfidence = this.memories.length > 0
      ? this.memories.reduce((sum, m) => sum + m.confidence, 0) / this.memories.length
      : 0;
    
    return {
      totalMemories: this.memories.length,
      industryMemories: industryMemories.length,
      topPatterns,
      userPreferences: this.preferences,
      recentInsights,
      confidence: avgConfidence
    };
  }

  // Apply learning to improve responses
  applyLearning(query: string, industry?: string): {
    relevantMemories: MemoryEntry[];
    patterns: LearningPattern[];
    preferences: UserPreference[];
    suggestions: string[];
  } {
    const relevantMemories = this.getRelevantMemories(query, industry, 3);
    const patterns = this.patterns.filter(p => !industry || p.industry === industry);
    const preferences = this.preferences.filter(p => !industry || p.industry === industry);
    
    // Generate suggestions based on learning
    const suggestions: string[] = [];
    
    // Pattern-based suggestions
    patterns.forEach(pattern => {
      if (pattern.successRate > 0.7) {
        suggestions.push(`Based on successful patterns, consider: ${pattern.pattern}`);
      }
    });
    
    // Memory-based suggestions
    relevantMemories.forEach(memory => {
      if (memory.confidence > 0.8) {
        suggestions.push(`Previous successful approach: ${memory.content.substring(0, 100)}...`);
      }
    });
    
    // Preference-based suggestions
    preferences.forEach(pref => {
      if (pref.confidence > 0.7) {
        suggestions.push(`User preference: ${pref.key} = ${pref.value}`);
      }
    });
    
    return {
      relevantMemories,
      patterns,
      preferences,
      suggestions
    };
  }

  // Get conversation context
  getConversationContext(): string[] {
    return [...this.conversationContext];
  }

  // Clear old memories (cleanup)
  cleanupOldMemories(daysOld: number = 30): void {
    const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
    
    this.memories = this.memories.filter(memory => 
      new Date(memory.timestamp) > cutoffDate || memory.importance > 7
    );
    
    console.log('🧹 Cleaned up old memories, kept', this.memories.length, 'memories');
  }

  // Get memory statistics
  getMemoryStats(): {
    totalMemories: number;
    memoryTypes: Record<string, number>;
    industryDistribution: Record<string, number>;
    averageImportance: number;
    averageConfidence: number;
  } {
    const memoryTypes: Record<string, number> = {};
    const industryDistribution: Record<string, number> = {};
    
    this.memories.forEach(memory => {
      memoryTypes[memory.type] = (memoryTypes[memory.type] || 0) + 1;
      if (memory.industry) {
        industryDistribution[memory.industry] = (industryDistribution[memory.industry] || 0) + 1;
      }
    });
    
    const avgImportance = this.memories.length > 0
      ? this.memories.reduce((sum, m) => sum + m.importance, 0) / this.memories.length
      : 0;
    
    const avgConfidence = this.memories.length > 0
      ? this.memories.reduce((sum, m) => sum + m.confidence, 0) / this.memories.length
      : 0;
    
    return {
      totalMemories: this.memories.length,
      memoryTypes,
      industryDistribution,
      averageImportance,
      averageConfidence
    };
  }
}

export const learningMemorySystem = new LearningMemorySystem();
