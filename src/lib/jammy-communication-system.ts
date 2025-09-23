// Jammy Communication System - Bi-lingual Expert Communication
// Expert-to-User (Concierge) + Expert-to-Chinchilla (Technical)

export interface CommunicationContext {
  userMessage: string;
  userIntent: 'greeting' | 'capability_query' | 'image_request' | 'general' | 'clarification';
  conversationStage: 'initial' | 'gathering_info' | 'processing' | 'executing' | 'complete';
  missingInfo: string[];
  chinchillaCommand?: string;
}

export interface UserResponse {
  message: string;
  tone: 'concierge' | 'expert' | 'collaborative' | 'transparent';
  nextAction: 'question' | 'execute' | 'explain' | 'wait';
  chinchillaTranslation?: string;
}

export class JammyCommunicationSystem {
  private conversationHistory: Map<string, CommunicationContext> = new Map();
  private chinchillaLanguage: Map<string, string> = new Map();

  constructor() {
    this.initializeChinchillaLanguage();
  }

  private initializeChinchillaLanguage() {
    // Chinchilla's technical vocabulary - what Chinchilla understands
    this.chinchillaLanguage.set('office_building', 'office_building');
    this.chinchillaLanguage.set('network', 'network');
    this.chinchillaLanguage.set('router', 'router');
    this.chinchillaLanguage.set('wifi_signal', 'wifi_signal');
    this.chinchillaLanguage.set('smartphone', 'smartphone');
    this.chinchillaLanguage.set('server', 'server');
    this.chinchillaLanguage.set('cloud', 'cloud');
    this.chinchillaLanguage.set('security_shield', 'security_shield');
    this.chinchillaLanguage.set('analytics_dashboard', 'analytics_dashboard');
    this.chinchillaLanguage.set('chart', 'chart');
    this.chinchillaLanguage.set('retail_store', 'retail_store');
    this.chinchillaLanguage.set('hospital', 'hospital');
    this.chinchillaLanguage.set('school', 'school');
    this.chinchillaLanguage.set('payment_terminal', 'payment_terminal');
    this.chinchillaLanguage.set('data_center', 'data_center');
    this.chinchillaLanguage.set('tower', 'tower');
    this.chinchillaLanguage.set('laptop', 'laptop');
    
    // Chinchilla's industry contexts
    this.chinchillaLanguage.set('tech_telecom', 'tech_telecom');
    this.chinchillaLanguage.set('retail', 'retail');
    this.chinchillaLanguage.set('healthcare', 'healthcare');
    this.chinchillaLanguage.set('education', 'education');
    this.chinchillaLanguage.set('finance', 'finance');
    this.chinchillaLanguage.set('manufacturing', 'manufacturing');
    this.chinchillaLanguage.set('government', 'government');
    this.chinchillaLanguage.set('hospitality', 'hospitality');
    this.chinchillaLanguage.set('logistics', 'logistics');
    this.chinchillaLanguage.set('real_estate', 'real_estate');
    
    // Chinchilla's style commands
    this.chinchillaLanguage.set('professional_b2b', 'professional_b2b');
    this.chinchillaLanguage.set('e&_branding', 'e&_branding');
    this.chinchillaLanguage.set('red_branding', 'red_branding');
    this.chinchillaLanguage.set('corporate_layout', 'corporate_layout');
  }

  // Main communication method
  async communicate(message: string, sessionId: string = 'default'): Promise<UserResponse> {
    console.log('🗣️ Jammy Communication System processing:', message);
    
    // Get or create conversation context
    const context = this.getOrCreateContext(sessionId, message);
    
    // Analyze user intent
    const intent = this.analyzeUserIntent(message);
    context.userIntent = intent;
    
    // Generate appropriate response based on intent and context
    const response = await this.generateResponse(message, context);
    
    // Update conversation context
    this.updateContext(sessionId, context, response);
    
    console.log('🗣️ Jammy Response:', response.message);
    if (response.chinchillaTranslation) {
      console.log('🎨 Chinchilla Command:', response.chinchillaTranslation);
    }
    
    return response;
  }

  private getOrCreateContext(sessionId: string, message: string): CommunicationContext {
    if (!this.conversationHistory.has(sessionId)) {
      this.conversationHistory.set(sessionId, {
        userMessage: message,
        userIntent: 'general',
        conversationStage: 'initial',
        missingInfo: []
      });
    }
    
    const context = this.conversationHistory.get(sessionId)!;
    context.userMessage = message;
    return context;
  }

  private analyzeUserIntent(message: string): 'greeting' | 'capability_query' | 'image_request' | 'general' | 'clarification' {
    const lowerMessage = message.toLowerCase();
    
    // Greeting patterns
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || 
        lowerMessage.includes('hey') || lowerMessage.includes('good morning') ||
        lowerMessage.includes('good afternoon') || lowerMessage.includes('good evening')) {
      return 'greeting';
    }
    
    // Capability queries
    if (lowerMessage.includes('what can you do') || lowerMessage.includes('what do you do') ||
        lowerMessage.includes('capabilities') || lowerMessage.includes('help') ||
        lowerMessage.includes('how can you help') || lowerMessage.includes('what are you')) {
      return 'capability_query';
    }
    
    // Image generation requests - be more comprehensive
    if (lowerMessage.includes('generate') || lowerMessage.includes('create') ||
        lowerMessage.includes('make') || lowerMessage.includes('show') ||
        lowerMessage.includes('image') || lowerMessage.includes('visual') ||
        lowerMessage.includes('draw') || lowerMessage.includes('picture') ||
        lowerMessage.includes('infographic') || lowerMessage.includes('diagram') ||
        lowerMessage.includes('chart') || lowerMessage.includes('dashboard')) {
      return 'image_request';
    }
    
    // Clarification responses
    if (lowerMessage.includes('yes') || lowerMessage.includes('no') ||
        lowerMessage.includes('sure') || lowerMessage.includes('okay') ||
        lowerMessage.includes('that works') || lowerMessage.includes('perfect')) {
      return 'clarification';
    }
    
    return 'general';
  }

  private async generateResponse(message: string, context: CommunicationContext): Promise<UserResponse> {
    switch (context.userIntent) {
      case 'greeting':
        return this.generateGreetingResponse(message, context);
      
      case 'capability_query':
        return this.generateCapabilityResponse(message, context);
      
      case 'image_request':
        return this.generateImageRequestResponse(message, context);
      
      case 'clarification':
        return this.generateClarificationResponse(message, context);
      
      default:
        return this.generateGeneralResponse(message, context);
    }
  }

  private generateGreetingResponse(message: string, context: CommunicationContext): UserResponse {
    const greetings = [
      "Hello! I'm Jammy, your expert AI assistant for e& GTM team. It's wonderful to meet you!",
      "Good day! I'm Jammy, your dedicated sales enablement specialist. How may I assist you today?",
      "Welcome! I'm Jammy, your intelligent partner for all things e& business solutions. What can I help you with?",
      "Hello there! I'm Jammy, your expert guide through e&'s products and services. How can I make your day more productive?"
    ];
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    return {
      message: randomGreeting,
      tone: 'concierge',
      nextAction: 'explain'
    };
  }

  private generateCapabilityResponse(message: string, context: CommunicationContext): UserResponse {
    const capabilities = `I'm Jammy, your expert AI assistant for e& GTM team. Here's what I can do for you:

🎯 **Content Generation & Marketing Assets**
• Product brochures, white papers, and fact sheets
• Competitive battlecards and customer success stories
• Industry-specific playbooks and solution blueprints
• Executive summary decks and partner materials

🎨 **Visual Content Creation**
• Professional images and infographics
• Product visualizations and business diagrams
• Industry-specific visual representations
• e& branded marketing materials

📊 **Market Intelligence & Analysis**
• UAE B2B market insights and trends
• Industry analysis and competitive intelligence
• Strategic recommendations and opportunities
• Sector-specific solution mapping

💼 **Sales Enablement Support**
• EDM and SMS campaign creation
• Event landing pages and digital invitations
• Speaker bios and welcome notes
• Feedback surveys and results reports

🤖 **Intelligent Assistance**
• I work with Chinchilla (my visual specialist) to create perfect images
• I learn from your uploads and conversations
• I provide expert-level analysis and recommendations
• I adapt to your specific needs and preferences

What would you like to work on today?`;

    return {
      message: capabilities,
      tone: 'expert',
      nextAction: 'wait'
    };
  }

  private generateImageRequestResponse(message: string, context: CommunicationContext): UserResponse {
    // Check if we have enough information
    const missingInfo = this.identifyMissingImageInfo(message);
    
    if (missingInfo.length > 0) {
      context.missingInfo = missingInfo;
      context.conversationStage = 'gathering_info';
      
      const questions = this.generateImageQuestions(missingInfo);
      
      return {
        message: `I'd be delighted to create a visual for you! To ensure I generate exactly what you need, I'd like to gather some details first:

${questions}

Once I have these details, I'll ask Chinchilla to create the perfect visual representation for you.`,
        tone: 'collaborative',
        nextAction: 'question'
      };
    } else {
      // We have enough information, proceed with generation
      const chinchillaCommand = this.translateToChinchillaLanguage(message, context);
      
      return {
        message: `Perfect! I have all the information I need. Let me ask Chinchilla to generate this visual for you right away.

I'm instructing Chinchilla to create: ${this.describeImageToUser(message, context)}`,
        tone: 'transparent',
        nextAction: 'execute',
        chinchillaTranslation: chinchillaCommand
      };
    }
  }

  private generateClarificationResponse(message: string, context: CommunicationContext): UserResponse {
    if (context.conversationStage === 'gathering_info') {
      // Combine the original message with the clarification
      const combinedMessage = `${context.userMessage} ${message}`.toLowerCase();
      
      // Check if we have enough info now with the combined message
      const stillMissing = this.identifyMissingImageInfo(combinedMessage);
      
      if (stillMissing.length === 0) {
        context.conversationStage = 'executing';
        const chinchillaCommand = this.translateToChinchillaLanguage(combinedMessage, context);
        
        return {
          message: `Excellent! Now I have everything I need. Let me ask Chinchilla to create this visual for you.

I'm instructing Chinchilla to generate: ${this.describeImageToUser(combinedMessage, context)}`,
          tone: 'transparent',
          nextAction: 'execute',
          chinchillaTranslation: chinchillaCommand
        };
      } else {
        const questions = this.generateImageQuestions(stillMissing);
        
        return {
          message: `Thank you for that information! I still need a few more details:

${questions}`,
          tone: 'collaborative',
          nextAction: 'question'
        };
      }
    }
    
    // If not in gathering_info stage, check if this is a new image request
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('generate') || lowerMessage.includes('create') ||
        lowerMessage.includes('make') || lowerMessage.includes('show') ||
        lowerMessage.includes('image') || lowerMessage.includes('visual') ||
        lowerMessage.includes('draw') || lowerMessage.includes('picture')) {
      
      // Treat as new image request
      context.conversationStage = 'gathering_info';
      context.userMessage = message;
      
      const missingInfo = this.identifyMissingImageInfo(message);
      
      if (missingInfo.length === 0) {
        context.conversationStage = 'executing';
        const chinchillaCommand = this.translateToChinchillaLanguage(message, context);
        
        return {
          message: `Perfect! I have all the information I need. Let me ask Chinchilla to generate this visual for you.

I'm instructing Chinchilla to create: ${this.describeImageToUser(message, context)}`,
          tone: 'transparent',
          nextAction: 'execute',
          chinchillaTranslation: chinchillaCommand
        };
      } else {
        const questions = this.generateImageQuestions(missingInfo);
        
        return {
          message: `I'd be delighted to create a visual for you! To ensure I generate exactly what you need, I'd like to gather some details first:

${questions}

Once I have these details, I'll ask Chinchilla to create the perfect visual representation for you.`,
          tone: 'collaborative',
          nextAction: 'question'
        };
      }
    }
    
    return this.generateGeneralResponse(message, context);
  }

  private generateGeneralResponse(message: string, context: CommunicationContext): UserResponse {
    return {
      message: `I understand you're looking for assistance. I'm here to help with content generation, visual creation, market analysis, and sales enablement for e& GTM team. 

What specific task would you like to work on? I can create marketing materials, generate visuals, provide market insights, or help with any other e& business needs.`,
      tone: 'expert',
      nextAction: 'wait'
    };
  }

  private identifyMissingImageInfo(message: string): string[] {
    const missing = [];
    const lowerMessage = message.toLowerCase();
    
    // Check for product/service specification - be more lenient
    const hasProduct = lowerMessage.includes('business pro fiber') || 
                      lowerMessage.includes('business pro') ||
                      lowerMessage.includes('mobile pos') || 
                      lowerMessage.includes('pos solution') ||
                      lowerMessage.includes('mobile pos solution') ||
                      lowerMessage.includes('security') || 
                      lowerMessage.includes('cloud') || 
                      lowerMessage.includes('analytics') ||
                      lowerMessage.includes('fiber') ||
                      lowerMessage.includes('internet') ||
                      lowerMessage.includes('connectivity') ||
                      lowerMessage.includes('pos') ||
                      lowerMessage.includes('solution') ||
                      lowerMessage.includes('service') ||
                      lowerMessage.includes('pro'); // "pro" indicates business product
    
    if (!hasProduct) {
      missing.push('product_or_service');
    }
    
    // Check for industry context - be more lenient
    const hasIndustry = lowerMessage.includes('retail') || 
                       lowerMessage.includes('healthcare') || 
                       lowerMessage.includes('education') || 
                       lowerMessage.includes('tech') || 
                       lowerMessage.includes('telecom') ||
                       lowerMessage.includes('business') ||
                       lowerMessage.includes('smb') ||
                       lowerMessage.includes('finance') ||
                       lowerMessage.includes('manufacturing') ||
                       lowerMessage.includes('government') ||
                       lowerMessage.includes('hospitality') ||
                       lowerMessage.includes('logistics') ||
                       lowerMessage.includes('real estate') ||
                       lowerMessage.includes('solution') || // Mobile POS solution implies business context
                       lowerMessage.includes('pro'); // "pro" indicates business context
    
    if (!hasIndustry) {
      missing.push('industry_context');
    }
    
    // Only require visual type if it's very specific
    const hasVisualType = lowerMessage.includes('brochure') || 
                         lowerMessage.includes('infographic') || 
                         lowerMessage.includes('diagram') || 
                         lowerMessage.includes('chart') ||
                         lowerMessage.includes('dashboard');
    
    // Don't require visual type for basic image requests
    // if (!hasVisualType) {
    //   missing.push('visual_type');
    // }
    
    return missing;
  }

  private generateImageQuestions(missingInfo: string[]): string {
    const questions = [];
    
    if (missingInfo.includes('product_or_service')) {
      questions.push("• What specific product or service would you like to visualize? (e.g., Business Pro Fiber, Mobile POS, Security Solutions)");
    }
    
    if (missingInfo.includes('industry_context')) {
      questions.push("• What industry or business context should this represent? (e.g., retail, healthcare, tech/telecom, SMB)");
    }
    
    if (missingInfo.includes('visual_type')) {
      questions.push("• What type of visual are you looking for? (e.g., product diagram, business process, industry overview)");
    }
    
    return questions.join('\n');
  }

  private translateToChinchillaLanguage(message: string, context: CommunicationContext): string {
    // This is where Jammy translates user requirements into Chinchilla's technical language
    const lowerMessage = message.toLowerCase();
    
    // Determine industry - prioritize tech_telecom for business pro products
    let industry = 'tech_telecom'; // Default
    if (lowerMessage.includes('business pro') || lowerMessage.includes('fiber') || lowerMessage.includes('internet')) {
      industry = 'tech_telecom';
    } else if (lowerMessage.includes('retail')) industry = 'retail';
    else if (lowerMessage.includes('healthcare')) industry = 'healthcare';
    else if (lowerMessage.includes('education')) industry = 'education';
    else if (lowerMessage.includes('finance')) industry = 'finance';
    else if (lowerMessage.includes('manufacturing')) industry = 'manufacturing';
    else if (lowerMessage.includes('government')) industry = 'government';
    else if (lowerMessage.includes('hospitality')) industry = 'hospitality';
    else if (lowerMessage.includes('logistics')) industry = 'logistics';
    else if (lowerMessage.includes('real estate')) industry = 'real_estate';
    
    // Determine visual elements
    const elements = [];
    
    // Always include B2B context
    elements.push('office_building');
    
    // Product-specific elements
    if (lowerMessage.includes('business pro') || lowerMessage.includes('fiber') || lowerMessage.includes('internet') || lowerMessage.includes('connectivity')) {
      elements.push('network', 'router', 'wifi_signal', 'server');
    }
    if (lowerMessage.includes('mobile') || lowerMessage.includes('phone') || lowerMessage.includes('pos')) {
      elements.push('smartphone', 'network');
    }
    if (lowerMessage.includes('security') || lowerMessage.includes('protection')) {
      elements.push('security_shield', 'server');
    }
    if (lowerMessage.includes('cloud') || lowerMessage.includes('microsoft')) {
      elements.push('cloud', 'server');
    }
    if (lowerMessage.includes('analytics') || lowerMessage.includes('data')) {
      elements.push('analytics_dashboard', 'chart');
    }
    
    // Industry-specific buildings
    if (industry === 'retail') elements.push('retail_store');
    else if (industry === 'healthcare') elements.push('hospital');
    else if (industry === 'education') elements.push('school');
    
    // Create Chinchilla command
    const chinchillaCommand = `Draw these elements: ${elements.join(', ')} for ${industry} business solution with e& B2B branding and professional layout`;
    
    return chinchillaCommand;
  }

  private describeImageToUser(message: string, context: CommunicationContext): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('business pro fiber')) {
      return "a professional visualization of Business Pro Fiber internet connectivity solution for tech/telecom businesses";
    } else if (lowerMessage.includes('mobile pos')) {
      return "a retail-focused visualization of Mobile POS payment solution";
    } else if (lowerMessage.includes('security')) {
      return "a security-focused business solution visualization";
    } else {
      return "a professional business solution visualization based on your requirements";
    }
  }

  private updateContext(sessionId: string, context: CommunicationContext, response: UserResponse): void {
    if (response.nextAction === 'execute') {
      context.conversationStage = 'executing';
    } else if (response.nextAction === 'question') {
      context.conversationStage = 'gathering_info';
    }
    
    this.conversationHistory.set(sessionId, context);
  }

  // Get conversation status
  getConversationStatus(sessionId: string): CommunicationContext | null {
    return this.conversationHistory.get(sessionId) || null;
  }

  // Clear conversation
  clearConversation(sessionId: string): void {
    this.conversationHistory.delete(sessionId);
  }
}

// Export singleton instance
export const jammyCommunicationSystem = new JammyCommunicationSystem();
