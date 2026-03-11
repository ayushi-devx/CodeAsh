import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

// Sample Coder Army video URLs for problems
const coderArmyVideos = {
  'set-matrix-zeroes': 'https://www.youtube.com/watch?v=M65xBewcqcI',
  'pascals-triangle': 'https://www.youtube.com/watch?v=6FLvhQjZqvM',
  'next-permutation': 'https://www.youtube.com/watch?v=LuLCLgMElus',
  'maximum-subarray': 'https://www.youtube.com/watch?v=w_KEoQvnC-Y',
  'sort-colors': 'https://www.youtube.com/watch?v=oaVa-9wmpns',
  'best-time-to-buy-sell-stock': 'https://www.youtube.com/watch?v=eMSfBgbiEjk',
  'rotate-image': 'https://www.youtube.com/watch?v=Y72QeX0Efxw',
  'merge-intervals': 'https://www.youtube.com/watch?v=2JzRBPFYbKE',
  'merge-sorted-array': 'https://www.youtube.com/watch?v=P1Ic85RarKY',
  'find-duplicate-number': 'https://www.youtube.com/watch?v=dfIqLxAf-8s'
};

const addCoderArmyVideos = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash');
    console.log('✅ Connected to MongoDB\n');

    let updated = 0;
    let notFound = 0;

    for (const [slug, videoUrl] of Object.entries(coderArmyVideos)) {
      try {
        const problem = await Problem.findOne({ slug });
        
        if (problem) {
          problem.coderArmyVideo = videoUrl;
          await problem.save();
          console.log(`✅ Updated: ${problem.title}`);
          updated++;
        } else {
          console.log(`⚠️  Not found: ${slug}`);
          notFound++;
        }
      } catch (error) {
        console.error(`❌ Error updating ${slug}:`, error.message);
      }
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Updated: ${updated} problems`);
    console.log(`⚠️  Not found: ${notFound} problems`);
    console.log('\n🎉 Done!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
};

addCoderArmyVideos();
