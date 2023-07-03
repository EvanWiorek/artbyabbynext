import Head from 'next/head'
import Layout from '../components/Layout'
import { useState, useRef, useEffect } from 'react';
import ProductItem from '../components/ProductItem';
import { connectMongoDB } from "@/src/libs/MongoConnect";
import Product from '../models/product.model';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import AbbyPost from '../models/post.model';

export const getServerSideProps = async () => {
  try {
    await connectMongoDB();
    const allProducts = await Product.find();
    const allLessons = await AbbyPost.find({ isLesson: true });
    return {
      props: {
        allProducts: JSON.parse(JSON.stringify(allProducts)),
        allLessons: JSON.parse(JSON.stringify(allLessons))
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

export default function Home({ allProducts, allLessons }) {
  const myRef = useRef();
  const [headerIsVisible, setHeaderIsVisible] = useState();
  const router = useRouter();
  const [inStockProducts, setInStockProducts] = useState(allProducts.filter((prod) => prod.countInStock > 0));

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setHeaderIsVisible(entry.isIntersecting)

      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
        }
      })
    })
    observer.observe(myRef.current)

    const fadeIns = document.querySelectorAll(".io-fade-in");

    fadeIns.forEach(fadeIn => {
      observer.observe(fadeIn)
    })

    const fadeInSlows = document.querySelectorAll(".io-fade-in-slow");

    fadeInSlows.forEach(fadeIn => {
      observer.observe(fadeIn)
    })

    const fadeInUps = document.querySelectorAll(".io-fade-in-up");

    fadeInUps.forEach(fadeIn => {
      observer.observe(fadeIn)
    })

    const fadeInRights = document.querySelectorAll(".io-fade-in-right");

    fadeInRights.forEach(fadeIn => {
      observer.observe(fadeIn)
    })

    const fadeInZoomOuts = document.querySelectorAll(".io-fade-in-zoom-out");

    fadeInZoomOuts.forEach(fadeIn => {
      observer.observe(fadeIn)
    })

    const fadeInZoomIns = document.querySelectorAll(".io-fade-in-zoom-in");

    fadeInZoomIns.forEach(fadeIn => {
      observer.observe(fadeIn)
    })

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

  const getTrueURL = (videoURL) => {
    if (videoURL.length > 28) {
      const stepOne = videoURL.split("v=")[1];
      const stepTwo = stepOne.split("&")[0]
      return stepTwo;
    }
    else {
      const stepOne = videoURL.split("e/")[1];
      return stepOne;
    }
  }

  return (
    <Layout headerIsVisible={headerIsVisible}>
      <Head>
        <title>Home | Art by Abby</title>
      </Head>
      <main>
        <div className="pulse-loader"></div>
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
          <div className="body-pink">
            <br />
            <br />
            <br />
            <br />
            <h1 className='site-font text-center all-products-title io-fade-in'>Featured Products</h1>
            <br />
            <br />
            <div className="products-container-body m-auto io-fade-in-zoom-in">
              <div className="products-container-content d-flex flex-wrap col-lg-8 m-auto gap-3 align-items-center">
                {inStockProducts.slice(0, 7).map((product) => (
                  <ProductItem product={product} key={product._id} />
                ))}
                <div className="d-flex flex-column align-items-center desktop-link roboto view-all-products-link">
                  <p onClick={() => handleRoute("/allproducts")} style={{ cursor: `pointer`, marginBottom: 0, fontSize: `1.2rem` }}>View All Products</p>
                  <div className="desktop-link-line"></div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="body-blue io-fade-in-slow">
              <br />
              <h1 className='site-font text-center all-products-title io-fade-in-right'>Join me in an art lesson!</h1>
              <br />
              <br />
              <div className="d-flex col-lg-10 m-auto gap-5">
                <iframe src={`https://www.youtube.com/embed/${getTrueURL(allLessons[0].videoURL)}`} className='one-lesson-video col-lg-6 box-shadow-2 io-fade-in-zoom-out'>
                </iframe>
                <div className='mt-3 m-auto roboto details-content io-fade-in-right' dangerouslySetInnerHTML={{ __html: allLessons[0].postContent }} />
              </div>
              <br />
              <br />
              <div className="d-flex flex-column align-items-center desktop-link roboto view-all-products-link io-fade-in-right" style={{ width: `150px` }}>
                <p onClick={() => handleRoute("/lessons")} style={{ cursor: `pointer`, marginBottom: 0, fontSize: `1.2rem` }} className='io-fade-in-right'>View All Lessons</p>
                <div className="desktop-link-line"></div>
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>

      </main>
    </Layout >
  )
}
