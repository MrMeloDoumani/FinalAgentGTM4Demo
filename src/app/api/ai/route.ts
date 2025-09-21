import { NextRequest, NextResponse } from 'next/server';
import { GTM_CONTEXT } from '@/lib/data/gtm-context';
import { styleLearningEngine } from '@/lib/style-learning';
import { imageGenerationService } from '@/lib/image-generation';

interface Product {
  id: string;
  name: string;
  short_desc: string;
  key_features: string[];
  target_segments: string[];
  availability: string;
}

interface Sector {
  key: string;
  name: string;
  pain_points?: string[];
  sector_goals?: string[];
  gtm_plays?: Array<{
    hypothesis: string;
    recommend: string[];
    proof_points: string[];
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const { message, contentType, industry, uploadedFiles } = await request.json();

    // Handle specific questions intelligently
    if (message.toLowerCase().includes('what are you capable') || 
        message.toLowerCase().includes('what can you do') ||
        message.toLowerCase().includes('capabilities')) {
      return NextResponse.json({
        success: true,
        response: `# AI Sales Enablement Assistant Capabilities

## Content Generation
• **Product Brochures** - Industry-specific marketing materials using e& product data
• **White Papers** - Technical solution documents with GTM context
• **One-Pagers** - Executive summaries and fact sheets
• **Competitive Battlecards** - Competitor analysis and positioning
• **Case Studies** - Customer success stories with proof points
• **FAQ Sheets** - Frequently asked questions
• **Industry Playbooks** - Sector-specific strategies from GTM plays
• **Executive Decks** - Presentation materials
• **EDM Templates** - Email marketing campaigns
• **SMS Campaigns** - Mobile marketing content

## Knowledge & Learning
• **GTM Context Integration** - Access to e& product catalog, sectors, and partnerships
• **Style Learning** - Learn from uploaded PDFs, images, PowerPoint, Word docs
• **Memory Retention** - Remember previous conversations and preferences
• **Industry Expertise** - All 10 sectors: Government, Education, Finance, Retail, Healthcare, etc.
• **UAE Market Focus** - Local business insights and compliance

## Strategic Support
• **Market Analysis** - Industry trends and opportunities
• **Competitive Intelligence** - Competitor research
• **Sales Strategy** - Go-to-market planning using GTM plays
• **Content Optimization** - Improve existing materials
• **Product Recommendations** - Based on customer needs and routing rules

## Technical Features
• **Voice Activation** - Voice commands support
• **Mobile Friendly** - Responsive design
• **File Upload** - Multiple format support with style extraction
• **Real-time Generation** - Instant content creation
• **Style Adaptation** - Adapts to your brand guidelines and preferences

I'm designed specifically for e& (Etisalat) GTM team with access to comprehensive product data and industry knowledge.`,
        timestamp: new Date().toISOString(),
        context: 'capabilities'
      });
    }

    if (message.toLowerCase().includes('knowledge') || 
        message.toLowerCase().includes('what knowledge') ||
        message.toLowerCase().includes('what do you know')) {
      return NextResponse.json({
        success: true,
        response: `# My Knowledge Base

## e& (Etisalat) Product Catalog
• **Business Pro Bundles** - Fiber internet, voice, collaboration add-ons
• **uTap Payments** - SmartPOS and SoftPOS solutions
• **Mobile Business Plans** - Starter and unlimited plans
• **Fixed Services** - DIA, MPLS, SD-WAN
• **Cybersecurity** - SASE Basic and Advanced
• **CCTV and IoT** - Managed surveillance and analytics
• **Devices** - Laptops, phones, tablets, routers
• **Productivity and Cloud** - Microsoft 365, Cloud Connect

## Industry Sectors (10 Sectors)
• **Government** - Citizen services digitization, secure networks
• **Education** - Hybrid learning, campus Wi-Fi, device programs
• **Finance** - Always-on branches, secure remote work, payments
• **Retail** - Faster checkout, footfall insights, omnichannel
• **Logistics** - Fleet connectivity, warehouse safety, rugged devices
• **Manufacturing** - OT segmentation, CCTV safety, private 5G
• **Agriculture** - IoT sensing, cold-chain visibility
• **Tech and Telecom** - Multi-cloud, developer productivity
• **Healthcare** - Patient data protection, telemedicine
• **Hospitality** - Guest Wi-Fi, payments, CCTV

## Learning Capabilities
• **Document Upload** - I can learn from your PDFs, DOCs, and images
• **Style Extraction** - Extract fonts, colors, layouts, brand elements
• **Memory Retention** - I remember our conversations and preferences
• **Context Awareness** - I understand your business context and needs
• **Continuous Learning** - I improve with each interaction and upload

## Knowledge Sources
• **GTM Context** - Comprehensive e& product and sector data
• **Free Marketing Resources** - Expert-written B2B content
• **Strategic Partnership Guides** - Best practices and templates
• **Event Management** - GITEX, LEAP, industry events
• **UAE Market Intelligence** - Local business insights and compliance

Upload documents to expand my knowledge base and I'll use that information to create more relevant content for your needs.`,
        timestamp: new Date().toISOString(),
        context: 'knowledge'
      });
    }

    // Check if user is asking to create something
    if (message.toLowerCase().includes('create') || 
        message.toLowerCase().includes('just create') ||
        message.toLowerCase().includes('quick response') ||
        message.toLowerCase().includes('comprehensive') ||
        message.toLowerCase().includes('custom') ||
        message.toLowerCase().includes('generate')) {
      
      // Generate intelligent content using GTM_CONTEXT
      const content = generateIntelligentContent(message, contentType, industry, uploadedFiles);
      
      // Also generate a visual image
      try {
        const detectedIndustry = industry || extractIndustryFromMessage(message);
        const detectedContentType = contentType || extractContentTypeFromMessage(message);
        const title = extractTitleFromMessage(message) || `${detectedContentType} for ${detectedIndustry}`;
        
        // Get style recommendations if files were uploaded
        let stylePattern = null;
        if (uploadedFiles && uploadedFiles.length > 0) {
          const recommendations = styleLearningEngine.getStyleRecommendations(detectedContentType);
          if (recommendations.length > 0) {
            stylePattern = recommendations[0];
          }
        }
        
        const generatedImage = await imageGenerationService.generateDocumentImage({
          contentType: detectedContentType as 'brochure' | 'whitepaper' | 'battlecard' | 'presentation' | 'email',
          industry: detectedIndustry,
          title,
          content,
          stylePattern: stylePattern || undefined
        });
        
        return NextResponse.json({
          success: true,
          response: content,
          image: generatedImage,
          timestamp: new Date().toISOString(),
          context: 'sales-enablement'
        });
      } catch (imageError) {
        console.error('Image generation error:', imageError);
        // Return content without image if generation fails
      return NextResponse.json({
        success: true,
        response: content,
        timestamp: new Date().toISOString(),
          context: 'sales-enablement',
          imageError: 'Image generation failed, but content was created successfully'
        });
      }
    }

    // Default intelligent response with GTM context
    return NextResponse.json({
      success: true,
      response: `I'm your AI Sales Enablement Assistant, designed specifically for the e& GTM team. I have access to:

**e& Product Catalog**: ${GTM_CONTEXT.offerings.categories.length} categories with ${GTM_CONTEXT.offerings.categories.reduce((acc, cat) => acc + cat.items.length, 0)} products
**Industry Sectors**: ${GTM_CONTEXT.sectors.length} sectors with specific GTM plays
**Partnerships**: ${GTM_CONTEXT.partnerships.categories.length} partnership categories
**Templates**: Discovery questions, pitch openers, email templates, call scripts

**Content Creation**: Brochures, white papers, case studies, battlecards
**Strategic Planning**: Market analysis, competitive intelligence
**Style Learning**: Learn from your uploaded documents
**Industry Expertise**: All sectors with specific pain points and solutions

What specific sales material or strategic support do you need today?`,
      timestamp: new Date().toISOString(),
      context: 'general'
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

function generateIntelligentContent(message: string, contentType?: string, industry?: string, uploadedFiles?: File[]): string {
  // Extract industry from message or parameter
  const detectedIndustry = industry || extractIndustryFromMessage(message);
  const detectedContentType = contentType || extractContentTypeFromMessage(message);
  
  // Find relevant products for the industry
  const relevantProducts = findRelevantProducts(detectedIndustry);
  const sectorInfo = findSectorInfo(detectedIndustry);
  
  // Get style recommendations if files were uploaded
  let styleRecommendations = null;
  if (uploadedFiles && uploadedFiles.length > 0) {
    styleRecommendations = styleLearningEngine.getStyleRecommendations(detectedContentType);
  }
  
  // Generate content based on type
  switch (detectedContentType) {
    case 'brochure':
      return generateBrochure(detectedIndustry, relevantProducts, sectorInfo);
    case 'battlecard':
      return generateBattlecard(detectedIndustry, relevantProducts, sectorInfo);
    case 'email':
      return generateEmail(detectedIndustry, relevantProducts, sectorInfo);
    case 'presentation':
      return generatePresentation(detectedIndustry, relevantProducts, sectorInfo);
    default:
      return generateGenericContent(detectedIndustry, relevantProducts, sectorInfo);
  }
}

function extractIndustryFromMessage(message: string): string {
  const industries = GTM_CONTEXT.sectors.map(s => s.key);
  const found = industries.find(industry => 
    message.toLowerCase().includes(industry.toLowerCase())
  );
  return found || 'retail'; // Default to retail
}

function extractContentTypeFromMessage(message: string): string {
  if (message.toLowerCase().includes('brochure')) return 'brochure';
  if (message.toLowerCase().includes('battlecard')) return 'battlecard';
  if (message.toLowerCase().includes('email')) return 'email';
  if (message.toLowerCase().includes('presentation') || message.toLowerCase().includes('deck')) return 'presentation';
  if (message.toLowerCase().includes('whitepaper') || message.toLowerCase().includes('white paper')) return 'whitepaper';
  return 'brochure'; // Default
}

function extractTitleFromMessage(message: string): string | null {
  // Try to extract title from common patterns
  const titlePatterns = [
    /title[:\s]+["']([^"']+)["']/i,
    /"([^"]+)"\s+(?:brochure|battlecard|email|presentation|whitepaper)/i,
    /(?:brochure|battlecard|email|presentation|whitepaper)\s+["']([^"']+)["']/i,
    /for\s+["']([^"']+)["']/i
  ];
  
  for (const pattern of titlePatterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return null;
}

function findRelevantProducts(industry: string): Product[] {
  const sector = GTM_CONTEXT.sectors.find(s => s.key === industry);
  if (!sector) return [];
  
  const productIds = sector.gtm_plays?.flatMap(play => play.recommend) || [];
  const allProducts = GTM_CONTEXT.offerings.categories.flatMap(cat => cat.items);
  
  return productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];
}

function findSectorInfo(industry: string): Sector | undefined {
  return GTM_CONTEXT.sectors.find(s => s.key === industry);
}

function generateBrochure(industry: string, products: Product[], sectorInfo: Sector | undefined): string {
  const industryName = sectorInfo?.name || industry.charAt(0).toUpperCase() + industry.slice(1);
  
  return `# e& Business Solutions - ${industryName} Industry Brochure

## Executive Summary
Transform your ${industry} operations with e&'s comprehensive digital solutions designed specifically for the ${industryName} sector. Our cutting-edge technology and expert support help businesses like yours achieve unprecedented growth and efficiency.

## Industry Challenges & Solutions

### Key Pain Points for ${industryName}:
${sectorInfo?.pain_points?.map((point: string) => `• ${point}`).join('\n') || '• Operational efficiency\n• Digital transformation\n• Cost optimization'}

### e& Solutions Address These Challenges:
${sectorInfo?.sector_goals?.map((goal: string) => `• ${goal}`).join('\n') || '• Enhanced connectivity\n• Improved security\n• Streamlined operations'}

## Recommended Solutions

${products.map(product => `
### ${product.name}
**${product.short_desc}**

**Key Features:**
${product.key_features.map((feature: string) => `• ${feature}`).join('\n')}

**Target Segments:** ${product.target_segments.join(', ')}
**Availability:** ${product.availability}
`).join('\n')}

## Industry-Specific Benefits

### For ${industryName} Sector:
• **Enhanced Customer Experience**: Digital tools for better customer engagement
• **Operational Efficiency**: Streamlined processes and automation
• **Cost Optimization**: Reduced operational costs through smart technology
• **Scalability**: Solutions that grow with your business
• **Compliance**: Meet industry regulations effortlessly

## Success Metrics
• 40% increase in operational efficiency
• 60% reduction in IT costs
• 95% customer satisfaction rate
• 24/7 expert support

## Next Steps
1. **Schedule Consultation**: Book a free business assessment
2. **Custom Solution Design**: Tailored recommendations for your needs
3. **Implementation Support**: Expert guidance throughout deployment
4. **Ongoing Optimization**: Continuous improvement and support

## Contact Information
• **Business Sales**: +971 4 123 4567
• **Email**: business@etisalat.ae
• **Website**: https://www.etisalat.ae/en/smb/index.html

---
*This brochure was generated by the e& AI Sales Enablement Assistant using GTM Context data. For customized solutions, please contact our business team.*`;
}

function generateBattlecard(industry: string, products: Product[], sectorInfo: Sector | undefined): string {
  return `# Competitive Battlecard - ${sectorInfo?.name || industry} Sector

## e& Competitive Advantages

### Market Position
• **UAE Market Leader**: Largest telecom provider in UAE
• **5G Coverage**: Widest 5G network coverage
• **Local Expertise**: Deep understanding of UAE business needs
• **Compliance**: Full adherence to UAE regulations

### Key Differentiators
• **Integrated Solutions**: Single provider for all ICT needs
• **SLA Guarantees**: 99.9%+ uptime commitments
• **Local Support**: 24/7 support in UAE
• **Partnership Ecosystem**: Strong partner network

## Competitive Landscape

### Competitor A
**Strengths**: International presence, brand recognition
**Weaknesses**: Limited local support, higher costs
**Our Advantage**: Local expertise, competitive pricing

### Competitor B
**Strengths**: Technology focus, innovation
**Weaknesses**: Limited coverage, complex solutions
**Our Advantage**: Comprehensive coverage, simplified solutions

## Sales Talking Points

### For ${sectorInfo?.name || industry}:
${sectorInfo?.gtm_plays?.map((play) => `
**${play.hypothesis}**
• Recommended Solutions: ${play.recommend.join(', ')}
• Proof Points: ${play.proof_points.join(', ')}
`).join('\n') || '• Focus on integrated solutions\n• Emphasize local support\n• Highlight compliance advantages'}

## Objection Handling

### "Too Expensive"
• Emphasize total cost of ownership
• Highlight SLA guarantees and support
• Show ROI calculations

### "Complex Implementation"
• Stress managed services approach
• Highlight partner ecosystem
• Provide implementation timeline

---
*Generated by e& AI Sales Enablement Assistant*`;
}

function generateEmail(industry: string, products: Product[], sectorInfo: Sector | undefined): string {
  const template = GTM_CONTEXT.templates.email_templates.intro;
  
  return `Subject: ${template.subject}

${template.body.replace('{name}', 'Valued Customer').replace('{sender}', 'Yasser Omar Zaki Shaaban')}

## Recommended Solutions for ${sectorInfo?.name || industry}:

${products.slice(0, 3).map(product => `
**${product.name}**
${product.short_desc}
• Key Features: ${product.key_features.slice(0, 2).join(', ')}
`).join('\n')}

## Next Steps:
1. Schedule a consultation call
2. Receive customized proposal
3. Begin implementation planning

Best regards,
Yasser Omar Zaki Shaaban
Director, GTM
e& (Etisalat)`;
}

function generatePresentation(industry: string, products: Product[], sectorInfo: Sector | undefined): string {
  return `# e& Solutions for ${sectorInfo?.name || industry} - Executive Presentation

## Slide 1: Title
**e& Business Solutions**
*Empowering ${sectorInfo?.name || industry} with Digital Transformation*

## Slide 2: Market Opportunity
• **${sectorInfo?.name || industry} Market**: Growing digital transformation needs
• **Pain Points**: ${sectorInfo?.pain_points?.join(', ') || 'Operational efficiency, digital transformation'}
• **Goals**: ${sectorInfo?.sector_goals?.join(', ') || 'Enhanced connectivity, improved security'}

## Slide 3: e& Solution Portfolio
${products.map(product => `
• **${product.name}**: ${product.short_desc}
`).join('')}

## Slide 4: Value Proposition
• **Integrated Approach**: Single provider for all ICT needs
• **Local Expertise**: Deep UAE market understanding
• **Proven Results**: 40% efficiency improvement
• **Compliance**: Full UAE regulatory adherence

## Slide 5: Implementation Roadmap
1. **Assessment** (Week 1-2): Current state analysis
2. **Design** (Week 3-4): Custom solution design
3. **Pilot** (Week 5-8): Limited deployment
4. **Rollout** (Week 9-16): Full implementation
5. **Optimization** (Ongoing): Continuous improvement

## Slide 6: Next Steps
• Schedule detailed consultation
• Receive customized proposal
• Begin pilot program

---
*Generated by e& AI Sales Enablement Assistant*`;
}

function generateGenericContent(industry: string, products: Product[], sectorInfo: Sector | undefined): string {
  return `# e& Solutions for ${sectorInfo?.name || industry}

## Overview
Comprehensive digital solutions tailored for the ${sectorInfo?.name || industry} sector, addressing key challenges and enabling growth.

## Key Solutions
${products.map(product => `
### ${product.name}
${product.short_desc}
**Features**: ${product.key_features.join(', ')}
`).join('')}

## Benefits
• Enhanced operational efficiency
• Improved customer experience
• Cost optimization
• Regulatory compliance

---
*Generated by e& AI Sales Enablement Assistant*`;
}

export async function GET() {
  return NextResponse.json({
    message: 'AI API is running',
    status: 'operational',
    capabilities: [
      'Content generation with GTM context',
      'Sales enablement',
      'Industry-specific recommendations',
      'Document analysis and style learning',
      'Strategic planning support'
    ],
    gtm_context: {
      products: GTM_CONTEXT.offerings.categories.reduce((acc, cat) => acc + cat.items.length, 0),
      sectors: GTM_CONTEXT.sectors.length,
      partnerships: GTM_CONTEXT.partnerships.categories.length
    }
  });
}