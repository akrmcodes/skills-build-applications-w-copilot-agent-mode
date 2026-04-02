import React, { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Workouts endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch workouts: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Workouts fetched data:', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      })
      .catch((fetchError) => {
        console.error('Workouts fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Workouts</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row g-3">
          {workouts.map((workout, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={workout.id ?? index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{workout.name || 'Unnamed Workout'}</h5>
                  <p className="card-text mb-0">{workout.description || 'No description available.'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
