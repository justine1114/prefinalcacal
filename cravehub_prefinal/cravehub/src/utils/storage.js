const PRODUCT_KEY = 'cravehub-products-v1'
const CART_KEY = 'cravehub-cart-v1'
const ORDERS_KEY = 'cravehub-orders-v1'
const PRODUCT_STOCK_VERSION_KEY = 'cravehub-product-stock-version'
const SPECIFICATIONS_VERSION_KEY = 'cravehub-product-specifications-version'
const RATINGS_VERSION_KEY = 'cravehub-product-ratings-version'
const IMAGE_DB_NAME = 'cravehub-images'
const IMAGE_STORE_NAME = 'uploaded-images'
const IMAGE_DB_VERSION = 1

export function loadSavedValue(key, fallback) {
  try {
    const saved = window.localStorage.getItem(key)
    if (!saved) {
      if (key === PRODUCT_KEY) {
        try {
          window.localStorage.setItem(PRODUCT_STOCK_VERSION_KEY, '1')
        } catch (error) {
          return {
            value: fallback,
            error: `Product stock initialization could not be saved: ${error.message}`,
          }
        }
      }
      return { value: fallback, error: '' }
    }

    const value = JSON.parse(saved)
    if (!Array.isArray(value)) {
      throw new Error('Saved data is not in the expected format.')
    }

    if (
      key === PRODUCT_KEY &&
      window.localStorage.getItem(PRODUCT_STOCK_VERSION_KEY) !== '1'
    ) {
      const migratedValue = value.map((product) => ({ ...product, quantity: 300 }))
      try {
        window.localStorage.setItem(PRODUCT_KEY, JSON.stringify(migratedValue))
        window.localStorage.setItem(PRODUCT_STOCK_VERSION_KEY, '1')
      } catch (error) {
        return {
          value: migratedValue,
          error: `Product stock changes could not be saved: ${error.message}`,
        }
      }
      return { value: migratedValue, error: '' }
    }

    return { value, error: '' }
  } catch (error) {
    return {
      value: fallback,
      error: `Saved ${key === PRODUCT_KEY ? 'products' : key === CART_KEY ? 'cart' : 'orders'} could not be loaded: ${error.message}`,
    }
  }
}

export function saveProducts(products) {
  window.localStorage.setItem(PRODUCT_KEY, JSON.stringify(products))
}

export function saveCart(cart) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function saveOrders(orders) {
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

function openImageDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('This browser does not support persistent image storage.'))
      return
    }

    const request = window.indexedDB.open(IMAGE_DB_NAME, IMAGE_DB_VERSION)

    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(IMAGE_STORE_NAME)) {
        database.createObjectStore(IMAGE_STORE_NAME)
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('Could not open image storage.'))
  })
}

export async function saveUploadedImage(file) {
  const database = await openImageDatabase()
  const imageKey = window.crypto.randomUUID()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(IMAGE_STORE_NAME, 'readwrite')
    transaction.objectStore(IMAGE_STORE_NAME).put(file, imageKey)
    transaction.oncomplete = () => {
      database.close()
      resolve(imageKey)
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error ?? new Error('Could not save the uploaded image.'))
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error ?? new Error('Image storage was interrupted.'))
    }
  })
}

export async function loadUploadedImage(imageKey) {
  const database = await openImageDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(IMAGE_STORE_NAME, 'readonly')
    const request = transaction.objectStore(IMAGE_STORE_NAME).get(imageKey)

    request.onsuccess = () => {
      database.close()
      resolve(request.result ?? null)
    }
    request.onerror = () => {
      database.close()
      reject(request.error ?? new Error('Could not load the saved image.'))
    }
  })
}

export function getStorageKeys() {
  return {
    products: PRODUCT_KEY,
    cart: CART_KEY,
    orders: ORDERS_KEY,
    specificationsVersion: SPECIFICATIONS_VERSION_KEY,
    ratingsVersion: RATINGS_VERSION_KEY,
  }
}
