import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const migrateUserStreaks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Get all users
    const users = await User.find({});
    console.log(`📊 Found ${users.length} users to migrate`);

    let updated = 0;

    for (const user of users) {
      let modified = false;

      // Initialize currentStreak and longestStreak if not present
      if (user.currentStreak === undefined) {
        user.currentStreak = user.streakCount || 0;
        modified = true;
      }

      if (user.longestStreak === undefined) {
        user.longestStreak = user.streakCount || 0;
        modified = true;
      }

      // Calculate actual streak from submission history
      if (user.submissions && user.submissions.length > 0) {
        const acceptedSubmissions = user.submissions
          .filter(sub => sub.status === 'Accepted')
          .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));

        if (acceptedSubmissions.length > 0) {
          // Get unique dates
          const uniqueDates = [...new Set(
            acceptedSubmissions.map(sub => 
              new Date(sub.submittedAt).toDateString()
            )
          )].sort((a, b) => new Date(a) - new Date(b));

          // Calculate current streak
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          let currentStreak = 0;
          let longestStreak = 0;
          let tempStreak = 1;

          for (let i = uniqueDates.length - 1; i >= 0; i--) {
            const date = new Date(uniqueDates[i]);
            date.setHours(0, 0, 0, 0);

            if (i === uniqueDates.length - 1) {
              // Check if last submission was today or yesterday
              const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
              if (diffDays <= 1) {
                currentStreak = 1;
              }
            } else {
              const prevDate = new Date(uniqueDates[i + 1]);
              prevDate.setHours(0, 0, 0, 0);
              const diffDays = Math.floor((prevDate - date) / (1000 * 60 * 60 * 24));

              if (diffDays === 1) {
                tempStreak++;
                if (i === uniqueDates.length - 2) {
                  currentStreak = tempStreak;
                }
              } else {
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 1;
              }
            }
          }

          longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

          user.currentStreak = currentStreak;
          user.longestStreak = longestStreak;
          user.lastSolvedDate = new Date(uniqueDates[uniqueDates.length - 1]);
          modified = true;
        }
      }

      if (modified) {
        await user.save();
        updated++;
        console.log(`✅ Updated user: ${user.email} (Current: ${user.currentStreak}, Longest: ${user.longestStreak})`);
      }
    }

    console.log(`\n🎉 Migration complete! Updated ${updated} users.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
};

migrateUserStreaks();
