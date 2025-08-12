'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website?: string;
  _service: string;
  _budget: string;
  _timeline: string;
  _source: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  submittedAt: string;
  updatedAt?: string;
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token === 'admin-token') {
      setIsAuthenticated(true);
      fetchBookings();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin-token', data.token);
        setIsAuthenticated(true);
        fetchBookings();
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data.sort((a: Booking, b: Booking) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      ));
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        fetchBookings();
        if (selectedBooking?.id === id) {
          setSelectedBooking({ ...selectedBooking, status });
        }
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await fetch(`/api/bookings?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBookings();
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin-token');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'contacted': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-bg-2 p-8 rounded-2xl border border-gray-1 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">BuddyBoard Admin</h1>
            <p className="text-white/70">Please login to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-bg-1 border border-gray-1 rounded-lg focus:border-primary focus:outline-none transition-colors"
                required
                data-cursor-hover
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-bg-1 border border-gray-1 rounded-lg focus:border-primary focus:outline-none transition-colors"
                required
                data-cursor-hover
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-bg-1 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              data-cursor-hover
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-400">
              <strong>Demo Credentials:</strong><br />
              Username: admin<br />
              Password: admin
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-1 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">BuddyBoard Admin</h1>
            <p className="text-white/70 mt-2">Manage client bookings and requests</p>
          </div>
          <div className="flex gap-4">
            <motion.button
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-bg-2 border border-gray-1 rounded-lg hover:border-primary/50 transition-colors"
              data-cursor-hover
            >
              Back to Site
            </motion.button>
            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              data-cursor-hover
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: bookings.length, color: 'primary' },
            { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'yellow-400' },
            { label: 'Contacted', value: bookings.filter(b => b.status === 'contacted').length, color: 'blue-400' },
            { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: 'green-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-2 p-6 rounded-xl border border-gray-1"
            >
              <h3 className="text-white/70 text-sm font-medium">{stat.label}</h3>
              <p className={`text-3xl font-bold text-${stat.color} mt-2`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bookings List */}
          <div className="lg:col-span-2">
            <div className="bg-bg-2 rounded-xl border border-gray-1 overflow-hidden">
              <div className="p-6 border-b border-gray-1">
                <h2 className="text-2xl font-bold text-white">Recent Bookings</h2>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                <AnimatePresence>
                  {bookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 border-b border-gray-1/50 hover:bg-bg-1/50 cursor-pointer transition-colors ${
                        selectedBooking?.id === booking.id ? 'bg-primary/10' : ''
                      }`}
                      onClick={() => setSelectedBooking(booking)}
                      data-cursor-hover
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-white">{booking.fullName}</h3>
                          <p className="text-sm text-white/70">{booking.company}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/60 mb-2">{booking._service} • {booking._budget}</p>
                      <p className="text-xs text-white/50">
                        {new Date(booking.submittedAt).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="lg:col-span-1">
            <div className="bg-bg-2 rounded-xl border border-gray-1 p-6 sticky top-4">
              {selectedBooking ? (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-white">Booking Details</h2>
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="text-white/50 hover:text-white transition-colors"
                      data-cursor-hover
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-white/70">Status</label>
                      <select
                        value={selectedBooking.status}
                        onChange={(e) => updateBookingStatus(selectedBooking.id, e.target.value as Booking['status'])}
                        className="w-full mt-1 p-2 bg-bg-1 border border-gray-1 rounded-lg focus:border-primary focus:outline-none"
                        data-cursor-hover
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-white/70">Name</label>
                      <p className="text-white mt-1">{selectedBooking.fullName}</p>
                    </div>

                    <div>
                      <label className="text-sm text-white/70">Email</label>
                      <p className="text-white mt-1">{selectedBooking.email}</p>
                    </div>

                    <div>
                      <label className="text-sm text-white/70">Phone</label>
                      <p className="text-white mt-1">{selectedBooking.phone}</p>
                    </div>

                    <div>
                      <label className="text-sm text-white/70">Company</label>
                      <p className="text-white mt-1">{selectedBooking.company}</p>
                    </div>

                    {selectedBooking.website && (
                      <div>
                        <label className="text-sm text-white/70">Website</label>
                        <p className="text-white mt-1">{selectedBooking.website}</p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm text-white/70">Service</label>
                      <p className="text-white mt-1">{selectedBooking._service}</p>
                    </div>

                    <div>
                      <label className="text-sm text-white/70">Budget</label>
                      <p className="text-white mt-1">{selectedBooking._budget}</p>
                    </div>

                    <div>
                      <label className="text-sm text-white/70">Timeline</label>
                      <p className="text-white mt-1">{selectedBooking._timeline}</p>
                    </div>

                    <div>
                      <label className="text-sm text-white/70">Source</label>
                      <p className="text-white mt-1">{selectedBooking._source}</p>
                    </div>

                    <div>
                      <label className="text-sm text-white/70">Message</label>
                      <p className="text-white mt-1 text-sm">{selectedBooking.message}</p>
                    </div>

                    <div>
                      <label className="text-sm text-white/70">Submitted</label>
                      <p className="text-white mt-1 text-sm">
                        {new Date(selectedBooking.submittedAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-1">
                      <motion.button
                        onClick={() => deleteBooking(selectedBooking.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-red-500/20 border border-red-500/50 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
                        data-cursor-hover
                      >
                        Delete Booking
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white/50">
                  <p>Select a booking to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;