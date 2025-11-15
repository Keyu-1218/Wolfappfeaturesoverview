import { useState } from 'react';
import { MapPin, Navigation, Share2, Camera } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MapView() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const foodLocations = [
    { id: 1, name: 'Bella Italia', lat: 40.7580, lng: -73.9855, cuisine: 'Italian', photo: 'italian pasta dish', visited: true },
    { id: 2, name: 'Sushi Master', lat: 40.7614, lng: -73.9776, cuisine: 'Japanese', photo: 'sushi platter', visited: true },
    { id: 3, name: 'Green Bowl', lat: 40.7489, lng: -73.9680, cuisine: 'Healthy', photo: 'healthy salad bowl', visited: true },
    { id: 4, name: 'Taco Fiesta', lat: 40.7527, lng: -73.9772, cuisine: 'Mexican', photo: 'tacos', visited: false },
    { id: 5, name: 'Café Breeze', lat: 40.7558, lng: -73.9865, cuisine: 'Café', photo: 'coffee latte art', visited: false, tags: ['Pet-friendly'] },
    { id: 6, name: 'Spice Route', lat: 40.7505, lng: -73.9934, cuisine: 'Indian', photo: 'indian curry', visited: false, tags: ['Women Entrepreneur', 'New'] },
  ];

  const visitedLocations = foodLocations.filter(loc => loc.visited);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#1a1a1a] p-6 border-b border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Food Journey Map</h1>
          <button className="bg-[#009de0] text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm">
            <Share2 className="w-4 h-4" />
            <span>Share Journey</span>
          </button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <MapPin className="w-4 h-4 text-[#009de0]" />
          <span>{visitedLocations.length} places visited</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[400px] bg-[#1a1a1a]">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] opacity-50" />
        
        {/* Map Pins */}
        <div className="absolute inset-0">
          {foodLocations.map((location, index) => {
            // Simple positioning simulation
            const top = 20 + (index % 3) * 30;
            const left = 15 + Math.floor(index / 3) * 35;
            
            return (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  location.visited ? 'text-[#009de0]' : 'text-gray-500'
                }`}
                style={{ top: `${top}%`, left: `${left}%` }}
              >
                <MapPin className="w-8 h-8" fill={location.visited ? '#009de0' : 'none'} />
                {location.tags?.includes('New') && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </button>
            );
          })}
          
          {/* Path connecting visited locations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 15% 20% Q 30% 25% 15% 50% T 50% 35%"
              stroke="#009de0"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Current Location Button */}
        <button className="absolute bottom-4 right-4 bg-white text-[#141414] p-3 rounded-full shadow-lg">
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      {/* Food Photos Grid */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Your Food Footprint</h2>
          <button className="text-[#009de0] text-sm flex items-center space-x-1">
            <Camera className="w-4 h-4" />
            <span>Add Photo</span>
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {visitedLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location.id)}
              className="relative aspect-square rounded-lg overflow-hidden bg-[#2a2a2a] group"
            >
              <ImageWithFallback
                src={`https://source.unsplash.com/400x400/?${location.photo}`}
                alt={location.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <div className="text-xs">{location.name}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Location Details Modal */}
        {selectedLocation && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-end" onClick={() => setSelectedLocation(null)}>
            <div className="bg-[#1a1a1a] w-full rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
              {(() => {
                const location = foodLocations.find(loc => loc.id === selectedLocation);
                if (!location) return null;
                
                return (
                  <>
                    <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4" />
                    <div className="mb-4">
                      <h3 className="text-xl mb-2">{location.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className="bg-[#009de0] text-white px-2 py-1 rounded text-xs">
                          {location.cuisine}
                        </span>
                        {location.tags?.map(tag => (
                          <span key={tag} className="bg-[#2a2a2a] px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {location.visited && (
                      <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-[#2a2a2a]">
                        <ImageWithFallback
                          src={`https://source.unsplash.com/800x600/?${location.photo}`}
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-[#009de0] text-white py-3 rounded-lg flex items-center justify-center space-x-2">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <button className="flex-1 bg-[#2a2a2a] py-3 rounded-lg">
                        View Details
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
