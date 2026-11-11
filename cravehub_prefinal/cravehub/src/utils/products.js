export function getStockStatus(quantity) {
  if (!Number.isInteger(quantity) || quantity < 0) return 'not-set'
  if (quantity === 0) return 'out'
  if (quantity < 5) return 'low'
  return 'in'
}

export function getStockLabel(quantity) {
  const status = getStockStatus(quantity)
  if (status === 'out') return 'Out of Stock'
  if (status === 'low') return 'Low Stock'
  if (status === 'in') return 'In Stock'
  return 'Stock not set'
}

export function formatCurrency(value) {
  if (!Number.isFinite(value)) return 'Not provided'

  return `₱${value.toLocaleString('en-PH', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`
}

export function getInventoryValue(product) {
  if (!Number.isFinite(product.price) || !Number.isInteger(product.quantity)) {
    return null
  }

  return product.price * product.quantity
}

export function canAddToCart(product) {
  return (
    Number.isFinite(product.price) &&
    Number.isInteger(product.quantity) &&
    product.quantity > 0
  )
}
