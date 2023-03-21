import React from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function handleLogin(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
              window.location.href = "/words"
            })
        .catch((error) => {
          console.log(error);
        });

    }
      
        return (
            <div className="logform login flex-basic">
                <h1>Login</h1>
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
                    <button className="btn" type="submit">Login</button>
                </form>
            </div>
        );
        
}