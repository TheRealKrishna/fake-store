"use client"
import Styles from "./loader.module.css"
export default function Loader(props) {
  return (
      <span className={Styles.loader} style={{marginTop: props.marginTop ? props.marginTop : "0px", marginBottom: props.marginBottom ? props.marginBottom : "0px"}}></span>
  )
}
