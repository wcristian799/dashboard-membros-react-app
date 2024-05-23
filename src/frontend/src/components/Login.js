import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Certifique-se de que o caminho está correto

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showIntro, setShowIntro] = useState(!localStorage.getItem('hasVisited'));
  const navigate = useNavigate();

  useEffect(() => {
    if (showIntro) {
      setTimeout(() => {
        setShowIntro(false);
        localStorage.setItem('hasVisited', 'true');
      }, 5000); // Ajuste conforme a duração do seu GIF
    }
  }, [showIntro]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://membros.tanayoupop.com.br/src/backend/Controllers/AuthController.php', {
        email: username,
        password: password
      });
      console.log('Response:', response);  // Log da resposta completa
  
      const { token, user } = response.data;
      if (user && user.role) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userId', user.id);
  
        if (user.role === 'ADMIN') {
          navigate('/dashboard');
        } else {
          navigate('/home');
        }
      } else {
        console.error('Erro: dados de usuário ou grupo ausentes na resposta', response.data);
        alert('Erro nos dados de usuário ou grupo. Verifique o console.');
      }
    } catch (error) {
      console.error('Falha no login:', error);
      console.error('Response in error:', error.response); // Log da resposta no erro
      alert('Falha no login! Verifique o console para mais detalhes.');
    }
  };
  

  if (showIntro) {
    return (
      <div className="intro-gif" style={{ backgroundImage: 'url(https://membros.tanayoupop.com.br/img/intro.gif)' }}>
        {/* Certifique-se que o GIF está otimizado e não é arrastável */}
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <video autoPlay loop muted style={{ position: 'relative', width: '100%', left: '50%', top: '50%', height: '100%', objectFit: 'cover', transform: 'translate(-50%, -50%)' }}>
          <source src="https://membros.tanayoupop.com.br/img/intro-bg.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
      </div>
      <div className="login-panel">
        <div className="login-box">
          <h1>Bem-vindo ao Sistema!</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email:</label>
              <input placeholder='Insira seu email' type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Senha:</label>
              <input placeholder='******' type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Entrar</button>
          </form>
          <div className="social-login">
            {/* Links ou botões de login social aqui */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
