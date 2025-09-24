/**
 * 🤖 JAMMY AI - The Brain (Simplified with Orchestration Engine)
 * 
 * This is now a clean, simple interface that delegates to the orchestration engine.
 * The orchestration engine handles all the complex workflow logic.
 */

import { JammyOrchestrationEngine } from './jammy-orchestration-engine';

// Interfaces for Jammy's responses
export interface JammyResponse {
  message: string;
  mediaAssets: MediaAsset[];
  industry: string;
  confidence: number;
  jammyId: string;
  learningData?: {
    industry: string;
    confidence: number;
    insights: string[];
  };
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'pdf' | 'document' | 'presentation';
  title: string;
  industry: string;
  content: string;
  fileUrl: string;
  generatedAt: string;
  styleUsed?: string;
  confidence?: number;
}

export interface JammyMemory {
  conversations: { message: string; response: string; timestamp: string; industry: string; confidence: number }[];
  learnedPatterns: { pattern: string; insight: string; confidence: number }[];
  knowledgeBase: any[];
  userPreferences: { [key: string]: any };
}

class JammyAI {
  private memory: JammyMemory;
  private initialized: boolean = false;
  private orchestrationEngine: JammyOrchestrationEngine;

  constructor() {
    this.memory = {
      conversations: [],
      learnedPatterns: [],
      knowledgeBase: [],
      userPreferences: {},
    };
    this.orchestrationEngine = new JammyOrchestrationEngine();
  }

  private async initialize() {
    if (!this.initialized) {
      this.loadMemory();
      console.log('🤖 Jammy AI initializing with Orchestration Engine...');
      console.log('✅ Jammy AI ready! The nervous system is online!');
      this.initialized = true;
    }
  }

  /**
   * 🎯 MAIN ENTRY POINT - Process user message through orchestration engine
   */
  async processMessage(
    message: string, 
    context: { user: string; role: string }, 
    uploadedFiles: any[] = []
  ): Promise<JammyResponse> {
    await this.initialize();

    console.log('🤖 Jammy AI processing message through orchestration engine:', message);

    try {
      // Delegate to orchestration engine
      const result = await this.orchestrationEngine.processMessage(message, context, uploadedFiles);
      
      // Store conversation
      this.storeConversation(message, result.message, result.industry, result.confidence);
      
      // Return in JammyResponse format
      return {
        message: result.message,
        mediaAssets: result.mediaAssets,
        industry: result.industry,
        confidence: result.confidence,
        jammyId: result.jammyId,
        learningData: result.learningData
      };

    } catch (error) {
      console.error('❌ Jammy AI processing error:', error);
      return {
        message: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        mediaAssets: [],
        industry: 'general',
        confidence: 0.0,
        jammyId: `jammy_${Date.now()}`,
        learningData: {
          industry: 'general',
          confidence: 0.0,
          insights: ['Error during processing']
        }
      };
    }
  }

  /**
   * 📚 Learn from uploaded files
   */
  public async learnFromFiles(files: any[]): Promise<void> {
    console.log('📚 Learning from uploaded files:', files.length);
    
    for (const file of files) {
      this.memory.learnedPatterns.push({
        pattern: `file_upload_${file.name}`,
        insight: `Learned styles and content from ${file.name}`,
        confidence: 0.9,
      });
    }
    
    this.saveMemory();
  }

  /**
   * 🧠 Get memory
   */
  public getMemory(): JammyMemory {
    return this.memory;
  }

  /**
   * 💾 Store conversation
   */
  private storeConversation(message: string, response: string, industry: string, confidence: number) {
    this.memory.conversations.push({ 
      message, 
      response, 
      timestamp: new Date().toISOString(), 
      industry, 
      confidence 
    });
    
    if (this.memory.conversations.length > 10) {
      this.memory.conversations.shift(); // Keep only the last 10 conversations
    }
    
    this.saveMemory();
  }

  /**
   * 💾 Save memory
   */
  private saveMemory() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('jammyMemory', JSON.stringify(this.memory));
    }
  }

  /**
   * 📖 Load memory
   */
  private loadMemory() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedMemory = localStorage.getItem('jammyMemory');
      if (savedMemory) {
        this.memory = JSON.parse(savedMemory);
      }
    }
  }

  /**
   * 🔄 Reset memory
   */
  public resetMemory() {
    this.memory = {
      conversations: [],
      learnedPatterns: [],
      knowledgeBase: [],
      userPreferences: {},
    };
    this.saveMemory();
  }

  /**
   * 📊 Get system status
   */
  public getStatus() {
    return {
      jammy: {
        status: 'operational',
        memory: {
          conversations: this.memory.conversations.length,
          learnedPatterns: this.memory.learnedPatterns.length,
          knowledgeBase: this.memory.knowledgeBase.length
        },
        capabilities: [
          'Intelligent content generation',
          'Media asset creation',
          'Learning from uploads',
          'UAE market intelligence',
          'Style pattern recognition',
          'Conversation memory',
          'Continuous improvement'
        ]
      },
      orchestration: this.orchestrationEngine.getStatus()
    };
  }
}

// Export singleton instance
export const jammyAI = new JammyAI();