import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [desiredCode, setDesiredCode] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCopied(false);
    setShortUrl('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shorten`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isCustom ? { url, code: desiredCode } : { url }),
      });

      const responseJson: { shortCode?: string; message?: string[] | string } =
        await response.json();
      if (response.status !== 200 && responseJson.message) {
        return setError(
          (Array.isArray(responseJson.message)
            ? responseJson.message
            : [responseJson.message]
          ).join(', ')
        );
      }

      setShortUrl(
        `${process.env.REACT_APP_API_URL}/short/${responseJson.shortCode}`
      );
      setError('');
    } catch (err: unknown) {
      setError(
        (err as { message?: string })?.message ?? 'Error during backend call'
      );
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <p>Do you want to use custom code?</p>
          <input type="checkbox" onChange={(e) => setIsCustom(!isCustom)} />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        {isCustom && (
          <input
            type="tex†"
            value={desiredCode}
            onChange={(e) => setDesiredCode(e.target.value)}
            placeholder="Enter desired code"
            required
          />
        )}
        <button type="submit" disabled={!url || (isCustom && !desiredCode)}>
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div>
          <p>
            Short URL: <a href={shortUrl}>{shortUrl}</a>
          </p>
          {isCopied ? (
            <p style={{ color: 'green' }}>Copied</p>
          ) : (
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(shortUrl).then(() => {
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 3000);
                })
              }
            >
              Copy
            </button>
          )}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
