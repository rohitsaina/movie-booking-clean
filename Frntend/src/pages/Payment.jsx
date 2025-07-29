import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Wallet, Shield, ArrowLeft, IndianRupee } from 'lucide-react';

const Payment = ({ user }) => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    walletPin: ''
  });

  useEffect(() => {
    const pendingBooking = localStorage.getItem('pendingBooking');
    if (pendingBooking) {
      setBookingData(JSON.parse(pendingBooking));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate booking confirmation
    const confirmationData = {
      ...bookingData,
      paymentMethod: selectedPaymentMethod,
      paymentId: `PAY${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };

    localStorage.setItem('bookingConfirmation', JSON.stringify(confirmationData));
    localStorage.removeItem('pendingBooking');

    navigate('/confirmation');
  };

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  const convenienceFee = Math.round(bookingData.total * 0.02); // 2% convenience fee
  const taxes = Math.round((bookingData.total + convenienceFee) * 0.18); // 18% GST
  const finalTotal = bookingData.total + convenienceFee + taxes;

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
            <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
            <p className="text-gray-600">Complete your booking</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
              
              <div className="space-y-4">
                {/* Credit/Debit Card */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === 'card'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPaymentMethod('card')}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Visa, MasterCard, Rupay</p>
                    </div>
                  </div>
                </div>

                {/* UPI */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === 'upi'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPaymentMethod('upi')}
                >
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold">UPI</h3>
                      <p className="text-sm text-gray-600">PhonePe, GPay, Paytm, BHIM</p>
                    </div>
                  </div>
                </div>

                {/* Digital Wallet */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === 'wallet'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPaymentMethod('wallet')}
                >
                  <div className="flex items-center space-x-3">
                    <Wallet className="h-6 w-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Digital Wallet</h3>
                      <p className="text-sm text-gray-600">Paytm, Amazon Pay, Mobikwik</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
              
              <form onSubmit={handlePayment} className="space-y-4">
                {selectedPaymentMethod === 'card' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardholderName"
                        required
                        value={paymentForm.cardholderName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter cardholder name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={paymentForm.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          required
                          value={paymentForm.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          required
                          value={paymentForm.cvv}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="123"
                          maxLength="4"
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedPaymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      required
                      value={paymentForm.upiId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="username@paytm"
                    />
                  </div>
                )}

                {selectedPaymentMethod === 'wallet' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wallet PIN
                    </label>
                    <input
                      type="password"
                      name="walletPin"
                      required
                      value={paymentForm.walletPin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter 4-digit PIN"
                      maxLength="4"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Your payment information is encrypted and secure</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay</span>
                      <IndianRupee className="h-4 w-4" />
                      <span>{finalTotal}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-2">Booking Details</h4>
                  <div className="text-sm space-y-1 text-gray-600">
                    <p>Movie: Movie Title</p>
                    <p>Cinema: Cinema Name</p>
                    <p>Date & Time: {bookingData.showtime}</p>
                    <p>Seats: {bookingData.seats.join(', ')}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ticket Price ({bookingData.seats.length} tickets)</span>
                    <span>₹{bookingData.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Convenience Fee</span>
                    <span>₹{convenienceFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes (GST 18%)</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="h-4 w-4" />
                      <span>{finalTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 pt-4 border-t">
                  <p>• Tickets once booked cannot be cancelled</p>
                  <p>• Please arrive 15 minutes before showtime</p>
                  <p>• Carry a valid ID proof</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;