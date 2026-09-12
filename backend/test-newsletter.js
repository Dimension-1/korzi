import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

// Import newsletter service after env is loaded
const { default: newsletterService } = await import('./newsletter.js');

async function testNewsletter() {
  try {
    console.log('Testing newsletter service...');
    
    const result = await newsletterService.subscribe(
      'test@example.com', 
      'Test Subscription'
    );
    
    console.log('✅ Newsletter test result:', result);
  } catch (error) {
    console.error('❌ Newsletter test failed:', error.message);
  }
}

testNewsletter();