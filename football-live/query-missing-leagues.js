const fs = require('fs');
const path = require('path');

// Parse .env.local manually
function parseEnv(filePath) {
  const env = {};
  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match) {
      env[match[1]] = match[2];
    }
  }
  return env;
}

const env = parseEnv(path.join(__dirname, '.env.local'));
const API_KEY = env.API_FOOTBALL_KEY;
const API_URL = env.API_FOOTBALL_URL || 'https://v3.football.api-sports.io';

if (!API_KEY) {
  console.error('API_FOOTBALL_KEY not set in .env.local');
  process.exit(1);
}

async function fetchLeagues() {
  const url = `${API_URL}/leagues`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': API_KEY,
    },
  });
  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }
  const data = await response.json();
  return data.response || [];
}

(async () => {
  try {
    const leagues = await fetchLeagues();
    const targetCountries = ['Egypt', 'World', 'Europe', 'Kuwait', 'Tunisia', 'Bahrain', 'England', 'USA', 'Germany'];
    
    console.log('=== Leagues ===');
    for (const league of leagues) {
      const name = league.league.name;
      const country = league.country.name;
      const id = league.league.id;
      
      if (targetCountries.includes(country)) {
        // Output all leagues for these countries to find exactly what we need
        if (
            (country === 'Egypt' && name.includes('Cup')) || 
            (country === 'Europe' && name.includes('U17')) || 
            (country === 'World' && name.includes('U17')) || 
            (country === 'Kuwait' && name.includes('Premier League')) ||
            (country === 'Tunisia' && name.includes('2')) ||
            (country === 'Bahrain') ||
            (country === 'England' && name === 'League One') ||
            (country === 'USA' && name === 'Major League Soccer') ||
            (country === 'Germany' && name.includes('2.') || name.includes('Relegation')) ||
            (country === 'Germany' && name.includes('Bundesliga'))
        ) {
           console.log(`[${country}] ID=${id}, Name=${name}`);
        }
      }
    }
  } catch (e) {
    console.error('Error:', e);
  }
})();
