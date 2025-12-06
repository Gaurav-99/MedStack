const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

// Load env vars
dotenv.config({ path: './.env' });

const createUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Common password for all
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password123', salt);

        const users = [
            {
                name: 'Alice Student',
                email: 'alice@med.edu',
                password: password,
                school: 'Harvard Medical School',
                year: 'Year 1',
                role: 'student',
                bio: 'Passionate about internal medicine.'
            },
            {
                name: 'Bob Resident',
                email: 'bob@resident.org',
                password: password,
                school: 'Johns Hopkins',
                year: 'PGY-2',
                role: 'student',
                bio: 'Surgical resident.'
            },
            {
                name: 'Dr. Gregory House',
                email: 'house@princeton.com',
                password: password,
                school: 'Princeton-Plainsboro',
                year: 'Attending',
                role: 'moderator',
                bio: 'It is never lupus.',
                reputation: 100
            },
            {
                name: 'Sarah Nurse',
                email: 'sarah@care.org',
                password: password,
                school: 'Nursing Academy',
                year: 'Senior',
                role: 'student',
                bio: 'Helping patients every day.'
            },
            {
                name: 'Admin User',
                email: 'admin@medstack.com',
                password: password,
                school: 'MedStack HQ',
                year: 'Admin',
                role: 'admin',
                bio: 'System Administrator.'
            }
        ];

        for (const user of users) {
            // Check if exists first to avoid duplicate errors if run twice
            const exists = await User.findOne({ email: user.email });
            if (!exists) {
                await User.create(user);
                console.log(`Created user: ${user.email}`);
            } else {
                console.log(`Skipped existing: ${user.email}`);
            }
        }

        console.log('All 5 users registered successfully.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createUsers();
