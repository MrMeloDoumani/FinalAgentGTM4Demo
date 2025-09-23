import { GTM_CONTEXT } from './data/gtm-context';
import { jammyCommunicationSystem } from './jammy-communication-system';
import { jammyWebIntelligence } from './jammy-web-intelligence';
import { chinchillaVisualIntelligence } from './chinchilla-visual-intelligence';

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
  type: 'pdf' | 'image' | 'presentation' | 'email' | 'sms' | 'infographic';
  title: string;
  industry: string;
  content: string;
  fileUrl: string;
  generatedAt: string;
  styleUsed?: string;
}

export interface LearningData {
  industry: string;
  confidence: number;
  insights: string[];
  patterns: string[];
  improvements: string[];
}

export interface JammyMemory {
  conversations: Array<{
    timestamp: string;
    message: string;
    response: string;
    industry: string;
    confidence: number;
  }>;
  knowledge: Array<{
    id: string;
    type: string;
    content: string;
    industry: string;
    confidence: number;
  }>;
  patterns: Array<{
    pattern: string;
    frequency: number;
    success: number;
  }>;
}

export class JammyAI {
  private memory: JammyMemory;
  private isInitialized: boolean = false;

  constructor() {
    this.memory = {
      conversations: [],
      knowledge: [],
      patterns: []
    };
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    console.log('🤖 Jammy AI initializing...');
    this.loadMemory();
    this.isInitialized = true;
    console.log('✅ Jammy AI ready with creative learning capabilities!');
  }

  async processMessage(
    message: string, 
    context: { user: string; role: string }, 
    uploadedFiles: any[] = []
  ): Promise<JammyResponse> {
    await this.initialize();

    console.log('🤖 Jammy AI processing message with intelligence system:', message);

    try {
      // Step 1: Process through communication system
      const communicationResult = jammyCommunicationSystem.communicate(message, context);
      console.log('🗣️ Communication result:', communicationResult);

      // Step 2: If communication system says to ask questions, return the question
      if (communicationResult.nextAction === 'question') {
        return {
          message: communicationResult.message,
          mediaAssets: [],
          industry: 'general',
          confidence: 0.5,
          jammyId: `jammy_${Date.now()}`,
          learningData: {
            industry: 'general',
            confidence: 0.5,
            insights: ['User needs more information']
          }
        };
      }

      // Step 3: If communication system has Chinchilla command, use it
      if (communicationResult.chinchillaTranslation) {
        console.log('🎨 Using Chinchilla command from communication system');
        return await this.generateImageWithChinchilla(communicationResult, context);
      }

      // Step 4: Fallback to web intelligence and general processing
      const webResult = await jammyWebIntelligence.searchProduct(message, context);
      console.log('🌐 Web intelligence result:', webResult);

      // Step 5: Generate appropriate response
      const response = await this.generateIntelligentResponse(message, context, webResult);
      
      // Step 6: Store conversation
      this.storeConversation(message, response.message, webResult.industry, response.confidence);
      
      return response;

    } catch (error) {
      console.error('❌ Jammy AI processing error:', error);
      return {
        message: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        mediaAssets: [],
        industry: 'general',
        confidence: 0.1,
        jammyId: `jammy_${Date.now()}`,
        learningData: {
          industry: 'general',
          confidence: 0.1,
          insights: ['System error occurred']
        }
      };
    }
  }

  private async generateImageWithChinchilla(
    communicationResult: any, 
    context: { user: string; role: string }
  ): Promise<JammyResponse> {
    console.log('🎨 Generating image with Chinchilla...');
    
    try {
      const imageResult = await chinchillaVisualIntelligence.generateIntelligentImage({
        prompt: communicationResult.chinchillaTranslation,
        industry: 'tech_telecom',
        contentType: 'product_visualization',
        style: 'professional_b2b',
        requirements: ['e& branding', 'B2B focus', 'professional layout'],
        context
      });

      if (imageResult.success) {
        const mediaAsset: MediaAsset = {
          id: `image_${Date.now()}`,
          type: 'image',
          title: 'Generated Visual',
          industry: 'tech_telecom',
          content: imageResult.description || 'Professional business visualization',
          fileUrl: imageResult.imageUrl,
          generatedAt: new Date().toISOString(),
          styleUsed: 'e& B2B Professional'
        };

        return {
          message: communicationResult.message,
          mediaAssets: [mediaAsset],
          industry: 'tech_telecom',
          confidence: 0.9,
          jammyId: `jammy_${Date.now()}`,
          learningData: {
            industry: 'tech_telecom',
            confidence: 0.9,
            insights: ['Image generated successfully', 'Chinchilla executed command']
          }
        };
      }
    } catch (error) {
      console.error('❌ Chinchilla image generation error:', error);
    }

    // Fallback response
    return {
      message: communicationResult.message,
      mediaAssets: [],
      industry: 'tech_telecom',
      confidence: 0.7,
      jammyId: `jammy_${Date.now()}`,
      learningData: {
        industry: 'tech_telecom',
        confidence: 0.7,
        insights: ['Image generation attempted']
      }
    };
  }

  private async generateIntelligentResponse(
    message: string, 
    context: { user: string; role: string }, 
    webResult: any
  ): Promise<JammyResponse> {
    const industry = webResult.industry || 'tech_telecom';
    const confidence = webResult.confidence || 0.8;

    // Generate contextual response based on message content
    let responseMessage = '';
    let mediaAssets: MediaAsset[] = [];

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      responseMessage = `Hello! I'm Jammy, your expert AI assistant for e& GTM team. It's wonderful to meet you!`;
    } else if (message.toLowerCase().includes('what can you do') || message.toLowerCase().includes('capabilities')) {
      responseMessage = this.generateCapabilitiesResponse();
    } else if (message.toLowerCase().includes('generate') || message.toLowerCase().includes('create') || message.toLowerCase().includes('image')) {
      responseMessage = `I'll generate a visual representation for the ${industry} sector. Let me create an image that showcases e&'s solutions and capabilities for your industry.`;
      // Generate image asset
      mediaAssets = await this.generateImageAsset(industry);
    } else {
      responseMessage = this.generateGeneralResponse(message, industry, webResult);
    }

    return {
      message: responseMessage,
      mediaAssets,
      industry,
      confidence,
      jammyId: `jammy_${Date.now()}`,
      learningData: {
        industry,
        confidence,
        insights: this.generateInsights(industry, webResult)
      }
    };
  }

  private generateCapabilitiesResponse(): string {
    return `# Jammy AI - Your GTM Assistant

Hello! I'm Jammy, your intelligent AI assistant for e& GTM team. I'm here to help you with:

## What I Can Do
• **Create Content**: Brochures, white papers, battlecards, presentations
• **Analyze Markets**: Industry insights, competitive analysis, opportunities
• **Generate Assets**: Visual content, documents, templates
• **Learn & Adapt**: I get smarter with every interaction

## My Knowledge
• **e& Product Portfolio**: Complete understanding of all solutions
• **Industry Expertise**: Deep knowledge of all 10 sectors
• **UAE Market Focus**: Local insights and cultural understanding
• **Learning Capabilities**: I learn from your uploads and conversations

## Our Conversation History
• I've had ${this.memory.conversations.length} conversations with you
• I'm continuously improving based on our interactions

What would you like to work on today? I'm here to help you succeed!

---
*Powered by Jammy AI - Intelligent GTM Assistant for e&*`;
  }

  private generateGeneralResponse(message: string, industry: string, webResult: any): string {
    const insights = this.generateInsights(industry, webResult);
    
    return `Hello! I'm Jammy, your intelligent GTM assistant for e&. I see you're interested in the ${industry} sector. Let me share some insights:

**My recommendations for you:**
• Focus on ${industry} sector-specific solutions
• Leverage e& competitive advantages
• Consider partnership opportunities
• Develop targeted marketing strategy

**Here's how we can approach this:**
1. Research ${industry} market trends and opportunities
2. Identify key stakeholders and decision makers
3. Develop comprehensive solution strategy
4. Create implementation timeline and milestones
5. Establish success metrics and KPIs

**Things to keep in mind:**
• Market growth in ${industry} sector over next 12 months
• Competitive landscape changes and new entrants
• Technology adoption trends in ${industry}
• Regulatory changes affecting ${industry} operations

Is there anything specific you'd like me to elaborate on, or would you like me to help you with something else?`;
  }

  private generateInsights(industry: string, webResult: any): string[] {
    const insights = [
      `Industry focus: ${industry}`,
      `Confidence level: ${(webResult.confidence || 0.8) * 100}%`,
      `Knowledge source: ${webResult.source || 'GTM_CONTEXT'}`
    ];

    if (webResult.features && webResult.features.length > 0) {
      insights.push(`Key features identified: ${webResult.features.join(', ')}`);
    }

    if (webResult.visualElements && webResult.visualElements.length > 0) {
      insights.push(`Visual elements: ${webResult.visualElements.join(', ')}`);
    }

    return insights;
  }

  private async generateImageAsset(industry: string): Promise<MediaAsset[]> {
    try {
      const imageResult = await chinchillaVisualIntelligence.generateIntelligentImage({
        prompt: `Create a professional business solution visualization for ${industry} sector with e& B2B branding`,
        industry,
        contentType: 'product_visualization',
        style: 'professional_b2b',
        requirements: ['e& branding', 'B2B focus', 'professional layout'],
        context: { user: 'Yasser Omar Zaki Shaaban', role: 'DIRECTOR' }
      });

      if (imageResult.success) {
        return [{
          id: `image_${Date.now()}`,
          type: 'image',
          title: `${industry} Business Solution`,
          industry,
          content: imageResult.description || 'Professional business visualization',
          fileUrl: imageResult.imageUrl,
          generatedAt: new Date().toISOString(),
          styleUsed: 'e& B2B Professional'
        }];
      }
    } catch (error) {
      console.error('❌ Image generation error:', error);
    }

    return [];
  }

  private storeConversation(message: string, response: string, industry: string, confidence: number): void {
    this.memory.conversations.push({
      timestamp: new Date().toISOString(),
      message,
      response,
      industry,
      confidence
    });

    // Keep only last 50 conversations
    if (this.memory.conversations.length > 50) {
      this.memory.conversations = this.memory.conversations.slice(-50);
    }

    this.saveMemory();
  }

  private saveMemory(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('jammy_memory', JSON.stringify(this.memory));
      } catch (error) {
        console.error('❌ Failed to save memory:', error);
      }
    }
  }

  private loadMemory(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem('jammy_memory');
        if (saved) {
          this.memory = JSON.parse(saved);
        }
      } catch (error) {
        console.error('❌ Failed to load memory:', error);
      }
    }
  }

  async learnFromFiles(files: any[]): Promise<void> {
    console.log('📚 Jammy learning from uploaded files...');
    // Implementation for file learning will be added here
  }

  resetMemory(): void {
    this.memory = {
      conversations: [],
      knowledge: [],
      patterns: []
    };
    this.saveMemory();
  }
}

// Export singleton instance
export const jammyAI = new JammyAI();
