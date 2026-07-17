// Nominatim (OpenStreetMap) geocoding service
export async function searchLocation(query) {
    const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    limit: "1",
  });

  const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
  if (!res.ok) throw new Error(`Geocode search failed (${res.status})`);

  const results = await res.json();
  if (results.length === 0) return null;

  return {
    lat: parseFloat(results[0].lat),
    lon: parseFloat(results[0].lon),
    label: results[0].display_name,
  };
}