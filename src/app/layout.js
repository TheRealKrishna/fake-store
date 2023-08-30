"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import 'bootstrap/dist/css/bootstrap.css'
import { Toaster } from 'react-hot-toast'
import LoadingBar from 'react-top-loading-bar'
import loaderProgressContext from './context/loaderProgress'
import cartContext from './context/cart'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import NextProgress from "next-progress";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fake Store',
  description: '',
}

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
  },[router.pathname])


  return (
    <html lang="en">
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
      </body>
    </html>
  )
}
