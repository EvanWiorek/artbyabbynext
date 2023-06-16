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
        <Link href={`/product/${product.slug}`}>
          <img src={product.images[0]} alt={product.name} id={product.slug} onMouseOver={() => imageMouseOver(product.slug)} onMouseOut={() => imageMouseOut(product.slug)} />
        </Link>
        <Link href={`/product/${product.slug}`}>
          {product.name}
        </Link>
      </div>
    </div>
  )
}
