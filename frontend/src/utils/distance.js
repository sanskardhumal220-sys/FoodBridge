// Calculates distance in km between two lat/lng points using Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
  
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return Number(d.toFixed(1));
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

/**
 * Ranks NGOs based on distance, capacity, and urgency.
 * @param {Array} ngos - List of NGO objects
 * @param {Object} donorLocation - {lat, lng}
 * @param {Number} donationSize - Estimated size/quantity of donation
 * @returns {Array} Sorted list of NGOs with calculated score and distance
 */
export const rankNGOs = (ngos, donorLocation, donationSize = 0) => {
  if (!donorLocation || !donorLocation.lat || !donorLocation.lng) {
    return ngos.map(ngo => ({ ...ngo, distance: null, score: 0 }));
  }

  const scoredNGOs = ngos.map(ngo => {
    const distance = calculateDistance(donorLocation.lat, donorLocation.lng, ngo.lat, ngo.lng);
    let score = 100; // Base score

    // Distance factor (closer is better, deduct points for distance)
    // -5 points for every km
    score -= (distance * 5);

    // Urgency factor
    if (ngo.urgency === 'High') score += 40;
    else if (ngo.urgency === 'Medium') score += 15;

    // Capacity factor
    if (donationSize > 0 && ngo.capacity < donationSize) {
      // Penalize heavily if they can't take the full donation, but don't strictly exclude
      score -= 50; 
    }

    return {
      ...ngo,
      distance,
      score: Math.max(0, Math.round(score))
    };
  });

  // Sort descending by score
  return scoredNGOs.sort((a, b) => b.score - a.score);
};
