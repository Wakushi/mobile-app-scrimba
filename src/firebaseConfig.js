import { initializeApp } from "firebase/app";
import { ref, set, get, push, onValue, getDatabase, remove } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
 
const appSettings = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const auth = getAuth(app);

function handleLogout() {
  signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .then(()=> {
        window.location.href = "/"
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
  });
}

function userExistsInDB(uid) {
  return new Promise((resolve, reject) => {
    const db = database;
    const userRef = ref(db, "users/" + uid);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        console.error("Error checking user in the database: ", error);
        reject(error);
      });
  });
}

function addUserToDB(user, displayName) {
  return new Promise((resolve, reject) => {
    const db = database;
    const userRef = ref(db, "users/" + user.uid);
    set(userRef, {
      displayName: displayName,
      email: user.email,
    })
      .then(() => {
        console.log("User added to the database.");
        resolve();
      })
      .catch((error) => {
        console.error("Error adding user to the database: ", error);
        reject(error);
      });
  });
}

function getUserWords(userId, callback) {
  const db = database;
  const wordsRef = ref(db, "users/" + userId + "/words");
  onValue(wordsRef, (snapshot) => {
    if(snapshot.exists()){
      const wordsObj = Object.entries(snapshot.val());
      callback(wordsObj);
    } else {
      callback([])
    }
  });
}

function addWordToUser(userId, word) {
  const db = database;
  const wordsRef = ref(db, "users/" + userId + "/words");
  const newWordRef = push(wordsRef);
  set(newWordRef, word)
    .then(() => {
      console.log(word, "added to the user's words.");
    })
    .catch((error) => {
      console.error("Error adding word to the user's words: ", error);
    });
}

function deleteWord(userId, wordId) {
  const db = database;
  const exactLocation = ref(db, "users/" + userId + `/words/${wordId}`)
  remove(exactLocation)
}

export { app, database, auth, getUserWords, addWordToUser, deleteWord, handleLogout, userExistsInDB, addUserToDB };
