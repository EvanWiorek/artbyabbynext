import Head from 'next/head'
import Layout from '../../components/Layout'
import { useEffect, useReducer, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
// import { connectMongoDB } from "@/src/libs/MongoConnect";
// import Order from '@/src/models/order.model';
import axios from 'axios';
import { getError } from '@/src/utils/error';
import { toast } from 'react-toastify';

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
        console.log(data);
        // Email.send({
        //   Host: "smtp.elasticemail.com",
        //   Username: 'wiorek.evan@gmail.com',
        //   Password: "33BCE3F0F2479D1EA6B49B489186D0E71057",
        //   To: `${data.customerInfo.email}`,
        //   From: 'wiorek.evan@gmail.com',
        //   Subject: `Your Art By Abby Order Confirmation (#${order._id})`,
        //   Body: `
        //   <div style="background-color: rgba(206,139,139, .8); color: white; width: 70%; margin: 0 auto; border-radius: 5px; padding: 15px; font-family: Trebuchet MS; font-size: 1rem; font-weight: 100">
        //     <p>This is a test</p>

        //   </div>
        //   `
        // })
        //   .then(
        //     message => {
        //       if (message === 'OK') {
        //         toast.success("Order confirmation email sent.")
        //       }
        //       else {
        //         toast.error(message)
        //       }
        //     }
        //   )
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

          {loading ? (<div>Loading...</div>) :
            error ? <div>{error}</div> :


              <div className="col-lg-5 m-auto mt-3">

                <div className="links mb-3 desktop-link d-flex flex-column align-items-end" style={{ marginLeft: `10px`, width: `135px` }} onClick={handleGoBack}>
                  <p><i className="bi bi-arrow-left" style={{ fontSize: `.9rem` }}></i> Back to Home</p>
                  <div className="desktop-link-line"></div>
                </div>

                <div className='roboto'>
                  <h1 className='roboto'>Thank you for your order</h1>
                  <p>An email confirmation has been sent to <b>{order.customerInfo.email}</b></p>
                  <div className="card customer-info">
                    <div className="card-body">
                      <div className="d-flex gap-3">
                        <div className="left-side">
                          <p>Order ID:</p>
                          <p>Order total:</p>
                          <p>Shipping to:</p>
                          <p></p>
                        </div>
                        <div className="right-side">
                          <p><b>{order._id}</b></p>
                          <p><b>
                            {
                              Number.isInteger(order.cartTotal)
                                ? `$${order.cartTotal}.00` : `$${order.cartTotal.toFixed(2)}`
                            }
                          </b></p>
                          <p className='mb-0'><b>{order.customerInfo.fullName}</b></p>
                          <p>{order.customerInfo.address}, {order.customerInfo.city}, {order.customerInfo.userState}, {order.customerInfo.postalCode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card order-details mt-3">
                    <div className="card-body">
                      <h4 className='roboto mb-3'>Order Details</h4>
                      {order.orderItems.map((item, idx) => {
                        return (
                          <div key={idx} className="d-flex align-items-center gap-3" style={{ marginBottom: `15px` }}>
                            <div className="position-relative">
                              <img src={item.productImage} alt={item.productImage} style={{ width: `60px`, borderRadius: `5px` }} className="order-summary-img box-shadow-2" />
                              <span className="position-absolute translate-middle badge rounded-pill single-item-count roboto box-shadow-2">
                                {item.quantity}
                                <span className="visually-hidden">Quantity of Item</span>
                              </span>
                            </div>
                            <p className="mt-2">{item.productName}</p>
                            <p className="mt-2" style={{ position: `absolute`, right: 15 }}><b>
                              {
                                Number.isInteger(item.productPrice)
                                  ? `$${item.productPrice}.00` : `$${item.productPrice.toFixed(2)}`
                              }
                            </b></p>
                          </div>
                        )

                      })}
                      <div className="horizontal-line-gray"></div>
                      <h4 className='roboto mb-3'>Payment Details</h4>
                      <div className="d-flex justify-content-between">
                        <div className="left-side">
                          <p>Payment Method:</p>
                          <p>Subtotal (Including Sales Tax):</p>
                          <p>Shipping:</p>
                          <p>Total:</p>
                          <p></p>
                        </div>
                        <div className="right-side">
                          <p><b>{order.paymentMethod}</b></p>
                          <p><b>                            {
                            Number.isInteger(order.cartTotal)
                              ? `$${order.cartTotal}.00` : `$${order.cartTotal.toFixed(2)}`
                          }</b></p>
                          <p><b>                            {
                            Number.isInteger(order.cartTotal)
                              ? `$${order.cartTotal}.00` : `$${order.cartTotal.toFixed(2)}`
                          }</b></p><p><b>                            {
                            Number.isInteger(order.cartTotal)
                              ? `$${order.cartTotal}.00` : `$${order.cartTotal.toFixed(2)}`
                          }</b></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>}
          <br />
          <br />
          <br />
        </div>

      </main>
    </Layout >
  )
}

export default OneOrder;

