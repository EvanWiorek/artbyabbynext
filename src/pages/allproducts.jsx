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
  const [inStockProducts, setInStockProducts] = useState(allProducts.filter((prod) => prod.countInStock > 0));

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
        <div className="body-white" style={{ paddingTop: `130px` }}>
          <div className="col-lg-8 m-auto">
            <h1 className='text-center mb-0 site-font'>All Products</h1>
            <div className="horizontal-line-gray"></div>
          </div>
          <div className="products-container-body">
            <div className="products-container-content d-flex flex-wrap col-lg-8 m-auto gap-3 align-items-center">
              {inStockProducts.map((product) => (
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