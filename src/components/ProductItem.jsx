import Link from "next/link"

export default function ProductItem({ product }) {

  const imageMouseOver = (productId) => {
    if (product.images.length > 1) {
      document.getElementById(`${productId}`).style = "opacity: .5"
      setTimeout(() => document.getElementById(`${productId}`).src = `${product.images[1]}`, 50)
      setTimeout(() => document.getElementById(`${productId}`).style = "opacity: 1", 100)
    }
  }

  const imageMouseOut = (productId) => {
    if (product.images.length > 1) {
      document.getElementById(`${productId}`).style = "opacity: .5"
      setTimeout(() => document.getElementById(`${productId}`).src = `${product.images[0]}`, 50)
      setTimeout(() => document.getElementById(`${productId}`).style = "opacity: 1", 100)
    }
  }

  return (
    <div className="roboto product-card box-shadow-2">
      <div className="product-card-content d-flex flex-column gap-2">
        <Link href={`/product/${product._id}`}>
          <img src={product.images[0]} alt={product.name} id={product._id} onMouseOver={() => imageMouseOver(product._id)} onMouseOut={() => imageMouseOut(product._id)} />
        </Link>
        <div className="">
          <Link href={`/product/${product._id}`}>
            {product.name}
          </Link>
          <br />

          <p style={{ margin: 0, fontWeight: `300`, color: `rgba(0,0,0,.7)` }}>
            {
              Number.isInteger(product.priceOptions[0].price)
              ? `$${product.priceOptions[0].price}` : `$${product.priceOptions[0].price.toFixed(2)}`
            }
          </p>

        </div>
      </div>
    </div>
  )
}
