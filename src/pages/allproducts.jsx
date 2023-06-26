import Head from 'next/head'
import Layout from '../components/Layout'
import { useEffect, useRef, useState } from 'react'
import Product from '../models/product.model';
import ProductItem from '../components/ProductItem';
import { connectMongoDB } from '../libs/MongoConnect';

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

const allproducts = ({ isVisible, allProducts }) => {
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setContentIsVisible(entry.isIntersecting)
    })
    observer.observe(myRef.current)

    if (contentIsVisible) {
      document.querySelector(".page-content").style = "opacity: 1;"
    }
    else {
      document.querySelector(".page-content").style = "opacity: 0;"
    }
  }, [contentIsVisible])


  return (
    <Layout home isVisible={isVisible}>
      <Head>
        <title>All Products | Art by Abby</title>
      </Head>
      <main ref={myRef} className='page-content'>

        <div className="body-white" style={{ paddingTop: `100px` }}>
        <h1 className='roboto text-center all-products-title' style={{ fontWeight: 100, fontSize: `3rem` }}>All Products</h1>
          <div className="products-container-body">
            <div className="products-container-content m-auto d-flex gap-4 align-items-center justify-content-center flex-column-small">
              {allProducts.map((product) => (
                <ProductItem product={product} key={product._id} />
              ))}
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
        </div>

      </main>
    </Layout >
  )

}

export default allproducts;