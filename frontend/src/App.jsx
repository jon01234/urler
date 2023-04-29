import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
    
  const SHORTEN_API_URL = "http://localhost:3000/api/url/shorten";

  const getData = () => {
   fetch(SHORTEN_API_URL, {
        method: "POST",
        headers: { "CONTENT-TYPE": "application/json" },
        body: JSON.stringify({ longUrl: url }),
    })
      .then(r => r.json())
      .then(data => setShortUrl(
          { 
            longUrl: data.longUrl, 
            shortUrl: data.shortUrl,
            urlCode: data.urlCode,
            clicks: data.clicks,
            date: data.date,
          }
      ));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    getData();
  };

  const openShortUrl = async (e) => {
    e.preventDefault();
    window.open(e.target.href);
    getData();
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Urler</h1>
        <p>For shorter urls and no struggle</p>
      </div>
      {shortUrl? 
          <div className="urlResponse">
            <pre>{JSON.stringify(shortUrl, null, 2)}</pre>
            <a href={shortUrl.shortUrl} onClick={openShortUrl}>{shortUrl.shortUrl}</a> 
          </div> 
        : 
      <form onSubmit={onSubmit}>
        <input 
          type="url" 
          name="url" 
          id="url" 
          placeholder="http://example.com" 
          onChange={e => setUrl(e.target.value)} 
          value = {url} />
        <button type="submit">Get stats</button>
      </form>}
    </div>
  );
}

export default App;
