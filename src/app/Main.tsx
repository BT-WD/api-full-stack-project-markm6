import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, LogOut, Clock, Navigation, CheckCircle2, AlertCircle, Edit } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Bus {
  id: string;
  route: string;
  destination: string;
  estimatedArrival: number;
  status: 'on-time' | 'delayed' | 'early';
  stops: number;
}

interface BusRoute {
  id: string;
  name: string;
  buses: Bus[];
  transferTime: number;
}

export default function Main() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<BusRoute[]>([
    {
      id: '1',
      name: 'Home to Work Commute',
      transferTime: 5,
      buses: [
        {
          id: 'b1',
          route: 'M15',
          destination: 'South Ferry',
          estimatedArrival: 3,
          status: 'on-time',
          stops: 2
        },
        {
          id: 'b2',
          route: 'M20',
          destination: 'Lincoln Center',
          estimatedArrival: 12,
          status: 'on-time',
          stops: 5
        }
      ]
    },
    {
      id: '2',
      name: 'Evening Route',
      transferTime: 3,
      buses: [
        {
          id: 'b3',
          route: 'M34',
          destination: 'Waterside',
          estimatedArrival: 7,
          status: 'delayed',
          stops: 4
        },
        {
          id: 'b4',
          route: 'M42',
          destination: 'Pier 11',
          estimatedArrival: 9,
          status: 'early',
          stops: 1
        }
      ]
    }
  ]);

  const getConnectionStatus = (route: BusRoute) => {
    if (route.buses.length < 2) return null;
    const firstBus = route.buses[0];
    const secondBus = route.buses[1];
    const arrivalDifference = secondBus.estimatedArrival - firstBus.estimatedArrival;

    if (arrivalDifference >= route.transferTime) {
      return 'safe';
    } else if (arrivalDifference >= route.transferTime - 2) {
      return 'tight';
    } else {
      return 'missed';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time':
        return 'text-emerald-400';
      case 'delayed':
        return 'text-amber-400';
      case 'early':
        return 'text-cyan-400';
      default:
        return 'text-gray-400';
    }
  };

  const getConnectionColor = (status: string | null) => {
    switch (status) {
      case 'safe':
        return 'text-emerald-400';
      case 'tight':
        return 'text-amber-400';
      case 'missed':
        return 'text-rose-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-[#0a1628] via-[#132b4a] to-[#1e3a5f] overflow-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#0a1628]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative flex items-center justify-end">
            {/* Center Title - absolutely centered */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-1/2 -translate-x-1/2 text-3xl sm:text-4xl tracking-wider text-white whitespace-nowrap"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
            >
              MTA BUS ROUTE TRACKER
            </motion.h1>

            {/* User Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 z-10"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-blue-300">Commuter</p>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors group">
                <LogOut className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors" />
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Create Route Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <button
            onClick={() => navigate('/createroute')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Create Route
          </button>
        </motion.div>

        {/* Routes */}
        <div className="space-y-6">
          <AnimatePresence>
            {routes.map((route, index) => {
              const connectionStatus = getConnectionStatus(route);

              return (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/10 transition-all"
                >
                  {/* Route Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-white">{route.name}</h2>
                      <button
                        onClick={() => navigate(`/editroute/${route.id}`)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:scale-105 active:scale-95"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit Route
                      </button>
                    </div>
                    {connectionStatus && (
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ${getConnectionColor(connectionStatus)}`}>
                        {connectionStatus === 'safe' && <CheckCircle2 className="w-4 h-4" />}
                        {connectionStatus === 'tight' && <Clock className="w-4 h-4" />}
                        {connectionStatus === 'missed' && <AlertCircle className="w-4 h-4" />}
                        <span className="text-sm font-medium capitalize">{connectionStatus} Connection</span>
                      </div>
                    )}
                  </div>

                  {/* Buses */}
                  <div className="space-y-4">
                    {route.buses.map((bus, busIndex) => (
                      <div key={bus.id}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + busIndex * 0.1 + 0.4 }}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            {/* Bus Info */}
                            <div className="flex items-center gap-4">
                              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-lg px-4 py-2 rounded-lg min-w-[70px] text-center shadow-lg" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                                {bus.route}
                              </div>
                              <div>
                                <p className="text-white font-medium flex items-center gap-2">
                                  <Navigation className="w-4 h-4 text-blue-300" />
                                  {bus.destination}
                                </p>
                                <p className="text-sm text-blue-200 mt-1">{bus.stops} stops away</p>
                              </div>
                            </div>

                            {/* Status and ETA */}
                            <div className="text-right">
                              <motion.div
                                key={bus.estimatedArrival}
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-3xl font-bold text-white mb-1"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                              >
                                {bus.estimatedArrival} MIN
                              </motion.div>
                              <p className={`text-sm font-medium capitalize ${getStatusColor(bus.status)}`}>
                                {bus.status}
                              </p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mt-4 bg-white/5 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${100 - (bus.estimatedArrival / 15) * 100}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className={`h-full rounded-full ${
                                bus.status === 'on-time' ? 'bg-gradient-to-r from-emerald-400 to-green-500' :
                                bus.status === 'delayed' ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                                'bg-gradient-to-r from-cyan-400 to-blue-500'
                              }`}
                            />
                          </div>
                        </motion.div>

                        {/* Transfer Indicator */}
                        {busIndex < route.buses.length - 1 && (
                          <div className="flex items-center justify-center py-2">
                            <div className="flex items-center gap-3 text-blue-300 text-sm bg-white/5 px-4 py-2 rounded-lg">
                              <div className="w-px h-8 bg-blue-300/30" />
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">{route.transferTime} min transfer</span>
                              </div>
                              <div className="w-px h-8 bg-blue-300/30" />
                              <div className="text-xs">
                                {(() => {
                                  const nextBus = route.buses[busIndex + 1];
                                  const arrivalAtNextStop = bus.estimatedArrival + route.transferTime;
                                  const waitTime = nextBus.estimatedArrival - arrivalAtNextStop;

                                  if (waitTime >= 0) {
                                    return (
                                      <span className="text-cyan-300">
                                        {waitTime} min wait at stop
                                      </span>
                                    );
                                  } else {
                                    const nextBusWaitTime = 15;
                                    return (
                                      <span className="text-rose-400">
                                        {nextBusWaitTime} min wait (missed)
                                      </span>
                                    );
                                  }
                                })()}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {routes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-blue-300 text-lg">No routes yet. Create your first route to start tracking!</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
