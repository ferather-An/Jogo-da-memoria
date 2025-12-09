import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, onSnapshot, collection, query, where, limit, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Variáveis globais fornecidas pelo ambiente Canvas
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

// Configuração inicial do Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
setLogLevel('error'); // Mantém o console limpo

// Autenticação (Assina com token se disponível, senão anônimo)
const initializeAuth = async () => {
    try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
        } else {
            await signInAnonymously(auth);
        }
    } catch (error) {
        console.error("Firebase Auth Error:", error);
    }
};
initializeAuth();

// Define variáveis globais para o script principal
window.db = db;
window.auth = auth;
window.appId = appId;

// Função para obter o userId após a autenticação
window.getUserId = () => auth.currentUser?.uid || 'anonymous'; 

// Adiciona a função de salvar e carregar placares para o escopo global
window.loadGlobalLeaderboard = (level) => {
    return new Promise(resolve => {
        if (!db || !auth.currentUser) return resolve([]);
        
        const leaderboardPath = `artifacts/${appId}/public/data/leaderboard_scores_${level}`;
        const scoresRef = collection(db, leaderboardPath);
        
        const q = query(scoresRef, limit(10));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const scores = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                scores.push({ ...data, id: doc.id });
            });
            
            scores.sort((a, b) => {
                if (a.time !== b.time) return a.time - b.time;
                return a.attempts - b.attempts;
            });
            
            resolve(scores);
            unsubscribe(); 
        }, (error) => {
            console.error("Erro ao carregar leaderboard:", error);
            resolve([]);
        });
    });
};

window.saveGlobalScore = async (level, time, attempts) => {
    if (!db || !auth.currentUser) return false;
    
    const userId = window.getUserId();
    const userName = `Player-${userId.substring(0, 4)}`;
    
    const leaderboardPath = `artifacts/${appId}/public/data/leaderboard_scores_${level}`;
    const scoresRef = collection(db, leaderboardPath);
    
    await addDoc(scoresRef, {
        userId: userId,
        userName: userName,
        time: time,
        attempts: attempts,
        date: new Date().toISOString()
    });

    return true;
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Firebase pronto. User:", user.uid);
        if (window.initializeGame) {
             window.initializeGame(false, true); 
        }
    } else {
         console.log("Firebase pronto. Usuário anônimo.");
    }
});
