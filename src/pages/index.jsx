import Head from 'next/head'
import Layout from '../components/Layout'
import { useState, useRef, useEffect } from 'react';
import ProductItem from '../components/ProductItem';
import { connectMongoDB } from "@/src/libs/MongoConnect";
import Product from '../models/product.model';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export const getServerSideProps = async () => {
  try {
    await connectMongoDB();
    const allProducts = await Product.find();
    return {
      props: {
        allProducts: JSON.parse(JSON.stringify(allProducts))
      }
    }
  }
  catch (err) {
    console.log(err);
    return {
      notFound: true
    }
  }
}

export default function Home({ allProducts }) {
  const myRef = useRef();
  const [headerIsVisible, setHeaderIsVisible] = useState();
  const router = useRouter();
  const [inStockProducts, setInStockProducts] = useState(allProducts.filter((prod) => prod.countInStock > 0));

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setHeaderIsVisible(entry.isIntersecting)
    })
    observer.observe(myRef.current)

    document.querySelector(".navbar-body").style = "background-color: transparent; backdrop-filter: blur(0); box-shadow: 0px 0px rgba(0,0,0,0)"

    document.getElementById("navbarBody").classList.add("fade-scroll")

    document.querySelector(".desktop-search-input").style = "background-color: transparent; color: white"

    document.querySelector(".desktop-search-input").classList.add("search-input-scroll")

    document.querySelector(".logo-img").classList.add("logo-scroll")

    const blackScrollsArr = document.querySelectorAll(".black-scroll-link")

    for (let i = 0; i < blackScrollsArr.length; i++) {
      blackScrollsArr[i].classList.add("black-scroll")
    }

    setTimeout(() => document.querySelector(".header-content").style = "opacity: 1", 1000)

    setTimeout(() => document.querySelector(".header-video").style = "opacity: 1", 300)

    setTimeout(() => document.querySelector(".header-background").style = "opacity: 1", 100)

    setTimeout(() => document.querySelector(".fade-in-screen").style = "opacity: 0", 100)

    window.addEventListener(
      "scroll",
      () => {
        document.body.style.setProperty(
          "--scroll",
          window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
        );
      },
      false
    );
    // console.log(allProducts);
  }, [headerIsVisible])

  const handleShopButton = () => {
    document.querySelector(".pulse-loader").style = "display: flex"
    document.querySelector(".index-container").style = "opacity: .7; filter: saturate(.1)"

    // setTimeout(() => goToAllProducts(), 10000)
    goToAllProducts()
  }

  const goToAllProducts = () => {
    router.push('/allproducts')
  }

  const handleRoute = (href) => {
    document.querySelector(".pulse-loader").style = "display: flex"
    document.querySelector(".index-container").style = "opacity: .7; filter: saturate(.1)"
    router.push(href)
  }

  return (
    <Layout headerIsVisible={headerIsVisible}>
      <Head>
        <title>Home | Art by Abby</title>
      </Head>
      <main>
        <div className="pulse-loader"></div>
        {/* <div className="loading-overlay"></div> */}
        <div className="index-container">
          <div className="fade-in-screen"></div>
          <div className="parallax-container" ref={myRef}>
            <video src="/static/videos/header-one-small.mp4" className='header-video' autoPlay muted loop></video>
            <div className="header-background">
            </div>
            <div className="header-content col-lg-4 d-flex align-items-center flex-column roboto">
              <h1 className='text-center roboto'>Welcome to Art By Abby</h1>
              <br />
              <h2 className='text-center roboto'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla doloribus exercitationem perspiciatis beatae. Ex nam atque fugiat vero id ullam.</h2>
              <br />
              <button type='button' className='btn-site-pink roboto box-shadow-2' style={{ width: `50%` }} onClick={handleShopButton}>Shop</button>
            </div>
          </div>
          <div className="body-white">
            <br />
            <br />
            <br />
            <br />
            <h1 className='site-font text-center all-products-title'>Featured Products</h1>
            <div className="products-container-body m-auto">
              <div className="products-container-content d-flex flex-wrap col-lg-8 m-auto gap-3 align-items-center">
                {inStockProducts.slice(0,7).map((product) => (
                  <ProductItem product={product} key={product._id} />
                ))}
                <div className="d-flex flex-column align-items-center desktop-link roboto view-all-products-link">
                  <p onClick={() => handleRoute("/allproducts")} style={{ cursor: `pointer`, marginBottom: 0 }}>View All Products</p>
                  <div className="desktop-link-line"></div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>

      </main>
    </Layout >
  )
}
