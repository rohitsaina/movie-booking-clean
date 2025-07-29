const dotenv = require('dotenv');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Load environment variables
dotenv.config();

// Check if MongoDB URI is configured
if (!process.env.MONGODB_URI) {
  console.log('MONGODB_URI not found in environment variables, using default: mongodb://127.0.0.1:27017/imovieshow');
}

const app = require('./app');
const connectDB = require('./config/database');

// Connect to MongoDB with error handling
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  console.error('\n=== MongoDB Setup Instructions ===');
  console.error('1. Make sure MongoDB is installed on your system');
  console.error('2. Start MongoDB service:');
  console.error('   - Windows: Start MongoDB service from Services');
  console.error('   - macOS: brew services start mongodb-community');
  console.error('   - Linux: sudo systemctl start mongod');
  console.error('3. Or start MongoDB manually: mongod --dbpath /data/db');
  console.error('4. Verify MongoDB is running on port 27017');
  process.exit(1);
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});