import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA3SD1WjvUmqPTa66-fpKz7gmolr2iy0CQ',
  authDomain: 'whatsapp-clone-b01d2.firebaseapp.com',
  projectId: 'whatsapp-clone-b01d2',
  storageBucket: 'whatsapp-clone-b01d2.appspot.com',
  messagingSenderId: '499999005954',
  appId: '1:499999005954:web:4542cad6f6b7573e22761b',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();

export const auth = getAuth();
export const db = getFirestore();
// export const db = initializeFirestore(firebaseApp, {
//   experimentalForceLongPolling: true,
//   useFetchStreams: false,
// });
