import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDEhDh9BubR4Bvm9cIg21mbcMII8e11Kzk",
  authDomain: "neptune-dccde.firebaseapp.com",
  projectId: "neptune-dccde",
  storageBucket: "neptune-dccde.firebasestorage.app",
  messagingSenderId: "526392158029",
  appId: "1:526392158029:web:91b7b4ba4732ad0e78f904",
  measurementId: "G-0PWS0THCM8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;