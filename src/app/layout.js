import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import 'bootstrap/dist/css/bootstrap.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fake Store',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar/>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {children}
      </body>
    </html>
  )
}
