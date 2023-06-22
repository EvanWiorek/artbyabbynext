import Head from 'next/head'
import Layout from '../../components/Layout'
import { useEffect, useReducer, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
// import { connectMongoDB } from "@/src/libs/MongoConnect";
// import Order from '@/src/models/order.model';
import axios from 'axios';
import { getError } from '@/src/utils/error';

// export const getServerSideProps = async (context) => {
//   const routeId = context.params.orderId
//   console.log(routeId);
//   try {
//     await connectMongoDB();
//     const oneOrder = await Order.findOne({ _id: routeId });
//     return {
//       props: {
//         oneOrder: JSON.parse(JSON.stringify(oneOrder))
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

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const OneOrder = ({ isVisible, oneOrder }) => {
  const myRef = useRef();
  const [contentIsVisible, setContentIsVisible] = useState();
  const router = useRouter();
  const { query } = useRouter();
  const orderId = query.orderId;

  const [
    { loading, error, order },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: ''
  })

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      }
      catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }

  }, [order, orderId])

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


  const handleGoBack = () => {
    router.push("/")
  }

  return (
    <Layout home isVisible={isVisible}>
      <Head>
        <title>Order Completed | Art by Abby</title>
      </Head>
      <main ref={myRef} className='page-content'>

        <div className="body-white" style={{ paddingTop: `100px` }}>

          <div className="col-lg-5 m-auto mt-3">

            <div className="links mb-3 desktop-link d-flex flex-column align-items-end" style={{ marginLeft: `10px`, width: `135px` }} onClick={handleGoBack}>
              <p><i className="bi bi-arrow-left" style={{ fontSize: `.9rem` }}></i> Back to Home</p>
              <div className="desktop-link-line"></div>
            </div>

            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Order ID: {oneOrder._id}</h4>
              <hr />
              <p>Thank you for your order!</p>
              <p className="mb-0">The order details have been sent to your email address.</p>
            </div>

          </div>

        </div>

      </main>
    </Layout >
  )
}

export default OneOrder;

