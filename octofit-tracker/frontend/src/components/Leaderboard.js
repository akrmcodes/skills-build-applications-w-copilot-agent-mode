import React, { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Leaderboard endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard fetched data:', data);
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
      })
      .catch((fetchError) => {
        console.error('Leaderboard fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="list-group">
          {leaderboard.map((entry, index) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry.id ?? index}>
              <span>{entry.user?.name || entry.user?.email || 'Unknown User'}</span>
              <span className="badge bg-primary rounded-pill">{entry.points ?? 0} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
