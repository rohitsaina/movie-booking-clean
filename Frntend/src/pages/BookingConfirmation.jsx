import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Share2, Calendar, Clock, MapPin, Users, IndianRupee } from 'lucide-react';
import jsPDF from 'jspdf'; // Import jsPDF

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const confirmationData = localStorage.getItem('bookingConfirmation');
    if (confirmationData) {
      setBookingData(JSON.parse(confirmationData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'IMovieShow Booking',
        text: `I've booked tickets for Movie! Booking ID: ${bookingData?.bookingId}`,
        url: window.location.href
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(
        `I've booked tickets on IMovieShow! Booking ID: ${bookingData?.bookingId}`
      );
      alert('Booking details copied to clipboard!');
    }
  };

  const handleDownloadTicket = () => {
    const doc = new jsPDF();
    const bookingDate = new Date(bookingData.bookingDate).toLocaleDateString();
    
    doc.setFontSize(20);
    doc.text('Booking Confirmation', 20, 20);
    doc.setFontSize(12);
    doc.text(`Booking ID: ${bookingData.bookingId}`, 20, 40);
    doc.text(`Movie Title: Movie Title`, 20, 50);
    doc.text(`Cinema: Cinema Name`, 20, 60);
    doc.text(`Date & Time: ${bookingDate} at ${bookingData.showtime}`, 20, 70);
    doc.text(`Seats: ${bookingData.seats.join(', ')}`, 20, 80);
    doc.text(`Total Paid: ₹${bookingData.total}`, 20, 90);
    doc.text(`Payment ID: ${bookingData.paymentId}`, 20, 100);
    doc.text(`Payment Method: ${bookingData.paymentMethod}`, 20, 110);
    doc.text('Status: Paid', 20, 120);
    
    doc.save('ticket.pdf');
  };

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  const bookingDate = new Date(bookingData.bookingDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Your movie tickets have been successfully booked
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Movie Title</h2>
                <p className="text-red-100">Cinema Name - Screen 1</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-red-100 text-sm">Booking ID</p>
                <p className="text-xl font-bold">{bookingData.bookingId}</p>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold">
                      {bookingDate.toLocaleDateString()} at {bookingData.showtime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Cinema</p>
                    <p className="font-semibold">Cinema Name</p>
                    <p className="text-sm text-gray-500">City, Location</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-semibold">{bookingData.seats.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Payment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tickets ({bookingData.seats.length})</span>
                      <span>₹{bookingData.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Convenience Fee</span>
                      <span>₹{Math.round(bookingData.total * 0.02)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>₹{Math.round((bookingData.total + Math.round(bookingData.total * 0.02)) * 0.18)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Paid</span>
                      <div className="flex items-center space-x-1">
                        <IndianRupee className="h-4 w-4" />
                        <span>{bookingData.total + Math.round(bookingData.total * 0.02) + Math.round((bookingData.total + Math.round(bookingData.total * 0.02)) * 0.18)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Payment Details</h4>
                  <p className="text-sm text-blue-800">
                    Payment ID: {bookingData.paymentId}
                  </p>
                  <p className="text-sm text-blue-800 capitalize">
                    Method: {bookingData.paymentMethod}
                  </p>
                  <p className="text-sm text-blue-800">
                    Status: Paid
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleShareBooking}
                className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span>Share Booking</span>
              </button>

              <button
                onClick={handleDownloadTicket}
                className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <span>Download Ticket</span>
              </button>

              <Link
                to="/dashboard"
                className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <span>View All Bookings</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-yellow-800 mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• Please arrive at the cinema at least 15 minutes before the showtime</li>
            <li>• Carry a valid ID proof along with your ticket</li>
            <li>• Outside food and beverages are not allowed in the cinema</li>
            <li>• Tickets once booked cannot be cancelled or refunded</li>
            <li>• Contact customer support for any assistance: 1800-123-4567</li>
          </ul>
        </div>

        {/* Continue Browsing */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <span>Book More Movies</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
