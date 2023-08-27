"use client"
import Styles from "./profileBox.module.css"
import { usePathname, useRouter } from "next/navigation"
import Loader from "@/app/components/loader";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function ProfileBox(props) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = ()=>{
        toast.promise(new Promise( async (resolve, reject)=>{
          localStorage.removeItem("auth-token");
          if(localStorage.getItem("auth-token")){
            reject("An Error Occured!")
          }
          else{
            resolve();
            router.push("/")
          }
        }),
        {
          loading: 'Logging Out...',
          success: <b>Logged Out Succesfully</b>,
          error: error=><b>{error}</b>,
        },
        {
          iconTheme: {
            primary: 'red',
            secondary: '#FFFAEE',
          },
        }
        )
      }
    if(!localStorage.getItem("auth-token")){
      router.push("/auth/login")
      return(<Loader></Loader>)
    }
    else{
      return (
        <div className="container">
        <div className={`bg-light ${Styles.profileContainer} d-flex`}>
          <div className={`container ${Styles.navigatePanel}`}>
            <div className={Styles.menuItem}>
            <ul style={{margin: "0px", paddingLeft: "0px"}}>
            <Link href="/member/profile"><li className={`${Styles.profileMenuItem} ${pathname === "/member/profile" ? Styles.profileMenuItemActive : ""}`} style={{listStyle: "none", padding:"10px 30px", borderTopLeftRadius:"6px"}}>
            <i className="fa-solid fa-user" style={{color:"orange", marginRight:"5px"}}></i>
            Profile
          </li></Link>
          <Link href="/member/address "><li className={`${Styles.profileMenuItem} ${pathname === "/member/address" ? Styles.profileMenuItemActive : ""}`} style={{listStyle: "none", padding:"10px 30px"}}>
            <i className="fa-solid fa-address-book" style={{color:"orange", marginRight:"5px"}}></i>
            Address
          </li></Link>
          <Link  href="/member/orders"><li className={`${Styles.profileMenuItem} ${pathname === "/member/orders" ? Styles.profileMenuItemActive : ""}`} style={{listStyle: "none", padding:"10px 30px"}}>
            <i className="fa-solid fa-box" style={{color:"orange", marginRight:"5px"}}></i>
            Orders
          </li></Link>
          <Link href="/member/wishlist"><li className={`${Styles.profileMenuItem} ${pathname === "/member/wishlist" ? Styles.profileMenuItemActive : ""}`} style={{listStyle: "none", padding:"10px 30px"}}>
            <i className="fa-solid fa-heart" style={{color:"orange", marginRight:"5px"}}></i>
            Wish List
          </li></Link>
          <hr />
          <a style={{cursor:"pointer"}} onClick={handleLogout}><li className={Styles.profileMenuItem} style={{listStyle: "none", padding:"10px 40px", border:"none"}}>
            <i className="fa-solid fa-power-off" style={{color:"red", marginRight:"5px"}}></i>
            Logout
          </li></a>
          </ul>
            </div>
          </div>
        <div className={Styles.profileInfo}>
          {props.element}
        </div>
        </div>
      </div>
    )
  }
}
