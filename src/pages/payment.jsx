import Head from "next/head";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useRef, useState } from "react";
import { Store } from "../utils/Store";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import CheckoutWizard from "../components/CheckoutWizard";

function PaymentScreen() {
  const myRef = useRef();
  const router = useRouter();
  const [contentIsVisible, setContentIsVisible] = useState();
  const { state, dispatch } = useContext(Store)
  const { cart } = state;
  const {
    cart: { cartItems },
  } = state;
  const { customerInfo } = cart;

  // let formIsValid = false;
  let formIsValid = true;

  useEffect(() => {
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
  }, [contentIsVisible]);

  const handleGoBack = () => {
    router.back();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <>
      <Head>
        <title>Payment Options | Art by Abby</title>
      </Head>
      <div>
        <Navbar />
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
                <div className="d-flex flex-column-small">

                  <div
                    className="links desktop-link d-flex flex-column align-items-end"
                    style={{ marginLeft: `10px`, width: `60px` }}
                    onClick={handleGoBack}
                  >
                    <p className="roboto">
                      <i class="bi bi-arrow-left" style={{ fontSize: `.9rem` }}></i>{" "}
                      Back
                    </p>
                    <div className="desktop-link-line"></div>
                  </div>

                  <div className="col-lg-6 m-auto">
                    <CheckoutWizard activeStep={1} />
                    <form onSubmit={(e) => handleSubmit(e)} className="shipping-submit-form m-auto" style={{ paddingBottom: `20px` }}>

                      <input type="submit" value="Next" style={{ width: `100%` }} className={`btn-site-pink roboto ${formIsValid ? "" : "disabled"
                        }`} />

                    </form>
                  </div>

                </div>
              )}

          </main>
        </div>
      </div>
    </>
  )
}

export default dynamic(() => Promise.resolve(PaymentScreen), { ssr: false });