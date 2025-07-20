import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useMenu } from '../context/MenuContext'; // Removido pois não existe mais

const AdminLogin = () => {
  // Adapte aqui se usava useMenu, senão apenas remova o import
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    // Lógica de autenticação local ou via Firebase
    if (username === 'admin' && password === 'hotdog123') {
      localStorage.setItem('hotdog_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Usuário ou senha inválidos');
    }
  }

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Login do Administrador</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      /><br/>
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      /><br/>
      <button type="submit">Entrar</button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </form>
  );
};

export default AdminLogin;