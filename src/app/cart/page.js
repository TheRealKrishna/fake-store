"use client"
import Styles from "./page.module.css"
import { useRouter } from "next/navigation"
import Loader from "@/app/components/loader";

export default function Page() {
  const router = useRouter();

  if(!localStorage.getItem("auth-token")){
    router.push("/auth/login")
    return(<Loader></Loader>)
  }
  else{
    return (
        <div>
        cart
        </div>
    )
}
}
