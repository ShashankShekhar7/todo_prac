import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TodoList from './components/Todo/TodoList';
import PrivateRoute from './components/Layout/PrivateRoute';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="App">
        {showRegister ? (
          <Register onToggle={() => setShowRegister(false)} />
        ) : (
          <Login onToggle={() => setShowRegister(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <PrivateRoute>
        <TodoList />
      </PrivateRoute>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
