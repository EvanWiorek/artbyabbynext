import Head from 'next/head'
import Layout from '../components/Layout'
import { useState, useRef, useEffect } from 'react';
import data from '../utils/data'
import ProductItem from '../components/ProductItem';
import { connectMongoDB } from "@/src/libs/MongoConnect";
import Product from '../models/product.model';

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setHeaderIsVisible(entry.isIntersecting)
    })
    observer.observe(myRef.current)

    document.getElementById("navbarBody").classList.add("fade-scroll")

    const showArrow = () => {
      document.querySelector(".fade-scroll").style.display = "block";
    }
  
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
  }, [headerIsVisible])



  return (
    <Layout headerIsVisible={headerIsVisible}>
      <Head>
        <title>Home | Art by Abby</title>
      </Head>
      <main>
        {/* <div className="navbar-white"></div> */}

        <div className="parallax-container" ref={myRef}>
          <video src="/static/videos/header-one.mp4" autoPlay muted loop></video>
        </div>

        <div className="body-white">
          <br />
          <br />
          <br />
          <br />
          <div className="products-container-body">
            <div className="products-container-content m-auto d-flex gap-3 align-items-center col-lg-9">
              <h1 className='site-font'>All Products</h1>
              {/* {data.products.map((product) => (
                <ProductItem product={product} key={product.slug} />
              ))} */}
              {allProducts.map((product) => (
                <ProductItem product={product} key={product._id} />
              ))}
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

      </main>
    </Layout >
  )
}
