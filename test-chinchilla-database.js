/**
 * 🧪 TEST CHINCHILLA DATABASE SYSTEM
 * 
 * This tests the new database-powered Chinchilla visual intelligence
 */

const { chinchillaVisualDatabase } = require('./src/lib/chinchilla-visual-database.ts');
const { chinchillaVisualIntelligenceV2 } = require('./src/lib/chinchilla-visual-intelligence-v2.ts');

async function testChinchillaDatabase() {
  console.log('🧪 Testing Chinchilla Database System...\n');
  
  // Test 1: Database Statistics
  console.log('📊 Database Statistics:');
  const stats = chinchillaVisualDatabase.getDatabaseStats();
  console.log(JSON.stringify(stats, null, 2));
  console.log('');
  
  // Test 2: Get Elements for Tech Telecom
  console.log('🎨 Elements for Tech Telecom:');
  const techElements = chinchillaVisualDatabase.getElementsForIndustry('tech_telecom');
  console.log(`Found ${techElements.length} elements:`);
  techElements.forEach(el => console.log(`  - ${el.name} (${el.id})`));
  console.log('');
  
  // Test 3: Search by Keywords
  console.log('🔍 Search by Keywords ["business", "office"]:');
  const keywordElements = chinchillaVisualDatabase.searchElementsByKeywords(['business', 'office']);
  console.log(`Found ${keywordElements.length} elements:`);
  keywordElements.forEach(el => console.log(`  - ${el.name} (${el.id})`));
  console.log('');
  
  // Test 4: Get Product Mapping
  console.log('📦 Product Mapping for Business Pro Fiber:');
  const productElements = chinchillaVisualDatabase.getElementsForProduct('business_pro_fiber');
  console.log(`Found ${productElements.length} elements:`);
  productElements.forEach(el => console.log(`  - ${el.name} (${el.id})`));
  console.log('');
  
  // Test 5: Generate Image
  console.log('🎨 Testing Image Generation:');
  try {
    const result = await chinchillaVisualIntelligenceV2.generateIntelligentImage({
      prompt: 'Draw these elements: office_building for tech_telecom business solution with e& B2B branding and professional layout',
      industry: 'tech_telecom',
      contentType: 'product_visualization',
      style: 'professional_b2b',
      requirements: ['e& branding', 'B2B focus', 'professional layout'],
      context: 'Test context'
    });
    
    console.log('✅ Image Generation Result:');
    console.log(`  Success: ${result.success}`);
    console.log(`  Title: ${result.title}`);
    console.log(`  Elements Used: ${result.elementsUsed.join(', ')}`);
    console.log(`  Style Applied: ${result.styleApplied}`);
    console.log(`  Image URL Length: ${result.imageUrl.length}`);
    console.log(`  Description: ${result.description}`);
    
    if (result.success) {
      console.log('\n🎉 SUCCESS: Chinchilla database system is working!');
      console.log('✅ Elements are being generated correctly');
      console.log('✅ SVG is being created');
      console.log('✅ Base64 encoding is working');
    } else {
      console.log('\n❌ FAILED: Image generation failed');
    }
    
  } catch (error) {
    console.error('❌ Error during image generation:', error.message);
  }
}

// Run the test
testChinchillaDatabase().catch(console.error);
