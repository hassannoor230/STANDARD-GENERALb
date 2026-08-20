import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/standard-general-construction');
    
    const name = await question('Enter admin name: ');
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password (min 6 characters): ');

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin with this email already exists');
      rl.close();
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    console.log('Admin created successfully');
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    rl.close();
    process.exit(1);
  }
};

createAdmin();
