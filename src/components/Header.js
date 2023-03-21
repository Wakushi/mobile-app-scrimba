import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";

import { handleLogout } from "../firebaseConfig";

export default function Header(props) {

    const [isLogged, setIslogged] = useState(false)
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIslogged(true)
        } else {
            setIslogged(false)
        }
      });


    return (
        <header className="header flex-basic">
            <h1><a href="/">Cat Words</a></h1>   
            {!isLogged && <a href="/signIn" className="btn btn-debug">Sign In</a>}
            {!isLogged && <a href="/logIn" className="btn btn-debug">Log In</a>}
            {isLogged && <a href="/words" className="btn btn-debug">Words</a>}
            {isLogged && <button className="btn btn-debug" onClick={handleLogout}>Log Out</button>}
        </header>
    )
}