"use client"
import Image from "next/image"
import electronicsImage from "@/app/images/electronics-sale.jpg"
import fashionImage from "@/app/images/fashion-sale.jpg"
import cyberMonday from "@/app/images/cyber-monday.jpg"


export default function ProductsCarousel() {
  return (
    <>
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="5000">
          <Image src={electronicsImage} style={{width:"100%", height:'500px'}} className="d-block w-100" alt="electronics sale poster"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>50% Off On Electronics</h5>
            <p></p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <Image src={fashionImage} style={{width:"100%", height:'500px'}} className="d-block w-100" alt="fashion sale poster"/>
          <div className="carousel-caption d-none d-md-block">
            <h5 style={{color:"black"}}>40% Off On Beauty Products</h5>
            <p></p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <Image src={cyberMonday} style={{width:"100%", height:'500px'}} className="d-block w-100" alt="black friday sale poster"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>50% Off On Selected Products</h5>
            <p></p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </>
  )
}
