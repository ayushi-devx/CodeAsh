import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const verifyVideos = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash');
    console.log('✅ Connected to MongoDB\n');

    const problems = await Problem.find({}).select('title slug videoUrl coderArmyVideo');
    
    console.log(`📊 Total Problems: ${problems.length}\n`);
    console.log('Video Status:');
    console.log('═'.repeat(80));
    
    let withStriver = 0;
    let withCoderArmy = 0;
    let withBoth = 0;
    let withNone = 0;
    
    problems.forEach((problem, index) => {
      const hasStriver = !!problem.videoUrl;
      const hasCoderArmy = !!problem.coderArmyVideo;
      
      if (hasStriver) withStriver++;
      if (hasCoderArmy) withCoderArmy++;
      if (hasStriver && hasCoderArmy) withBoth++;
      if (!hasStriver && !hasCoderArmy) withNone++;
      
      console.log(`\n${index + 1}. ${problem.title}`);
      console.log(`   Striver's Video: ${hasStriver ? '✅' : '❌'}`);
      console.log(`   Coder Army Video: ${hasCoderArmy ? '✅' : '❌'}`);
    });
    
    console.log('\n' + '═'.repeat(80));
    console.log('\n📈 Statistics:');
    console.log(`   Problems with Striver's video: ${withStriver}/${problems.length}`);
    console.log(`   Problems with Coder Army video: ${withCoderArmy}/${problems.length}`);
    console.log(`   Problems with both videos: ${withBoth}/${problems.length}`);
    console.log(`   Problems with no videos: ${withNone}/${problems.length}`);
    
    if (withCoderArmy === problems.length) {
      console.log('\n🎉 All problems have Coder Army videos!');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
  }
};

verifyVideos();
