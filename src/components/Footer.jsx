import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  const handleRoute = (href) => {
    document.querySelector(".pulse-loader").style = "display: flex"
    document.querySelector(".index-container").style = "opacity: .7; filter: saturate(.1)"
    router.push(href)
  }

  return (
    <div className="footer-body roboto">
      <div className="footer-content col-10 m-auto">
        <br />
        <br />
        {/* <div className="d-flex flex-column align-items-center mb-5 desktop-hide">
            <p className="sub-text">ABOUT ART BY ABBY</p>
            <p className="footer-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati explicabo sequi, quo voluptates ratione totam esse veniam quisquam harum voluptas.</p>
          </div> */}
        <div className="d-flex gap-5 mb-5 flex-column-small">
          <div className="column-1 col-lg-4">
          <div className="mobile-hide">
            <img src="/static/images/logo.svg" alt="site-logo" className="footer-logo"/>
            <br />
            <br />
          </div>
            <p className="sub-text">ABOUT ART BY ABBY</p>
            <p className="footer-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati explicabo sequi, quo voluptates ratione totam esse veniam quisquam harum voluptas.</p>
          </div>
          <div className="column-2 col-lg-2">
            <p className="sub-text">READ MORE</p>
            <div onClick={() => handleRoute("/about")} className="footer-text footer-link">About</div>
            <div onClick={() => handleRoute("/contact")} className="footer-text footer-link">Contact Us</div>
            <div onClick={() => handleRoute("/return-policy")} className="footer-text footer-link">Return Policy</div>
            <div onClick={() => handleRoute("/refund-policy")} className="footer-text footer-link">Refund Policy</div>
          </div>
          <div className="column-3 col-lg-2">
            <p className="sub-text">NAVIGATION</p>
            <div onClick={() => handleRoute("/allproducts")} className="footer-text footer-link">All Products</div>
            <div onClick={() => handleRoute("/updates")} className="footer-text footer-link">Stores sales/updates</div>
            <div onClick={() => handleRoute("/lessons")} className="footer-text footer-link">Virutal Art Lessons</div>
          </div>
        </div>
        <div className="horizontal-line-gray"></div>
        <p className="sub-text">© All Rights Reserved 2023 · Created by Evan Wiorek</p>
      </div>
    </div>
  )
}

export default Footer;