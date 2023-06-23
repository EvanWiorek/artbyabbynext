import { useContext } from 'react';
import { Store } from '../utils/Store';
import dynamic from 'next/dynamic';

function CartButtonMobile() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const { cart } = state;

  const handleOpenCartMobile = () => {
    document.querySelector(".mobile-menu-content").style = "display: none"
    document.querySelector(".cart-menu-body").style = "width: 80vw;"
    document.querySelector(".screen-darken").style = "display: block"
    setTimeout(() => document.querySelector(".screen-darken").style = "display: block; opacity: 1", 100)
    setTimeout(() => document.querySelector(".cart-menu-content").style = "opacity: 1", 150)
    setTimeout(() => document.querySelector(".cart-menu-body").style = "background-color: rgba(255, 255, 255, 0); width: 80vw;", 200)
  }

  return (
    <button type="button" className="position-relative cart-button" style={{ marginTop: `-17px` }} onClick={handleOpenCartMobile}>
      <i className="bi bi-bag" style={{ fontSize: `1rem` }}></i>
      <span className="position-absolute translate-middle badge rounded-pill items-count">
        {cart.cartItems.length > 0 ? cart.cartItems.length > 0 && (
          cart.cartItems.reduce((a, c) => a + c.quantity, 0)
        ) :
          0}
        <span className="visually-hidden">Number of Items in Cart</span>
      </span>
    </button>
  )
}

export default dynamic(() => Promise.resolve(CartButtonMobile), { ssr: false });