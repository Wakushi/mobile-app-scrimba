import React from "react";
import { auth, userExistsInDB, addUserToDB } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const user = auth.currentUser;

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          window.location.href = "/words";
        } else {
          alert(
            "Veuillez vérifier votre adresse e-mail avant de vous connecter."
          );
          signOut(auth).catch((error) => {
            console.error("Erreur lors de la déconnexion: ", error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleGoogleLogIn(e) {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const userExists = await userExistsInDB(user.uid);
        if (!userExists) {
          return addUserToDB(user, user.displayName);
        }
      })
      .then(() => {
        window.location.href = "/words";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="logform login flex-basic">
      <h1>Login</h1>
      <button className="btn" type="button" onClick={handleGoogleLogIn}>
        Login with Google
      </button>
      <form onSubmit={handleLogin} className="flex-basic">
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
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
