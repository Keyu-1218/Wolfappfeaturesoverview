import { MapPin, Award, Gift, Sparkles, ChefHat, Heart, Leaf } from 'lucide-react';

export function QuestsView() {
  const activeQuests = [
    {
      id: 1,
      title: 'Try a Women-Owned Business',
      description: 'Support local women entrepreneurs',
      progress: 0,
      total: 1,
      reward: '15% off coupon',
      icon: Heart,
      color: '#009de0',
      suggestions: [
        { name: 'Spice Route', distance: '0.8 mi', tag: 'Indian' },
        { name: 'Sweet Sisters Bakery', distance: '1.2 mi', tag: 'Bakery' },
      ]
    },
    {
      id: 2,
      title: 'Visit 3 Pet-Friendly Cafes',
      description: 'Bring your furry friend along',
      progress: 1,
      total: 3,
      reward: '$10 coupon',
      icon: Heart,
      color: '#009de0',
      suggestions: [
        { name: 'Café Breeze', distance: '0.5 mi', tag: 'Coffee' },
        { name: 'Paws & Coffee', distance: '1.8 mi', tag: 'Café' },
      ]
    },
    {
      id: 3,
      title: 'Discover 5 New Restaurants',
      description: 'Expand your food horizons',
      progress: 2,
      total: 5,
      reward: '$25 coupon',
      icon: Sparkles,
      color: '#009de0',
      suggestions: [
        { name: 'Fusion Kitchen', distance: '0.9 mi', tag: 'Asian Fusion' },
        { name: 'Urban Eats', distance: '1.5 mi', tag: 'Modern American' },
      ]
    },
  ];

  const completedQuests = [
    { id: 101, title: 'Try 3 Different Cuisines', reward: '$5 coupon', completedDate: '2 days ago' },
    { id: 102, title: 'Visit Downtown District', reward: '10% off', completedDate: '1 week ago' },
  ];

  const personalizedTags = [
    { name: 'Women Entrepreneur', icon: Heart, count: 4 },
    { name: 'Pet-friendly', icon: Heart, count: 6 },
    { name: 'New Stores', icon: Sparkles, count: 8 },
    { name: 'Healthy Options', icon: Leaf, count: 5 },
  ];

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#009de0] to-[#141414] p-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl mb-1">Quests</h1>
            <p className="text-gray-300 text-sm">Explore and earn rewards</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span className="text-sm">5 coupons</span>
            </div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Your Progress</span>
            <span className="text-sm">Level 7</span>
          </div>
          <div className="h-3 bg-[#2a2a2a] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#009de0] to-[#00bfff] rounded-full" style={{ width: '65%' }} />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">650 XP</span>
            <span className="text-xs text-gray-500">1000 XP to Level 8</span>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Personalized Tags */}
        <div>
          <h2 className="text-xl mb-3">Your Interests</h2>
          <div className="flex flex-wrap gap-2">
            {personalizedTags.map((tag) => (
              <div
                key={tag.name}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-4 py-2 flex items-center space-x-2"
              >
                <tag.icon className="w-4 h-4 text-[#009de0]" />
                <span className="text-sm">{tag.name}</span>
                <span className="text-xs text-gray-500">({tag.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Quests */}
        <div>
          <h2 className="text-xl mb-3">Active Quests</h2>
          <div className="space-y-4">
            {activeQuests.map((quest) => {
              const Icon = quest.icon;
              return (
                <div key={quest.id} className="bg-[#1a1a1a] rounded-2xl p-5 border border-[#2a2a2a]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="bg-[#009de0]/20 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-[#009de0]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1">{quest.title}</h3>
                        <p className="text-sm text-gray-400">{quest.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span>{quest.progress}/{quest.total}</span>
                    </div>
                    <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#009de0] rounded-full transition-all"
                        style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Reward */}
                  <div className="bg-[#2a2a2a] rounded-lg p-3 mb-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-[#009de0]" />
                      <span className="text-sm">Reward:</span>
                    </div>
                    <span className="text-[#009de0] text-sm">{quest.reward}</span>
                  </div>

                  {/* Suggestions */}
                  <div>
                    <div className="text-xs text-gray-400 mb-2">AI-Suggested Places:</div>
                    <div className="space-y-2">
                      {quest.suggestions.map((place) => (
                        <button
                          key={place.name}
                          className="w-full bg-[#2a2a2a] rounded-lg p-3 flex items-center justify-between hover:bg-[#3a3a3a] transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-4 h-4 text-[#009de0]" />
                            <div className="text-left">
                              <div className="text-sm">{place.name}</div>
                              <div className="text-xs text-gray-500">{place.distance} away</div>
                            </div>
                          </div>
                          <span className="text-xs bg-[#009de0] text-white px-2 py-1 rounded">
                            {place.tag}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completed Quests */}
        <div>
          <h2 className="text-xl mb-3">Completed</h2>
          <div className="space-y-2">
            {completedQuests.map((quest) => (
              <div
                key={quest.id}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#009de0] rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm">{quest.title}</div>
                    <div className="text-xs text-gray-500">{quest.completedDate}</div>
                  </div>
                </div>
                <div className="text-xs bg-[#2a2a2a] px-3 py-1 rounded">
                  {quest.reward}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
