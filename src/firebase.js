import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDYVhpcri-AkfXBK3_n28ryfW6D84iMOI8",
    authDomain: "supply-management-app.firebaseapp.com",
    projectId: "supply-management-app",
    storageBucket: "supply-management-app.appspot.com",
    messagingSenderId: "293170300165",
    appId: "1:293170300165:web:ac19fe2208e2ba245f636c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
