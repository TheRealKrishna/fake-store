"use client"
import Styles from "./page.module.css"
import { useRouter } from "next/navigation"
import Loader from "@/app/components/loader";

export default function Page() {
  return(
    <>
      <i className={`fa-solid fa-circle-user ${Styles.avatar}`}></i>
      <div className={Styles.name}>
        <label htmlFor="firstName" style={{position:"absolute", top:"306px", left:"424px", color:"gray"}}>first name</label>
        <input type="text" id="firstName" style={{marginLeft:"0px"}}className={Styles.input} name="firstName"/>
        <label htmlFor="lastName" style={{position:"absolute", top:"306px", right:"592px", color:"gray"}}>last name</label>
        <input type="text" id="firstName" className={Styles.input} name="lastName"/>
      </div>
      <div className="gender">
        <label htmlFor="male">Male</label>
        <input className={Styles.inputRadio} type="radio" id="male" name="gender" value={"male"}/>
        <label htmlFor="female">Female</label>
        <input className={Styles.inputRadio} type="radio" id="female" name="gender" value={"female"} />
      </div>
    </>
  )
}
