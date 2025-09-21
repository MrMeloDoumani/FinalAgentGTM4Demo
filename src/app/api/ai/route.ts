import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    // Simulate AI response with corporate personality
    const responses = [
      "I understand you're looking for assistance with sales enablement. Let me ask a few clarifying questions to provide you with the most relevant support:\n\n1. What specific industry or sector are you focusing on?\n2. What type of sales material do you need?\n3. Who is your target audience?\n4. Do you have any existing materials I should reference?",
      "Based on your requirements, I can help you create comprehensive sales materials. Here's what I recommend:\n\n• Product brochures tailored to your industry\n• Competitive battlecards for key competitors\n• Customer success stories and case studies\n• Executive summary decks for stakeholders\n\nWould you like me to start with any specific material?",
      "I've analyzed your request and can provide several options:\n\n1. **Quick Response**: Basic template with industry-specific language\n2. **Comprehensive**: Detailed analysis with market insights\n3. **Custom**: Tailored solution based on your specific needs\n\nWhich approach would work best for your timeline and requirements?",
      "To ensure the highest quality output, I need to understand:\n\n• Your target market and customer segments\n• Key value propositions and differentiators\n• Competitive landscape and positioning\n• Brand voice and messaging guidelines\n\nThis information will help me create materials that align with your strategic objectives.",
    ];

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

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
