import Head from 'next/head'
import Layout from '@/src/components/Layout';
import { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import data from '@/src/utils/data';
import { Store } from '@/src/utils/Store';
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
  const {query} = useRouter();
  const {slug} = query;
  const product = data.products.find(p => p.slug === slug);
  // if(!product) {
  //   return <div>Product Not Found</div>
  // }

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

  const handleAddToCart = () => {
    const existItem = state.cart.cartItems.find((p) => p.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    //if there is a stock number associated with each product
    if (product.countInStock < quantity) {
      alert('Sorry, item is now out of stock.')
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
  }

  return (
    <Layout>
      <Head>
        <title>{product.name} | Art by Abby</title>
      </Head>
      <main ref={myRef} className='page-content'>

        <div className="body-color" style={{ paddingTop: `100px` }}>
          <h1 className='text-center mt-3 mb-0 site-font'>{product.name}</h1>
          <button className='btn-site-blue roboto' onClick={handleAddToCart}>Add to Cart</button>

        </div>

      </main>
    </Layout >
  )

}

export default ProductDetails;