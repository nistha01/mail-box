import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";




const firebaseConfig = {
    apiKey: "AIzaSyDCfkrx8bQrchJe5LP4XYkkRbMqqgM7d_Q",
    authDomain: "email-client-33c5b.firebaseapp.com",
    projectId: "email-client-33c5b",
    storageBucket: "email-client-33c5b.firebasestorage.app",
    messagingSenderId: "441465302187",
    appId: "1:441465302187:web:6640c6d187daeed3cedbee",
    measurementId: "G-H6ZDPHTBKP"
  };


  const app = initializeApp(firebaseConfig);

// Initialize Analytics
export const analytics = getAnalytics(app);

// Initialize Authentication
export const auth = getAuth(app);



// Initialize Realtime Database
export const database = getDatabase(app);

export const storage =getStorage(app);
