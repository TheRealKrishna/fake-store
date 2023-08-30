"use client"
import Styles from "./page.module.css"
import { useRouter } from "next/navigation"
import Loader from "@/app/components/loader";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import cartContext from "../context/cart";

export default function Page() {
  const router = useRouter();
  const {cart, setCart, fetchCart} = useContext(cartContext);
  const [products, setProducts] = useState(false);

  const fetchProducts = async(cart)=>{
    const response = await fetch(`/api/products/getMultipleProducts`, {
      method: "POST",
      body:JSON.stringify(cart),
    });
    const json = await response.json();
    setProducts(json);
  }

  useEffect(()=>{
    fetchCart().then((cart)=>fetchProducts(cart));
  },[])

  if(!localStorage.getItem("auth-token")){
    router.push("/auth/login")
    return(<Loader/>)
  }
  else{
    return (
        <div className={`d-flex ${Styles.outerContainer}`}>
          <div className={`${Styles.cartContainer} bg-light`}>
            <h2 className={Styles.shoppingCartHeading}><i className="fa-solid fa-cart-shopping"></i> Shopping Cart</h2>
            <hr />
            <div className="container">
            {
              products ?
              Object.keys(cart)?.length > 0 ? products.map((product)=>{
                return (
                  <div className="container" key={product._id}>
                  <Image src={product.image} height={200} width={200} alt="Product Image"></Image>
                  {product._id}
                  <hr />
                  </div>
                )
              })
              :
              <h3>Your Cart Is Empty</h3>
              :
              <Loader/>
            }
          </div>
          </div>
          <div className={`${Styles.purchaseContainer} bg-light`}>hi</div>
        </div>
    )
}
}
