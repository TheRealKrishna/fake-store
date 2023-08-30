"use client"
import Styles from "./navbar.module.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import cartContext from "../context/cart";

export default function Navbar(params) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [profileMenu, setProfileMenu] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('search') ? searchParams.get('search') : "");
  const {cart, setCart, fetchCart} = useContext(cartContext);
  const [cartSum, setCartSum] = useState(false);

  const toggleProfileMenu = ()=>{
    if(localStorage.getItem('auth-token')){
      setProfileMenu(!profileMenu);
    }
    else{
      router.push("/member/profile");
    }
  }

  const fetchCartSum = async (cart)=>{
    if(cart){
      const values = Object.values(cart);
      const sum = values.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      setCartSum(sum);
    }
    }

  const searchChangeHandler = (e)=>{
    setSearchKeyword(e.target.value) 
  }

  const handleLogout = ()=>{
    toast.promise(new Promise( async (resolve, reject)=>{
      localStorage.removeItem("auth-token");
      if(localStorage.getItem("auth-token")){
        reject("An Error Occured!")
      }
      else{
        setProfileMenu(!profileMenu)
        setCart(false)
        router.push("/")
        resolve();
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

  useEffect(()=>{
    setProfileMenu(false)
    fetchCartSum(cart)
  },[searchParams, router.pathname, cart])

  return (
    <div>
      <nav className={Styles.navbar}>
       <div className={Styles.pass}>
        <div className={Styles.opp}><Link href="/">Fake Store</Link></div>
        <ul>  
          
            <li className={`${Styles.navLi} ${pathname === "/" ? Styles.navLiActive : ""}`}><Link href={"/"}>Home</Link></li>

            <li className={`${Styles.navLi} ${pathname === "/category/electronics" ? Styles.navLiActive : ""}`}><Link href={"/category/electronics"}>Electronics</Link></li>

            <li className={`${Styles.navLi} ${pathname === "/category/jewelery" ? Styles.navLiActive : ""}`}><Link href={"/category/jewelery"}>Jewelery</Link></li>

            <li className={`${Styles.navLi} ${pathname === "/category/men's%20clothing" ? Styles.navLiActive : ""}`}>
              <Link href={"/category/men's clothing"}>Men&apos;s clothing</Link>
            </li>
            
            <li className={`${Styles.navLi} ${pathname === "/category/women's%20clothing" ? Styles.navLiActive : ""}`}><Link href={"/category/women's clothing"}>Women&apos;s clothing</Link></li>
        </ul>
        <div>
          <form onSubmit={(e)=>{ 
            e.preventDefault();
            router.push(`../?search=${searchKeyword}`)  
            }}>
            <input className={Styles.navInput} type="text" id="search" name="search" value={searchKeyword} onChange={searchChangeHandler} placeholder="Search..."/>
            <button className={Styles.navButton} type="submit"><i className="fa-solid fa-magnifying-glass" style={{color: "black"}}></i></button>
          </form>
        </div>
        <div style={{marginRight: "30px"}}>
          <Link href="/cart" >
          {cart && <h4 className={Styles.cartCount}>{cartSum}</h4>}
            <i className={Styles.navIcon + " fas fa-cart-shopping"}/>
          </Link>
            <i onClick={toggleProfileMenu} className={Styles.navIcon + " fas fa-circle-user"}></i>
        </div>
       </div>
      </nav>
      {
      profileMenu
          &&
      <>
      <i className={`fas fa-caret-up ${Styles.profileMenuTip}`}></i>
        <div className={Styles.profileMenu}>
          <ul style={{margin: "0px", paddingLeft: "0px"}}>
          <li style={{listStyle: "none", marginBottom: "13px"}}><i className="fa-solid fa-user" style={{color:"orange", marginRight:"5px"}}></i><Link onClick={()=>setProfileMenu(false)} className={Styles.profileMenuItem} href="/member/profile">Profile</Link></li>
          <li style={{listStyle: "none", marginBottom: "13px"}}><i className="fa-solid fa-address-book" style={{color:"orange", marginRight:"5px"}}></i><Link onClick={()=>setProfileMenu(false)} className={Styles.profileMenuItem} href="/member/address ">Address</Link></li>
          <li style={{listStyle: "none", marginBottom: "13px"}}><i className="fa-solid fa-box" style={{color:"orange", marginRight:"5px"}}></i><Link onClick={()=>setProfileMenu(false)} className={Styles.profileMenuItem} href="/member/orders">Orders</Link></li>
          <li style={{listStyle: "none", marginBottom: "13px"}}><i className="fa-solid fa-heart" style={{color:"orange", marginRight:"5px"}}></i><Link onClick={()=>setProfileMenu(false)} className={Styles.profileMenuItem} href="/member/wishlist">Wish List</Link></li>
          <hr />
          <li style={{listStyle: "none", marginBottom: "5px"}}><i className="fa-solid fa-power-off" style={{color:"red", marginRight:"5px"}}></i><a className={Styles.profileMenuItem} style={{cursor:"pointer"}} onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </>
      }   
    </div>
  )
}
