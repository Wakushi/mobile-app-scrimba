import React from "react";
import { database, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";

export default function SignIn() {

    const [displayName, setDisplayName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function addUserToDB(user, displayName) {
      const db = database
      const userRef = ref(db, "users/" + user.uid);
      set(userRef, {
        displayName: displayName,
        email: user.email,
      })
        .then(() => {
          console.log("User added to the database.");
        })
        .catch((error) => {
          console.error("Error adding user to the database: ", error);
        });
    }

    async function handleSignUp(e) {
      e.preventDefault();
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: displayName });
        user.displayName = displayName;
        addUserToDB(user, displayName);
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "/words";
      } catch (error) {
        console.log(error);
      }
    }
    
    
    
      
        return (
            <div className="logform signup flex-basic">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUp} className="flex-basic">
                    <input
                        className="input"
                        type="text"
                        placeholder="Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="btn" type="submit">Sign Up</button>
                </form>
            </div>
        );
        
}