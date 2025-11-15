import { API_BASE } from "../lib/api";
import { Recommendation, Restaurant, FoodLocation } from "../types";

export async function fetchFoodLocations(
  userId: number,
  lat: number,
  lon: number,
  radiusKm: number
): Promise<FoodLocation[]> {
  // 1. Fetch recommendations
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    radius_km: "5",
  });
  const recRes = await fetch(`${API_BASE}/users/${userId}/recommendations?${params}`);
  if (!recRes.ok) throw new Error("Failed to fetch recommendations");

  const recommendations: Recommendation[] = await recRes.json();

  // 2. Fetch restaurant details for each dish
  const locations: FoodLocation[] = await Promise.all(
    recommendations.map(async (rec) => {
      const { dish, score } = rec;

      const restRes = await fetch(`${API_BASE}/restaurants/${dish.restaurant_id}`);
      if (!restRes.ok) throw new Error("Failed to fetch restaurant");

      const restaurant: Restaurant = await restRes.json();

      // 3. Convert to FoodLocation
      const location: FoodLocation = {
        id: restaurant.id,
        name: restaurant.name,
        type: "restaurant",
        lat: restaurant.lat,
        lng: restaurant.lon,
        photo: "./assets/placeholder.png",      // or generate from your design
        visited: false,
        tags: [],
        cuisine: undefined,
        visitCount: undefined,
      };

      return location;
    })
  );

  const uniqueLocations = Array.from(
    new Map(locations.map(loc => [loc.id, loc])).values()
  );

  console.log("restaurants: ", uniqueLocations);

  return uniqueLocations;
}
