const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    console.log('DNS servers set to Google Public DNS (8.8.8.8)');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // process.exit(1);
  }
};

module.exports = connectDB;
