// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAHUoAVaxCpeOd6Ukjq-vuLNzoOs86Zt_4",
    authDomain: "shoca-eb5f2.firebaseapp.com",
    projectId: "shoca-eb5f2",
    storageBucket: "shoca-eb5f2.firebasestorage.app",
    messagingSenderId: "429176865154",
    appId: "1:429176865154:web:7481144e42614c35d30f9b",
    measurementId: "G-EFZF4CYYG6"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const storage = getStorage(app);