"use client"

import { useContext, useEffect, useRef, useState } from "react"
import Styles from "./page.module.css"
import Image from "next/image";
import Loader from "@/app/components/loader";
import '@fortawesome/fontawesome-free/css/all.min.css';
import cartContext from "@/app/context/cart";
import { toast } from "react-hot-toast";

export default function Page(params) {
  const [product, setProduct] = useState(false);
  const {cart, setCart, fetchCart} = useContext(cartContext);
  const [addToCartText, setAddToCartText] = useState("Add To Cart")
  const addToCartButton = useRef();
  const plusButton = useRef();
  const minusButton = useRef();
  const [plusText, setPlusText] = useState("+");
  const [minusText, setMinusText] = useState("-");

  const getProduct = async()=>{
    const response = await fetch(`/api/products/${params.params._id}`);
    const json = await response.json()
    setProduct(json)
  }

  const displayNoResultsFound = ()=>{
    return(
      <div className="container text-center" style={{marginTop: "150px"}}>
        <i className="fas fa-triangle-exclamation m-5" style={{fontSize: "100px"}}></i>
        <h3>Sorry! Product Not Found!</h3>
      </div>
    )
  }

  const addToCart = async(e)=>{
    e.preventDefault()
    addToCartButton.current ? addToCartButton.current.disabled = true : null
    plusButton.current ? plusButton.current.disabled = true : null
    setAddToCartText(<i class="fa-solid fa-spinner fa-spin" style={{color: "#ffffff"}}></i>)
    setPlusText(<i class="fa-solid fa-spinner fa-spin" style={{color: "#ffffff"}}></i>)
    const response = await fetch(`/api/cart/addToCart/${params.params._id}`, {method: "POST", headers:{"auth-token": localStorage.getItem("auth-token")}})
    const json = await response.json();
    if(json.success){
      fetchCart();
    }
    else{
      toast.error("error adding item to your cart!");
    }
    addToCartButton.current ? addToCartButton.current.disabled = false : null
    plusButton.current ? plusButton.current.disabled = false : null
    setPlusText("+")
  }

  const removeFromCart = async(e)=>{
    e.preventDefault()
    minusButton.current ? minusButton.current.disabled = true : null
    setAddToCartText("Add To Cart")
    setMinusText(<i class="fa-solid fa-spinner fa-spin" style={{color: "#ffffff"}}></i>)
    const response = await fetch(`/api/cart/removeFromCart/${params.params._id}`, {method: "POST", headers:{"auth-token": localStorage.getItem("auth-token")}})
    const json = await response.json();
    if(json.success){
      fetchCart();
    }
    else{
      toast.error("error removing item from your cart!")
    }
    minusButton.current ? minusButton.current.disabled = false : null
    setMinusText("-")
  }

useEffect(()=>{
    getProduct();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  return (
    <div className="container">
      { 
      product ? product?.title ?
        <div className="d-flex mt-5">
            <div className={Styles.productImage}>
                <Image src={product.image} alt="Product Image" width={500} height={500}></Image>
            </div>
            <div className={Styles.productInfo}>
            <h2 className={Styles.productTitle}>{product.title}</h2>
            <p className={Styles.productRatingText} style={{fontSize: "14px"}}>{product.rating.rate}<i className="fas fa-star" style={{color: "#ffbb00"}}></i> ({product.rating.count})</p>
            <h6 className={Styles.productDescription}>{product.description}</h6>
            <h5 className={Styles.productPrice}>{`$${product.price}`}</h5>
            <div className="d-flex">
            {
                cart && params.params._id in cart ?
                <div className="addRemove d-flex" >
                  <button ref={minusButton} className={`btn btn-warning ${Styles.minusFromCart}`} onClick={removeFromCart}>{minusText}</button>
                    <h4 className={Styles.numberOfItems}>{cart[params.params._id]}</h4>
                  <button ref={plusButton} className={`btn btn-warning ${Styles.plusToCart}`} onClick={addToCart}>{plusText}</button>
                </div>
                :
                <button className={`btn btn-warning ${Styles.addToCart}`} ref={addToCartButton} onClick={addToCart}>{addToCartText}</button>
              }
            <button className={`btn btn-info ${Styles.buyNow}`}>Buy Now</button>
            </div>
            </div>
        </div>
        : displayNoResultsFound() : <Loader/>
      }
    </div>
  )
}
