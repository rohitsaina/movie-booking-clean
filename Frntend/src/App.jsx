import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import CinemaSelection from './pages/CinemaSelection';
import SeatSelection from './pages/SeatSelection';
import Payment from './pages/Payment';
import BookingConfirmation from './pages/BookingConfirmation';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddMovie from './pages/AddMovie';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('Visakhapatnam (Vizag)');

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userData');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user}
          onLogout={handleLogout}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home selectedLocation={selectedLocation} />} />
            <Route path="/movie/:id" element={<MovieDetails selectedLocation={selectedLocation} user={user} />} />
            <Route path="/cinemas/:movieId" element={<CinemaSelection selectedLocation={selectedLocation} user={user} />} />
            <Route path="/seats/:movieId/:cinemaId/:showtime" element={<SeatSelection user={user} />} />
            <Route path="/payment" element={<Payment user={user} />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route 
              path="/dashboard" 
              element={user ? <UserDashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
            />
            <Route
              path="/admin/add-movie"
              element={user?.role === 'admin' ? <AddMovie /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;