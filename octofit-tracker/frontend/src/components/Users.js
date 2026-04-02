import React, { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Users endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users fetched data:', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch((fetchError) => {
        console.error('Users fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Users</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row g-3">
          {users.map((user, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={user.id ?? index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-1">{user.name || 'Unnamed User'}</h5>
                  <p className="card-text mb-1"><strong>Email:</strong> {user.email || 'N/A'}</p>
                  <p className="card-text mb-0"><strong>Team:</strong> {user.team?.name || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
