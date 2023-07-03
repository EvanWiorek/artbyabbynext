import Link from 'next/link';
import { useContext, useState } from 'react';
import { Store } from '../utils/Store';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function CartView() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const { cart } = state;
  const router = useRouter();

  const handleCloseCart = () => {
    setTimeout(() => document.querySelector(".cart-menu-body").style = "width: 0px; background-color: rgba(255, 255, 255, 1); backdrop-filter: blur(0px) brightness(100%);", 200)
    setTimeout(() => document.querySelector(".screen-darken").style = "opacity: 0; display: block; transition: .2s", 200)
    setTimeout(() => document.querySelector(".screen-darken").style = "display: none", 600)
    document.querySelector(".cart-menu-content").style = "opacity: 0"
  }

  const handleRemoveItem = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  }

  const handleUpdateCart = (item, action) => {
    let quantity = Number(item.quantity);
    if (action === 'minus') {
      quantity--;
    }
    else if (action === 'plus') {
      if(item.quantity < item.countInStock) {
        quantity++;
      }
      else {
        toast(`Sorry, ${item.productName} is out of stock.`)
      }
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
    if (quantity === 0) {
      handleRemoveItem(item)
    }
  }

  return (
    <div className='cart-menu-body box-shadow roboto'>
      <div className="cart-menu-content">
        <div className="cart-menu-top">
          <div className='d-flex justify-content-end'>
            <p onClick={handleCloseCart} style={{ marginRight: `15px`, marginTop: `10px`, cursor: `pointer`, marginBottom: `-20px` }}><i className="bi bi-x-lg close-cart-menu" style={{ color: `rgb(124, 126, 128)` }}></i></p>
          </div>
        </div>
        <div className="cart-menu-middle">
          {
            cartItems.length === 0 ? (<p>Your cart is currently empty.</p>) : (
              cartItems.map((item) => (

                <div key={item.tempId}>
                  <div className="horizontal-line-gray"></div>
                  <div className='d-flex gap-3'>
                    <img src={item.productImage} alt={item.productName} style={{ width: `100px`, height: `100px` }} />
                    <div className='cart-item-info' style={{ minHeight: `110px` }}>
                      <Link href={`/product/${item.slug}`}>{item.productName}</Link>
                      <p>
                        {
                          Number.isInteger(item.productPrice)
                            ? `$${item.productPrice}` : `$${item.productPrice.toFixed(2)}`
                        } {item.quantity > 1 ? `x ${item.quantity}` : ''}</p>

                      {item.productPriceOption.optionName && item.additionalOption.optionName
                        ? <p>{item.productPriceOption.optionName}, {item.additionalOption.optionName} </p>
                        : !item.productPriceOption.optionName && !item.additionalOption.optionName
                          ? <br />
                          : <p>{item.productPriceOption.optionName} {item.additionalOption.optionName}</p>}

                      <div className="d-flex align-items-center gap-1 remove-items" onClick={() => handleRemoveItem(item)} style={{ cursor: `pointer`, marginTop: `10px` }}>
                        <p style={{ fontSize: `1.3rem`, color: `rgba(0,0,0,.5)`, marginTop: `-2px` }}>×</p>
                        <p style={{ textDecoration: `underline`, fontSize: `.8rem` }} className='remove-items-text'>{item.quantity > 1 ? 'Remove Items' : 'Remove Item'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="quantity-selector d-flex gap-4 justify-content-between">
                    <p style={{ padding: `7px 0px` }} onClick={(e) => handleUpdateCart(item, 'minus')} className='plus-minus'>—</p>
                    <p style={{ padding: `7px 0px`, color: `rgba(0,0,0,.5)` }}>{item.quantity}</p>
                    <p style={{ fontSize: `1.5rem` }} onClick={(e) => handleUpdateCart(item, 'plus')} className='plus-minus'>+</p>
                  </div>
                </div>
              ))
            )
          }

        </div>
        {
          cartItems.length === 0 ? ""
            :
            <div className="cart-menu-bottom d-flex flex-column">
              <div className="horizontal-line-gray" style={{ marginBottom: `5px` }}></div>
              <p>Your subtotal today is ${cartItems.reduce((a, c) => a + c.quantity * c.productPrice, 0).toFixed(2)}. Shipping and taxes will calculated at checkout.</p>

              <button className='btn-site-blue text-light roboto' onClick={() => router.push('/shipping')}>Checkout</button>
            </div>
        }
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(CartView), { ssr: false });