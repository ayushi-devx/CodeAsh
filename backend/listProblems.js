import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const listProblems = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash');
    console.log('✅ Connected to MongoDB\n');

    const problems = await Problem.find({}).select('title slug order difficulty');
    
    console.log(`📊 Total Problems: ${problems.length}\n`);
    console.log('Problems List:');
    console.log('─'.repeat(80));
    
    problems.forEach((problem, index) => {
      console.log(`${index + 1}. ${problem.title}`);
      console.log(`   Slug: ${problem.slug}`);
      console.log(`   Difficulty: ${problem.difficulty}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
};

listProblems();
