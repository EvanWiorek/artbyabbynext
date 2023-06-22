import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
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

function PlaceOrderScreen() {
  const myRef = useRef();
  const router = useRouter();
  const [contentIsVisible, setContentIsVisible] = useState();
  const [cartTotal, setCartTotal] = useState();

  //from useContext
  const { state, dispatch } = useContext(Store)
  const { cart } = state;
  const { cartItems, customerInfo, paymentMethod } = cart;

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
    for(let i = 0; i < cartItems.length; i++) {
      // console.log(cartItems[i]);
      // console.log(cartItems[i].quantity);
      let currentPrice = cartItems[i].productPrice
      
      if(cartItems[i].quantity > 1) {
        currentPrice = cartItems[i].quantity * cartItems[i].productPrice
      }
      priceCount = priceCount + currentPrice
    }
    priceCount = priceCount.toFixed(2)
    setCartTotal(priceCount)

  }, [contentIsVisible, router, customerInfo.address]);

  const handleGoBack = () => {
    router.back();
  };

  // console.log('customerInfo', customerInfo);
  // console.log('paymentMethod', paymentMethod);
  // console.log('cartTotal', cartTotal);
  // console.log('Cart Items:', cartItems);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/api/orders/create', {
      orderItems: cartItems,
      customerInfo,
      paymentMethod,
      cartTotal
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
        )
        router.push(`/orders/${res.data._id}`)
      })
      .catch((err) => {
        console.log(err);
        toast.error(getError(err))
    })
  }

  return (
    <>
      <Head>
        <title>Place Order | Art by Abby</title>
      </Head>
      <div>
        <SiteHeader />
        <div className="page-content roboto" ref={myRef}>
          <main style={{ paddingTop: `100px` }}>

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

                      <div className="card p-3 box-shadow-2">
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

                        <div className="horizontal-line-gray"></div>

                        <div className="edit-place-order-line d-flex align-items-center">
                          <div className="d-flex flex-column-small">
                            <p className="text-secondary" style={{ width: `80px` }}>Payment</p>
                            <p>{paymentMethod}</p>
                          </div>
                          <button type="button" style={{ position: `absolute`, right: `15px`, padding: `4px 7px` }} className="btn-site-pink roboto" onClick={() => router.push('/payment')}>Edit</button>
                        </div>

                      </div>

                    </div>


                  </div>

                  <div className="order-summary">
                    <form onSubmit={(e) => handleSubmit(e)} className="shipping-submit-form">
                      <h4 className="mb-3 roboto order-sum-text">Order Summary</h4>

                      {cartItems.map((item, idx) => {
                        // console.log(item);
                        return (
                          <div className="d-flex align-items-center gap-3" style={{ marginBottom: `15px` }}>
                            <div className="position-relative">
                              <img src={item.productImage} alt={item.productImage} style={{ width: `60px`, borderRadius: `5px` }} className="order-summary-img box-shadow-2" />
                              <span className="position-absolute translate-middle badge rounded-pill single-item-count roboto box-shadow-2">
                                {item.quantity}
                                <span className="visually-hidden">Quantity of Item</span>
                              </span>
                            </div>
                            <p className="mt-2">{item.productName}</p>
                            <p className="mt-2" style={{ position: `absolute`, right: 0 }}>{
                              Number.isInteger(item.productPrice)
                                ? `$${item.productPrice}.00` : `$${item.productPrice.toFixed(2)}`
                            }</p>
                          </div>
                        )

                      })}

                      <div className="horizontal-line-gray mt-4"></div>

                      <div className="d-flex justify-content-between mt-3">
                        <h5>Total</h5>
                        <h5>${cartTotal}</h5>
                      </div>

                      <button type="submit" className="btn-site-pink roboto mt-2" style={{ width: `100%` }}>Place Order</button>

                    </form>
                  </div>

                </div>
              )
            }

          </main>
        </div>
      </div>
    </>
  )

}

export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });