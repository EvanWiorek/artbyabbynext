import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer-body roboto">
      <div className="footer-content col-10 m-auto">
        <br />
        <br />
        <div className="d-flex gap-5 mb-5">
          <div className="column-1 col-lg-4">
          <img src="/static/images/logo.svg" alt="site-logo" className="footer-logo"/>
          <br />
          <br />
            <p className="sub-text">ABOUT ART BY ABBY</p>
            <p className="footer-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati explicabo sequi, quo voluptates ratione totam esse veniam quisquam harum voluptas.</p>
          </div>
          <div className="column-2 col-lg-2">
            <p className="sub-text">READ MORE</p>
            <Link href="/about" className="footer-text">About</Link>
            <br />
            <Link href="/contact" className="footer-text">Contact Us</Link>
            <br />
            <Link href="/return-policy" className="footer-text">Return Policy</Link>
            <br />
            <Link href="/return-policy" className="footer-text">Refund Policy</Link>
          </div>
          <div className="column-3 col-lg-2">
            <p className="sub-text">NAVIGATION</p>
            <Link href="/allproducts" className="footer-text">All Products</Link>
            <br />
            <Link href="/updates" className="footer-text">Stores sales/updates</Link>
            <br />
            <Link href="/lessons" className="footer-text">Virutal Art Lessons</Link>
          </div>
        </div>
        <div className="horizontal-line-gray"></div>
        <p className="sub-text">© All Rights Reserved 2023 · Created by Evan Wiorek</p>
      </div>
    </div>
  )
}

export default Footer;