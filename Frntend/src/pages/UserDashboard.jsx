import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Star, Ticket, Download } from 'lucide-react';

const UserDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Mock bookings data - in real app, fetch from API
    const mockBookings = [
      {
        id: 'BK001',
        movieTitle: 'Oh Bhama Ayyo Rama',
        cinema: 'INOX CMR Central',
        location: 'Visakhapatnam',
        date: '2024-07-15',
        time: '07:30 PM',
        seats: ['D5', 'D6'],
        amount: 500,
        status: 'confirmed',
        poster: 'https://images.filmibeat.com/img/popcorn/movie_posters/ohbhamaayyorama-20250324125754-23614.jpg'
      },
      {
        id: 'BK002',
        movieTitle: 'The 100',
        cinema: 'PVR Vizag',
        location: 'Visakhapatnam',
        date: '2024-07-12',
        time: '02:30 PM',
        seats: ['F8', 'F9', 'F10'],
        amount: 750,
        status: 'completed',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDdmZGYwOWEtN2FkZC00Y2ExLWJkY2UtNzFlODVlNzc3MGIzXkEyXkFqcGc@._V1_.jpg'
      }
    ];
    setBookings(mockBookings);
  }, []);

  const upcomingBookings = bookings.filter(booking =>
    new Date(booking.date) >= new Date() && booking.status === 'confirmed'
  );

  const pastBookings = bookings.filter(booking =>
    new Date(booking.date) < new Date() || booking.status === 'completed'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Manage your bookings and account settings</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'bookings', label: 'My Bookings' },
              { id: 'profile', label: 'Profile' },
              { id: 'preferences', label: 'Preferences' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'bookings' && (
          <div className="space-y-8">
            {/* Upcoming Bookings */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Upcoming Shows</h2>
              {upcomingBookings.length > 0 ? (
                <div className="grid gap-6">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <Ticket className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No upcoming bookings
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Ready to watch something amazing?
                  </p>
                  <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                    Browse Movies
                  </button>
                </div>
              )}
            </section>

            {/* Past Bookings */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Booking History</h2>
              {pastBookings.length > 0 ? (
                <div className="grid gap-6">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} isPast={true} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-600">No past bookings to show</p>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={user.name}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={user.email}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={user.phone}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6">Preferences</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Notification Settings</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded mr-2" defaultChecked />
                    Email notifications for bookings
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded mr-2" defaultChecked />
                    SMS notifications for bookings
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded mr-2" />
                    Promotional offers and deals
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Preferred Languages</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded mr-2" defaultChecked />
                    Telugu
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded mr-2" />
                    Hindi
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded mr-2" />
                    English
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BookingCard = ({ booking, isPast = false }) => {
  const handleDownloadTicket = () => {
    alert('Download ticket functionality would be implemented here');
  };

  const handleRateMovie = () => {
    alert('Movie rating functionality would be implemented here');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <img
              src={booking.poster}
              alt={booking.movieTitle}
              className="w-32 h-48 object-cover rounded-lg"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {booking.movieTitle}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{booking.cinema}, {booking.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Ticket className="h-4 w-4" />
                    <span>Seats: {booking.seats.join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ₹{booking.amount}
                </div>
                <div className={`text-sm px-2 py-1 rounded-full mt-1 ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {booking.status === 'confirmed' ? 'Confirmed' : 'Completed'}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownloadTicket}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download Ticket</span>
              </button>
              
              {isPast && (
                <button
                  onClick={handleRateMovie}
                  className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Star className="h-4 w-4" />
                  <span>Rate Movie</span>
                </button>
              )}
              
              <div className="text-sm text-gray-500">
                Booking ID: {booking.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;