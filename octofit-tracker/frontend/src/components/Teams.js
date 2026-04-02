import React, { useEffect, useState } from 'react';

const endpoint = 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Teams endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch teams: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams fetched data:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch((fetchError) => {
        console.error('Teams fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row g-3">
          {teams.map((team, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={team.id ?? index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-0">{team.name || 'Unnamed Team'}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
