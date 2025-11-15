import { Sparkles, MapPin, ChefHat, Camera } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const recentVisits = [
    { id: 1, name: 'Bella Italia', location: 'Downtown', image: 'italian restaurant interior', date: '2 days ago' },
    { id: 2, name: 'Sushi Master', location: 'Midtown', image: 'sushi restaurant', date: '5 days ago' },
    { id: 3, name: 'Green Bowl', location: 'West End', image: 'healthy food bowl', date: '1 week ago' },
  ];

  const activeQuests = [
    { id: 1, title: 'Try a Women-Owned Business', progress: 0, total: 1, reward: '15% off' },
    { id: 2, title: 'Visit 3 Pet-Friendly Cafes', progress: 1, total: 3, reward: '$10 coupon' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#009de0] to-[#141414] p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-1">Hey, Wolf! 🐺</h1>
            <p className="text-gray-300">Your food journey awaits</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🐺</span>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#2a2a2a]">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">24</div>
              <div className="text-xs text-gray-400">Places Visited</div>
            </div>
            <div className="text-center border-x border-[#2a2a2a]">
              <div className="text-2xl mb-1">156</div>
              <div className="text-xs text-gray-400">Dishes Tried</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">12</div>
              <div className="text-xs text-gray-400">Quests Done</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('wrapped')}
            className="bg-gradient-to-br from-[#009de0] to-[#0077aa] rounded-xl p-4 text-left"
          >
            <Sparkles className="w-6 h-6 mb-2" />
            <div className="text-sm">Your 2025</div>
            <div>Food Wrapped</div>
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-left"
          >
            <MapPin className="w-6 h-6 mb-2 text-[#009de0]" />
            <div className="text-sm text-gray-400">Explore</div>
            <div>Food Map</div>
          </button>
        </div>

        {/* Active Quests */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl">Active Quests</h2>
            <button
              onClick={() => onNavigate('quests')}
              className="text-[#009de0] text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {activeQuests.map((quest) => (
              <div key={quest.id} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a]">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="mb-1">{quest.title}</div>
                    <div className="text-xs text-[#009de0]">Reward: {quest.reward}</div>
                  </div>
                  <ChefHat className="w-5 h-5 text-[#009de0]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Progress</span>
                    <span>{quest.progress}/{quest.total}</span>
                  </div>
                  <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#009de0] rounded-full transition-all"
                      style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Food Journey */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl">Recent Food Journey</h2>
            <button
              onClick={() => onNavigate('map')}
              className="text-[#009de0] text-sm"
            >
              View Map
            </button>
          </div>
          <div className="space-y-3">
            {recentVisits.map((visit) => (
              <div key={visit.id} className="bg-[#1a1a1a] rounded-xl p-3 border border-[#2a2a2a] flex items-center space-x-3">
                <div className="w-16 h-16 bg-[#2a2a2a] rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/400x400/?${visit.image}`}
                    alt={visit.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-1 truncate">{visit.name}</div>
                  <div className="text-sm text-gray-400 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {visit.location}
                  </div>
                </div>
                <div className="text-xs text-gray-500">{visit.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Add Photo */}
        <button className="w-full bg-[#009de0] text-white rounded-xl p-4 flex items-center justify-center space-x-2">
          <Camera className="w-5 h-5" />
          <span>Add Food Photo</span>
        </button>
      </div>
    </div>
  );
}
