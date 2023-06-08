
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = ({ isVisible, setIsVisible }) => {
  const router = useRouter();

  useEffect(() => {
    if (isVisible) {
      document.querySelector(".logo-img").style = "width: 200px;"
      document.querySelector(".abby-name").style = "font-size: 1rem;"
    }
    else {
      document.querySelector(".logo-img").style = "width: 130px;"
      document.querySelector(".abby-name").style = "font-size: .6rem;"
    }
  })

  const handleOpenDesktop = () => {
    document.querySelector(".cart-menu-body").style = "width: 20%;"
    document.querySelector(".screen-darken").style = "opacity: 1"
    setTimeout(() => document.querySelector(".cart-menu-content").style = "opacity: 1", 150)
    setTimeout(() => document.querySelector(".cart-menu-body").style = "background-color: rgba(255, 255, 255, 0); width: 20%;", 200)
  }

  const handleOpenMobile = () => {
    document.querySelector(".cart-menu-body").style = "width: 90vw;"
    document.querySelector(".screen-darken").style = "opacity: 1"
    setTimeout(() => document.querySelector(".cart-menu-content").style = "opacity: 1", 150)
    setTimeout(() => document.querySelector(".cart-menu-body").style = "background-color: rgba(255, 255, 255, 0); width: 90vw;", 200)
  }

  const handleClose = () => {
    setTimeout(() => document.querySelector(".cart-menu-body").style = "width: 0; background-color: rgba(255, 255, 255, 1); backdrop-filter: blur(0px) brightness(100%);", 200)
    setTimeout(() => document.querySelector(".screen-darken").style = "opacity: 0", 150)
    document.querySelector(".cart-menu-content").style = "opacity: 0"
  }

  const handleRoute = (href) => {

    if (router.asPath == "/") {
      console.log(router.asPath);
      document.querySelector(".navbar-white").style = "height: 0;"
      document.querySelector(".logo-img").style = "width: 130px;"
      document.querySelector(".abby-name").style = "font-size: .6rem;"
      setTimeout(() => router.push(href), 200)
    }
    if (router.asPath != "/") {
      router.push(href)

    }
  }

  // console.log('from navbar:', cartMenuVisible);

  return <>
    <div>
      <div className="navbar-body pt-3 border-on-bottom">
        <div className="navbar-content d-flex align-items-center justify-content-around col-lg-11 m-auto">
          <div className="left-side-desktop col-3 mobile-hide" >
            <div className="links d-flex custom-gap">
              <p onClick={() => handleRoute("/updates")}>News</p>
              <br />
              <p onClick={() => handleRoute("/lessons")}>Art Lessons</p>
              <br />
              <p onClick={() => handleRoute("/allproducts")}>Browse All Products</p>
            </div>
          </div>
          <div className="left-side-mobile desktop-hide">
            <button style={{ marginTop: `-17px` }}><i className="bi bi-list"></i></button>
          </div>
          <div className="middle site-logo text-center mobile-indent">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <img src="/static/images/logo.svg" alt="site-logo" className="logo-img" />
              <p className="abby-name">Abby Novotny</p>
            </Link>
          </div>

          <div className="right-side-desktop col-3 d-flex align-items-center gap-4 mobile-hide">
            <div className="input-group mb-3 nav-search mobile-hide">
              <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button type="button"><span className="bi-search"></span></button>
              </div>
            </div>
            <button type="button" className="position-relative cart-button mobile-hide" style={{ marginTop: `-17px` }} onClick={handleOpenDesktop}>
              <i className="bi bi-bag" style={{ fontSize: `1rem` }}></i>
              <span className="position-absolute translate-middle badge rounded-pill items-count">
                12
                <span className="visually-hidden">Number of Items in Cart</span>
              </span>
            </button>
          </div>

          <div className="right-side-mobile desktop-hide">
            <button type="button" className="position-relative cart-button" style={{ marginTop: `-17px` }} onClick={handleOpenMobile}>
              <i className="bi bi-bag" style={{ fontSize: `1rem` }}></i>
              <span className="position-absolute translate-middle badge rounded-pill items-count">
                12
                <span className="visually-hidden">Number of Items in Cart</span>
              </span>
            </button>
          </div>

        </div>
      </div>

      <div className="screen-darken"></div>

      <div className='cart-menu-body box-shadow site-font'>
        <div className="cart-menu-content">
          <div className="cart-menu-top">
            <div className='d-flex justify-content-end'>
              <p onClick={handleClose} style={{ marginRight: `10px`, marginTop: `5px`, cursor: `pointer` }}><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgb(124, 126, 128)` }}></i></p>
            </div>
          </div>
          <div className="cart-menu-middle">
            <p>Your cart is currently empty.</p>
          </div>
          <div className="cart-menu-bottom d-flex flex-column">
            <p>Your subtotal today is $14.99. Shipping and taxes will calculated at checkout.</p>
            <Link href="/cart" className='view-cart'>View Cart</Link>
          </div>
        </div>
      </div>

    </div>
  </>
}

export default Navbar;
