const CartMenu = ({setCartMenuVisible}) => {
  
  const handleClick = () => {
    setCartMenuVisible(false);
    // document.querySelector(".cart-menu-body").style = "display: none;"
  }
  
  return (
    <div className="cart-menu-body box-shadow">
      <button onClick={handleClick}>Close</button>
    </div>
  )
}

export default CartMenu;