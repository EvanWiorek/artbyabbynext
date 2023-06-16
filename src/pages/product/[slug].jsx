import Head from 'next/head'
import Layout from '@/src/components/Layout';
import { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import data from '@/src/utils/data';
import { Store } from '@/src/utils/Store';
import { toast } from 'react-toastify';

// import { connectMongoDB } from "@/src/libs/MongoConnect";
// import AbbyPost from "@/src/models/post.model";

// export const getServerSideProps = async () => {
//   try {
//     console.log('FROM lessons.jsx PAGE');
//     await connectMongoDB();
//     const allLessons = await AbbyPost.find({ isLesson: true });
//     return {
//       props: {
//         allLessons: JSON.parse(JSON.stringify(allLessons))
//       }
//     }
//   }
//   catch (err) {
//     console.log(err);
//     return {
//       notFound: true
//     }
//   }
// }

const ProductDetails = () => {
  const { state, dispatch } = useContext(Store);
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();
  const { query } = useRouter();
  const { slug } = query;
  const productData = data.products.find(p => p.slug === slug);
  const [productDataLoaded, setProductDataLoaded] = useState();
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  //this lines up with the product price, the priceOption.name
  const [productPriceOption, setProductPriceOption] = useState();
  const [productOptionTwo, setProductOptionTwo] = useState();
  const [productImage, setProductImage] = useState();


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

    if (productData) {
      setProductDataLoaded(true)
    }

    if (!productData) {
      setProductDataLoaded(false)
    }
  }, [contentIsVisible])

  const handlePriceOptions = () => {

  }

  const changeMainPicture = (optionName) => {

  }

  const handleAddToCart = () => {
    //need to change the 'productData' below to createdProduct or something
    const existItem = state.cart.cartItems.find((p) => p.slug === productData.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    //if there is a stock number associated with each product
    if (productData.countInStock < quantity) {
      toast('Sorry, item is out of stock.')
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...productData, quantity } })
  }

  return (
    <Layout>
      <Head>
        {/* <title>{product.name} | Art by Abby</title> */}
      </Head>
      <main ref={myRef} className='page-content'>

        {productDataLoaded && <div className="body-color" style={{ paddingTop: `100px` }}>
          <div className="product-details-container mt-3 pb-5 col-lg-9 m-auto">
            <div className="d-flex gap-4">
              <div className="images-viewer d-flex">
                <div className="side-images d-flex flex-column gap-2 mobile-hide" style={{ marginRight: `10px` }}>
                  {productData.images.map((image, idx) => (
                    <img src={image} alt={productData} key={idx} />
                  ))}
                  {productData.priceOptions.map((option) => (
                    option.images.map((image, idx) => (
                      <img key={idx} src={image} alt={option.name} id={option.name} />
                    ))
                  ))}
                </div>
                <div className="main-image">
                  <img src={productData.images[0]} alt={productData.name} />
                </div>
              </div>
              <div>
                <h1 className='roboto' style={{ fontWeight: `100` }}>{productData.name}</h1>
                <h4 className='roboto' style={{ fontWeight: `300` }}>{productData.description}</h4>
                <br />
                <div className='form-floating thin-floating'>
                  <select className='form-select thin-select' id="priceOptions" onChange={handlePriceOptions} value={productPriceOption}>
                    {productData.priceOptions.map((po) => (
                      <option value={po.optionName} onClick={() => changeMainPicture(po.optionName)}>{po.optionName}</option>
                    ))}
                  </select>
                  <label htmlFor="productPriceOption"></label>
                </div>
                <br />
                <br />
                <button className='btn-site-blue roboto' onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>

          </div>

        </div>}

      </main>
    </Layout >
  )

}

export default ProductDetails;