import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-[#0a1628] via-[#132b4a] to-[#1e3a5f] flex items-center justify-center p-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}>
            404
          </h1>
          <h2 className="text-3xl text-blue-300 mb-2">Route Not Found</h2>
          <p className="text-blue-200">The page you're looking for doesn't exist.</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95 mx-auto"
        >
          <Home className="w-5 h-5" />
          Go Home
        </motion.button>
      </motion.div>
    </div>
  );
}
