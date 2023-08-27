"use client"
import GetProducts from "@/app/components/getProducts";
import { useSearchParams } from "next/navigation";

export default function Page(params) {
  const searchParams = useSearchParams();
  return (
    <div>
      <h2 className="font-weight-bold mt-3 mb-5 text-center d-flex justify-content-center">
        <div style={{width: "85%", height: "20px", borderBottom: "1px solid black", textAlign: "center"}}>
          {
            searchParams.get('search') ?
            <>
            <span style={{fontSize: "30px", backgroundColor: "white", paddingLeft: "10px"}}><strong>Search results for: </strong></span>
            <span style={{fontSize: "30px", backgroundColor: "white", paddingRight: "10px"}}>{searchParams.get('search')}</span>
            </>
            
            :

            <span style={{fontSize: "30px", backgroundColor: "white", padding: "0 10px"}}>{params.params.category.slice(0, 1).toUpperCase() + params.params.category.slice(1).replace(/%20/g, " ")}</span>
            

          }
        </div>
      </h2>
      <GetProducts category={params.params.category}/>
    </div>
  )
}
