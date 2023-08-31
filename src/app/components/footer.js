"use client"
import Link from "next/link";
import Styles from "./footer.module.css"
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
  return (
    <div className={`mt-5 text-white ${Styles.footer}`}>
      <div className={`container`}>
        <footer className="py-5">
            <div className="row">
            <div className="col-6 col-md-2 mb-3">
                <h5>Account</h5>
                <ul className={`nav flex-column ${Styles.navList}`}>
                <li className="nav-item mb-2"><Link href="/member/profile" className="nav-link p-0">Profile</Link></li>
                <li className="nav-item mb-2"><Link href="/member/address" className="nav-link p-0">Address</Link></li>
                <li className="nav-item mb-2"><Link href="/member/orders" className="nav-link p-0">Orders</Link></li>
                <li className="nav-item mb-2"><Link href="/member/wishlist" className="nav-link p-0">Wishlist</Link></li>
                </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
                <h5>Section</h5>
                <ul className={`nav flex-column ${Styles.navList}`}>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Home</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Features</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Pricing</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0">FAQs</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0">About</a></li>
                </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
                <h5>Pages</h5>
                <ul className={`nav flex-column ${Styles.navList}`}>
                <li className="nav-item mb-2"><Link href="/" className="nav-link p-0">Home</Link></li>
                <li className="nav-item mb-2"><Link href="/pages/about" className="nav-link p-0">About</Link></li>
                <li className="nav-item mb-2"><Link href="/pages/privacy-policy" className="nav-link p-0">Privacy Policy</Link></li>
                <li className="nav-item mb-2"><Link href="/pages/terms-of-service" className="nav-link p-0">Terms Of Service</Link></li>
                <li className="nav-item mb-2"><Link href="/pages/disclaimer" className="nav-link p-0">Disclaimer</Link></li>
                <li className="nav-item mb-2"><Link href="/pages/faqs" className="nav-link p-0">FAQs</Link></li>
                </ul>
            </div>


            <div className="col-md-5 offset-md-1 mb-3">
                <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what&apos;s new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label for="newsletter1" className="visually-hidden">Email address</label>
                    <input id="newsletter1" type="email" required className="form-control" placeholder="Email address"/>
                    <button className="btn btn-warning" type="submit">Subscribe</button>
                </div>
                </form>
                <div className={`${Styles.socials} mt-5`}>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><a className="link-body-emphasis" target="_blank" href="https://facebook.com"><i className="fa-brands fa-square-facebook" style={{color: "#febd69", fontSize:"30px"}}></i></a></li>
                        <li className="ms-3"><a className="link-body-emphasis" target="_blank" href="https://x.com"><i className="fa-brands fa-square-x-twitter" style={{color: "#febd69", fontSize:"30px"}}></i></a></li>
                        <li className="ms-3"><a className="link-body-emphasis" target="_blank" href="https://instagram.com"><i className="fa-brands fa-square-instagram" style={{color: "#febd69", fontSize:"30px"}}></i></a></li>
                        <li className="ms-3"><a className="link-body-emphasis" target="_blank" href="https://in.linkedin.com"><i className="fa-brands fa-linkedin" style={{color: "#febd69", fontSize:"30px"}}></i></a></li>
                    </ul>
                </div>
            </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-center pt-4 border-top">
            <p>Copyright &copy; FakeStore Inc. 2023, All rights reserved.</p>
            </div>
        </footer>
        </div>
    </div>
  )
}
