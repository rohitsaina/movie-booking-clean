import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Wifi, Car, Utensils } from 'lucide-react';

// Mock cinema data based on cities
const cinemaData = {
  'Visakhapatnam (Vizag)': [
    {
      id: 1,
      name: 'INOX CMR Central',
      address: 'CMR Central Mall, Maddilapalem, Visakhapatnam',
      distance: '2.5 km',
      rating: 4.3,
      amenities: ['Parking', 'Food Court', 'WiFi', 'AC'],
      screens: ['IMAX', '4DX', 'Regular'],
      showtimes: ['09:30 AM', '01:15 PM', '05:00 PM', '08:45 PM']
    },
    {
      id: 2,
      name: 'PVR Vizag',
      address: 'Jagadamba Junction, Visakhapatnam',
      distance: '3.2 km',
      rating: 4.1,
      amenities: ['Parking', 'Food Court', 'WiFi'],
      screens: ['Premium', 'Regular'],
      showtimes: ['10:00 AM', '02:30 PM', '06:15 PM', '09:30 PM']
    },
    {
      id: 3,
      name: 'Asian Cinemas',
      address: 'Siripuram, Visakhapatnam',
      distance: '4.1 km',
      rating: 3.8,
      amenities: ['Parking', 'Snacks'],
      screens: ['Regular'],
      showtimes: ['11:00 AM', '03:00 PM', '07:00 PM', '10:00 PM']
    }
  ],
  'Vijayawada': [
    {
      id: 4,
      name: 'PVR Vijayawada',
      address: 'PVP Square Mall, Vijayawada',
      distance: '1.8 km',
      rating: 4.2,
      amenities: ['Parking', 'Food Court', 'WiFi', 'AC'],
      screens: ['Premium', 'Regular'],
      showtimes: ['09:45 AM', '01:30 PM', '05:15 PM', '09:00 PM']
    },
    {
      id: 5,
      name: 'Cinepolis Vijayawada',
      address: 'Leela Mahal Center, Vijayawada',
      distance: '2.3 km',
      rating: 4.0,
      amenities: ['Parking', 'Food Court', 'AC'],
      screens: ['4DX', 'Regular'],
      showtimes: ['10:15 AM', '02:00 PM', '05:45 PM', '09:15 PM']
    }
  ],
  'Guntur': [
    {
      id: 6,
      name: 'Saptagiri Theatre',
      address: 'Arundelpet, Guntur',
      distance: '1.5 km',
      rating: 3.9,
      amenities: ['Parking', 'Snacks', 'AC'],
      screens: ['Regular'],
      showtimes: ['09:30 AM', '01:00 PM', '04:30 PM', '08:00 PM']
    }
  ]
};

const CinemaSelection = ({ selectedLocation, user }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const cinemas = cinemaData[selectedLocation] || [];

  const handleShowtimeClick = (cinemaId, time) => {
    if (!user) {
      if (window.confirm('Please login to book tickets. Would you like to login now?')) {
        navigate('/login');
      }
      return;
    }
    navigate(`/seats/${movieId}/${cinemaId}/${time}`);
  };

  const getNext7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      });
    }
    return dates;
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'food court':
      case 'snacks':
        return <Utensils className="h-4 w-4" />;
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Cinema</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{selectedLocation}</span>
          </div>
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Date</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {getNext7Days().map((date) => (
              <button
                key={date.value}
                onClick={() => setSelectedDate(date.value)}
                className={`flex-shrink-0 px-4 py-3 rounded-lg border font-medium transition-colors ${
                  selectedDate === date.value
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                }`}
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cinema List */}
        <div className="space-y-6">
          {cinemas.length > 0 ? (
            cinemas.map((cinema) => (
              <div key={cinema.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {cinema.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{cinema.address}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{cinema.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{cinema.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cinema.amenities.map((amenity, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-lg text-xs text-gray-600"
                          >
                            {getAmenityIcon(amenity)}
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Screen Types */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cinema.screens.map((screen, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium"
                          >
                            {screen}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Showtimes */}
                    <div className="lg:ml-8 mt-4 lg:mt-0">
                      <h4 className="font-semibold mb-3 text-gray-900">Show Times</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                        {cinema.showtimes.map((time, index) => (
                          <button
                            key={index}
                            onClick={() => handleShowtimeClick(cinema.id, time)}
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg text-center font-medium transition-colors border border-green-200"
                          >
                            <div className="flex items-center justify-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-sm">{time}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Cinemas Available
              </h3>
              <p className="text-gray-600">
                We're working to bring more cinemas to {selectedLocation}. Please check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CinemaSelection;