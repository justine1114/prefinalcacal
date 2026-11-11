import { useEffect, useRef, useState } from 'react'
import { CATEGORIES } from '../data/products'
import { saveUploadedImage } from '../utils/storage'
import ImageField from './ImageField'

function getInitialForm(product) {
  return {
    name: product?.name ?? '',
    category: product?.category ?? '',
    description: product?.description ?? '',
    specifications: product?.specifications ?? '',
    rating: product?.rating ?? '',
    price: product?.price ?? '',
    quantity: product?.quantity ?? '',
  }
}

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => getInitialForm(product))
  const [image, setImage] = useState(() => ({
    sourceType: product?.imageSourceType ?? 'upload',
    imageSrc: product?.imageSrc ?? '',
    imageKey: product?.imageKey ?? '',
    file: null,
  }))
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const focusFirstError = useRef(false)

  useEffect(() => {
    if (!focusFirstError.current) return
    focusFirstError.current = false
    const firstInvalid = Object.keys(errors).find((key) => errors[key])
    if (firstInvalid) document.getElementById(`product-${firstInvalid}`)?.focus()
  }, [errors])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function updateImage(nextImage) {
    setImage(nextImage)
    setErrors((current) => ({ ...current, image: '' }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    const name = form.name.trim()
    const description = form.description.trim()
    const specifications = form.specifications.trim()
    const rating = Number(form.rating)
    const price = Number(form.price)
    const quantity = Number(form.quantity)

    if (!name) nextErrors.name = 'Enter a product name.'
    if (!form.category) nextErrors.category = 'Choose a category.'
    if (!description) nextErrors.description = 'Enter a product description.'
    if (!specifications) nextErrors.specifications = 'Enter the product specifications.'
    if (form.rating === '' || !Number.isFinite(rating) || rating < 0 || rating > 5) {
      nextErrors.rating = 'Enter a rating from 0 to 5.'
    }
    if (form.price === '' || !Number.isFinite(price) || price < 0) {
      nextErrors.price = 'Enter a price of zero or more.'
    }
    if (
      form.quantity === '' ||
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      nextErrors.quantity = 'Enter a whole-number quantity of zero or more.'
    }

    if (
      !image.file &&
      !(image.imageSrc && ['asset', 'url'].includes(image.sourceType)) &&
      !(image.imageKey && image.sourceType === 'upload')
    ) {
      nextErrors.image = 'Choose a valid image or preview an image URL.'
    }

    if (Object.values(nextErrors).some(Boolean)) {
      focusFirstError.current = true
      setErrors(nextErrors)
      return
    }

    setErrors(nextErrors)
    setSubmitting(true)
    try {
      const imageKey = image.file
        ? await saveUploadedImage(image.file)
        : image.imageKey
      await onSubmit({
        ...product,
        id: product?.id,
        name,
        category: form.category,
        imageSourceType: image.file ? 'upload' : image.sourceType,
        imageSrc: image.file ? '' : image.imageSrc,
        imageKey: imageKey ?? '',
        description,
        specifications,
        rating,
        price,
        quantity,
      })
    } catch (error) {
      setErrors((current) => ({
        ...current,
        image: `Could not save the product image: ${error.message}`,
      }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="form-page">
      <div className="page-intro centered-intro">
        <p className="eyebrow">Admin Panel</p>
        <h1>{product ? 'Edit Product' : 'Add New Product'}</h1>
        <p>{product ? 'Update this item in the CraveHub menu.' : 'Add a new crave-worthy item to the menu.'}</p>
      </div>

      <form className="product-form" noValidate onSubmit={handleSubmit}>
        <div className="product-form-image">
          <ImageField
            key={product?.id ?? 'new'}
            initialProduct={product}
            onChange={updateImage}
            error={errors.image}
            altText={form.name.trim() || product?.name || 'Product image'}
          />
        </div>

        <div className="product-form-fields">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="product-name">Product Name <span className="required-mark">Required</span></label>
              <input
                id="product-name"
                name="name"
                required
                value={form.name}
                onChange={updateField}
                placeholder="Enter product name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'product-name-error' : undefined}
              />
              {errors.name && <p className="field-error" id="product-name-error">{errors.name}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="product-category">Category <span className="required-mark">Required</span></label>
              <select
                id="product-category"
                name="category"
                required
                value={form.category}
                onChange={updateField}
                aria-invalid={Boolean(errors.category)}
                aria-describedby={errors.category ? 'product-category-error' : undefined}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
              {errors.category && <p className="field-error" id="product-category-error">{errors.category}</p>}
            </div>
            <div className="form-field form-field-wide">
              <label htmlFor="product-description">Description <span className="required-mark">Required</span></label>
              <textarea
                id="product-description"
                name="description"
                required
                rows="3"
                value={form.description}
                onChange={updateField}
                placeholder="Describe this delicious item..."
                aria-invalid={Boolean(errors.description)}
                aria-describedby={errors.description ? 'product-description-error' : undefined}
              />
              {errors.description && <p className="field-error" id="product-description-error">{errors.description}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="product-specifications">Specifications <span className="required-mark">Required</span></label>
              <textarea
                id="product-specifications"
                name="specifications"
                required
                rows="2"
                value={form.specifications}
                onChange={updateField}
                placeholder="Ingredients, serving size, or other specifications"
                aria-invalid={Boolean(errors.specifications)}
                aria-describedby={errors.specifications ? 'product-specifications-error' : undefined}
              />
              {errors.specifications && <p className="field-error" id="product-specifications-error">{errors.specifications}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="product-rating">Rating <span className="required-mark">Required</span></label>
              <input
                id="product-rating"
                name="rating"
                type="number"
                required
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={updateField}
                placeholder="Enter initial rating (e.g., 4.5)"
                aria-invalid={Boolean(errors.rating)}
                aria-describedby={errors.rating ? 'product-rating-error' : 'product-rating-hint'}
              />
              <p className="form-hint" id="product-rating-hint">Use a rating from 0 to 5.</p>
              {errors.rating && <p className="field-error" id="product-rating-error">{errors.rating}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="product-price">Price (₱) <span className="required-mark">Required</span></label>
              <input
                id="product-price"
                name="price"
                type="number"
                required
                min="0"
                step="0.01"
                value={form.price}
                onChange={updateField}
                placeholder="Enter price"
                aria-invalid={Boolean(errors.price)}
                aria-describedby={errors.price ? 'product-price-error' : undefined}
              />
              {errors.price && <p className="field-error" id="product-price-error">{errors.price}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="product-quantity">Quantity <span className="required-mark">Required</span></label>
              <input
                id="product-quantity"
                name="quantity"
                type="number"
                required
                min="0"
                step="1"
                value={form.quantity}
                onChange={updateField}
                placeholder="Enter stock quantity"
                aria-invalid={Boolean(errors.quantity)}
                aria-describedby={errors.quantity ? 'product-quantity-error' : undefined}
              />
              {errors.quantity && <p className="field-error" id="product-quantity-error">{errors.quantity}</p>}
            </div>
          </div>
          <div className="form-actions">
            <button className="button button-primary" type="submit" disabled={submitting}>
              {submitting ? 'Saving…' : 'Submit'}
            </button>
            <button className="button button-quiet" type="button" onClick={onCancel} disabled={submitting}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
