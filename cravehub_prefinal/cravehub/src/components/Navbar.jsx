import { useRef, useState } from 'react'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 5 5" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L22 8H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  )
}

export default function Navbar({ currentPage, cartCount, onOpenSearch, onLogin }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef(null)
  const isHomePage = currentPage === 'home'
  const links = [
    { label: 'Home', path: 'home', href: '#/home' },
    { label: 'Menu', path: 'menu', href: isHomePage ? '#menu-section' : '#/menu' },
    { label: 'Categories', path: 'categories', href: isHomePage ? '#categories-section' : '#/categories' },
    { label: 'About', path: 'about', href: isHomePage ? '#about-section' : '#/about' },
    { label: 'Manage', path: 'manage', href: '#/manage' },
  ]

  function closeMenu(restoreFocus = false) {
    setMenuOpen(false)
    if (menuOpen && restoreFocus) {
      window.requestAnimationFrame(() => menuToggleRef.current?.focus())
    }
  }

  function scrollHome(event) {
    if (!isHomePage) return
    event.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#/home" onClick={(event) => {
          closeMenu(currentPage === 'home')
          scrollHome(event)
        }} aria-label="CraveHub home">
          <span className="brand-name"><span>Crave</span><span>Hub</span></span>
          <span className="brand-tagline">Your cravings, One Hub.</span>
        </a>

        <button
          ref={menuToggleRef}
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle-icon" aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav
          className={`primary-navigation ${menuOpen ? 'is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {links.map(({ label, path, href }) => (
            <a
              key={path}
              className={currentPage === path ? 'is-active' : ''}
              href={href}
              aria-current={currentPage === path ? (isHomePage && path !== 'home' ? undefined : 'page') : undefined}
              onClick={(event) => {
                const staysOnPage = isHomePage ? path !== 'manage' : currentPage === path
                closeMenu(staysOnPage)
                if (path === 'home') scrollHome(event)
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Search products" onClick={onOpenSearch}>
            <SearchIcon />
          </button>
          <a
            className="icon-button cart-link"
            href="#/cart"
            aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          >
            <CartIcon />
            <span className="cart-count" aria-hidden="true">{cartCount > 99 ? '99+' : cartCount}</span>
          </a>
          <button className="button button-primary login-button" type="button" onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </header>
  )
}
