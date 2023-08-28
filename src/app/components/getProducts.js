"use client"

import { useContext, useEffect, useState } from "react";
import Product from "./product";
import Loader from "./loader";
import { usePathname, useSearchParams } from "next/navigation";
import loaderProgressContext from "../context/loaderProgress";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function GetProducts(props) {
  const searchParams = useSearchParams();
  let [products, setProducts] = useState(false)
  const pathname = usePathname();

    const displayNoResultsFound = ()=>{
      return(
          <div className="container text-center" style={{marginTop: "150px"}}>
            <i className="fas fa-triangle-exclamation m-5" style={{fontSize: "100px"}}></i>
            <h3>Sorry! No Results Found!</h3>
          </div>
      )
    }

    const fetchProducts = async ()=>{ 
     if(searchParams.get('search')){
        const response = await fetch(`/api/products/getAllProducts`)
        const json = await response.json();
        const data = await searchItems(json, searchParams.get('search'));
        setProducts(data);
      }

      else if(props.category){
        const response = await fetch(`/api/products/category/${props.category}`)
        const json = await response.json();
        setProducts(json);
      }

      else{
        const response = await fetch('/api/products/getAllProducts')
        const json = await response.json();
        setProducts(json);
      }
    }

    const searchItems = (dataArray, keyword) => {
      const normalizedKeyword = keyword.trim().toLowerCase();
    
      const matches = dataArray.filter(item => {
        const normalizedTitle = item.title.toLowerCase();
        const normalizedDescription = item.description.toLowerCase();
        const normalizedCategory = item.category.toLowerCase();
    
        return (
          normalizedTitle.includes(normalizedKeyword) ||
          normalizedDescription.includes(normalizedKeyword) ||
          normalizedCategory.includes(normalizedKeyword)
        );
      });
    
      return matches;
    }

    useEffect(()=>{
      fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
      setProducts(null)
      fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchParams])
    
  return (
    <div>
        {
          products ? products.length > 0 ? 
          <div className="container mt-3">
          <div className="row row-cols-4">
            { products.map((product)=>{return(
          <div className="col mb-2" key={product._id}>
            <Product _id={product._id} title={product.title} image={product.image} description={product.description} price={product.price} category={product.category} rating={product.rating}/>
          </div>
          )})} 
          </div>
          </div>  
          : displayNoResultsFound() : <Loader/>
        }
    </div>
  )
}
