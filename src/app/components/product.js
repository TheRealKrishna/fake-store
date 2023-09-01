"use client"

import Image from "next/image"
import Link from "next/link"
import Styles from "./product.module.css"
import { toast } from "react-hot-toast";
import { useContext, useRef, useState } from "react";
import Spinner from "./spinner";
import cartContext from "../context/cart";

export default function Product(props) {
  const {cart, setCart, fetchCart} = useContext(cartContext);
  const [addToCartText, setAddToCartText] = useState("Add To Cart")
  const addToCartButton = useRef();

  const addToCart = async(e)=>{
    e.preventDefault()
    e.target.disabled = true;
    e.target.innerHTML='<i class="fa-solid fa-spinner fa-spin" style="color: #ffffff"></i>'
    setAddToCartText(<i class="fa-solid fa-spinner fa-spin" style={{color: "#ffffff"}}></i>)
    const response = await fetch(`/api/cart/addToCart/${props._id}`, {method: "POST", headers:{"auth-token": localStorage.getItem("auth-token")}})
    const json = await response.json();
    if(json.success){
      fetchCart();
    }
    else{
      toast.error("error adding item to your cart!");
    }
    e.target.disabled = false;
    e.target.innerHTML = "+";
  }

  const removeFromCart = async(e)=>{
    e.preventDefault()
    e.target.disabled = true;
    e.target.innerHTML='<i class="fa-solid fa-spinner fa-spin" style="color: #ffffff"></i>'
    setAddToCartText("Add To Cart")
    const response = await fetch(`/api/cart/removeFromCart/${props._id}`, {method: "POST", headers:{"auth-token": localStorage.getItem("auth-token")}})
    const json = await response.json();
    if(json.success){
      fetchCart();
    }
    else{
      toast.error("error removing item from your cart!")
    }
    e.target.disabled = false;
    e.target.innerHTML = "-";
  }

  return (
    <div>
      <Link href={`/product/${props._id}`} style={{textDecoration: "none"}}>
      <div className="card" style={{width: "20rem", minHeight:"500px"}}>
        <div className="image-container" style={{width: "100%", height: "200px", position: "relative"}}>
          <Image className="card-img-top" src={props.image} sizes="5" fill={true} style={{objectFit:"contain"}} alt="Card image cap"/>
        </div>
        <div className="card-body  d-flex flex-column align-content-between justify-content-between flex-wrap">
          <div>
            <h5 className="card-title">{props.title.slice(0, 50) + "..."}</h5>
            <p className="card-text" style={{color:"#696969"}}>{props.description.slice(0, 100) + "..."}</p>
            <p className="rating-text" style={{fontSize: "14px"}}>{props.rating.rate}<i className="fas fa-star" style={{color: "#ffbb00"}}></i> ({props.rating.count})</p>
          </div>
            <div className="d-flex justify-content-between">
              <h4 className={Styles.price}>{`$${props.price}`}</h4>
              {
                cart && props._id in cart ?
                <div className="addRemove d-flex" >
                  <button className={`btn btn-warning ${Styles.minusFromCart}`} onClick={(e)=>removeFromCart(e)}>-</button>
                    <h4 className={Styles.numberOfItems}>{cart[props._id]}</h4>
                  <button className={`btn btn-warning ${Styles.plusToCart}`} onClick={(e)=>addToCart(e)}>+</button>
                </div>
                :
                <button className={`btn btn-warning ${Styles.addToCart}`} ref={addToCartButton} onClick={(e)=>addToCart(e)}>{addToCartText}</button>
              }
            </div>
        </div>
        </div>
      </Link>
    </div>
  )
}
