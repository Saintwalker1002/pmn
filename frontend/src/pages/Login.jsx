import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // simula login
    navigate('/home');
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;
