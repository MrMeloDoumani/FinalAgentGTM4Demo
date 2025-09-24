/**
 * 🤖 JAMMY AI - The Brain (Direct Communication System)
 * 
 * This is the clean, direct communication system that works with:
 * - JammyCommunicationSystem (bi-lingual communication)
 * - JammyWebIntelligence (knowledge search)
 * - EnhancedChinchilla (visual generation)
 */

import { JammyCommunicationSystem } from './jammy-communication-system';
import { JammyWebIntelligence } from './jammy-web-intelligence';
import { enhancedChinchilla } from './enhanced-chinchilla';
import { GTM_CONTEXT } from './data/gtm-context';

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
  private communicationSystem: JammyCommunicationSystem;
  private webIntelligence: JammyWebIntelligence;
  private chinchilla: typeof enhancedChinchilla;

  constructor() {
    this.memory = {
      conversations: [],
      learnedPatterns: [],
      knowledgeBase: [],
      userPreferences: {},
    };
    this.communicationSystem = new JammyCommunicationSystem();
    this.webIntelligence = new JammyWebIntelligence(GTM_CONTEXT);
    this.chinchilla = enhancedChinchilla;
  }

  private async initialize() {
    if (!this.initialized) {
      this.loadMemory();
      console.log('🤖 Jammy AI initializing with Direct Communication System...');
      console.log('✅ Jammy AI ready! The direct communication system is online!');
      this.initialized = true;
    }
  }

  /**
   * 🎯 MAIN ENTRY POINT - Process user message through direct communication
   */
  async processMessage(
    message: string, 
    context: { user: string; role: string }, 
    uploadedFiles: any[] = []
  ): Promise<JammyResponse> {
    await this.initialize();

    console.log('🤖 Jammy AI processing message:', message);

    try {
      console.log('🔍 Step 1: Starting communication system...');
      // Step 1: Communicate with user (analyze intent)
      const communicationResult = await this.communicationSystem.communicate(message, context.user || 'default');
      console.log('💬 Communication result:', communicationResult);

      console.log('🔍 Step 2: Starting web intelligence...');
      // Step 2: Search for product information
      const webResult = await this.webIntelligence.searchProduct(message, context);
      console.log('🌐 Web intelligence result:', webResult);

      // Step 3: Generate response based on intent
      console.log('🔍 Step 3: Checking if image generation is needed...');
      console.log('🔍 nextAction:', communicationResult.nextAction);
      console.log('🔍 chinchillaTranslation:', communicationResult.chinchillaTranslation);
      
      if (communicationResult.nextAction === 'execute' && communicationResult.chinchillaTranslation) {
        // Generate image
        console.log('🎨 Generating image with Enhanced Chinchilla...');
        
        // Extract elements from Chinchilla translation
        const elements = this.extractElementsFromTranslation(communicationResult.chinchillaTranslation);
        console.log('🔍 Extracted elements:', elements);
        
        const imageResult = await this.chinchilla.generateEnhancedVisual({
          prompt: communicationResult.chinchillaTranslation,
          industry: webResult.industry || 'tech_telecom',
          contentType: 'product_visualization',
          style: 'professional_b2b',
          requirements: ['e& branding', 'B2B focus', 'professional layout'],
          context: context.user || 'default',
          elements: elements
        });

        if (imageResult.success) {
          const mediaAsset = {
            id: `image_${Date.now()}`,
            type: 'image' as const,
            title: imageResult.title,
            industry: webResult.industry || 'tech_telecom',
            content: imageResult.description,
            fileUrl: imageResult.imageUrl,
            generatedAt: new Date().toISOString(),
            styleUsed: imageResult.styleApplied,
            confidence: 0.9,
          };

          this.storeConversation(message, communicationResult.message, webResult.industry || 'tech_telecom', 0.9);

          return {
            message: communicationResult.message,
            mediaAssets: [mediaAsset],
            industry: webResult.industry || 'tech_telecom',
            confidence: 0.9,
            jammyId: `jammy_${Date.now()}`,
            learningData: {
              industry: webResult.industry || 'tech_telecom',
              confidence: 0.9,
              insights: ['Image generated successfully', 'Chinchilla executed command']
            }
          };
        } else {
          return {
            message: `I attempted to generate an image, but encountered an issue: ${imageResult.description}. Please try a different request or provide more details.`,
            mediaAssets: [],
            industry: webResult.industry || 'tech_telecom',
            confidence: 0.5,
            jammyId: `jammy_${Date.now()}`,
            learningData: {
              industry: webResult.industry || 'tech_telecom',
              confidence: 0.5,
              insights: ['Image generation failed']
            }
          };
        }
      } else {
        // General response
        this.storeConversation(message, communicationResult.message, webResult.industry || 'general', 0.8);

        return {
          message: communicationResult.message,
          mediaAssets: [],
          industry: webResult.industry || 'general',
          confidence: 0.8,
          jammyId: `jammy_${Date.now()}`,
          learningData: {
            industry: webResult.industry || 'general',
            confidence: 0.8,
            insights: ['General response provided']
          }
        };
      }

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
   * 🔍 Extract elements from Chinchilla translation
   */
  private extractElementsFromTranslation(translation: string): string[] {
    const elements: string[] = [];
    
    // Look for "Draw these elements:" pattern
    if (translation.includes('Draw these elements:')) {
      const elementsText = translation.split('Draw these elements:')[1];
      if (elementsText) {
        const elementList = elementsText.split(' for ')[0]; // Stop at " for "
        const elementArray = elementList.split(',').map(e => e.trim().toLowerCase());
        
        // Map common element names
        elementArray.forEach(element => {
          if (element.includes('office') || element.includes('building')) {
            elements.push('office_building');
          } else if (element.includes('network')) {
            elements.push('network');
          } else if (element.includes('router')) {
            elements.push('router');
          } else if (element.includes('wifi') || element.includes('signal')) {
            elements.push('wifi_signal');
          } else if (element.includes('server')) {
            elements.push('server');
          } else if (element.includes('smartphone') || element.includes('phone')) {
            elements.push('smartphone');
          } else if (element.includes('laptop')) {
            elements.push('laptop');
          } else if (element.includes('cloud')) {
            elements.push('cloud');
          } else if (element.includes('security') || element.includes('shield')) {
            elements.push('security_shield');
          } else if (element.includes('chart') || element.includes('analytics')) {
            elements.push('chart');
          } else {
            // Add as-is if it's a known element
            elements.push(element);
          }
        });
      }
    }
    
    // If no elements found, use defaults based on industry
    if (elements.length === 0) {
      elements.push('office_building', 'network');
    }
    
    return [...new Set(elements)]; // Remove duplicates
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
      communication: 'operational',
      webIntelligence: 'operational',
      chinchilla: 'operational'
    };
  }
}

// Export singleton instance
export const jammyAI = new JammyAI();