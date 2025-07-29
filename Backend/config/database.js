const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/imovieshow', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.error('Make sure MongoDB is running on your system');
    console.error('Try starting MongoDB with: mongod --dbpath /data/db');
    process.exit(1);
  }
};

module.exports = connectDB;