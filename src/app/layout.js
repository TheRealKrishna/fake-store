"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import 'bootstrap/dist/css/bootstrap.css'
import { Toaster } from 'react-hot-toast'
import LoadingBar from 'react-top-loading-bar'
import loaderProgressContext from './context/loaderProgress'
import React, { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fake Store',
  description: '',
}

export default function RootLayout({ children }) {
  const [loaderProgress, setLoaderProgress] = useState(0);

  return (
    <html lang="en">
      <body className={inter.className}>
      <loaderProgressContext.Provider value={{ setLoaderProgress }}>
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
      {children}
      </loaderProgressContext.Provider>
      </body>
    </html>
  )
}
