import React from "react";
import cat from "../assets/cat.png"
import { Link } from "react-router-dom";

export default function Cart(props) {

  return (
    <div className="cart flex-basic">
      {props.user && <h2>Welcome {props.user.displayName}</h2>}
      <img src={cat}></img>
      <input 
        className="input" 
        id="shop-input" 
        placeholder="Bread" 
        type='text'
      ></input>
      <button className="btn" onClick={props.addToCart}>Add to cart</button>
      <Link to="/words">Voir mon tableau de mots</Link>
    </div>
  )
  
}