"use client"
import Styles from "./page.module.css"
import { useRouter } from "next/navigation"
import Loader from "@/app/components/loader";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import cartContext from "../context/cart";
import CartLoader from "./cartLoader";
import Link from "next/link";

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
                  <>
                  <div className="container d-flex" key={product._id}>
                  <div className="image-container" style={{width: "20%", height: "200px", position: "relative"}}>
                  <Link href={`/product/${product._id}`} style={{textDecoration:"none", color:"black"}}>
                  <Image className="card-img-top" src={product.image} sizes="5" fill={true} style={{objectFit:"contain"}} alt="product image"/>
                  </Link>
                  </div>
                  <h5 className={Styles.productTitle}><Link href={`/product/${product._id}`} style={{textDecoration:"none", color:"black"}}>{product.title}</Link></h5>
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
          <div className={`${Styles.purchaseContainer} bg-light`}>hi</div>
        </div>
    )
}
}
