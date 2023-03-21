import React from "react";
import { database, auth, userExistsInDB, addUserToDB } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, sendEmailVerification, signOut } from "firebase/auth";
import { ref, set, get } from "firebase/database";

export default function SignIn() {

    const [displayName, setDisplayName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function handleSignIn(e) {
      e.preventDefault();
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: displayName });
        user.displayName = displayName;
        addUserToDB(user, displayName);
        await sendEmailVerification(user);
        alert("Un e-mail de vérification a été envoyé à votre adresse e-mail. Veuillez vérifier votre e-mail et confirmer votre inscription.");
        await signOut(auth);
        window.location.href = "/logIn";
      } catch (error) {
        console.log(error);
      }
    }
    

    function handleGoogleSignIn(e) {
      e.preventDefault();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;
          const userExists = await userExistsInDB(user.uid);
          if (!userExists) {
            return addUserToDB(user, user.displayName);
          } else {
            throw new Error("User already exists.");
          }
        })
        .then(() => {
          window.location.href = "/words";
        })
        .catch((error) => {
          if (error.message === "User already exists.") {
            alert("Vous êtes déjà inscrit avec ce compte Google.");
            window.location.href = "/words"
          } else {
            console.log(error);
          }
        });
    }
        
        return (
            <div className="logform signup flex-basic">
                <h1>Sign Up</h1>
                <button className="btn" type="button" onClick={handleGoogleSignIn}>
                    Sign Up with Google
                </button>
                <form onSubmit={handleSignIn} className="flex-basic">
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