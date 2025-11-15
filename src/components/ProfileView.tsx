import { useState } from 'react';
import { Settings, Gift, AlertCircle, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';

export function ProfileView() {
  const [selectedTab, setSelectedTab] = useState<'ingredients' | 'preferences'>('ingredients');

  const allergicIngredients = [
    { name: 'Peanuts', confidence: 95, lastDetected: '3 orders ago' },
    { name: 'Shellfish', confidence: 88, lastDetected: '5 orders ago' },
  ];

  const avoidedIngredients = [
    { name: 'Cilantro', reason: 'You rarely order dishes with this', confidence: 72 },
    { name: 'Blue Cheese', reason: 'Removed from 4 orders', confidence: 85 },
  ];

  const preferredIngredients = [
    { name: 'Truffle', count: 12, emoji: '🍄' },
    { name: 'Avocado', count: 18, emoji: '🥑' },
    { name: 'Garlic', count: 22, emoji: '🧄' },
    { name: 'Basil', count: 15, emoji: '🌿' },
  ];

  const coupons = [
    { id: 1, code: 'WOLF15', discount: '15% off', restaurant: 'Any Restaurant', expires: '30 days', isUsed: false },
    { id: 2, code: 'TASTY10', discount: '$10 off', restaurant: 'Orders over $50', expires: '15 days', isUsed: false },
    { id: 3, code: 'QUEST25', discount: '$25 off', restaurant: 'Any Restaurant', expires: '45 days', isUsed: false },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#009de0] to-[#141414] p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
              🐺
            </div>
            <div>
              <div className="text-2xl mb-1">Wolf User</div>
              <div className="text-sm text-gray-300">Level 7 Explorer</div>
            </div>
          </div>
          <button className="p-2">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Stats */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#2a2a2a]">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">24</div>
              <div className="text-xs text-gray-400">Places</div>
            </div>
            <div className="text-center border-x border-[#2a2a2a]">
              <div className="text-2xl mb-1">8</div>
              <div className="text-xs text-gray-400">Quests Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">5</div>
              <div className="text-xs text-gray-400">Coupons</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Coupons Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl">Your Coupons</h2>
            <Gift className="w-5 h-5 text-[#009de0]" />
          </div>
          <div className="space-y-3">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">{coupon.restaurant}</div>
                    <div className="text-2xl text-[#009de0] mb-1">{coupon.discount}</div>
                    <div className="text-xs text-gray-500">Expires in {coupon.expires}</div>
                  </div>
                  <button className="bg-[#009de0] text-white px-4 py-2 rounded-lg text-sm">
                    Use Now
                  </button>
                </div>
                <div className="bg-[#2a2a2a] rounded-lg px-3 py-2 text-center">
                  <div className="text-xs text-gray-400 mb-1">Code</div>
                  <div className="font-mono tracking-wider">{coupon.code}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients Section */}
        <div>
          <h2 className="text-xl mb-3">AI Food Preferences</h2>
          
          {/* Tabs */}
          <div className="flex space-x-2 mb-4 bg-[#1a1a1a] p-1 rounded-lg">
            <button
              onClick={() => setSelectedTab('ingredients')}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                selectedTab === 'ingredients'
                  ? 'bg-[#009de0] text-white'
                  : 'text-gray-400'
              }`}
            >
              Preferences
            </button>
            <button
              onClick={() => setSelectedTab('preferences')}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                selectedTab === 'preferences'
                  ? 'bg-[#009de0] text-white'
                  : 'text-gray-400'
              }`}
            >
              Allergies
            </button>
          </div>

          {selectedTab === 'ingredients' ? (
            <div className="space-y-4">
              {/* Preferred Ingredients */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <ThumbsUp className="w-4 h-4 text-[#009de0]" />
                  <h3 className="text-sm">You Love These</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {preferredIngredients.map((ingredient) => (
                    <div
                      key={ingredient.name}
                      className="bg-[#2a2a2a] rounded-lg p-3 flex items-center space-x-2"
                    >
                      <span className="text-2xl">{ingredient.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{ingredient.name}</div>
                        <div className="text-xs text-gray-500">{ingredient.count} times</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avoided Ingredients */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <ThumbsDown className="w-4 h-4 text-gray-400" />
                  <h3 className="text-sm">You Avoid These</h3>
                </div>
                <div className="space-y-2">
                  {avoidedIngredients.map((ingredient) => (
                    <div
                      key={ingredient.name}
                      className="bg-[#2a2a2a] rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div>{ingredient.name}</div>
                        <div className="text-xs text-gray-500">{ingredient.confidence}% sure</div>
                      </div>
                      <div className="text-xs text-gray-400">{ingredient.reason}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#009de0]/10 border border-[#009de0]/20 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-[#009de0] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  AI predictions improve as you order more. You can manually adjust these preferences in settings.
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Allergic Ingredients */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <h3 className="text-sm">Detected Allergies</h3>
                </div>
                {allergicIngredients.length > 0 ? (
                  <div className="space-y-2">
                    {allergicIngredients.map((ingredient) => (
                      <div
                        key={ingredient.name}
                        className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span>{ingredient.name}</span>
                          </div>
                          <div className="text-xs text-gray-400">{ingredient.confidence}% confidence</div>
                        </div>
                        <div className="text-xs text-gray-400">
                          Last detected: {ingredient.lastDetected}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 text-center py-4">
                    No allergies detected yet
                  </div>
                )}
              </div>

              <button className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 flex items-center justify-between hover:bg-[#3a3a3a] transition-colors">
                <span>Manually Add Allergy</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <div className="bg-[#009de0]/10 border border-[#009de0]/20 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-[#009de0] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  AI analyzes your order history to identify potential allergens. Always verify ingredients with the restaurant for safety.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
