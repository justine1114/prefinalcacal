# CraveHub Product Management Application

A responsive React and Vite application for browsing the CraveHub menu, viewing product details, managing products and inventory, and calculating cart totals.

## Run the application

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Validate the project with:

```sh
npm run lint
npm run build
```

## Features

- Home, menu, categories, about, product details, product management, cart, checkout, and order confirmation screens.
- Search and category filters for all five supplied product categories.
- Add, edit, and delete product records.
- Product image upload with drag and drop, file browsing, format validation, preview, replace, and remove.
- Image URL preview and load validation.
- Products and cart persisted in `localStorage`; uploaded image files persisted in IndexedDB.
- Inventory status updates at 0, 1–4, and 5 or more units.
- Cart quantity limits, line subtotals, total calculation, and inventory adjustment after successful order placement.
- Checkout with customer contact validation, delivery or pickup, payment selection, and a persisted order summary.
- Persisted order confirmations with unique CraveHub order numbers and delivery or pickup estimates.
- Responsive layouts, keyboard navigation, labeled form controls, and status announcements.

## Supplied product information

The 50 supplied product images are organized by category in `public/images/products/`. Menu descriptions and prices are prefilled where the supplied product name has a matching entry in the supplied menu documents. Some burger image names do not match the burger menu names, so unsupported details are left blank rather than assigned to a potentially incorrect image. The source documents do not provide inventory, ratings, or specifications; these can be entered through **Manage → Edit**. Products without a price or stock quantity cannot be added to the cart until those values are entered.

## Notes

- The Login button opens a demonstration interface; authentication is not connected to a service.
- GCash and card are recorded as the selected payment method; no payment gateway is connected.
- Orders and customer details are saved locally in the browser and are not submitted to a restaurant backend.
- Image URLs must use HTTP or HTTPS and load successfully before a product can be saved.
