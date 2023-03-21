import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Ajoutez cette ligne
import { auth, getUserWords, addWordToUser, deleteWord } from "../firebaseConfig"; // Ajoutez getUserWords et addWordToUser

export default function UserWords() {

    const [words, setWords] = useState([]);
    const [newWord, setNewWord] = useState("");

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          getUserWords(user.uid, (userWords) => {
            setWords(userWords);
          });
        } else {
          setWords([]);
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (auth.currentUser) {
        addWordToUser(auth.currentUser.uid, newWord);
        setNewWord("");
      }
    };

    const wordElements = words.map(item => {
        return (
          <li
            onClick={() => {deleteWord(auth.currentUser.uid, item[0])}}
            className="btn word-item"  
            key={item[0]} 
            id={item[0]}
          >{item[1]}</li>
        )
      })
  
    return (
      <div className="word-form-container flex-basic">
        {auth.currentUser && <h1>Bonjour, {auth.currentUser.displayName} !</h1>}
        <h1>Voici votre tableau de mots</h1>
   
        <form onSubmit={handleSubmit} className="word-form">
          <input
            className="input"
            type="text"
            placeholder="Ajouter un mot"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            required
          />
          <button className="btn" type="submit">Ajouter</button>
        </form>

        {words && <ul className="word-items-container flex-basic">
          {wordElements}
        </ul>}

      </div>
    );
  }

