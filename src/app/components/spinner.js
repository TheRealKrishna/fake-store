"use client"
import Styles from "./spinner.module.css"
export default function Spinner() {
  return (
    <div style={{width:"90px", height:"24px"}}>
      <span className={Styles.ldsDualRing}></span>
    </div>
  )
}
