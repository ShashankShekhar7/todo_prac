import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: '1rem', backgroundColor: '#f5f5f5', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Todo App</h1>
        {user && (
          <div>
            <span>Welcome, {user.name}!</span>
            <button 
              onClick={logout}
              style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
