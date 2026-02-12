// ========== تكوين Firebase (قاعدة البيانات السحابية) ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { 
    getStorage, ref, uploadBytes, getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
import { 
    getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// إعدادات Firebase - اشترك واحصل على هذه المعلومات من firebase.google.com
const firebaseConfig = {
    apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:xxxxxxxxxx"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, ref, uploadBytes, getDownloadURL, signInWithEmailAndPassword, signOut, onAuthStateChanged };