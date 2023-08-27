"use client"

import { useEffect, useState } from "react"
import Styles from "./page.module.css"
import Image from "next/image";
import Loader from "@/app/components/loader";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Page(params) {

const [product, setProduct] = useState(false);

const fetchProduct = async()=>{
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

useEffect(()=>{
    fetchProduct()
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
            <button className={`btn btn-warning ${Styles.addToCart}`}>Add To Cart</button>
            <button className={`btn btn-info ${Styles.buyNow}`}>Buy Now</button>
            </div>
            </div>
        </div>
        : displayNoResultsFound() : <Loader/>
      }
    </div>
  )
}
