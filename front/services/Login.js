// Login.js
import React, { useState } from 'react';
import { signIn } from './services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para carregar a requisição
  const [error, setError] = useState(''); // Estado para armazenar erros

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    setError(''); // Limpar erros anteriores

    try {
      const user = await signIn(email, password);
      console.log('Usuário logado:', user);
      setIsLoading(false);
      // Aqui você pode redirecionar o usuário para outra página, se necessário
    } catch (error) {
      console.error('Erro no login:', error.message);
      setError('Erro ao fazer login. Verifique suas credenciais.');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignIn} disabled={isLoading}>
        {isLoading ? 'Carregando...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
