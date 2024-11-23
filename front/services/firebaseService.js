// services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4dcfFb5YZaaQfBqMUL0CNARlqeilSQSk",
  authDomain: "emrota-5d61c.firebaseapp.com",
  databaseURL: "https://emrota-5d61c-default-rtdb.firebaseio.com",
  projectId: "emrota-5d61c",
  storageBucket: "emrota-5d61c.firebasestorage.app",
  messagingSenderId: "939554999845",
  appId: "1:939554999845:web:b71224afd1f0d62de579cc",
  measurementId: "G-BQMLV7FFDX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obter instâncias do Firebase
const auth = getAuth(app);
const db = getDatabase(app);

// Função para adicionar dados ao Realtime Database
const addDataToRealtimeDB = (path, data) => {
  set(ref(db, path), data)
    .then(() => {
      console.log('Dados adicionados com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao adicionar dados:', error.message);
    });
};

// Função para obter dados do Realtime Database
const getDataFromRealtimeDB = async (path) => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      console.log('Dados obtidos:', snapshot.val());
    } else {
      console.log('Nenhum dado disponível.');
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error.message);
  }
};

// Função para registrar usuário com validação
const registerUser = async (email, password) => {
  if (!email || !password) {
    console.error('Email e senha são obrigatórios!');
    return;
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Usuário registrado:', user);
  } catch (error) {
    let errorMessage = 'Erro desconhecido.';
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
  }
};

// Função para fazer login de usuário com validação
const loginUser = async (email, password) => {
  if (!email || !password) {
    console.error('Email e senha são obrigatórios!');
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Usuário logado:', user);
  } catch (error) {
    let errorMessage = 'Erro desconhecido.';
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Usuário não encontrado.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Senha incorreta.';
        break;
      default:
        errorMessage = error.message;
    }
    console.error('Erro ao fazer login:', errorMessage);
  }
};

export { auth, db, addDataToRealtimeDB, getDataFromRealtimeDB, registerUser, loginUser };
