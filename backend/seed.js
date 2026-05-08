const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');
const dns = require('dns');

dotenv.config();
connectDB();

const products = [
  {
    title: 'iPhone 15 Pro Max',
    description: 'The ultimate iPhone with Titanium design, A17 Pro chip, and the most powerful camera system on iPhone yet.',
    image: '/images/iphone_15_pro_mockup_1778067014670.png',
    price: 1,
    category: 'Electronics',
  },
  {
    title: 'MacBook Air M3',
    description: 'Supercharged by the M3 chip, MacBook Air is the world’s most popular laptop. Now even faster and more capable.',
    image: '/images/macbook_air_m3_mockup_1778066483902.png',
    price: 1,
    category: 'Computers',
  },
  {
    title: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation, exceptional sound quality, and superior call quality with the new Integrated Processor V1.',
    image: '/images/sony_headphones_mockup_1778066554648.png',
    price: 1,
    category: 'Audio',
  },
  {
    title: 'Apple Watch Ultra 2',
    description: 'The most rugged and capable Apple Watch. Designed for endurance, exploration, and adventure.',
    image: '/images/apple_watch_ultra_mockup_1778066571906.png',
    price: 1,
    category: 'Wearables',
  },
  {
    title: 'Samsung S24 Ultra',
    description: 'Unleash your creativity with the S Pen and capture stunning photos with the 200MP camera. Powered by AI.',
    image: '/images/samsung_s24_ultra_mockup_1778066653564.png',
    price: 1,
    category: 'Electronics',
  },
  {
    title: 'Dell XPS 15',
    description: 'Stunning 4K OLED display, powerful Intel performance, and premium craftsmanship in a portable 15-inch design.',
    image: '/images/dell_xps_15_mockup_1778066728799.png',
    price: 1,
    category: 'Computers',
  }
];

const seedProducts = async () => {
  try {
    dns.setServers(['8.8.8.8']);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error with seeding data', error);
    process.exit(1);
  }
};

seedProducts();
