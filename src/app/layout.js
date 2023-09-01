"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import { Toaster } from 'react-hot-toast'
import LoadingBar from 'react-top-loading-bar'
import loaderProgressContext from './context/loaderProgress'
import cartContext from './context/cart'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import NextProgress from "next-progress";
import Script from 'next/script'
import Footer from './components/footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [cart, setCart] = useState(false);

  const fetchCart = async ()=>{
    if(localStorage.getItem("auth-token")){
      const response = await fetch("/api/cart", {method: "POST", headers:{"auth-token": localStorage.getItem("auth-token")}});
      const json = await response.json();
      setCart(json.cart)
      return json.cart
    }
    else{
      setCart(false)
    }
  }

  useEffect(()=>{
    fetchCart();
  },[router.pathname, searchParams])

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[router.pathname, searchParams])

  return (
    <html lang="en">
    <title>Fake Store</title>
    <Script src="https://kit.fontawesome.com/3889b89284.js" crossorigin="anonymous"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></Script>
      <body className={inter.className}>
      <loaderProgressContext.Provider value={{ setLoaderProgress }}>
      <cartContext.Provider value={{ cart, setCart, fetchCart }}>
      <LoadingBar
        color='#f11946'
        progress={loaderProgress}
        onLoaderFinished={() => setLoaderProgress(0)}
      />
      <Navbar/>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <NextProgress />
      {children}
      </cartContext.Provider>
      </loaderProgressContext.Provider>
      <Footer/>
      </body>
    </html>
  )
}
