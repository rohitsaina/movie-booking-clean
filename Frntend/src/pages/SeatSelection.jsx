import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, IndianRupee } from 'lucide-react';

const SeatSelection = ({ user }) => {
  const { movieId, cinemaId, showtime } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      if (window.confirm('Please login to book tickets. Would you like to login now?')) {
        navigate('/login');
      } else {
        navigate(-1);
      }
    }
  }, [user, navigate]);

  // Mock seat data - in real app, this would come from API
  const seatLayout = {
    premium: {
      name: 'Premium',
      price: 250,
      rows: ['A', 'B', 'C'],
      seatsPerRow: 12,
      color: 'bg-purple-100 border-purple-300 text-purple-800'
    },
    regular: {
      name: 'Regular',
      price: 180,
      seatsPerRow: 14,
      rows: ['D', 'E', 'F', 'G', 'H', 'I', 'J'],
      color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    economy: {
      name: 'Economy',
      price: 120,
      rows: ['K', 'L', 'M'],
      seatsPerRow: 16,
      color: 'bg-green-100 border-green-300 text-green-800'
    }
  };

  // Mock occupied seats
  const occupiedSeats = ['A5', 'A6', 'B8', 'D12', 'E3', 'F7', 'G9', 'H11'];

  const getSeatPrice = (seatId) => {
    const row = seatId[0];
    if (['A', 'B', 'C'].includes(row)) return seatLayout.premium.price;
    if (['D', 'E', 'F', 'G', 'H', 'I', 'J'].includes(row)) return seatLayout.regular.price;
    return seatLayout.economy.price;
  };

  const getSeatType = (seatId) => {
    const row = seatId[0];
    if (['A', 'B', 'C'].includes(row)) return 'premium';
    if (['D', 'E', 'F', 'G', 'H', 'I', 'J'].includes(row)) return 'regular';
    return 'economy';
  };

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      if (selectedSeats.length < 10) { // Max 10 seats
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => total + getSeatPrice(seatId), 0);
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const bookingData = {
        movieId,
        cinemaId,
        showtime,
        seats: selectedSeats,
        total: calculateTotal(),
        bookingId: Math.random().toString(36).substr(2, 9)
      };
      
      localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
      navigate('/payment');
    }, 1000);
  };

  // Don't render if user is not logged in
  if (!user) {
    return <div>Redirecting...</div>;
  }

  const renderSeatMap = () => {
    return (
      <div className="space-y-8">
        {/* Screen */}
        <div className="relative">
          <div className="bg-gray-800 text-white text-center py-3 rounded-lg mb-8">
            <span className="font-semibold">SCREEN</span>
          </div>
        </div>

        {/* Premium Seats */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-purple-100 border-2 border-purple-300 rounded"></div>
            <span className="font-semibold text-purple-800">Premium - ₹{seatLayout.premium.price}</span>
          </div>
          {seatLayout.premium.rows.map(row => (
            <div key={row} className="flex items-center justify-center space-x-2">
              <span className="w-6 text-center font-semibold text-gray-600">{row}</span>
              <div className="flex space-x-1">
                {Array.from({ length: seatLayout.premium.seatsPerRow }, (_, i) => {
                  const seatNumber = i + 1;
                  const seatId = `${row}${seatNumber}`;
                  const isOccupied = occupiedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={isOccupied}
                      className={`w-8 h-8 rounded-lg border-2 text-xs font-semibold transition-all ${
                        isOccupied
                          ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed'
                          : isSelected
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200'
                      }`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Regular Seats */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-100 border-2 border-blue-300 rounded"></div>
            <span className="font-semibold text-blue-800">Regular - ₹{seatLayout.regular.price}</span>
          </div>
          {seatLayout.regular.rows.map(row => (
            <div key={row} className="flex items-center justify-center space-x-2">
              <span className="w-6 text-center font-semibold text-gray-600">{row}</span>
              <div className="flex space-x-1">
                {Array.from({ length: seatLayout.regular.seatsPerRow }, (_, i) => {
                  const seatNumber = i + 1;
                  const seatId = `${row}${seatNumber}`;
                  const isOccupied = occupiedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={isOccupied}
                      className={`w-8 h-8 rounded-lg border-2 text-xs font-semibold transition-all ${
                        isOccupied
                          ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed'
                          : isSelected
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200'
                      }`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Economy Seats */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-100 border-2 border-green-300 rounded"></div>
            <span className="font-semibold text-green-800">Economy - ₹{seatLayout.economy.price}</span>
          </div>
          {seatLayout.economy.rows.map(row => (
            <div key={row} className="flex items-center justify-center space-x-2">
              <span className="w-6 text-center font-semibold text-gray-600">{row}</span>
              <div className="flex space-x-1">
                {Array.from({ length: seatLayout.economy.seatsPerRow }, (_, i) => {
                  const seatNumber = i + 1;
                  const seatId = `${row}${seatNumber}`;
                  const isOccupied = occupiedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={isOccupied}
                      className={`w-8 h-8 rounded-lg border-2 text-xs font-semibold transition-all ${
                        isOccupied
                          ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed'
                          : isSelected
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Select Seats</h1>
            <p className="text-gray-600">Showtime: {showtime}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded border"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded border"></div>
                  <span className="text-sm">Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-400 rounded border"></div>
                  <span className="text-sm">Occupied</span>
                </div>
              </div>

              {renderSeatMap()}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
              
              {selectedSeats.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Selected Seats ({selectedSeats.length})</span>
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(
                        selectedSeats.reduce((acc, seatId) => {
                          const type = getSeatType(seatId);
                          const price = getSeatPrice(seatId);
                          if (!acc[type]) {
                            acc[type] = { seats: [], price, count: 0 };
                          }
                          acc[type].seats.push(seatId);
                          acc[type].count++;
                          return acc;
                        }, {})
                      ).map(([type, data]) => (
                        <div key={type} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium capitalize">{type}</span>
                            <span className="text-sm text-gray-600">₹{data.price} x {data.count}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Seats: {data.seats.join(', ')}
                          </div>
                          <div className="text-right font-semibold">
                            ₹{data.price * data.count}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount</span>
                      <div className="flex items-center space-x-1">
                        <IndianRupee className="h-5 w-5" />
                        <span>{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Please select seats to continue</p>
                </div>
              )}

              <div className="mt-6 text-xs text-gray-500">
                <p>• Maximum 10 seats can be selected</p>
                <p>• Seats once booked cannot be cancelled</p>
                <p>• Please arrive 15 minutes before showtime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;