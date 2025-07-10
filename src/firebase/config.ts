import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuração do Firebase com databaseURL
const firebaseConfig = {
  apiKey: "AIzaSyAuZ1SJWxlwWtgVhV3qnBafoytho59WE4I",
  authDomain: "device-streaming-77144326.firebaseapp.com",
  databaseURL: "https://device-streaming-77144326-default-rtdb.firebaseio.com", // <-- Adicione esta linha!
  projectId: "device-streaming-77144326",
  storageBucket: "device-streaming-77144326.appspot.com",
  messagingSenderId: "375948005973",
  appId: "1:375948005973:web:99b7ff4736d6c17f927adc"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app; 