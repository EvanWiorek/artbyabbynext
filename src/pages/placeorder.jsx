import Head from "next/head";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Store } from "../utils/Store";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import CheckoutWizard from "../components/CheckoutWizard";
import SiteHeader from "../components/SiteHeader";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Link from "next/link";
import { getError } from "../utils/error";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Footer from "../components/Footer";

function reducer(state, action) {
  switch (action.type) {
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload }
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' }
    default:
      state;
  }
}

function PlaceOrderScreen() {
  const myRef = useRef();
  const router = useRouter();
  const [contentIsVisible, setContentIsVisible] = useState();
  const [cartTotal, setCartTotal] = useState();
  const [shippingTotal, setShippingTotal] = useState();
  const [subTotal, setSubTotal] = useState();
  const [paypalOrder, setPaypalOrder] = useState();
  const [salesTax, setSalesTax] = useState();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { state, dispatch } = useContext(Store)
  const { cart } = state;
  const { cartItems, customerInfo } = cart;
  // const [{successPay, loadingPay}] = useReducer(reducer)
  const [{ successPay, loadingPay }] = useReducer(reducer, {
    successPay: false,
    loadingPay: false
  })

  //if successpay, create order and route to order page

  useEffect(() => {
    if (!customerInfo.address) {
      router.push('/shipping');
    }

    if (cartItems.length < 1) {
      router.push('/shipping');
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setContentIsVisible(entry.isIntersecting);
    });
    observer.observe(myRef.current);

    if (contentIsVisible) {
      document.querySelector(".page-content").style = "opacity: 1;";
    } else {
      document.querySelector(".page-content").style = "opacity: 0;";
    }

    let priceCount = 0;
    let shippingCount = 0;
    let itemIds = []
    console.log(cartItems);
    for (let i = 0; i < cartItems.length; i++) {
      let currentPrice = cartItems[i].productPrice
      if (!itemIds.includes
        (cartItems[i].originalId)) {
        itemIds.push(cartItems[i].originalId);
        shippingCount = shippingCount + cartItems[i].shippingCost
      }

      if (cartItems[i].quantity > 1) {
        currentPrice = cartItems[i].quantity * cartItems[i].productPrice
      }
      priceCount = priceCount + currentPrice
    }
    let taxes = priceCount + (priceCount * .06)
    taxes = taxes - priceCount
    let taxes2 = taxes.toFixed(2)
    setSalesTax(taxes2)

    let priceCount2 = priceCount.toFixed(2)
    setSubTotal(priceCount2)

    let shippingCount2 = shippingCount.toFixed(2)
    setShippingTotal(shippingCount2)

    let final = priceCount + taxes + shippingCount
    final = final.toFixed(2)
    setCartTotal(final)

    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/keys/paypal');
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    }
    loadPaypalScript();

    setPaypalOrder({
      cartItems,
      customerInfo,
      cartTotal
    })

  }, [contentIsVisible, router, customerInfo.address, paypalDispatch, successPay]);

  const handleGoBack = () => {
    router.back();
  };

  // console.log('customerInfo', customerInfo);
  // console.log('paymentMethod', paymentMethod);
  // console.log('cartTotal', cartTotal);
  // console.log('Cart Items:', cartItems);


  const addOrderToDB = () => {
    axios.post('/api/orders/create', {
      orderItems: cartItems,
      customerInfo,
      cartTotal,
      shippingTotal,
      salesTax,
      subTotal
    })
      .then((res) => {
        console.log(res.data);
        
        Email.send({
          Host: "smtp.elasticemail.com",
          Username: 'artbyabbystore@gmail.com',
          Password: "7C3910F614C948FBFB64543DB30349BCF6FB",
          To: `${res.data.customerInfo.email}`,
          From: 'artbyabbystore@gmail.com',
          Subject: `Order Confirmation - Art By Abby - ${res.data._id}`,
          Body: `
          <div style="width: 40%; margin: 0 auto; font-family: Trebuchet MS; font-size: 1rem; font-weight: 100;">
          <div style="text-align: center;">
            <img src="https://ci3.googleusercontent.com/proxy/ISWk4XgrVMPDFscKfJjxO1J3oDT2yV7SnOOFO3o-aSMOwz2HY-bemqhUBwb3mWOA5zg=s0-d-e1-ft#https://i.imgur.com/7ueOWLt.png" alt="logo" style="width: 80px;">
            <h2 style="font-weight: 100;">Order Confirmation</h2>
          </div>
          <div style="height: .5px; width: 100%; background-color: rgba(0,0,0,.1); margin-top: 10px; margin-bottom: 10px;">
          </div>
          <h3 style="font-weight: 100;">Hi ${res.data.customerInfo.fullName},</h3>
          <h3 style="font-weight: 100;">Thank you for your order! We will let you know as soon as your items ship.</h3>

          <h4>
          <span style="color: rgba(0,0,0,.5)">Order ID:</span>
          <a href="https://artbyabby.app/orders${res.data._id}"
          style="color: rgb(206, 139, 139); text-decoration: none;">${res.data._id}</a>
          </h4>
          <div style="width: 100%; padding: 10px 0px; border: 0; background-color: rgb(206, 139, 139); text-align: center;">
            <a href="https://artbyabby.app/orders${res.data._id}" style="color: white; text-decoration: none; font-weight: 100;">View Order</a>
          </div>
          <br>
          <h4 style="text-align: center; font-weight: 100;">Thank you for your order, and we hope to see you again soon!</h4>
          <br>
          <br>
        </div>
            `
        })
          .then(
            message => {
              if (message === 'OK') {

              }
              else {
                toast.error(message)
              }
            }
          )

          Email.send({
            Host: "smtp.elasticemail.com",
            Username: 'artbyabbystore@gmail.com',
            Password: "7C3910F614C948FBFB64543DB30349BCF6FB",
            To: `artbyabbystore@gmail.com`,
            From: 'artbyabbystore@gmail.com',
            Subject: `You have a new order! - Art By Abby - ${res.data._id}`,
            Body: `
            <div style="width: 40%; margin: 0 auto; font-family: Trebuchet MS; font-size: 1rem; font-weight: 100;">
            <div style="text-align: center;">
              <img src="https://ci3.googleusercontent.com/proxy/ISWk4XgrVMPDFscKfJjxO1J3oDT2yV7SnOOFO3o-aSMOwz2HY-bemqhUBwb3mWOA5zg=s0-d-e1-ft#https://i.imgur.com/7ueOWLt.png" alt="logo" style="width: 80px;">
              <h2 style="font-weight: 100;">Order Confirmation</h2>
            </div>
            <div style="height: .5px; width: 100%; background-color: rgba(0,0,0,.1); margin-top: 10px; margin-bottom: 10px;">
            </div>
            <h3 style="font-weight: 100;">Hi Abby,</h3>
            <h3 style="font-weight: 100;">You have a new order!</h3>
            <h4>
            <span style="color: rgba(0,0,0,.5)">Order ID:</span>
            <a href="https://artbyabby.app/adminpage"
            style="color: rgb(206, 139, 139); text-decoration: none;">${res.data._id}</a>
            </h4>
            <div style="width: 100%; padding: 10px 0px; border: 0; background-color: rgb(206, 139, 139); text-align: center;">
              <a href="https://artbyabby.app/adminpage" style="color: white; text-decoration: none; font-weight: 100;">View Orders</a>
            </div>
            <br>
            <br>
            <br>
          </div>
              `
          })
            .then(
              message => {
                if (message === 'OK') {
                  
                }
                else {
                  toast.error(message)
                }
              }
            )

        dispatch({ type: 'CART_CLEAR_ITEMS' });
        Cookies.set(
          'cart',
          JSON.stringify({
            ...cart,
            cartItems: [],
          })
        )

        //need to remove from stock for each item
        let ordersHash = {}
        for(let i = 0; i < res.data.orderItems.length; i++) {
          //if the product id is not already in the ids array, add it

          if(res.data.orderItems[i].originalId in ordersHash) {
            ordersHash[res.data.orderItems[i].originalId] = ordersHash[res.data.orderItems[i].originalId] + res.data.orderItems[i].quantity
          }
          else {
            ordersHash[res.data.orderItems[i].originalId] = res.data.orderItems[i].quantity
          }
        }

        for (const item in ordersHash) {
          axios.get(`/api/products/${item}`)
          .then((res) => {
            console.log(res.data);
            let updatedCountInStock = res.data.countInStock
            updatedCountInStock = updatedCountInStock - ordersHash[item]
            
            axios.post(`/api/products/update/${item}`, {
              countInStock: updatedCountInStock
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err))
          })

        }
        

        router.push(`/orders/${res.data._id}`)
      })
      .catch((err) => {
        console.log(err);
        toast.error(getError(err))
      })
  }

  const createOrder = (data, actions) => {
    // console.log(order);
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: cartTotal }
        }
      ]
    }).then((orderId) => {
      return orderId
    })
  }

  const onApprove = (data, actions) => {
    // console.log('THIS IS A TEST');
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        dispatch({ type: 'PAY_SUCCESS', payload: data })
        addOrderToDB();
        toast.success('Thank you for your order!')
      }
      catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast(`${getError(err)} | this is a test`);
      }
    })
  }

  const onError = (err) => {
    toast(getError(err));
  }

  return (
    <>
      <Head>
        <title>Place Order | Art by Abby</title>
      </Head>
      <div>
        <SiteHeader />
        <div className="page-content roboto" ref={myRef}>
          <main>

            <div className="body-white" style={{ paddingTop: `120px` }}>
              {cartItems.length === 0 ? (
                <div className="text-center mt-5">
                  <h2 className="roboto">Your cart is empty.</h2>
                  <br />
                  <div
                    className="links desktop-link d-flex flex-column align-items-end m-auto"
                    style={{ marginLeft: `10px`, width: `280px` }}
                    onClick={handleGoBack}
                  >
                    <p className="roboto" style={{ fontSize: `1.7rem` }}>
                      <i class="bi bi-arrow-left" style={{ fontSize: `1.5rem` }}></i>{" "}
                      Click here to go Back
                    </p>
                    <div className="desktop-link-line"></div>
                  </div>
                </div>
              )
                : (
                  <div className="d-flex col-lg-9 m-auto flex-column-small justify-content-between">

                    <div
                      className="links desktop-link d-flex flex-column align-items-end prev-page"
                      style={{ marginLeft: `10px`, width: `119px`, marginTop: `10px`, height: `30px` }}
                      onClick={handleGoBack}
                    >
                      <p className="roboto">
                        <i class="bi bi-arrow-left" style={{ fontSize: `.9rem` }}></i>{" "}
                        Previous Page
                      </p>
                      <div className="desktop-link-line"></div>
                    </div>
                    <div className="col-lg-6">
                      <div className="order-page-wizard">
                        <CheckoutWizard activeStep={2} />
                      </div>
                      <div className="shipping-submit-form m-auto" style={{ paddingBottom: `20px` }}>
                        <h3 className="mb-2 roboto">Place Order</h3>
                        <div className="rounded p-3 box-shadow-2">
                          <div className="edit-place-order-line d-flex align-items-center">
                            <div className="d-flex flex-column-small">
                              <p className="text-secondary" style={{ width: `80px` }}>Contact</p>
                              <p style={{ width: `80%` }}>{customerInfo.email}, {customerInfo.phoneNumber}</p>
                            </div>
                            <button style={{ position: `absolute`, right: `15px`, padding: `4px 7px` }} type="button" className="btn-site-pink roboto" onClick={() => router.push('/shipping')}>Edit</button>
                          </div>
                          <div className="horizontal-line-gray"></div>
                          <div className="edit-place-order-line d-flex align-items-center">
                            <div className="d-flex flex-column-small">
                              <p className="text-secondary" style={{ width: `80px` }}>Ship to</p>
                              <p style={{ width: `80%` }}>{customerInfo.address}, {customerInfo.city}, {customerInfo.userState},  {customerInfo.postalCode}, {customerInfo.country}</p>
                            </div>
                            <button type="button" style={{ position: `absolute`, right: `15px`, padding: `4px 7px` }} className="btn-site-pink roboto" onClick={() => router.push('/shipping')}>Edit</button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded box-shadow-2 p-4 d-flex flex-column gap-4 order-items-list-mobile m-auto">
                        {cartItems.map((item, idx) => {
                          return (
                            <div key={idx} className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-3">
                                <div className="position-relative">
                                  <img src={item.productImage} alt={item.productImage} style={{ width: `60px`, borderRadius: `5px` }} className="order-summary-img box-shadow-2" />
                                  <span className="position-absolute translate-middle badge rounded-pill single-item-count roboto box-shadow-2">
                                    {item.quantity}
                                    <span className="visually-hidden">Quantity of Item</span>
                                  </span>
                                </div>
                                <p className="mt-2">{item.productName}</p>
                              </div>
                              <p className="mt-2">{
                                Number.isInteger(item.productPrice)
                                  ? `$${item.productPrice}.00` : `$${item.productPrice.toFixed(2)}`
                              }</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="order-summary rounded box-shadow-2 p-4">
                    <h4 className="mb-3 roboto order-sum-text">Order Summary</h4>
                        <div className="d-flex justify-content-between mt-4 mb-0">
                          <h6 className="roboto">Sub Total</h6>
                          <h6 className="roboto">${subTotal}</h6>
                        </div>
                        <div className="horizontal-line-gray"></div>
                        <div className="d-flex justify-content-between mt-3">
                          <h6 className="roboto">Shipping</h6>
                          <h6 className="roboto">${shippingTotal}</h6>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                          <h6 className="roboto">Sales Tax</h6>
                          <h6 className="roboto">${salesTax}</h6>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                          <h5 className="roboto">Total</h5>
                          <h5 className="roboto">${cartTotal}</h5>
                        </div>
                        <div className="mt-2">
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                        {loadingPay && <p>Loading...</p>}
                    </div>
                  </div>
                )
              }
              <br />
              <br />
              <br />
            </div>
            <Footer />

          </main>
        </div>
      </div>
    </>
  )

}

export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });