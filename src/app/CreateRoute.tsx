import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, X, Edit2, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface BusInRoute {
  id: string;
  busNumber: string;
  direction: string;
  stop: string;
}

interface SearchResult {
  id: string;
  value: string;
  label: string;
}

export default function CreateRoute() {
  const navigate = useNavigate();
  const [routeName, setRouteName] = useState('');
  const [buses, setBuses] = useState<BusInRoute[]>([]);
  const [showAddBus, setShowAddBus] = useState(false);
  const [searchingBus, setSearchingBus] = useState(false);
  const [searchingStop, setSearchingStop] = useState(false);
  const [busSearchQuery, setBusSearchQuery] = useState('');
  const [stopSearchQuery, setStopSearchQuery] = useState('');
  const [busSearchResults, setBusSearchResults] = useState<SearchResult[]>([]);
  const [stopSearchResults, setStopSearchResults] = useState<SearchResult[]>([]);
  const [selectedBus, setSelectedBus] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [editingBusId, setEditingBusId] = useState<string | null>(null);

  const mockBusResults: SearchResult[] = [
    { id: 'M15', value: 'M15', label: 'M15 - 1st/2nd Avenues' },
    { id: 'M20', value: 'M20', label: 'M20 - 7th/8th Avenues' },
    { id: 'M34', value: 'M34', label: 'M34 - 34th Street Crosstown' },
    { id: 'M42', value: 'M42', label: 'M42 - 42nd Street Crosstown' },
    { id: 'BX12', value: 'BX12', label: 'BX12 - Fordham Road' },
  ];

  const mockStopResults: SearchResult[] = [
    { id: 's1', value: 'Broadway & 42nd St', label: 'Broadway & 42nd St' },
    { id: 's2', value: '5th Ave & 34th St', label: '5th Ave & 34th St' },
    { id: 's3', value: 'Madison Ave & 23rd St', label: 'Madison Ave & 23rd St' },
    { id: 's4', value: 'Lexington Ave & 59th St', label: 'Lexington Ave & 59th St' },
    { id: 's5', value: 'Amsterdam Ave & 72nd St', label: 'Amsterdam Ave & 72nd St' },
  ];

  const directions = ['Uptown', 'Downtown', 'Eastbound', 'Westbound'];

  const handleBusSearch = () => {
    setSearchingBus(true);
    setTimeout(() => {
      setBusSearchResults(mockBusResults.filter(bus =>
        bus.label.toLowerCase().includes(busSearchQuery.toLowerCase())
      ));
      setSearchingBus(false);
    }, 800);
  };

  const handleStopSearch = () => {
    setSearchingStop(true);
    setTimeout(() => {
      setStopSearchResults(mockStopResults.filter(stop =>
        stop.label.toLowerCase().includes(stopSearchQuery.toLowerCase())
      ));
      setSearchingStop(false);
    }, 800);
  };

  const handleAddBus = () => {
    if (selectedBus && selectedDirection && selectedStop) {
      const newBus: BusInRoute = {
        id: Date.now().toString(),
        busNumber: selectedBus,
        direction: selectedDirection,
        stop: selectedStop,
      };
      setBuses([...buses, newBus]);
      resetAddBusForm();
    }
  };

  const handleUpdateBus = () => {
    if (editingBusId && selectedBus && selectedDirection && selectedStop) {
      setBuses(buses.map(bus =>
        bus.id === editingBusId
          ? { ...bus, busNumber: selectedBus, direction: selectedDirection, stop: selectedStop }
          : bus
      ));
      resetAddBusForm();
    }
  };

  const handleRemoveBus = (id: string) => {
    setBuses(buses.filter(bus => bus.id !== id));
  };

  const handleEditBus = (bus: BusInRoute) => {
    setEditingBusId(bus.id);
    setSelectedBus(bus.busNumber);
    setSelectedDirection(bus.direction);
    setSelectedStop(bus.stop);
    setShowAddBus(true);
  };

  const resetAddBusForm = () => {
    setShowAddBus(false);
    setEditingBusId(null);
    setSelectedBus('');
    setSelectedDirection('');
    setSelectedStop('');
    setBusSearchQuery('');
    setStopSearchQuery('');
    setBusSearchResults([]);
    setStopSearchResults([]);
  };

  const handleSaveRoute = () => {
    console.log('Saving route:', { routeName, buses });
    navigate('/main');
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-[#0a1628] via-[#132b4a] to-[#1e3a5f] overflow-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#0a1628]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative flex items-center">
            <button
              onClick={() => navigate('/main')}
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-1/2 -translate-x-1/2 text-3xl sm:text-4xl tracking-wider text-white whitespace-nowrap"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
            >
              CREATE ROUTE
            </motion.h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Route Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <label className="block text-sm font-medium text-blue-200 mb-2">
            Route Name
          </label>
          <input
            type="text"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., Morning Commute"
          />
        </motion.div>

        {/* Add Bus Button */}
        {!showAddBus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={() => setShowAddBus(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Add Bus
            </button>
          </motion.div>
        )}

        {/* Add/Edit Bus Form */}
        <AnimatePresence>
          {showAddBus && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 overflow-hidden"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingBusId ? 'Edit Bus' : 'Add New Bus'}
              </h3>

              {/* Bus Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Bus Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={busSearchQuery}
                    onChange={(e) => setBusSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleBusSearch()}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search for a bus..."
                  />
                  <button
                    onClick={handleBusSearch}
                    disabled={searchingBus}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    {searchingBus ? 'Searching...' : 'Search'}
                  </button>
                </div>

                {/* Bus Search Results */}
                {busSearchResults.length > 0 && (
                  <div className="mt-2 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    {busSearchResults.map(result => (
                      <button
                        key={result.id}
                        onClick={() => {
                          setSelectedBus(result.value);
                          setBusSearchQuery(result.label);
                          setBusSearchResults([]);
                        }}
                        className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors"
                      >
                        {result.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Direction Dropdown */}
              {selectedBus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Direction
                  </label>
                  <select
                    value={selectedDirection}
                    onChange={(e) => setSelectedDirection(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select direction...</option>
                    {directions.map(dir => (
                      <option key={dir} value={dir} className="bg-[#132b4a]">{dir}</option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Stop Search */}
              {selectedBus && selectedDirection && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Starting Stop
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={stopSearchQuery}
                      onChange={(e) => setStopSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleStopSearch()}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search for a stop..."
                    />
                    <button
                      onClick={handleStopSearch}
                      disabled={searchingStop}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      {searchingStop ? 'Searching...' : 'Search'}
                    </button>
                  </div>

                  {/* Stop Search Results */}
                  {stopSearchResults.length > 0 && (
                    <div className="mt-2 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                      {stopSearchResults.map(result => (
                        <button
                          key={result.id}
                          onClick={() => {
                            setSelectedStop(result.value);
                            setStopSearchQuery(result.label);
                            setStopSearchResults([]);
                          }}
                          className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors"
                        >
                          {result.label}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Form Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={editingBusId ? handleUpdateBus : handleAddBus}
                  disabled={!selectedBus || !selectedDirection || !selectedStop}
                  className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/30 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                  {editingBusId ? 'Update Bus' : 'Add Bus'}
                </button>
                <button
                  onClick={resetAddBusForm}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buses List */}
        <div className="space-y-4">
          <AnimatePresence>
            {buses.map((bus, index) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-lg px-4 py-2 rounded-lg min-w-[70px] text-center shadow-lg" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                      {bus.busNumber}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{bus.direction}</p>
                      <p className="text-sm text-blue-300 mt-1">{bus.stop}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditBus(bus)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      title="Edit bus"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveBus(bus.id)}
                      className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"
                      title="Remove bus"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Save Button */}
        {buses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={handleSaveRoute}
              disabled={!routeName}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-emerald-500/30 disabled:to-green-600/30 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105 active:scale-95"
            >
              <Save className="w-5 h-5" />
              Save Route
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
