// Lower Mainland cities eligible for free local shipping
export const LOWER_MAINLAND_CITIES = [
  // Zone 1
  'burnaby',
  'vancouver',
  
  // Zone 2
  'new westminster',
  'north vancouver',
  'richmond',
  
  // Zone 3
  'coquitlam',
  'port coquitlam',
  'port moody',
  'delta',
  'surrey',
  'west vancouver',
  
  // Zone 4
  'anmore',
  'belcarra',
  'pitt meadows',
  'tsawwassen',
  'ladner',
  'white rock',
  
  // Zone 5
  'aldergrove',
  'langley',
  'maple ridge',
];

/**
 * Validates if a city is in the Lower Mainland for free shipping eligibility
 * @param {string} city - The city name to validate
 * @returns {boolean} - True if city is eligible for free shipping
 */
export function isLowerMainlandCity(city) {
  if (!city || typeof city !== 'string') return false;
  
  const normalizedCity = city.trim().toLowerCase();
  
  // Check exact matches
  if (LOWER_MAINLAND_CITIES.includes(normalizedCity)) {
    return true;
  }
  
  // Check if the input contains any of the valid cities
  // This handles cases like "North Vancouver, BC" or "Vancouver, British Columbia"
  return LOWER_MAINLAND_CITIES.some(validCity => 
    normalizedCity.includes(validCity)
  );
}

/**
 * Get formatted list of cities by zone
 */
export function getLowerMainlandCitiesByZone() {
  return {
    zone1: ['Burnaby', 'Vancouver'],
    zone2: ['New Westminster', 'North Vancouver', 'Richmond'],
    zone3: ['Coquitlam', 'Port Coquitlam', 'Port Moody', 'Delta', 'Surrey', 'West Vancouver'],
    zone4: ['Anmore', 'Belcarra', 'Pitt Meadows', 'Tsawwassen/Ladner', 'White Rock'],
    zone5: ['Aldergrove', 'Langley', 'Maple Ridge'],
  };
}

/**
 * Get flat list of all eligible cities (formatted for display)
 */
export function getAllLowerMainlandCities() {
  return [
    'Aldergrove',
    'Anmore',
    'Belcarra',
    'Burnaby',
    'Coquitlam',
    'Delta',
    'Langley',
    'Maple Ridge',
    'New Westminster',
    'North Vancouver',
    'Pitt Meadows',
    'Port Coquitlam',
    'Port Moody',
    'Richmond',
    'Surrey',
    'Tsawwassen/Ladner',
    'Vancouver',
    'West Vancouver',
    'White Rock',
  ];
}

