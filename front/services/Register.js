// Register.js
import React, { useState } from 'react';
import { signUp } from './services/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Para controlar o estado de carregamento
  const [error, setError] = useState('');  // Para mensagens de erro
  const [success, setSuccess] = useState('');  // Para mensagens de sucesso

  const handleSignUp = async () => {
    // Validação simples de campos
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const user = await signUp(email, password);
      console.log('Usuário registrado:', user);
      setSuccess('Usuário registrado com sucesso!');
    } catch (error) {
      console.error('Erro no registro:', error.message);
      setError('Erro ao registrar usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Registrar</h1>

      {/* Exibir mensagem de erro */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Exibir mensagem de sucesso */}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
    </div>
  );
};

export default Register;
