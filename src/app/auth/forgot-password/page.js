"use client"
import Image from "next/image"
import Styles from "./page.module.css"
import signUpSVG from "./login.svg"
import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/app/components/loader";

export default function Page() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [passwordRevealIcon, setPasswordRevealIcon] = useState("fa-eye-slash");
    const confirmPasswordElement = useRef();

    const signUpHandler = (e)=>{
        e.preventDefault();
        toast.promise(new Promise(async (resolve, reject)=>{
        const response = await fetch("/api/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }), 
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem("auth-token", json.token);
            resolve();
            router.back()
        }
        else{
            reject(json.error)
        }
        }),
        {
          loading: 'Logging In..',
          success: <b>Logged In Succesfully!</b>,
          error: err=><b>{err}</b>,
        }
      );
    }

    const revealPassword = ()=>{
        if(confirmPasswordType === "password"){
            setConfirmPasswordType("text")
            setPasswordRevealIcon("fa-eye")
        }
        else{
            setConfirmPasswordType("password")
            setPasswordRevealIcon("fa-eye-slash")
        }
    }

    const handleInputChange = async (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
        if (e.target.name === "password" || e.target.name === "confirmPassword") {
            if (e.target.name === "confirmPassword" && e.target.value !== credentials.password) {
                confirmPasswordElement.current?.setCustomValidity("Passwords Do Not Match")
            }
            else{
                confirmPasswordElement.current?.setCustomValidity("")
            }
        }
    }

if(localStorage.getItem("auth-token")){
    router.push("/")
    return(<Loader></Loader>)
}
else{
  return (
  <>
    <form onSubmit={signUpHandler}>
    <div className="container mt-5 d-flex" style={{height: "500px", width: "1000px"}}>
        <div className={`container bg-warning ${Styles.yellowBox}`} style={{flex: "1", borderTop: "1px solid black"}}>
            <h2 style={{fontFamily:"revert-layer", fontWeight: "bold", padding: "5px 30%", marginTop: "35px"}}>Log In</h2>
            <h6 style={{color:"grey"}}>Get access to your Orders, Wishlist and Recommendations</h6>
            <Image src={signUpSVG} style={{position:"absolute", bottom:"100px"}} alt="SignUp Image"/>
        </div>

        <div className={`container bg-light ${Styles.lightBox}`} style={{flex: "2"}}>
            
            <div className={Styles.inputs}>
            <i className="fa-solid fa-envelope" style={{color: "#ffc107", marginTop: "7px"}}></i>
            <input required type="email" onChange={handleInputChange} name="email" value={credentials.email} className="bg-light" placeholder="email"></input>
            </div>

            <div className={Styles.inputs}>
            <i className="fa-solid fa-lock" style={{color: "#ffc107", marginTop: "7px"}}></i>
            <input required type={confirmPasswordType} onChange={handleInputChange} name="password" value={credentials.password} minLength={8} className="bg-light" placeholder="password"></input>
            <i className={`fa-solid ${passwordRevealIcon}`} onClick={revealPassword} style={{color: "#000000", position: "absolute", right:"360px", marginTop: "7px", cursor: "pointer"}}></i>
            </div>

            <div style={{marginTop:"20px", marginBottom:"60px"}}>
            <p style={{position:"absolute", left: "720px"}}><a style={{textDecoration:"none"}} href="/auth/forgot-password" target="_blank">Forgot Password</a></p>
            </div>

            <div className={Styles.inputs} style={{margin:"0px"}}>
            <button className="btn btn-warning" style={{marginLeft:"30px"}} type="submit">Log In</button>
            </div>

            <div style={{marginTop:"90px"}}>
            <p style={{position:"absolute", left: "720px"}}>Not a member yet? <Link style={{textDecoration:"none"}} href="/auth/signup">Create Account</Link></p>
            </div>

        </div>
        </div>
    </form>
</>
  )
}
}
