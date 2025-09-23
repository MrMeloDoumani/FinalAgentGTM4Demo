import { NextRequest, NextResponse } from 'next/server';
import { jammyAI } from '@/lib/jammy-ai';

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const { message, context, uploadedFiles } = await request.json();

    if (!message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Message is required' 
        },
        { status: 400 }
      );
    }

    // Process message with Jammy AI
    console.log('🚀 API Route: Processing message:', message);
    const response = await jammyAI.processMessage(message, context, uploadedFiles);
    console.log('✅ API Route: Response received:', response.learningData.industry);

    return NextResponse.json({
      success: true,
      response: response.content,
      mediaAssets: response.mediaAssets,
      learningData: response.learningData,
      confidence: response.confidence,
      timestamp: response.timestamp,
      jammyId: response.id
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

  } catch (error) {
    console.error('Jammy AI Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Jammy AI processing failed',
        response: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment."
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
}

export async function GET() {
  try {
    const memory = jammyAI.getMemory();
    
    return NextResponse.json({
      success: true,
      jammy: {
        status: 'operational',
        memory: {
          conversations: memory.conversations.length,
          learnedPatterns: memory.learnedPatterns.length,
          knowledgeBase: memory.knowledgeBase.length
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
      }
    });
  } catch (error) {
    console.error('Jammy AI Status Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get Jammy AI status' 
      },
      { status: 500 }
    );
  }
}
