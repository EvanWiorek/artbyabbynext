
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = ({ headerIsVisible }) => {
  const router = useRouter();

  useEffect(() => {
    if (headerIsVisible) {
      document.querySelector(".logo-img").style = "width: 200px;"
      document.querySelector(".abby-name").style = "font-size: 1rem;"
    }
    else {
      document.querySelector(".logo-img").style = "width: 130px;"
      document.querySelector(".abby-name").style = "font-size: .6rem;"
    }
  })

  const closeSideMenu = () => {
    if (document.querySelector(".cart-menu-body").style.width == "80vw" || document.querySelector(".cart-menu-body").style.width == "20%") {
      handleCloseCart();
    }
    if (document.querySelector(".mobile-menu-body").style.width == "80vw") {
      handleCloseMobileMenu();
    }
  }

  const handleOpenCartDesktop = () => {
    document.querySelector(".cart-menu-body").style = "width: 20%;"
    document.querySelector(".screen-darken").style = "display: block"
    setTimeout(() => document.querySelector(".screen-darken").style = "display: block; opacity: 1", 100)
    setTimeout(() => document.querySelector(".cart-menu-content").style = "opacity: 1", 150)
    setTimeout(() => document.querySelector(".cart-menu-body").style = "background-color: rgba(255, 255, 255, 0); width: 20%;", 200)
  }

  const handleOpenCartMobile = () => {
    document.querySelector(".mobile-menu-content").style = "display: none"
    document.querySelector(".cart-menu-body").style = "width: 80vw;"
    document.querySelector(".screen-darken").style = "display: block"
    setTimeout(() => document.querySelector(".screen-darken").style = "display: block; opacity: 1", 100)
    setTimeout(() => document.querySelector(".cart-menu-content").style = "opacity: 1", 150)
    setTimeout(() => document.querySelector(".cart-menu-body").style = "background-color: rgba(255, 255, 255, 0); width: 80vw;", 200)
  }

  const handleCloseCart = () => {
    setTimeout(() => document.querySelector(".cart-menu-body").style = "width: 0px; background-color: rgba(255, 255, 255, 1); backdrop-filter: blur(0px) brightness(100%);", 200)
    setTimeout(() => document.querySelector(".screen-darken").style = "opacity: 0; display: block; transition: .2s", 200)
    setTimeout(() => document.querySelector(".screen-darken").style = "display: none", 600)
    document.querySelector(".cart-menu-content").style = "opacity: 0"
  }

  const handleOpenMobileMenu = () => {
    document.querySelector(".mobile-menu-body").style = "width: 80vw;"
    document.querySelector(".screen-darken").style = "display: block"
    setTimeout(() => document.querySelector(".screen-darken").style = "display: block; opacity: 1", 100)
    setTimeout(() => document.querySelector(".mobile-menu-content").style = "opacity: 1", 150)
    setTimeout(() => document.querySelector(".mobile-menu-body").style = "background-color: rgba(255, 255, 255, 0); width: 80vw;", 200)
  }

  const handleCloseMobileMenu = () => {
    setTimeout(() => document.querySelector(".mobile-menu-body").style = "width: 0px; background-color: rgba(255, 255, 255, 1); backdrop-filter: blur(0px) brightness(100%);   pointer-events: none;", 200)
    setTimeout(() => document.querySelector(".screen-darken").style = "opacity: 0; display: block; transition: .2s", 200)
    setTimeout(() => document.querySelector(".screen-darken").style = "display: none", 600)
    document.querySelector(".mobile-menu-content").style = "opacity: 0"
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
            <button style={{ marginTop: `-17px` }} onClick={handleOpenMobileMenu}><i className="bi bi-list"></i></button>
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
            <button type="button" className="position-relative cart-button mobile-hide" style={{ marginTop: `-17px` }} onClick={handleOpenCartDesktop}>
              <i className="bi bi-bag" style={{ fontSize: `1rem` }}></i>
              <span className="position-absolute translate-middle badge rounded-pill items-count">
                12
                <span className="visually-hidden">Number of Items in Cart</span>
              </span>
            </button>
          </div>

          <div className="right-side-mobile desktop-hide">
            <button type="button" className="position-relative cart-button" style={{ marginTop: `-17px` }} onClick={handleOpenCartMobile}>
              <i className="bi bi-bag" style={{ fontSize: `1rem` }}></i>
              <span className="position-absolute translate-middle badge rounded-pill items-count">
                12
                <span className="visually-hidden">Number of Items in Cart</span>
              </span>
            </button>
          </div>

        </div>
      </div>

      <div className="screen-darken" onClick={closeSideMenu}></div>

      <div className='cart-menu-body box-shadow site-font'>
        <div className="cart-menu-content">
          <div className="cart-menu-top">
            <div className='d-flex justify-content-end'>
              <p onClick={handleCloseCart} style={{ marginRight: `15px`, marginTop: `10px`, cursor: `pointer` }}><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgb(124, 126, 128)` }}></i></p>
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

      <div className='mobile-menu-body box-shadow site-font'>
        <div className="mobile-menu-content">
          <div className="mobile-menu-top">
            <div className='d-flex justify-content-end'>
              <p onClick={handleCloseMobileMenu} style={{ marginRight: `15px`, marginTop: `10px`, cursor: `pointer` }}><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgb(124, 126, 128)` }}></i></p>
            </div>
          </div>
          <div className="mobile-menu-links site-font">
            <Link href="/updates">News</Link>
            <br />
            <br />
            <Link href="/lessons">Art Lessons</Link>
            <br />
            <br />
            <Link href="/allproducts">Browse All Products</Link>
            <br />
            <br />
            <div className="horizontal-line m-auto"></div>
            <br />
            <div className="input-group mb-3 mobile-nav-search">
              <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button type="button"><span className="bi-search"></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </>
}

export default Navbar;
