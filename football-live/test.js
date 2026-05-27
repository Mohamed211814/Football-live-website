require('dotenv').config({path: '.env.local'});
const k = process.env.NEWS_API_KEY;
fetch(`https://newsapi.org/v2/everything?q=football&apiKey=${k}`, {
  headers: {
    'User-Agent': 'Kooraza/1.0'
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
