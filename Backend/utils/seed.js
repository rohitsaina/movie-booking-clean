const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');
const Showtime = require('../models/Showtime');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connection successful for seeding!');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedDB = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Movie.deleteMany();
    await Cinema.deleteMany();
    await Showtime.deleteMany();

    console.log('Cleared existing data...');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@imovieshow.com',
      phone: '+1234567890',
      password: 'admin123',
      passwordConfirm: 'admin123',
      role: 'admin'
    });

    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+9876543210',
      password: 'test1234',
      passwordConfirm: 'test1234',
      role: 'user'
    });

    console.log('Created users...');

    // Create movies
    const movies = await Movie.create([
      {
        title: 'Avengers: Endgame',
        description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos.',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        language: ['English', 'Hindi'],
        duration: '3h 1m',
        releaseDate: new Date('2019-04-26'),
        rating: 4.8,
        certification: 'UA',
        poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
        banner: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
        trailerUrl: 'https://youtube.com/embed/TcMBFSGVi1c',
        cast: [
          { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man', photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg' },
          { name: 'Chris Evans', role: 'Steve Rogers / Captain America', photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg' }
        ],
        director: 'Anthony Russo, Joe Russo',
        producer: 'Kevin Feige',
        music: 'Alan Silvestri',
        status: 'now_showing'
      },
      {
        title: 'Spider-Man: No Way Home',
        description: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help.',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        language: ['English', 'Hindi', 'Tamil'],
        duration: '2h 28m',
        releaseDate: new Date('2021-12-17'),
        rating: 4.7,
        certification: 'UA',
        poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
        banner: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
        trailerUrl: 'https://youtube.com/embed/rt-2cxAiPJk',
        cast: [
          { name: 'Tom Holland', role: 'Peter Parker / Spider-Man', photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg' },
          { name: 'Zendaya', role: 'MJ', photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg' }
        ],
        director: 'Jon Watts',
        producer: 'Kevin Feige',
        music: 'Michael Giacchino',
        status: 'now_showing'
      }
    ]);

    console.log('Created movies...');

    // Create cinemas
    const cinemas = await Cinema.create([
      {
        name: 'PVR Cinemas',
        location: 'Phoenix Marketcity',
        address: 'Phoenix Market City, Whitefield, Bengaluru',
        city: 'Bengaluru',
        amenities: ['Dolby Atmos', '3D', 'Food Court', 'Wheelchair Access'],
        screens: [
          { name: 'Screen 1', type: 'imax', seatingCapacity: 250 },
          { name: 'Screen 2', type: '4dx', seatingCapacity: 180 },
          { name: 'Screen 3', type: 'premium', seatingCapacity: 150 }
        ],
        rating: 4.5
      },
      {
        name: 'INOX Leisure',
        location: 'Forum Mall',
        address: 'Forum Mall, Koramangala, Bengaluru',
        city: 'Bengaluru',
        amenities: ['Dolby Atmos', '3D', 'Food Court', 'Parking'],
        screens: [
          { name: 'Screen 1', type: 'regular', seatingCapacity: 200 },
          { name: 'Screen 2', type: 'premium', seatingCapacity: 120 }
        ],
        rating: 4.3
      }
    ]);

    console.log('Created cinemas...');

    // Create showtimes
    const showtimes = await Showtime.create([
      {
        movie: movies[0]._id,
        cinema: cinemas[0]._id,
        screen: 'Screen 1',
        time: '10:00 AM',
        date: new Date('2024-01-15'),
        availableSeats: 200,
        price: 350,
        status: 'available'
      },
      {
        movie: movies[0]._id,
        cinema: cinemas[0]._id,
        screen: 'Screen 1',
        time: '2:00 PM',
        date: new Date('2024-01-15'),
        availableSeats: 180,
        price: 400,
        status: 'available'
      },
      {
        movie: movies[1]._id,
        cinema: cinemas[1]._id,
        screen: 'Screen 1',
        time: '6:00 PM',
        date: new Date('2024-01-15'),
        availableSeats: 150,
        price: 300,
        status: 'available'
      }
    ]);

    console.log('Created showtimes...');

    console.log('✅ Database seeded successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@imovieshow.com');
    console.log('Password: admin123');
    console.log('');
    console.log('User credentials:');
    console.log('Email: john@example.com');
    console.log('Password: test1234');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Connect to database and seed
connectDB().then(() => {
  seedDB().then(() => {
    process.exit();
  });
});