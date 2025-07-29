# iMovieShow Backend API

A comprehensive movie booking system backend built with Node.js, Express.js, and MongoDB.

## Features

- User authentication and authorization
- Movie management
- Cinema management
- Showtime management
- Booking system
- Feedback system
- Role-based access control (User/Admin)
- Input validation and sanitization
- Error handling
- Security middleware

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd imovieshow-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/imovieshow
   JWT_SECRET=your_super_secret_jwt_key_here_should_be_at_least_32_characters_long
   JWT_EXPIRES_IN=30d
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database** (Optional)
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/auth/me` | Get current user info |

### Movie Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/movies` | Get all movies | Public |
| GET | `/api/v1/movies/:id` | Get movie by ID | Public |
| POST | `/api/v1/movies` | Create new movie | Admin |
| PATCH | `/api/v1/movies/:id` | Update movie | Admin |
| DELETE | `/api/v1/movies/:id` | Delete movie | Admin |

### Cinema Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/cinemas` | Get all cinemas | Public |
| GET | `/api/v1/cinemas/location` | Get cinemas by location | Public |
| GET | `/api/v1/cinemas/:id` | Get cinema by ID | Public |
| POST | `/api/v1/cinemas` | Create new cinema | Admin |
| PATCH | `/api/v1/cinemas/:id` | Update cinema | Admin |
| DELETE | `/api/v1/cinemas/:id` | Delete cinema | Admin |

### Showtime Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/showtimes` | Get all showtimes | Public |
| GET | `/api/v1/showtimes/:id` | Get showtime by ID | Public |
| POST | `/api/v1/showtimes` | Create new showtime | Admin |
| PATCH | `/api/v1/showtimes/:id` | Update showtime | Admin |
| DELETE | `/api/v1/showtimes/:id` | Delete showtime | Admin |

### Booking Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/v1/bookings` | Create new booking | User |
| GET | `/api/v1/bookings` | Get all bookings | Admin |
| GET | `/api/v1/bookings/my-bookings` | Get user's bookings | User |
| GET | `/api/v1/bookings/:id` | Get booking by ID | User/Admin |
| PATCH | `/api/v1/bookings/:id/cancel` | Cancel booking | User/Admin |

### Feedback Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/v1/feedback` | Create feedback | Public |
| GET | `/api/v1/feedback` | Get all feedback | Admin |
| GET | `/api/v1/feedback/:id` | Get feedback by ID | Admin |
| DELETE | `/api/v1/feedback/:id` | Delete feedback | Admin |

## Thunder Client Testing

### Setup Thunder Client in VS Code

1. Install Thunder Client extension in VS Code
2. Open Thunder Client from the sidebar
3. Create a new collection called "iMovieShow API"

### Default Credentials After Seeding

**Admin:**
- Email: admin@imovieshow.com
- Password: admin123

**User:**
- Email: john@example.com
- Password: test1234

## Testing Workflow

1. **Start the server**: `npm run dev`
2. **Seed the database**: `npm run seed`
3. **Test with Thunder Client** using the provided examples

## Error Handling

The API uses centralized error handling with custom error classes. All errors return a consistent JSON structure:

```json
{
  "status": "error",
  "message": "Error description"
}
```

## Security Features

- Helmet for security headers
- CORS enabled
- Rate limiting
- Input sanitization
- XSS protection
- JWT authentication
- Password hashing with bcrypt

## Project Structure

```
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── movieController.js
│   ├── cinemaController.js
│   ├── showtimeController.js
│   ├── bookingController.js
│   └── feedbackController.js
├── middleware/
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Movie.js
│   ├── Cinema.js
│   ├── Showtime.js
│   ├── Booking.js
│   └── Feedback.js
├── routes/
│   ├── authRoutes.js
│   ├── movieRoutes.js
│   ├── cinemaRoutes.js
│   ├── showtimeRoutes.js
│   ├── bookingRoutes.js
│   └── feedbackRoutes.js
├── utils/
│   ├── appError.js
│   ├── catchAsync.js
│   ├── apiFeatures.js
│   └── seed.js
├── app.js
├── server.js
└── package.json
```