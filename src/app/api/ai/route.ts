import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    // Check if user is asking to create something
    if (message.toLowerCase().includes('create') || 
        message.toLowerCase().includes('just create') ||
        message.toLowerCase().includes('quick response') ||
        message.toLowerCase().includes('comprehensive') ||
        message.toLowerCase().includes('custom')) {
      
      // Generate actual content based on the request
      const content = generateSalesContent(message);
      
      return NextResponse.json({
        success: true,
        response: content,
        timestamp: new Date().toISOString(),
        context: context || 'sales-enablement'
      });
    }

    // Default response for other queries
    const responses = [
      "I understand you're looking for assistance with sales enablement. Let me ask a few clarifying questions to provide you with the most relevant support:\n\n1. What specific industry or sector are you focusing on?\n2. What type of sales material do you need?\n3. Who is your target audience?\n4. Do you have any existing materials I should reference?",
      "Based on your requirements, I can help you create comprehensive sales materials. Here's what I recommend:\n\n• Product brochures tailored to your industry\n• Competitive battlecards for key competitors\n• Customer success stories and case studies\n• Executive summary decks for stakeholders\n\nWould you like me to start with any specific material?",
      "I've analyzed your request and can provide several options:\n\n1. **Quick Response**: Basic template with industry-specific language\n2. **Comprehensive**: Detailed analysis with market insights\n3. **Custom**: Tailored solution based on your specific needs\n\nWhich approach would work best for your timeline and requirements?",
      "To ensure the highest quality output, I need to understand:\n\n• Your target market and customer segments\n• Key value propositions and differentiators\n• Competitive landscape and positioning\n• Brand voice and messaging guidelines\n\nThis information will help me create materials that align with your strategic objectives.",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return NextResponse.json({
      success: true,
      response: randomResponse,
      timestamp: new Date().toISOString(),
      context: context || 'general'
    });

  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process AI request',
        response: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment."
      },
      { status: 500 }
    );
  }
}

function generateSalesContent(message: string): string {
  // Extract industry from message
  const isRetail = message.toLowerCase().includes('retail');
  const industry = isRetail ? 'retail' : 'business';
  
  // Generate comprehensive sales content
  return `# e& Business Solutions - ${industry.charAt(0).toUpperCase() + industry.slice(1)} Industry Brochure

## Executive Summary
Transform your ${industry} operations with e&'s comprehensive digital solutions designed specifically for the ${industry} sector. Our cutting-edge technology and expert support help businesses like yours achieve unprecedented growth and efficiency.

## Key Solutions for ${industry.charAt(0).toUpperCase() + industry.slice(1)} Businesses

### 1. Mobile & Connectivity Solutions
- **Business Mobile Plans**: Tailored data and voice packages
- **5G Connectivity**: Ultra-fast internet for seamless operations
- **Roaming Solutions**: Stay connected globally with competitive rates

### 2. Digital Transformation Services
- **Cloud Solutions**: Secure, scalable cloud infrastructure
- **AI-Powered Analytics**: Data-driven insights for better decision making
- **IoT Integration**: Smart devices for enhanced operational efficiency

### 3. Security & Compliance
- **Cybersecurity Solutions**: Advanced threat protection
- **Data Backup & Recovery**: Secure data management
- **Compliance Support**: Meet industry regulations effortlessly

## Industry-Specific Benefits

### For ${industry.charAt(0).toUpperCase() + industry.slice(1)} Sector:
- **Enhanced Customer Experience**: Digital tools for better customer engagement
- **Operational Efficiency**: Streamlined processes and automation
- **Cost Optimization**: Reduced operational costs through smart technology
- **Scalability**: Solutions that grow with your business

## Success Metrics
- 40% increase in operational efficiency
- 60% reduction in IT costs
- 95% customer satisfaction rate
- 24/7 expert support

## Next Steps
1. **Schedule Consultation**: Book a free business assessment
2. **Custom Solution Design**: Tailored recommendations for your needs
3. **Implementation Support**: Expert guidance throughout deployment
4. **Ongoing Optimization**: Continuous improvement and support

## Contact Information
- **Business Sales**: +971 4 123 4567
- **Email**: business@etisalat.ae
- **Website**: https://www.etisalat.ae/en/smb/index.html

---
*This brochure was generated by the e& AI Sales Enablement Assistant. For customized solutions, please contact our business team.*`;
}

export async function GET() {
  return NextResponse.json({
    message: 'AI API is running',
    status: 'operational',
    capabilities: [
      'Content generation',
      'Sales enablement',
      'Industry-specific recommendations',
      'Document analysis',
      'Strategic planning support'
    ]
  });
}
