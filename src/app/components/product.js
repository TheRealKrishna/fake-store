"use client"

import Image from "next/image"
import Link from "next/link"
import '@fortawesome/fontawesome-free/css/all.min.css';
import Styles from "./product.module.css"

export default function Product(props) {
  return (
    <div>
      <Link href={`/product/${props._id}`} style={{textDecoration: "none"}}>
      <div className="card" style={{width: "20rem", height:"500px"}}>
        <div className="image-container" style={{width: "100%", height: "250px", position: "relative"}}>
          <Image className="card-img-top" src={props.image} sizes="5" fill={true} style={{objectFit:"contain"}} alt="Card image cap"/>
        </div>
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description.slice(0, 100) + "..."}</p>
            <p className="rating-text" style={{fontSize: "14px"}}>{props.rating.rate}<i className="fas fa-star" style={{color: "#ffbb00"}}></i> ({props.rating.count})</p>
            <div className="d-flex justify-content-between">
              <h4>{`$${props.price}`}</h4>
              <button className={`btn btn-warning ${Styles.addToCart}`}>Add To Cart</button>
            </div>
        </div>
        </div>
      </Link>
    </div>
  )
}
