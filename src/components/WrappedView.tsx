import { useState } from 'react';
import { Share2, TrendingUp, MapPin, Heart, Award, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function WrappedView() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const wrappedData = {
    year: 2025,
    totalVisits: 24,
    totalDishes: 156,
    topCuisine: 'Italian',
    favoritePlace: 'Bella Italia',
    newDiscoveries: 12,
    questsCompleted: 8,
    totalSpent: 1247,
    mostVisitedNeighborhood: 'Downtown',
    topDishes: [
      { name: 'Truffle Pasta', restaurant: 'Bella Italia', image: 'truffle pasta' },
      { name: 'Dragon Roll', restaurant: 'Sushi Master', image: 'sushi roll' },
      { name: 'Avocado Toast', restaurant: 'Green Bowl', image: 'avocado toast' },
    ],
  };

  const slides = [
    {
      id: 1,
      title: 'Your 2025',
      subtitle: 'Food Wrapped 🐺',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-2">{wrappedData.totalVisits}</div>
            <div className="text-xl text-gray-300">Places Visited</div>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-2">{wrappedData.totalDishes}</div>
            <div className="text-xl text-gray-300">Dishes Tried</div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Top Cuisine',
      subtitle: 'Your Favorite Flavor',
      content: (
        <div className="text-center space-y-6">
          <div className="text-7xl mb-4">🍝</div>
          <div>
            <div className="text-5xl mb-2">{wrappedData.topCuisine}</div>
            <div className="text-xl text-gray-300">was your #1 choice</div>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a]">
            <div className="text-sm text-gray-400">Visited</div>
            <div className="text-3xl text-[#009de0]">8 times</div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Favorite Spot',
      subtitle: 'You Loved This Place',
      content: (
        <div className="space-y-6">
          <div className="aspect-video rounded-2xl overflow-hidden bg-[#2a2a2a]">
            <ImageWithFallback
              src="https://source.unsplash.com/800x600/?italian restaurant interior"
              alt="Bella Italia"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">{wrappedData.favoritePlace}</div>
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{wrappedData.mostVisitedNeighborhood}</span>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] text-center">
            <div className="text-sm text-gray-400">You visited</div>
            <div className="text-3xl text-[#009de0]">6 times</div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Top Dishes',
      subtitle: 'Your Most Loved',
      content: (
        <div className="space-y-3">
          {wrappedData.topDishes.map((dish, index) => (
            <div
              key={dish.name}
              className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] flex items-center space-x-4"
            >
              <div className="text-3xl">{index + 1}</div>
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                <ImageWithFallback
                  src={`https://source.unsplash.com/400x400/?${dish.image}`}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="mb-1">{dish.name}</div>
                <div className="text-sm text-gray-400">{dish.restaurant}</div>
              </div>
              <Heart className="w-5 h-5 text-[#009de0] fill-[#009de0]" />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 5,
      title: 'Explorer Status',
      subtitle: 'Your Achievements',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <div className="text-3xl mb-2">Food Explorer</div>
            <div className="text-gray-400">Level 7</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-[#009de0]" />
              <div className="text-2xl mb-1">{wrappedData.questsCompleted}</div>
              <div className="text-xs text-gray-400">Quests Done</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-[#009de0]" />
              <div className="text-2xl mb-1">{wrappedData.newDiscoveries}</div>
              <div className="text-xs text-gray-400">New Places</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: 'Share Your Journey',
      subtitle: 'Let others see your food story',
      content: (
        <div className="space-y-6 text-center">
          <div className="text-7xl mb-4">✨</div>
          <div>
            <div className="text-2xl mb-2">You had an amazing food year!</div>
            <div className="text-gray-400">Share your Wolf Wrapped with friends</div>
          </div>
          <button className="w-full bg-[#009de0] text-white py-4 rounded-xl flex items-center justify-center space-x-2 text-lg">
            <Share2 className="w-5 h-5" />
            <span>Share to Social Media</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#009de0] to-[#141414]">
      <div className="p-6 flex flex-col min-h-screen">
        {/* Progress Indicators */}
        <div className="flex space-x-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  index <= currentSlide ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Current Slide */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-4xl mb-2">{slides[currentSlide].title}</h1>
            <p className="text-xl text-gray-300">{slides[currentSlide].subtitle}</p>
          </div>

          <div className="bg-[#1a1a1a]/50 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="px-6 py-3 bg-white/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <div className="text-sm text-gray-400">
            {currentSlide + 1} / {slides.length}
          </div>
          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-6 py-3 bg-white text-[#141414] rounded-xl flex items-center space-x-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
