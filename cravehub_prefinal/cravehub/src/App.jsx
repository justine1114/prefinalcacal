import { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import ProductForm from './components/ProductForm'
import ProductImage from './components/ProductImage'
import {
  applyOfficialRatings,
  applyOfficialSpecifications,
  CATEGORIES,
  defaultProducts,
} from './data/products'
import {
  canAddToCart,
  formatCurrency,
  getInventoryValue,
  getStockLabel,
  getStockStatus,
} from './utils/products'
import {
  getStorageKeys,
  loadSavedValue,
  saveCart,
  saveOrders,
  saveProducts,
} from './utils/storage'
import './App.css'

function getRoute(hash) {
  const path = hash.replace(/^#\/?/, '')
  if (!path || path === 'home') return { page: 'home' }
  if (path.startsWith('product/')) {
    return { page: 'product', id: decodeURIComponent(path.slice('product/'.length)) }
  }
  if (path === 'manage') return { page: 'manage' }
  if (path === 'manage/add') return { page: 'add' }
  if (path.startsWith('manage/edit/')) {
    return { page: 'edit', id: decodeURIComponent(path.slice('manage/edit/'.length)) }
  }
  if (path === 'cart') return { page: 'cart' }
  if (path === 'checkout') return { page: 'checkout' }
  if (path.startsWith('confirmation/')) {
    return { page: 'confirmation', id: decodeURIComponent(path.slice('confirmation/'.length)) }
  }
  if (path === 'categories') return { page: 'categories' }
  if (path === 'about') return { page: 'about' }
  if (path === 'menu') return { page: 'menu' }
  return { page: 'home' }
}

function PageIntro({ eyebrow, title, description, centered = false, headingRef }) {
  return (
    <div className={`page-intro ${centered ? 'centered-intro' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 ref={headingRef} tabIndex="-1">{title}</h1>
      {description && <p>{description}</p>}
    </div>
  )
}

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <section className="empty-state" aria-labelledby="empty-state-heading">
      <div className="empty-state-icon" aria-hidden="true">⌑</div>
      <h2 id="empty-state-heading">{title}</h2>
      <p>{description}</p>
      {actionLabel && (
        <button className="button button-primary" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </section>
  )
}

function EmptyCartIllustration() {
  return (
    <svg
      className="empty-cart-illustration"
      viewBox="0 0 220 190"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="113" cy="170" rx="72" ry="8" fill="#efe2cc" />
      <path d="m45 51 18 2 17 81" fill="none" stroke="#743326" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
      <path d="m41 48 20 2" fill="none" stroke="#d63732" strokeLinecap="round" strokeWidth="9" />
      <path d="m75 71 103 1-13 55a9 9 0 0 1-9 7H87" fill="#f3b84e" stroke="#743326" strokeLinejoin="round" strokeWidth="6" />
      <path d="m83 91 91 1m-83 20 83 1m-72-38 9 54m29-55-1 55m29-54-12 54" fill="none" stroke="#a64732" strokeLinecap="round" strokeWidth="4" />
      <path d="M88 137h76" fill="none" stroke="#743326" strokeLinecap="round" strokeWidth="7" />
      <circle cx="97" cy="151" r="11" fill="#9b4935" stroke="#743326" strokeWidth="4" />
      <circle cx="97" cy="151" r="4" fill="#f8d48a" />
      <circle cx="151" cy="151" r="11" fill="#9b4935" stroke="#743326" strokeWidth="4" />
      <circle cx="151" cy="151" r="4" fill="#f8d48a" />
      <path d="m112 28 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" fill="#e7b642" />
      <path d="m190 48 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#9b4935" />
      <path d="m58 91 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#9b4935" />
      <circle cx="181" cy="91" r="3" fill="#9b4935" />
      <circle cx="69" cy="126" r="3" fill="#e7b642" />
    </svg>
  )
}

function EmptyCartState() {
  return (
    <section className="cart-empty-state" aria-labelledby="cart-empty-heading">
      <EmptyCartIllustration />
      <h2 id="cart-empty-heading">Your cart is empty</h2>
      <p>Looks like you haven't added any cravings to your cart yet.</p>
      <a className="button button-primary cart-empty-action" href="#/menu">
        ← Continue shopping
      </a>
    </section>
  )
}

function scrollToSection(id) {
  const section = document.getElementById(id)
  if (!section) return

  section.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  })
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}

function sortProductsByRating(products, preferredNames = []) {
  const preference = new Map(preferredNames.map((name, index) => [name, index]))

  return [...products].sort((first, second) => {
    const firstHasRating = Number.isFinite(first.rating)
    const secondHasRating = Number.isFinite(second.rating)
    if (firstHasRating !== secondHasRating) return firstHasRating ? -1 : 1
    if (firstHasRating && first.rating !== second.rating) return second.rating - first.rating

    return (preference.get(first.name) ?? Number.MAX_SAFE_INTEGER) -
      (preference.get(second.name) ?? Number.MAX_SAFE_INTEGER)
  })
}

function HomePage({ products, onNavigateMenu, onView, onAdd }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const featuredProducts = [
    'Classic Fried Chicken',
    'Classic Cola',
    'Classic Cheeseburger',
    'Classic French Fries',
    'Classic Pepperoni Pizza',
  ].map((name) => products.find((product) => product.name === name))
  const favorites = sortProductsByRating(products, [
    'Classic Cheeseburger',
    'Classic French Fries',
    'Classic Fried Chicken',
    'Classic Cola',
    'Classic Pepperoni Pizza',
  ]).slice(0, 5)
  const bestsellers = sortProductsByRating(products, [
    'Classic Pepperoni Pizza',
    'Classic Cheeseburger',
    'Classic Fried Chicken',
    'Classic French Fries',
    'Classic Cola',
    'Four Cheese Pizza',
    'Spicy Fried Chicken',
    'Cheese Fries',
  ]).slice(0, 8)
  const categories = ['All', ...CATEGORIES]
  const visibleCategories = selectedCategory === 'All' ? CATEGORIES : [selectedCategory]
  const promotionalProduct = products.find((product) => product.name === 'Classic Pepperoni Pizza') || products[0]

  return (
    <div className="home-page">
      <section className="home-hero" id="home-top" aria-labelledby="home-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Welcome to CraveHub</p>
            <h1 id="home-title" tabIndex="-1">
              Your cravings,{' '}
              <span>one hub.</span>
            </h1>
            <p className="hero-description">
              Delicious burgers, pizza, crispy fries, fried chicken, and refreshing drinks, all in one place.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={() => scrollToSection('menu-section')}>
                Order Now
              </button>
              <button className="button button-outline" type="button" onClick={() => scrollToSection('menu-section')}>
                View Menu
              </button>
            </div>
          </div>

          <div className="hero-food-composition">
            {featuredProducts.map((product) => product && (
              <ProductImage
                key={product.id}
                product={product}
                className={`hero-food-image hero-food-${product.category.toLowerCase().replaceAll(' ', '-')}`}
                loading="eager"
              />
            ))}
          </div>
        </div>
        <div className="hero-bottom-rule" />
      </section>

      <div className="home-content">
        <section className="promotion-banner" aria-labelledby="promotion-title">
          <div className="promotion-copy">
            <p className="eyebrow">CraveHub Special Offers</p>
            <h2 id="promotion-title">More cravings, more savings!</h2>
            <p>Find something delicious for your next craving.</p>
            <button className="button button-primary" type="button" onClick={() => scrollToSection('favorites-section')}>
              Explore Offers
            </button>
          </div>
          {promotionalProduct && (
            <ProductImage
              product={promotionalProduct}
              className="promotion-image"
            />
          )}
          <span className="promotion-decoration" aria-hidden="true">✦</span>
        </section>

        <section className="home-section category-section" id="categories-section" aria-labelledby="categories-title">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">A little something for every craving</p>
              <h2 id="categories-title">Browse by Category</h2>
            </div>
          </div>
          <div className="home-category-pills" role="group" aria-label="Filter menu by category">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-pill ${selectedCategory === category ? 'is-selected' : ''}`}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() => {
                  setSelectedCategory(category)
                  scrollToSection('menu-section')
                }}
              >
                {selectedCategory === category && <span className="category-pill-check" aria-hidden="true">✓</span>}
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="home-section" id="favorites-section" aria-labelledby="favorites-title">
          <div className="home-section-heading">
            <div>
              <h2 id="favorites-title">Today's Favorites</h2>
              <p>Find something delicious for your next craving.</p>
            </div>
            <button className="text-link" type="button" onClick={() => scrollToSection('menu-section')}>
              Explore the menu <span aria-hidden="true">→</span>
            </button>
          </div>
          {favorites.length ? (
            <div className="featured-product-grid">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} headingLevel="h3" onView={onView} onAdd={onAdd} />
              ))}
            </div>
          ) : (
            <p className="home-empty-state">There are no products to feature just yet.</p>
          )}
        </section>

        <section className="home-section bestseller-section" aria-labelledby="bestsellers-title">
          <div className="home-section-heading">
            <div>
              <h2 id="bestsellers-title">CraveHub Bestsellers</h2>
              <p>Customer favorites, picked from the CraveHub menu.</p>
            </div>
            <button className="text-link" type="button" onClick={() => scrollToSection('menu-section')}>
              Browse all <span aria-hidden="true">→</span>
            </button>
          </div>
          {bestsellers.length ? (
            <div className="featured-product-grid bestseller-grid">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} headingLevel="h3" onView={onView} onAdd={onAdd} />
              ))}
            </div>
          ) : (
            <p className="home-empty-state">There are no products to feature just yet.</p>
          )}
        </section>

        <section className="home-section home-menu-section" id="menu-section" aria-labelledby="menu-title">
          <div className="home-section-heading menu-section-heading">
            <div>
              <p className="eyebrow">Take your pick</p>
              <h2 id="menu-title">Explore Our Menu</h2>
              <p>Everything you love, freshly prepared and ready when you are.</p>
            </div>
            <button
              className="text-link"
              type="button"
              onClick={() => onNavigateMenu(selectedCategory)}
            >
              Open full menu <span aria-hidden="true">→</span>
            </button>
          </div>
          {visibleCategories.map((category) => {
            const categoryProducts = products.filter((product) => product.category === category)
            const categoryId = `home-category-${category.toLowerCase().replaceAll(' ', '-')}`

            return (
              <section className="home-menu-category" key={category} aria-labelledby={`${categoryId}-title`}>
                <div className="home-category-heading">
                  <h3 id={`${categoryId}-title`}>
                    <a href="#/menu" onClick={(event) => {
                      event.preventDefault()
                      onNavigateMenu(category)
                    }}>
                      {category}
                    </a>
                  </h3>
                  <a
                    className="text-link"
                    href="#/menu"
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigateMenu(category)
                    }}
                  >
                    View All {category} <span aria-hidden="true">→</span>
                  </a>
                </div>
                {categoryProducts.length ? (
                  <div className="product-grid home-menu-grid">
                    {categoryProducts.map((product) => (
                      <ProductCard key={product.id} product={product} headingLevel="h4" onView={onView} onAdd={onAdd} />
                    ))}
                  </div>
                ) : (
                  <p className="home-empty-state">There are no {category.toLowerCase()} products right now.</p>
                )}
              </section>
            )
          })}
        </section>

        <section className="home-about-section" id="about-section" aria-labelledby="home-about-title">
          <div className="home-about-mark" aria-hidden="true">CH</div>
          <div>
            <p className="eyebrow">A hub for every craving</p>
            <h2 id="home-about-title">Your Cravings, One Hub.</h2>
            <p>
              CraveHub brings burgers, pizza, French fries, fried chicken, and soft drinks together in one place.
              Browse the menu, find your favorites, and enjoy a little something for every craving.
            </p>
            <a className="button button-outline" href="#/about">About CraveHub</a>
          </div>
        </section>
      </div>
    </div>
  )
}

function MenuPage({
  products,
  category,
  setCategory,
  search,
  setSearch,
  focusSearch,
  onView,
  onAdd,
}) {
  const searchRef = useRef(null)
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      return matchesCategory && matchesSearch
    })
  }, [category, products, search])

  useEffect(() => {
    if (focusSearch) searchRef.current?.focus()
  }, [focusSearch])

  const categories = ['All', ...CATEGORIES]

  return (
    <section className="content-page menu-page">
      <PageIntro
        eyebrow="Take your pick"
        title="CraveHub Menu"
        description="Everything you love, made fresh and ready when you are."
        centered
      />
      <div className="menu-search">
        <label className="visually-hidden" htmlFor="menu-search">Search your cravings</label>
        <span className="search-label">Search</span>
        <input
          ref={searchRef}
          id="menu-search"
          type="search"
          value={search}
          aria-describedby="menu-results-count"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search your cravings..."
        />
        <span className="search-icon" aria-hidden="true">⌕</span>
      </div>
      <div className="category-pills" role="group" aria-label="Filter products by category">
        {categories.map((item) => (
          <button
            key={item}
            className={`category-pill ${category === item ? 'is-selected' : ''}`}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {category === item && <span className="category-pill-check" aria-hidden="true">✓</span>}
            {item}
          </button>
        ))}
      </div>
      <p className="results-count" id="menu-results-count" aria-live="polite">
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
      </p>
      {filteredProducts.length ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onView={onView} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={search ? 'No products found' : 'No products in this category'}
          description={search ? 'Try another search or clear the current filters.' : 'Choose another category to explore the menu.'}
          actionLabel="Show all products"
          onAction={() => {
            setCategory('All')
            setSearch('')
          }}
        />
      )}
    </section>
  )
}

function CategoriesPage({ products, onChoose }) {
  return (
    <section className="content-page">
      <PageIntro
        eyebrow="Find your favorite"
        title="Browse Categories"
        description="Pick a category and find something to crave."
        centered
      />
      <div className="category-grid">
        {CATEGORIES.map((category) => {
          const firstProduct = products.find((product) => product.category === category)
          const count = products.filter((product) => product.category === category).length
          return (
            <button
              className="category-card"
              type="button"
              key={category}
              onClick={() => onChoose(category)}
            >
              {firstProduct && <ProductImage product={firstProduct} className="category-card-image" />}
              <span className="category-card-title">{category}</span>
              <span className="category-card-count">{count} {count === 1 ? 'item' : 'items'}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function ProductDetailsPage({ product, onBack, onAdd }) {
  const [quantity, setQuantity] = useState(1)
  const canPurchase = canAddToCart(product)
  const maxQuantity = Number.isInteger(product.quantity) ? product.quantity : 0

  return (
    <section className="content-page details-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/home">Home</a><span aria-hidden="true">›</span>
        <a href="#/menu">Menu</a><span aria-hidden="true">›</span>
        <a href="#/categories">{product.category}</a><span aria-hidden="true">›</span>
        <span aria-current="page">{product.name}</span>
      </nav>
      <button className="back-link" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span> Back to Menu
      </button>
      <div className="details-layout">
        <div className="details-image-frame">
          <ProductImage product={product} className="details-image" loading="eager" />
        </div>
        <div className="details-copy">
          <p className="eyebrow">{product.category}</p>
          <h1 tabIndex="-1">{product.name}</h1>
          <p className="rating-line">
            {Number.isFinite(product.rating) ? (
              <>
                <span className="rating-stars" aria-hidden="true">
                  {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
                </span>
                <span>{product.rating} / 5</span>
              </>
            ) : <span>Rating not provided</span>}
          </p>
          <p className="details-price">{formatCurrency(product.price)}</p>
          <p className="details-description">{product.description || 'Description not provided.'}</p>
          <div className="details-bottom-row">
            <div className="details-specifications">
              <h2>PRODUCT SPECIFICATIONS</h2>
              <p>{product.specifications || 'Specifications not provided.'}</p>
            </div>
            <div className="quantity-picker">
              <span className="quantity-label">Quantity</span>
              <fieldset className="quantity-control">
                <legend className="visually-hidden">Quantity for {product.name}</legend>
                <button
                  type="button"
                  aria-label={`Decrease ${product.name} quantity`}
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <output aria-live="polite">{quantity}</output>
                <button
                  type="button"
                  aria-label={`Increase ${product.name} quantity`}
                  onClick={() => setQuantity((value) => Math.min(maxQuantity, value + 1))}
                  disabled={!canPurchase || quantity >= maxQuantity}
                >
                  +
                </button>
              </fieldset>
            </div>
          </div>
          <button
            className="button button-primary button-wide"
            type="button"
            disabled={!canPurchase}
            onClick={() => onAdd(product, quantity)}
          >
            {canPurchase ? 'Add to Cart' : 'Unavailable to order'}
          </button>
        </div>
      </div>
    </section>
  )
}

function ProductManagementPage({ products, search, setSearch, category, setCategory, onAdd, onEdit, onDelete }) {
  const shownProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category
    const term = search.trim().toLowerCase()
    return matchesCategory && (!term || `${product.name} ${product.category}`.toLowerCase().includes(term))
  })

  return (
    <section className="content-page management-page">
      <div className="management-heading">
        <PageIntro
          title="Product Management"
          description="Manage your CraveHub menu, inventory, and pricing."
        />
        <button className="button button-primary" type="button" onClick={onAdd}>
          <span aria-hidden="true">+</span> Add New Product
        </button>
      </div>
      <div className="management-filters">
        <label className="search-field">
          <span className="visually-hidden">Search products</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
          />
        </label>
        <label className="visually-hidden" htmlFor="management-category">Filter by category</label>
        <select id="management-category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="All">All categories</option>
          {CATEGORIES.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">
        {shownProducts.length
          ? `${shownProducts.length} ${shownProducts.length === 1 ? 'product' : 'products'} found.`
          : 'No products found.'}
      </p>
      {shownProducts.length ? (
        <div className="management-table-wrap">
          <table className="management-table">
            <caption className="visually-hidden">
              CraveHub product specifications, inventory, and management actions
            </caption>
            <thead>
              <tr>
                <th scope="col">Product image</th>
                <th scope="col">Product name</th>
                <th scope="col">Category</th>
                <th scope="col">Specifications</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shownProducts.map((product) => {
                const subtotal = getInventoryValue(product)
                const status = getStockStatus(product.quantity)
                return (
                  <tr key={product.id}>
                    <td><ProductImage product={product} className="management-image" /></td>
                    <th scope="row">{product.name}</th>
                    <td>{product.category}</td>
                    <td className="management-specifications">
                      {product.specifications || 'Specifications not provided.'}
                    </td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>{Number.isInteger(product.quantity) ? product.quantity : 'Not provided'}</td>
                    <td>{subtotal === null ? 'Not available' : formatCurrency(subtotal)}</td>
                    <td><span className={`stock-badge stock-${status}`}>{getStockLabel(product.quantity)}</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="text-button" type="button" onClick={() => onEdit(product.id)}>
                          Edit
                        </button>
                        <button className="text-button danger-text" type="button" onClick={() => onDelete(product)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No products found"
          description="Try a different search or category."
          actionLabel="Show all products"
          onAction={() => {
            setSearch('')
            setCategory('All')
          }}
        />
      )}
    </section>
  )
}

function CartPage({ items, onQuantityChange, onRemove, onCheckout, onMenu }) {
  const removeButtonRefs = useRef(new Map())
  const headingRef = useRef(null)
  const pendingFocusRef = useRef(null)
  const total = items.reduce((sum, item) => sum + item.subtotal, 0)

  useEffect(() => {
    if (!pendingFocusRef.current) return
    const target = pendingFocusRef.current === 'heading'
      ? headingRef.current
      : removeButtonRefs.current.get(pendingFocusRef.current)
    target?.focus()
    pendingFocusRef.current = null
  }, [items])

  if (!items.length) {
    return (
      <section className="content-page cart-page is-empty">
        <PageIntro eyebrow="ALMOST THERE" title="Your cart" headingRef={headingRef} />
        <EmptyCartState />
      </section>
    )
  }

  return (
    <section className="content-page cart-page">
      <PageIntro eyebrow="ALMOST THERE" title="Your cart" headingRef={headingRef} />
      <div className="cart-layout">
        <div className="cart-items-panel">
          {items.map(({ product, quantity, subtotal }, index) => (
            <article className="cart-item" key={product.id}>
              <ProductImage product={product} className="cart-item-image" alt="" />
              <div className="cart-item-info">
                <h2>{product.name}</h2>
                <p>{formatCurrency(product.price)} each</p>
                <div className="quantity-control cart-quantity">
                  <button
                    type="button"
                    aria-label={`Decrease ${product.name} quantity`}
                    onClick={() => onQuantityChange(product.id, -1)}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <output aria-live="polite">{quantity}</output>
                  <button
                    type="button"
                    aria-label={`Increase ${product.name} quantity`}
                    onClick={() => onQuantityChange(product.id, 1)}
                    disabled={quantity >= product.quantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="cart-item-subtotal">{formatCurrency(subtotal)}</p>
              <button
                ref={(element) => {
                  if (element) removeButtonRefs.current.set(product.id, element)
                  else removeButtonRefs.current.delete(product.id)
                }}
                className="button button-remove"
                type="button"
                aria-label={`Remove ${product.name} from cart`}
                onClick={() => {
                  const focusTarget = items[index + 1] || items[index - 1]
                  pendingFocusRef.current = focusTarget ? focusTarget.product.id : 'heading'
                  if (!onRemove(product.id)) pendingFocusRef.current = null
                }}
              >
                Remove
              </button>
            </article>
          ))}
          <button className="back-link continue-shopping" type="button" onClick={onMenu}>
            ← Continue shopping
          </button>
        </div>
        <aside className="order-summary" aria-labelledby="order-summary-title">
          <h2 id="order-summary-title">Order summary</h2>
          <ul>
            {items.map(({ product, quantity, subtotal }) => (
              <li key={product.id}>
                <span>{product.name} × {quantity}</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </li>
            ))}
          </ul>
          <div className="summary-total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <button className="button button-primary button-wide" type="button" onClick={onCheckout}>
            Checkout
          </button>
        </aside>
      </div>
    </section>
  )
}

const ORDER_TYPES = ['delivery', 'pickup']
const PAYMENT_METHODS = ['Cash on Delivery', 'GCash', 'Card']

function isPhilippineMobileNumber(value) {
  const normalized = value.replace(/[\s()-]/g, '')
  return /^(?:\+?63|0)9\d{9}$/.test(normalized)
}

function CheckoutPage({ items, onPlaceOrder, onMenu, onCart }) {
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  })
  const [orderType, setOrderType] = useState('delivery')
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const submittingRef = useRef(false)
  const total = items.reduce((sum, item) => sum + item.subtotal, 0)

  function updateCustomer(field, value) {
    setCustomer((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (submittingRef.current) return

    const form = event.currentTarget
    const nextErrors = {}
    if (!customer.fullName.trim()) nextErrors.fullName = 'Enter your full name.'
    if (!form.elements.email.validity.valid) nextErrors.email = 'Enter a valid email address.'
    if (!customer.phone.trim()) {
      nextErrors.phone = 'Enter your phone number.'
    } else if (!isPhilippineMobileNumber(customer.phone)) {
      nextErrors.phone = 'Enter a valid Philippine mobile number, such as 09123456789.'
    }
    if (orderType === 'delivery' && !customer.address.trim()) {
      nextErrors.address = 'Enter your delivery address.'
    }
    if (!ORDER_TYPES.includes(orderType)) nextErrors.orderType = 'Select delivery or pickup.'
    if (!PAYMENT_METHODS.includes(paymentMethod)) {
      nextErrors.paymentMethod = 'Select a payment method.'
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      const firstInvalidField = Object.keys(nextErrors)[0]
      const control = form.elements.namedItem(firstInvalidField)
      if (control instanceof HTMLElement) {
        control.focus()
      } else if (control?.[0] instanceof HTMLElement) {
        control[0].focus()
      }
      return
    }

    submittingRef.current = true
    setSubmitting(true)
    const order = onPlaceOrder({
      customer: { ...customer, fullName: customer.fullName.trim(), address: customer.address.trim() },
      orderType,
      paymentMethod,
    })
    if (!order) {
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  if (!items.length) {
    return (
      <section className="content-page checkout-page">
        <PageIntro title="Checkout" centered />
        <EmptyState
          title="Your cart is empty"
          description="Add something delicious to your cart before checking out."
          actionLabel="Browse the menu"
          onAction={onMenu}
        />
        <button className="back-link checkout-return-cart" type="button" onClick={onCart}>
          Return to your cart
        </button>
      </section>
    )
  }

  return (
    <section className="content-page checkout-page">
      <PageIntro title="Checkout" centered />
      <div className="checkout-layout">
        <form id="checkout-form" className="customer-card" onSubmit={handleSubmit} noValidate>
          <h2>Customer Information</h2>
          <p className="checkout-required-note">
            Fields marked <span className="required-indicator">Required</span> must be completed.
          </p>
          <div className="checkout-fields">
            <div className="checkout-field">
              <label htmlFor="checkout-full-name">
                Full Name <span className="required-indicator">Required</span>
              </label>
              <input
                id="checkout-full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                value={customer.fullName}
                onChange={(event) => updateCustomer('fullName', event.target.value)}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'checkout-full-name-error' : undefined}
                required
              />
              {errors.fullName && <p className="field-error" id="checkout-full-name-error">{errors.fullName}</p>}
            </div>
            <div className="checkout-field">
              <label htmlFor="checkout-email">
                Email <span className="required-indicator">Required</span>
              </label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                autoComplete="email"
                value={customer.email}
                onChange={(event) => updateCustomer('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'checkout-email-error' : undefined}
                required
              />
              {errors.email && <p className="field-error" id="checkout-email-error">{errors.email}</p>}
            </div>
            <div className="checkout-field">
              <label htmlFor="checkout-phone">
                Phone Number <span className="required-indicator">Required</span>
              </label>
              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={customer.phone}
                onChange={(event) => updateCustomer('phone', event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'checkout-phone-error' : undefined}
                required
              />
              {errors.phone && <p className="field-error" id="checkout-phone-error">{errors.phone}</p>}
            </div>
            {orderType === 'delivery' && (
              <div className="checkout-field">
                <label htmlFor="checkout-address">
                  Delivery Address <span className="required-indicator">Required</span>
                </label>
                <textarea
                  id="checkout-address"
                  name="address"
                  autoComplete="street-address"
                  value={customer.address}
                  onChange={(event) => updateCustomer('address', event.target.value)}
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? 'checkout-address-error' : undefined}
                  required
                />
                {errors.address && <p className="field-error" id="checkout-address-error">{errors.address}</p>}
              </div>
            )}
          </div>
        </form>

        <div className="checkout-options">
          <fieldset className="checkout-choice-group">
            <legend>Order Type</legend>
            <div className="checkout-choice-options checkout-order-type">
              {ORDER_TYPES.map((type) => (
                <label className="checkout-choice" key={type}>
                  <input
                    type="radio"
                    name="orderType"
                    form="checkout-form"
                    value={type}
                    checked={orderType === type}
                    required
                    aria-invalid={Boolean(errors.orderType)}
                    aria-describedby={errors.orderType ? 'checkout-order-type-error' : undefined}
                    onChange={() => {
                      setOrderType(type)
                      setErrors((current) => ({ ...current, orderType: '', address: '' }))
                    }}
                  />
                  <span>{type === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                </label>
              ))}
            </div>
            {errors.orderType && (
              <p className="field-error" id="checkout-order-type-error">{errors.orderType}</p>
            )}
          </fieldset>

          <fieldset className="checkout-choice-group">
            <legend>Payment Method</legend>
            <div className="checkout-choice-options">
              {PAYMENT_METHODS.map((method) => (
                <label className="checkout-choice" key={method}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    form="checkout-form"
                    value={method}
                    checked={paymentMethod === method}
                    required
                    aria-invalid={Boolean(errors.paymentMethod)}
                    aria-describedby={errors.paymentMethod ? 'checkout-payment-method-error' : undefined}
                    onChange={() => {
                      setPaymentMethod(method)
                      setErrors((current) => ({ ...current, paymentMethod: '' }))
                    }}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="field-error" id="checkout-payment-method-error">{errors.paymentMethod}</p>
            )}
          </fieldset>

          <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
            <h2 id="checkout-summary-title">Order Summary</h2>
            <ul>
              {items.map(({ product, quantity, subtotal }) => (
                <li key={product.id}>
                  <span>{product.name} × {quantity}</span>
                  <strong>{formatCurrency(subtotal)}</strong>
                </li>
              ))}
            </ul>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
            <button className="button button-primary button-wide place-order-desktop" type="submit" form="checkout-form">
              Place Order
            </button>
          </aside>
          <button
            className="button button-primary button-wide place-order-mobile"
            type="submit"
            form="checkout-form"
            disabled={submitting}
          >
            {submitting ? 'Placing Order…' : 'Place Order'}
          </button>
        </div>
      </div>
    </section>
  )
}

function OrderConfirmationPage({ order, onHome, onMenu }) {
  if (!order) {
    return (
      <section className="content-page confirmation-page">
        <PageIntro title="Order not found" centered />
        <EmptyState
          title="We couldn't find that order"
          description="This order may not have been saved on this device."
          actionLabel="Back to Home"
          onAction={onHome}
        />
        <button className="back-link confirmation-menu-link" type="button" onClick={onMenu}>
          Browse the menu
        </button>
      </section>
    )
  }

  const isDelivery = order.orderType === 'delivery'

  return (
    <section className="content-page confirmation-page">
      <article className="confirmation-card" aria-labelledby="confirmation-title">
        <div className="confirmation-check" aria-hidden="true">✓</div>
        <h1 id="confirmation-title">Order Confirmed!</h1>
        <p className="confirmation-message">
          Thank you for ordering from CraveHub. Your cravings are on the way.
        </p>
        <dl className="confirmation-details">
          <div>
            <dt>Order Number</dt>
            <dd>{order.id}</dd>
          </div>
          <div>
            <dt>Order Type</dt>
            <dd>{isDelivery ? 'Delivery' : 'Pickup'}</dd>
          </div>
          <div>
            <dt>{isDelivery ? 'Estimated Delivery' : 'Estimated Pickup'}</dt>
            <dd>{order.estimatedTime}</dd>
          </div>
          <div>
            <dt>Total Amount</dt>
            <dd className="confirmation-total">{formatCurrency(order.total)}</dd>
          </div>
          <div>
            <dt>Payment Method</dt>
            <dd>{order.paymentMethod}</dd>
          </div>
        </dl>
        <div className="confirmation-actions">
          <button className="button button-primary" type="button" onClick={onHome}>Back to Home</button>
          <button className="back-link" type="button" onClick={onMenu}>Return to Menu</button>
        </div>
      </article>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="content-page about-page">
      <PageIntro
        eyebrow="Our story"
        title="About CraveHub"
        description="Your cravings, one hub."
        centered
      />
      <div className="about-card">
        <p>
          CraveHub brings burgers, pizza, French fries, fried chicken, and soft drinks together in one menu.
          Browse the categories, explore product details, and manage the menu and inventory from one place.
        </p>
      </div>
    </section>
  )
}

function LoginDialog({ open, onClose }) {
  const dialogRef = useRef(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="login-dialog"
      aria-labelledby="login-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          onClose()
        }
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close()
      }}
    >
      <div className="login-dialog-inner">
        <button className="dialog-close" type="button" aria-label="Close login" onClick={onClose}>×</button>
        <p className="eyebrow">Welcome back</p>
        <h2 id="login-title">Login to CraveHub</h2>
        <p className="form-hint">Sign-in is a visual demo and is not connected to an account service.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setMessage('Sign-in is not connected in this demo.')
          }}
        >
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" type="email" autoComplete="email" required />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" type="password" autoComplete="current-password" required />
          {message && <p role="status">{message}</p>}
          <button className="button button-primary button-wide" type="submit">Login</button>
        </form>
      </div>
    </dialog>
  )
}

function StatusNotice({ children, onDismiss }) {
  return (
    <div className={`status-notice ${children ? '' : 'visually-hidden'}`} role="status" aria-live="polite">
      {children && <span>{children}</span>}
      {children && <button type="button" onClick={onDismiss} aria-label="Dismiss message">×</button>}
    </div>
  )
}

export default function App() {
  const storageKeys = getStorageKeys()
  const [productLoad] = useState(() => {
    const saved = loadSavedValue(storageKeys.products, defaultProducts)
    if (saved.error) return saved

    const needsSpecificationsMigration =
      window.localStorage.getItem(storageKeys.specificationsVersion) !== '5'
    const needsRatingsMigration =
      window.localStorage.getItem(storageKeys.ratingsVersion) !== '1'
    if (!needsSpecificationsMigration && !needsRatingsMigration) return saved

    const productsWithSpecifications = needsSpecificationsMigration
      ? applyOfficialSpecifications(saved.value)
      : saved.value
    const value = needsRatingsMigration
      ? applyOfficialRatings(productsWithSpecifications)
      : productsWithSpecifications

    try {
      saveProducts(value)
      if (needsSpecificationsMigration) {
        window.localStorage.setItem(storageKeys.specificationsVersion, '5')
      }
      if (needsRatingsMigration) {
        window.localStorage.setItem(storageKeys.ratingsVersion, '1')
      }
      return { ...saved, value }
    } catch (error) {
      return {
        ...saved,
        value,
        error: `Product data could not be updated: ${error.message}`,
      }
    }
  })
  const [cartLoad] = useState(() => loadSavedValue(storageKeys.cart, []))
  const [ordersLoad] = useState(() => loadSavedValue(storageKeys.orders, []))
  const [products, setProducts] = useState(productLoad.value)
  const [cart, setCart] = useState(cartLoad.value)
  const [orders, setOrders] = useState(ordersLoad.value)
  const [route, setRoute] = useState(() => getRoute(window.location.hash))
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [focusSearch, setFocusSearch] = useState(0)
  const [notice, setNotice] = useState('')
  const [storageNotice, setStorageNotice] = useState(() =>
    [productLoad.error, cartLoad.error, ordersLoad.error].filter(Boolean).join(' '),
  )
  const [loginOpen, setLoginOpen] = useState(false)
  const isCreatingOrder = useRef(false)
  const mainRef = useRef(null)
  const previousRoute = useRef(`${route.page}:${route.id ?? ''}`)

  useEffect(() => {
    const updateRoute = () => {
      if (window.location.hash.startsWith('#/')) {
        setRoute(getRoute(window.location.hash))
      }
    }
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  useEffect(() => {
    const currentRoute = `${route.page}:${route.id ?? ''}`
    if (previousRoute.current === currentRoute) return
    previousRoute.current = currentRoute
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (!(route.page === 'menu' && focusSearch)) mainRef.current?.focus()
  }, [focusSearch, route.page, route.id])

  const selectedProduct = route.id ? products.find((product) => product.id === route.id) : null

  useEffect(() => {
    const titles = {
      home: 'Home',
      menu: 'Menu',
      categories: 'Categories',
      about: 'About',
      manage: 'Product Management',
      add: 'Add Product',
      edit: 'Edit Product',
      cart: 'Your Cart',
      checkout: 'Checkout',
      confirmation: 'Order Confirmation',
      product: selectedProduct?.name || 'Product Not Found',
    }
    document.title = `${titles[route.page] || 'Home'} - CraveHub`
  }, [route.page, selectedProduct])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartItems = cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId)
      return product ? { product, quantity: item.quantity, subtotal: product.price * item.quantity } : null
    })
    .filter(Boolean)

  function persistProducts(nextProducts) {
    try {
      saveProducts(nextProducts)
      setProducts(nextProducts)
      return true
    } catch (error) {
      setStorageNotice(`Product changes could not be saved: ${error.message}`)
      return false
    }
  }

  function persistCart(nextCart) {
    try {
      saveCart(nextCart)
      setCart(nextCart)
      return true
    } catch (error) {
      setStorageNotice(`Cart changes could not be saved: ${error.message}`)
      return false
    }
  }

  function finishPersistence(success, message = '') {
    if (success) {
      setStorageNotice('')
      setNotice(message)
    } else {
      setNotice('')
    }
  }

  function navigate(path) {
    if (path === '#/menu' && route.page !== 'menu') {
      setFocusSearch((current) => current + 1)
    }
    if (window.location.hash === path) {
      setRoute(getRoute(path))
      return
    }
    window.location.hash = path
  }

  function openSearch() {
    setSearch('')
    setCategory('All')
    setFocusSearch((current) => current + 1)
    navigate('#/menu')
  }

  function addToCart(product, requestedQuantity = 1) {
    if (!canAddToCart(product)) {
      setNotice(`${product.name} needs a price and available stock before it can be added.`)
      return
    }

    const existing = cart.find((item) => item.productId === product.id)
    const nextQuantity = (existing?.quantity ?? 0) + requestedQuantity
    if (nextQuantity > product.quantity) {
      setNotice(`Only ${product.quantity} ${product.name} available.`)
      return
    }

    const item = cart.find((entry) => entry.productId === product.id)
    let saved
    if (item) {
      saved = persistCart(cart.map((entry) =>
        entry.productId === product.id
          ? { ...entry, quantity: entry.quantity + requestedQuantity }
          : entry,
      ))
    } else {
      saved = persistCart([...cart, { productId: product.id, quantity: requestedQuantity }])
    }
    finishPersistence(saved, `${product.name} added to your cart.`)
  }

  function changeCartQuantity(productId, delta) {
    const item = cart.find((entry) => entry.productId === productId)
    const product = products.find((entry) => entry.id === productId)
    if (!item || !product) return

    const nextQuantity = item.quantity + delta
    if (nextQuantity < 1) return
    if (nextQuantity > product.quantity) {
      setNotice(`Only ${product.quantity} ${product.name} available.`)
      return
    }

    const nextCart = cart.map((entry) =>
      entry.productId === productId ? { ...entry, quantity: nextQuantity } : entry,
    )
    const nextTotal = cartItems.reduce((sum, cartItem) =>
      sum + (cartItem.product.id === productId ? product.price * nextQuantity : cartItem.subtotal), 0,
    )
    const saved = persistCart(nextCart)
    finishPersistence(
      saved,
      `${product.name} quantity updated to ${nextQuantity}. Cart total: ${formatCurrency(nextTotal)}.`,
    )
  }

  function removeFromCart(productId) {
    const removedProduct = products.find((product) => product.id === productId)
    const nextCart = cart.filter((entry) => entry.productId !== productId)
    const nextTotal = cartItems
      .filter((item) => item.product.id !== productId)
      .reduce((sum, item) => sum + item.subtotal, 0)
    const saved = persistCart(nextCart)
    const message = removedProduct
      ? `${removedProduct.name} removed from your cart. Cart total: ${formatCurrency(nextTotal)}.`
      : `Item removed from your cart. Cart total: ${formatCurrency(nextTotal)}.`
    finishPersistence(saved, message)
    return saved
  }

  function saveProduct(product) {
    const isEditing = Boolean(product.id)
    const id = product.id || `product-${window.crypto.randomUUID()}`
    const savedProduct = { ...product, id }

    if (isEditing) {
      const productsSaved = persistProducts(products.map((entry) => entry.id === id ? savedProduct : entry))
      const cartSaved = persistCart(
        cart
          .map((item) => {
            if (item.productId !== id) return item
            const quantity = Math.min(item.quantity, savedProduct.quantity)
            return quantity > 0 ? { ...item, quantity } : null
          })
      )
      finishPersistence(productsSaved && cartSaved, `${savedProduct.name} updated successfully.`)
    } else {
      const saved = persistProducts([savedProduct, ...products])
      finishPersistence(saved, `${savedProduct.name} added successfully.`)
    }
    navigate('#/manage')
  }

  function deleteProduct(product) {
    if (!window.confirm(`Delete ${product.name} from the product list?`)) return
    const productsSaved = persistProducts(products.filter((entry) => entry.id !== product.id))
    const cartSaved = persistCart(cart.filter((entry) => entry.productId !== product.id))
    finishPersistence(productsSaved && cartSaved, `${product.name} deleted.`)
  }

  function checkout() {
    if (!cartItems.length) {
      setNotice('Your cart is empty. Add products before checking out.')
      return
    }
    const invalidItem = cartItems.find(
      ({ product, quantity }) => !canAddToCart(product) || quantity > product.quantity,
    )
    if (invalidItem) {
      setNotice(`${invalidItem.product.name} no longer has enough stock to complete checkout.`)
      return
    }

    setNotice('')
    navigate('#/checkout')
  }

  function placeOrder({ customer, orderType, paymentMethod }) {
    if (isCreatingOrder.current) return null
    isCreatingOrder.current = true

    try {
      if (!cartItems.length) {
        setNotice('Your cart is empty. Add products before placing an order.')
        return null
      }

      const invalidItem = cartItems.find(
        ({ product, quantity }) => !canAddToCart(product) || quantity > product.quantity,
      )
      if (invalidItem) {
        setNotice(`${invalidItem.product.name} no longer has enough stock to complete checkout.`)
        return null
      }

      const now = new Date()
      const year = now.getFullYear()
      const orderPattern = new RegExp(`^#?CH${year}(\\d+)$`)
      const currentYearOrders = orders
        .map((order) => (typeof order?.id === 'string' ? order.id.match(orderPattern) : null))
        .filter(Boolean)
        .map((match) => Number(match[1]))
      const usedOrderIds = new Set(
        orders.map((order) => order?.id).filter((id) => typeof id === 'string'),
      )
      let sequence = Math.max(0, ...currentYearOrders) + 1
      let orderId = `#CH${year}${String(sequence).padStart(4, '0')}`
      while (usedOrderIds.has(orderId)) {
        sequence += 1
        orderId = `#CH${year}${String(sequence).padStart(4, '0')}`
      }

      const order = {
        id: orderId,
        createdAt: now.toISOString(),
        customer,
        orderType,
        paymentMethod,
        estimatedTime: orderType === 'delivery' ? '30–45 minutes' : '15–25 minutes',
        items: cartItems.map(({ product, quantity, subtotal }) => ({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          subtotal,
        })),
        total: cartItems.reduce((sum, item) => sum + item.subtotal, 0),
      }
      const nextOrders = [order, ...orders]
      const nextProducts = products.map((product) => {
        const item = cart.find((entry) => entry.productId === product.id)
        return item ? { ...product, quantity: product.quantity - item.quantity } : product
      })

      try {
        saveProducts(nextProducts)
        saveOrders(nextOrders)
        saveCart([])
      } catch (error) {
        const recoveryErrors = []
        try {
          saveProducts(products)
        } catch (recoveryError) {
          recoveryErrors.push(`Product inventory rollback failed: ${recoveryError.message}`)
        }
        try {
          saveOrders(orders)
        } catch (recoveryError) {
          recoveryErrors.push(`Order rollback failed: ${recoveryError.message}`)
        }
        try {
          saveCart(cart)
        } catch (recoveryError) {
          recoveryErrors.push(`Cart rollback failed: ${recoveryError.message}`)
        }
        const recoveryMessage = recoveryErrors.length ? ` ${recoveryErrors.join(' ')}` : ''
        setStorageNotice(`Your order could not be saved: ${error.message}.${recoveryMessage}`)
        return null
      }

      setProducts(nextProducts)
      setOrders(nextOrders)
      setCart([])
      setStorageNotice('')
      setNotice('')
      navigate(`#/confirmation/${encodeURIComponent(order.id)}`)
      return order
    } finally {
      isCreatingOrder.current = false
    }
  }

  function chooseCategory(nextCategory) {
    setCategory(nextCategory)
    setSearch('')
    navigate('#/menu')
  }

  const pageForNavigation =
    route.page === 'product' ? 'menu' :
      route.page === 'add' || route.page === 'edit' ? 'manage' : route.page

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar
        currentPage={pageForNavigation}
        cartCount={cartCount}
        onOpenSearch={openSearch}
        onLogin={() => setLoginOpen(true)}
      />
      <StatusNotice
        onDismiss={() => {
          setNotice('')
          setStorageNotice('')
        }}
      >
        {[storageNotice, notice].filter(Boolean).join(' ')}
      </StatusNotice>
      <main id="main-content" ref={mainRef} tabIndex="-1">
        {route.page === 'home' && (
          <HomePage
            products={products}
            onNavigateMenu={chooseCategory}
            onView={(id) => navigate(`#/product/${encodeURIComponent(id)}`)}
            onAdd={addToCart}
          />
        )}
        {route.page === 'menu' && (
          <MenuPage
            products={products}
            category={category}
            setCategory={setCategory}
            search={search}
            setSearch={setSearch}
            focusSearch={focusSearch}
            onView={(id) => navigate(`#/product/${encodeURIComponent(id)}`)}
            onAdd={addToCart}
          />
        )}
        {route.page === 'categories' && (
          <CategoriesPage products={products} onChoose={chooseCategory} />
        )}
        {route.page === 'about' && <AboutPage />}
        {route.page === 'product' && selectedProduct && (
          <ProductDetailsPage
            key={selectedProduct.id}
            product={selectedProduct}
            onBack={() => navigate('#/menu')}
            onAdd={addToCart}
          />
        )}
        {route.page === 'product' && !selectedProduct && (
          <section className="content-page">
            <PageIntro title="Product not found" />
            <EmptyState
              title="Product unavailable"
              description="This product may have been removed from the menu."
              actionLabel="Back to Menu"
              onAction={() => navigate('#/menu')}
            />
          </section>
        )}
        {route.page === 'manage' && (
          <ProductManagementPage
            products={products}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            onAdd={() => navigate('#/manage/add')}
            onEdit={(id) => navigate(`#/manage/edit/${encodeURIComponent(id)}`)}
            onDelete={deleteProduct}
          />
        )}
        {route.page === 'add' && (
          <ProductForm
            key="new-product"
            onSubmit={saveProduct}
            onCancel={() => navigate('#/manage')}
          />
        )}
        {route.page === 'edit' && selectedProduct && (
          <ProductForm
            key={selectedProduct.id}
            product={selectedProduct}
            onSubmit={saveProduct}
            onCancel={() => navigate('#/manage')}
          />
        )}
        {route.page === 'edit' && !selectedProduct && (
          <section className="content-page">
            <PageIntro title="Product not found" />
            <EmptyState
              title="Product unavailable"
              description="This product may have been removed from the menu."
              actionLabel="Return to Product Management"
              onAction={() => navigate('#/manage')}
            />
          </section>
        )}
        {route.page === 'cart' && (
          <CartPage
            items={cartItems}
            onQuantityChange={changeCartQuantity}
            onRemove={removeFromCart}
            onCheckout={checkout}
            onMenu={() => navigate('#/menu')}
          />
        )}
        {route.page === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            onPlaceOrder={placeOrder}
            onMenu={() => navigate('#/menu')}
            onCart={() => navigate('#/cart')}
          />
        )}
        {route.page === 'confirmation' && (
          <OrderConfirmationPage
            order={orders.find((savedOrder) => savedOrder.id === route.id)}
            onHome={() => navigate('#/home')}
            onMenu={() => navigate('#/menu')}
          />
        )}
      </main>
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand-block">
            <a className="brand footer-brand" href="#/home" aria-label="CraveHub home" onClick={(event) => {
              if (pageForNavigation !== 'home') return
              event.preventDefault()
              scrollToTop()
            }}>
              <span className="brand-name"><span>Crave</span><span>Hub</span></span>
              <span className="brand-tagline">Your cravings, One Hub.</span>
            </a>
            <p>Good food for every craving, all in one hub.</p>
          </div>
          <nav className="footer-column" aria-label="Quick links">
            <h2>Quick Links</h2>
            <a href="#/home" onClick={(event) => {
              if (pageForNavigation !== 'home') return
              event.preventDefault()
              scrollToTop()
            }}>Home</a>
            <a href={pageForNavigation === 'home' ? '#menu-section' : '#/menu'}>Menu</a>
            <a href={pageForNavigation === 'home' ? '#categories-section' : '#/categories'}>Categories</a>
            <a href={pageForNavigation === 'home' ? '#about-section' : '#/about'}>About</a>
            <a href="#/manage">Manage Products</a>
          </nav>
          <nav className="footer-column" aria-label="Menu categories">
            <h2>Menu Categories</h2>
            {CATEGORIES.map((item) => (
              <a key={item} href="#/menu" onClick={() => chooseCategory(item)}>{item}</a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CraveHub. All rights reserved.</p>
          <a href="#/manage">CraveHub Product Management</a>
        </div>
      </footer>
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
