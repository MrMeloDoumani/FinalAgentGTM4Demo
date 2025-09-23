// Test script for Jammy Web Intelligence
const { jammyWebIntelligence } = require('./src/lib/jammy-web-intelligence.ts');

async function testWebIntelligence() {
  console.log('🧪 Testing Jammy Web Intelligence...\n');
  
  try {
    // Test 1: Search for Business Pro Fiber
    console.log('Test 1: Searching for "Business Pro Fiber"');
    const result1 = await jammyWebIntelligence.searchProduct('Business Pro Fiber');
    console.log('Result:', JSON.stringify(result1, null, 2));
    console.log('Visual Elements:', result1.visualElements);
    console.log('Confidence:', result1.confidence);
    console.log('Source:', result1.source);
    console.log('---\n');
    
    // Test 2: Search for generic internet
    console.log('Test 2: Searching for "internet"');
    const result2 = await jammyWebIntelligence.searchProduct('internet');
    console.log('Result:', JSON.stringify(result2, null, 2));
    console.log('Visual Elements:', result2.visualElements);
    console.log('---\n');
    
    // Test 3: Search for mobile
    console.log('Test 3: Searching for "mobile"');
    const result3 = await jammyWebIntelligence.searchProduct('mobile');
    console.log('Result:', JSON.stringify(result3, null, 2));
    console.log('Visual Elements:', result3.visualElements);
    console.log('---\n');
    
    // Test 4: Cache stats
    console.log('Test 4: Cache Statistics');
    const cacheStats = jammyWebIntelligence.getCacheStats();
    console.log('Cache Stats:', cacheStats);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testWebIntelligence();
