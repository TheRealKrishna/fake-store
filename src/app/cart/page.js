"use client"
import Styles from "./page.module.css"
import { useRouter } from "next/navigation"
import Loader from "@/app/components/loader";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import cartContext from "../context/cart";
import CartLoader from "./cartLoader";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const {cart, setCart, fetchCart} = useContext(cartContext);
  const [products, setProducts] = useState(false);
  const plusButton = useRef();
  const minusButton = useRef();
  const [plusText, setPlusText] = useState("+");
  const [minusText, setMinusText] = useState("-");

  const fetchProducts = async(cart)=>{
    const response = await fetch(`/api/products/getMultipleProducts`, {
      method: "POST",
      body:JSON.stringify(cart),
    });
    const json = await response.json();
    setProducts(json);
  }

  const addToCart = async(id, e)=>{
    e.preventDefault()
    if(!localStorage.getItem("auth-token")){
      router.push("/auth/login")
      return
    }
    e.target.disabled = true
    e.target.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="color: #ffffff"></i>'
    const response = await fetch(`/api/cart/addToCart/${id}`, {method: "POST", headers:{"auth-token": localStorage.getItem("auth-token")}})
    const json = await response.json();
    if(json.success){
      await fetchCart().then((cart)=>fetchProducts(cart));
    }
    else{
      toast.error("error adding item to your cart!");
    }
    e.target.disabled = false
    e.target.innerHTML = "+"
  }

  const removeFromCart = async(id, e)=>{
    e.preventDefault()
    e.target.disabled = true
    e.target.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="color: #ffffff"></i>'
    const response = await fetch(`/api/cart/removeFromCart/${id}`, {method: "POST", headers:{"auth-token": localStorage.getItem("auth-token")}})
    const json = await response.json();
    if(json.success){
      await fetchCart().then((cart)=>fetchProducts(cart));
    }
    else{
      toast.error("error removing item from your cart!")
    }
    e.target.disabled = false
    e.target.innerHTML = "-"
  }

  useEffect(()=>{
    fetchCart().then((cart)=>fetchProducts(cart));
  },[])

  if(!localStorage.getItem("auth-token")){
    router.push("/auth/login")
    return(<Loader marginTop="300px" marginBottom="300px"/>)
  }
  else{
    return (
        <div className={`d-flex ${Styles.outerContainer}`}>
          <div className={`${Styles.cartContainer} bg-light`}>
            <h2 className={Styles.shoppingCartHeading}><i className="fa-solid fa-cart-shopping"></i> Shopping Cart</h2>
            <hr />
            <div className="container">
            {
              products && cart ?
              Object.keys(cart)?.length > 0 ? products.map((product)=>{
                return (
                  <>
                  <div className="container d-flex" key={product._id}>
                  <div className="image-container" style={{minWidth: "250px", minHeight: "200px", position: "relative"}}>
                  <Link href={`/product/${product._id}`} style={{textDecoration:"none", color:"black"}}>
                  <Image className="card-img-top" src={product.image} sizes="5" fill={true} style={{objectFit:"contain"}} alt="product image"/>
                  </Link>
                  </div>
                  <div className={Styles.productInfo}>
                    <div>
                  <h5 className={Styles.productTitle}><Link href={`/product/${product._id}`} style={{textDecoration:"none", color:"black"}}>{product.title}</Link></h5>
                  <Link href={`/product/${product._id}`} style={{textDecoration:"none", color:"black"}}>
                  <h6 className={Styles.productDescription}>{product.description.slice(0, 150) + "..."}</h6>
                  </Link>
                    </div>
                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                  <h4 className={Styles.price}>{`$${product.price}`}</h4>
                  <div className="d-flex">
                    {
                        <div className="addRemove d-flex" >
                          <button ref={minusButton} className={`btn btn-warning ${Styles.minusFromCart}`} onClick={(e)=>removeFromCart(product._id, e)}>{minusText}</button>
                            <h4 className={Styles.numberOfItems}>{cart[product._id]}</h4>
                          <button ref={plusButton} className={`btn btn-warning ${Styles.plusToCart}`} onClick={(e)=>addToCart(product._id, e)}>{plusText}</button>
                        </div>
                      }
                  </div>
                  </div>
                  </div>
                  </div>
                  <hr />
                  </>
                )
              })
              :
              <h3>Your Cart Is Empty</h3>
              :
                <CartLoader/>
            }
          </div>
          </div>
          <div className={`${Styles.purchaseContainer} bg-light`}>
            <button className="btn btn-warning mt-3 m-5">Proceed To Checkout</button>
          </div>
        </div>
    )
}
}
