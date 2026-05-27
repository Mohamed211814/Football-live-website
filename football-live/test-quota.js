require('dotenv').config({path: '.env.local'});
const k = process.env.API_FOOTBALL_KEY;
const u = process.env.API_FOOTBALL_URL;
fetch(`${u}/status`, {
  headers: {
    'x-apisports-key': k
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
