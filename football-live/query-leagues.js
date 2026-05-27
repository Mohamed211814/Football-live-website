const fs = require('fs');
const path = require('path');

// Load env variables manually
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^(\w+)=\s*"?([^"\r]+)"?$/);
  if (match) env[match[1]] = match[2];
});

const API_KEY = env.API_FOOTBALL_KEY;
const BASE_URL = env.API_FOOTBALL_URL;

const targetCountries = ['Saudi Arabia', 'Qatar'];

async function fetchLeaguesByCountry(country) {
  const res = await fetch(`${BASE_URL}/leagues?country=${encodeURIComponent(country)}`, {
    headers: { 'x-apisports-key': API_KEY }
  });
  const data = await res.json();
  return data.response || [];
}

async function main() {
  for (const country of targetCountries) {
    const leagues = await fetchLeaguesByCountry(country);
    console.log(`=== ${country} Leagues ===`);
    leagues.forEach(l => {
      console.log(`${l.league.id}: ${l.league.name}`);
    });
  }
}

main();
