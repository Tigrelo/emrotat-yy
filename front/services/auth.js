// services/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Inicializar a autenticação
const auth = getAuth();

// Função para registrar usuário
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Sucesso no registro
      const user = userCredential.user;
      console.log('Usuário registrado:', user);
      return user;
    })
    .catch((error) => {
      // Tratar erros com base no código do erro
      let errorMessage = 'Erro desconhecido';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este e-mail já está em uso.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'O e-mail fornecido é inválido.';
          break;
        case 'auth/weak-password':
          errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
          break;
        default:
          errorMessage = error.message;
      }
      console.error('Erro ao registrar usuário:', errorMessage);
      throw new Error(errorMessage);
    });
};

// Função para fazer login
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Sucesso no login
      const user = userCredential.user;
      console.log('Usuário logado:', user);
      return user;
    })
    .catch((error) => {
      // Tratar erros com base no código do erro
      let errorMessage = 'Erro desconhecido';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuário não encontrado.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Senha incorreta.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'O e-mail fornecido é inválido.';
          break;
        default:
          errorMessage = error.message;
      }
      console.error('Erro ao fazer login:', errorMessage);
      throw new Error(errorMessage);
    });
};
