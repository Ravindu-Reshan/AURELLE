// Run with: node seed.js
// Populates the database with sample products and an admin user for demo/testing.
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Over-ear wireless headphones with noise cancellation and 30-hour battery life.',
    price: 89.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 25,
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smart watch with heart rate monitor and GPS.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 15,
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Soft, breathable 100% cotton t-shirt available in multiple colors.',
    price: 19.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 50,
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with breathable mesh upper and cushioned sole.',
    price: 74.99,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 30,
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable drip coffee maker with 12-cup capacity.',
    price: 45.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1517914309068-9b4c0e6b7f8b?w=500',
    stock: 20,
  },
  {
    name: 'Backpack',
    description: 'Durable water-resistant backpack with laptop compartment.',
    price: 39.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 40,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    const adminExists = await User.findOne({ email: 'admin@shopeasy.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@shopeasy.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created (email: admin@shopeasy.com / password: admin123)');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Seeding complete');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
