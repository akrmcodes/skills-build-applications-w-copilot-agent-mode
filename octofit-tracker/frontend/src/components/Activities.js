import React, { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Activities endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch activities: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities fetched data:', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      })
      .catch((fetchError) => {
        console.error('Activities fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Activities</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row g-3">
          {activities.map((activity, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={activity.id ?? index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{activity.workout?.name || activity.workout?.id || 'Workout'}</h5>
                  <p className="card-text mb-1"><strong>User:</strong> {activity.user?.name || activity.user?.email || 'Unknown'}</p>
                  <p className="card-text mb-1"><strong>Date:</strong> {activity.date || 'N/A'}</p>
                  <p className="card-text mb-0"><strong>Duration:</strong> {activity.duration ?? 'N/A'} mins</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Activities;
