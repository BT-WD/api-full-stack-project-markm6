import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
    // Navigate to main page after login
    navigate('/main');
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-[#0a1628] via-[#132b4a] to-[#1e3a5f] flex items-center justify-center p-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            {/* Bus SVG Icon */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              <rect x="15" y="20" width="50" height="45" rx="6" fill="url(#busGradient)" />
              <rect x="20" y="25" width="18" height="15" rx="2" fill="white" opacity="0.9" />
              <rect x="42" y="25" width="18" height="15" rx="2" fill="white" opacity="0.9" />
              <rect x="15" y="15" width="50" height="8" rx="3" fill="url(#roofGradient)" />
              <circle cx="28" cy="60" r="4" fill="#1e3a5f" />
              <circle cx="52" cy="60" r="4" fill="#1e3a5f" />
              <rect x="25" y="45" width="30" height="3" rx="1.5" fill="white" opacity="0.3" />
              <defs>
                <linearGradient id="busGradient" x1="15" y1="20" x2="65" y2="65" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="roofGradient" x1="15" y1="15" x2="65" y2="23" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563eb" />
                  <stop offset="1" stopColor="#0891b2" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl tracking-wider text-white mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
          >
            MTA BUS ROUTE TRACKER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-blue-300 text-sm"
          >
            Track your connections, never miss a transfer
          </motion.p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-blue-300" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-blue-300" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-300 hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            >
              Sign In
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-blue-300">
              Don't have an account?{' '}
              <button className="text-white font-medium hover:underline transition-all">
                Sign up
              </button>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-blue-300/50 text-xs mt-6"
        >
          © 2026 MTA Bus Route Tracker. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
