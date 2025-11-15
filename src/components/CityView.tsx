import { useEffect, useState } from "react";
import {
  MapPin,
  Coffee,
  UtensilsCrossed,
  ShoppingBag,
  Camera,
  Share2,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Heart,
  Leaf,
  TrendingUp,
  Filter,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { fetchFoodLocations } from "../services/locations";
import { FoodLocation, PlaceType } from "../types";

export function CityView() {
  const [selectedLocation, setSelectedLocation] = useState<
    number | null
  >(null);
  const [showWrapped, setShowWrapped] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [expandedSection, setExpandedSection] = useState<
    "photos" | "quests" | null
  >("photos");
  const [highlightedQuestId, setHighlightedQuestId] = useState<
    number | null
  >(null);
  const [selectedTypes, setSelectedTypes] = useState<
    PlaceType[]
  >(["restaurant", "cafe", "bar", "store"]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const cityName = "New York";

  // fetching restaurants
  const [foodLocations, setLocations] = useState<FoodLocation[]>([]);
  const userId = 1;  // or get from auth

  useEffect(() => {
    fetchFoodLocations(userId, 1.0, 1.0, 5.0)
      .then(setLocations)
      .catch(err => console.error(err));
  }, []);


  const activeQuests = [
    {
      id: 1,
      title: "Try a Women-Owned Business",
      progress: 0,
      total: 1,
      reward: "15% off",
      targetLocations: [1],
    },
    {
      id: 2,
      title: "Visit 3 Pet-Friendly Cafes",
      progress: 1,
      total: 3,
      reward: "$10 coupon",
      targetLocations: [2],
    },
  ];

  const visitedLocations = foodLocations.filter(
    (loc) => loc.visited,
  );

  // Get quest target locations to show on map
  const questTargetLocations = highlightedQuestId
    ? foodLocations.filter((loc) =>
        activeQuests
          .find((q) => q.id === highlightedQuestId)
          ?.targetLocations.includes(loc.id),
      )
    : [];

  // Combine visited locations with quest targets for display
  const displayedLocations = [
    // ...visitedLocations.filter((loc) =>
    //   selectedTypes.includes(loc.type),
    // ),
    // ...questTargetLocations.filter(
    //   (loc) => !loc.visited && selectedTypes.includes(loc.type),
    // ),
    ...foodLocations
  ];

  const toggleType = (type: PlaceType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const getTypeIcon = (type: PlaceType) => {
    switch (type) {
      case "cafe":
        return Coffee;
      case "restaurant":
        return UtensilsCrossed;
      case "bar":
        return UtensilsCrossed;
      case "store":
        return ShoppingBag;
      default:
        return MapPin;
    }
  };

  const wrappedStats = {
    totalVisits: visitedLocations.length,
    topPlace: visitedLocations.sort(
      (a, b) => (b.visitCount || 0) - (a.visitCount || 0),
    )[0],
    totalPhotos: 24,
  };

  const highlightedLocations = highlightedQuestId
    ? activeQuests.find((q) => q.id === highlightedQuestId)
        ?.targetLocations || []
    : [];

  return (
    <div className="min-h-screen relative bg-white">
      {/* Keyframe animation for breathing effect */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.3; }
        }
      `}</style>

      {/* City Name Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-white to-transparent p-6 pb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-[#141414]">
              {cityName}
            </h1>
            <div className="text-sm text-gray-600 flex items-center space-x-1 mt-1">
              <MapPin className="w-3 h-3" />
              <span>
                {visitedLocations.length} places visited
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowWrapped(true)}
            className="bg-[#009de0] text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>Wrapped</span>
          </button>
        </div>
      </div>

      {/* Map View */}
      <div className="relative h-[65vh] bg-gray-100">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
          {/* Grid lines to simulate map */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full border-t border-gray-400"
                style={{ top: `${i * 12.5}%` }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full border-l border-gray-400"
                style={{ left: `${i * 12.5}%` }}
              />
            ))}
          </div>
        </div>

        {/* Map Pins */}
        <div className="absolute inset-0">
          {displayedLocations.map((location, index) => {
            const Icon = getTypeIcon(location.type);
            const top = 35 + (index % 4) * 18;
            const left = 15 + Math.floor(index / 4) * 30;
            const isQuestTarget = questTargetLocations.some(
              (q) => q.id === location.id,
            );

            return (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${top}%`, left: `${left}%` }}
              >
                <div className="relative">
                  {/* Breathing yellow circle for quest targets */}
                  {isQuestTarget && (
                    <>
                      <div
                        className="absolute w-16 h-16 border-4 border-yellow-400 rounded-full"
                        style={{
                          animation:
                            "breathe 2s ease-in-out infinite",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                      <div
                        className="absolute w-16 h-16 border-4 border-yellow-400 rounded-full"
                        style={{
                          animation:
                            "breathe 2s ease-in-out infinite 1s",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </>
                  )}

                  {/* Pin icon with type icon inside */}
                  <div
                    className={`relative w-10 h-10 ${location.visited ? "bg-[#009de0]" : "bg-gray-400"} rounded-full border-2 border-white shadow-lg flex items-center justify-center z-10`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Visit count */}
                  {location.visited &&
                    location.visitCount &&
                    location.visitCount > 1 && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-[#141414] border border-gray-300 rounded-full flex items-center justify-center text-xs font-bold shadow z-10">
                        {location.visitCount}
                      </div>
                    )}
                </div>
              </button>
            );
          })}

          {/* Path connecting visited locations */}
          {/* <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 15 25 L 45 25 L 45 43 L 15 61 L 15 79"
              stroke="#009de0"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              opacity="0.4"
            />
          </svg> */}
        </div>

        {/* Filter Panel - Expanded by default */}
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-3 w-40">
            <div className="text-xs text-gray-500 mb-2 px-2 flex items-center space-x-1">
              <Filter className="w-3 h-3" />
              <span>Filter</span>
            </div>
            <div className="space-y-1">
              {[
                {
                  type: "restaurant" as PlaceType,
                  icon: UtensilsCrossed,
                  label: "Restaurants",
                },
                {
                  type: "cafe" as PlaceType,
                  icon: Coffee,
                  label: "Cafés",
                },
                {
                  type: "bar" as PlaceType,
                  icon: UtensilsCrossed,
                  label: "Bars",
                },
                {
                  type: "store" as PlaceType,
                  icon: ShoppingBag,
                  label: "Stores",
                },
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    selectedTypes.includes(type)
                      ? "bg-[#009de0] text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Share Button */}
        <button className="absolute bottom-4 right-4 bg-[#009de0] text-white p-4 rounded-full shadow-lg">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Sheet Content */}
      <div className="bg-white rounded-t-3xl -mt-8 relative z-10 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />

        {/* Food Photos Section */}
        <div className="px-6 mb-4">
          <button
            onClick={() =>
              setExpandedSection(
                expandedSection === "photos" ? null : "photos",
              )
            }
            className="w-full flex items-center justify-between mb-3"
          >
            <div className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-[#009de0]" />
              <h2 className="text-xl text-[#141414]">
                Food Journey ({visitedLocations.length})
              </h2>
            </div>
            {expandedSection === "photos" ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {expandedSection === "photos" && (
            <div className="grid grid-cols-3 gap-2">
              {visitedLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() =>
                    setSelectedLocation(location.id)
                  }
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 group"
                >
                  <ImageWithFallback
                    src={`https://source.unsplash.com/400x400/?${location.photo}`}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                    <div className="text-xs truncate w-full text-white">
                      {location.name}
                    </div>
                  </div>
                  {location.visitCount &&
                    location.visitCount > 1 && (
                      <div className="absolute top-2 right-2 bg-[#009de0] text-white text-xs px-2 py-0.5 rounded-full">
                        {location.visitCount}x
                      </div>
                    )}
                </button>
              ))}
              <button className="aspect-square rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center space-y-1">
                <Camera className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500">
                  Add Photo
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Quests Section */}
        <div className="px-6">
          <button
            onClick={() =>
              setExpandedSection(
                expandedSection === "quests" ? null : "quests",
              )
            }
            className="w-full flex items-center justify-between mb-3"
          >
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-[#009de0]" />
              <h2 className="text-xl text-[#141414]">
                Active Quests ({activeQuests.length})
              </h2>
            </div>
            {expandedSection === "quests" ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {expandedSection === "quests" && (
            <div className="space-y-3">
              {activeQuests.map((quest) => {
                return (
                  <div
                    key={quest.id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="mb-1 text-[#141414]">
                          {quest.title}
                        </h3>
                        <div className="text-xs text-[#009de0]">
                          🎁 {quest.reward}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {quest.progress}/{quest.total}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-[#009de0] rounded-full transition-all"
                        style={{
                          width: `${(quest.progress / quest.total) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Show in Map Button */}
                    <button
                      onClick={() => {
                        setHighlightedQuestId(
                          highlightedQuestId === quest.id
                            ? null
                            : quest.id,
                        );
                        setExpandedSection(null);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className={`w-full py-2 px-4 rounded-lg text-sm transition-colors ${
                        highlightedQuestId === quest.id
                          ? "bg-[#009de0] text-white"
                          : "bg-white text-[#009de0] border border-[#009de0]"
                      }`}
                    >
                      {highlightedQuestId === quest.id
                        ? "Hide on Map"
                        : "Show Qualified Places on Map"}
                    </button>
                  </div>
                );
              })}

              {/* Explore New Quest Button */}
              <button className="w-full bg-[#009de0] text-white py-4 rounded-xl flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Explore for New Quest</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Location Details Modal */}
      {selectedLocation && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end"
          onClick={() => setSelectedLocation(null)}
        >
          <div
            className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const location = foodLocations.find(
                (loc) => loc.id === selectedLocation,
              );
              if (!location) return null;
              const Icon = getTypeIcon(location.type);

              return (
                <>
                  <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

                  {location.visited && (
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-200">
                      <ImageWithFallback
                        src={`https://source.unsplash.com/800x600/?${location.photo}`}
                        alt={location.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl text-[#141414]">
                        {location.name}
                      </h3>
                      {location.visitCount && (
                        <div className="bg-[#009de0] text-white px-3 py-1 rounded-full text-sm">
                          {location.visitCount} visits
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 flex-wrap gap-2">
                      <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">
                        <Icon className="w-4 h-4 text-[#009de0]" />
                        <span className="capitalize">
                          {location.type}
                        </span>
                      </div>
                      {location.cuisine && (
                        <span className="bg-[#009de0] text-white px-2 py-1 rounded text-sm">
                          {location.cuisine}
                        </span>
                      )}
                      {location.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-[#009de0] text-white py-3 rounded-xl flex items-center justify-center space-x-2">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    {!location.visited && (
                      <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl">
                        Mark as Visited
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Wrapped Modal */}
      {showWrapped && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#009de0] to-[#141414] z-50 overflow-y-auto">
          <div className="min-h-screen p-6 flex flex-col">
            <button
              onClick={() => setShowWrapped(false)}
              className="self-end text-white mb-4"
            >
              ✕ Close
            </button>

            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl mb-2 text-white">
                  Your {cityName}
                </h1>
                <p className="text-2xl text-gray-200">
                  Food Wrapped 🐺
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl space-y-6">
                <div className="text-center">
                  <div className="text-7xl mb-2 text-[#141414]">
                    {wrappedStats.totalVisits}
                  </div>
                  <div className="text-xl text-gray-600">
                    Places Explored
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">
                    Your favorite spot
                  </div>
                  <div className="text-3xl mb-2 text-[#141414]">
                    {wrappedStats.topPlace?.name}
                  </div>
                  <div className="text-[#009de0]">
                    {wrappedStats.topPlace?.visitCount} visits
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-gray-50 rounded-xl p-4">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-[#009de0]" />
                    <div className="text-2xl mb-1 text-[#141414]">
                      {wrappedStats.totalPhotos}
                    </div>
                    <div className="text-xs text-gray-600">
                      Food Photos
                    </div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-xl p-4">
                    <Award className="w-8 h-8 mx-auto mb-2 text-[#009de0]" />
                    <div className="text-2xl mb-1 text-[#141414]">
                      8
                    </div>
                    <div className="text-xs text-gray-600">
                      Quests Done
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white text-[#141414] py-4 rounded-xl flex items-center justify-center space-x-2 text-lg shadow-lg">
                <Share2 className="w-5 h-5" />
                <span>Share to Social Media</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}