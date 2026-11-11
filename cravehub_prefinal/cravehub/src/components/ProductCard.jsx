import ProductImage from './ProductImage'
import { canAddToCart, formatCurrency } from '../utils/products'

export default function ProductCard({ product, headingLevel = 'h2', onView, onAdd }) {
  const canPurchase = canAddToCart(product)
  const ProductName = headingLevel
  const hasRating = Number.isFinite(product.rating)
  const roundedRating = hasRating ? Math.round(product.rating) : 0

  return (
    <article className="product-card">
      <button className="product-card-image-button" type="button" onClick={() => onView(product.id)} aria-label={`View ${product.name} details`}>
        <ProductImage product={product} className="product-card-image" />
      </button>
      <div className="product-card-content">
        <p className="product-card-category">{product.category}</p>
        <ProductName className="product-card-title">{product.name}</ProductName>
        <p className="product-card-rating">
          <span className="rating-stars" aria-hidden="true">
            {'★'.repeat(roundedRating)}{'☆'.repeat(5 - roundedRating)}
          </span>
          <span>{hasRating ? `${product.rating} / 5` : 'Not rated yet'}</span>
        </p>
        <p className="product-card-price">{formatCurrency(product.price)}</p>
        <div className="product-card-actions">
          <button
            className="button button-primary button-add"
            type="button"
            onClick={() => onAdd(product)}
            disabled={!canPurchase}
            aria-label={canPurchase ? `Add to Cart: ${product.name}` : `Add to Cart: ${product.name} (unavailable)`}
          >
            Add to Cart <span aria-hidden="true">+</span>
          </button>
          <a
            className="text-button"
            href={`#/product/${encodeURIComponent(product.id)}`}
            aria-label={`View ${product.name} details`}
            onClick={(event) => {
              event.preventDefault()
              onView(product.id)
            }}
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  )
}
