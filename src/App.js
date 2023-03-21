// IMPORTS - REACT
import { React, useState, useEffect } from "react";
import {Routes, Route} from "react-router-dom"

// IMPORTS - FIREBASE
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// IMPORTS - COMPONENTS
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import UserWords from "./components/Userwords";


export default function App() {

  const user = auth.currentUser

  onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User connected')
    } else {
        console.log('User not connected')
    }
  });

  function checkData() {
    console.clear()
    console.log('User Info: ', auth.currentUser)
  }

  return (
    <div className="app-container flex-basic">
      <Header
        checkData={checkData}
        user={user}
      />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/logIn" element={<Login/>}/>
        <Route path="/words" element={<UserWords/>}/>
      </Routes>

    </div>
  )
}