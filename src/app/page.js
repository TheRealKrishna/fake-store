"use client"

import Image from 'next/image'
import styles from './page.module.css'
import GetProducts from './components/getProducts'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams();
  return (
    <>
    <h2 className="font-weight-bold mt-3 mb-5 text-center d-flex justify-content-center">
        <div style={{width: "85%", height: "20px", borderBottom: "1px solid black", textAlign: "center"}}>
        {
            searchParams.get('search') ?
            <>
            <span style={{fontSize: "30px", backgroundColor: "white", paddingLeft: "10px"}}><strong>Search results for: </strong></span>
            <span style={{fontSize: "30px", backgroundColor: "white", paddingRight: "10px"}}>{searchParams.get('search')}</span>
            </>
            
            :

            <span style={{fontSize: "30px", backgroundColor: "white", padding: "0 10px"}}>Products</span>
            

        }
      </div>
    </h2>
    <GetProducts/>
    </>
  )
}
