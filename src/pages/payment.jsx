import Head from "next/head";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useRef, useState } from "react";
import { Store } from "../utils/Store";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import CheckoutWizard from "../components/CheckoutWizard";
import SiteHeader from "../components/SiteHeader";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function PaymentScreen() {
  const myRef = useRef();
  const router = useRouter();
  const [contentIsVisible, setContentIsVisible] = useState();
  const [userPaymentMethod, setUserPaymentMethod] = useState('');
  const [userPaymentMethodError, setUserPaymentMethodError] = useState('');
  const { state, dispatch } = useContext(Store)
  const { cart } = state;
  const {
    cart: { cartItems },
  } = state;
  const { customerInfo, paymentMethod } = cart;

  let formIsValid = false;
  formIsValid = userPaymentMethodError === null;

  useEffect(() => {
    if (!customerInfo.address) {
      router.push('/shipping');
    }

    if (cartItems.length < 1) {
      router.push('/shipping');
    }

    if (paymentMethod) {
      setUserPaymentMethod(paymentMethod);
      setUserPaymentMethodError(null)
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
  }, [contentIsVisible, paymentMethod, router, customerInfo.address]);

  const handleGoBack = () => {
    router.back();
  };

  const handlePaymentMethod = (payment) => {
    setUserPaymentMethod(payment);
    setUserPaymentMethodError(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid === false) {
      return toast('Payment method is required.', { position: 'top-right', className: 'roboto' })
    }
    else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: userPaymentMethod })
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          paymentMethod: userPaymentMethod,
        })
      )
      router.push('/placeorder')
    }
  }

  return (
    <>
      <Head>
        <title>Payment Method | Art by Abby</title>
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
                <div className="d-flex col-lg-8 m-auto  flex-column-small">

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

                  <div className="col-lg-8 m-auto">
                    <CheckoutWizard activeStep={1} />
                    <form onSubmit={(e) => handleSubmit(e)} className="shipping-submit-form m-auto" style={{ paddingBottom: `20px` }}>

                      <h3 className="mb-2 roboto">Select Payment Method</h3>

                      {
                        ['Paypal', 'Stripe', 'CashOnDelivery'].map((payment) => (
                          <div key={payment}>
                            <input type="radio" name="userPaymentMethod" id={payment} checked={userPaymentMethod === payment} onChange={() => handlePaymentMethod(payment)} />
                            <label htmlFor={payment}>{payment}</label>
                          </div>
                        ))
                      }

                      <input type="submit" value="Next" style={{ width: `100%` }} className={`btn-site-pink roboto ${formIsValid ? "" : "disabled-toast"
                        }`} />

                    </form>
                  </div>

                  <div style={{ width: `119px` }}></div>

                </div>
              )}

          </main>
        </div>
      </div>
    </>
  )
}

export default dynamic(() => Promise.resolve(PaymentScreen), { ssr: false });