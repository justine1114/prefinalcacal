export const CATEGORIES = [
  'Burgers',
  'Pizza',
  'French Fries',
  'Fried Chicken',
  'Soft Drinks',
]

const OFFICIAL_RATINGS = {
  Burgers: {
    'Classic Cheeseburger': 4.8,
    'Bacon Deluxe': 4.6,
    'Mushroom Swiss Burger': 4.5,
    'BBQ Ranch & Onion Ring Burger': 4.9,
    'Spicy Jalapeño Smash Burger': 4.7,
    'Truffle Garlic Butter Burger': 4.4,
    'Avocado Turkey Burger': 4.2,
    'Signature Double Cheeseburger': 5.0,
    'Veggie Black Bean Burger': 4.1,
    'Hawaiian Teriyaki Burger': 4.6,
  },
  Pizza: {
    'Classic Pepperoni Pizza': 4.9,
    'Four Cheese Pizza': 4.7,
    'Hawaiian Pizza': 4.5,
    'Bacon Pizza': 4.6,
    'Chicken BBQ Pizza': 4.8,
    'Supreme Pizza': 5.0,
    'Margherita Pizza': 4.4,
    'Spicy Beef Pizza': 4.3,
    'Garlic Chicken Pizza': 4.7,
    'Meat Lovers Pizza': 4.9,
  },
  'French Fries': {
    'Classic French Fries': 4.7,
    'Cheese Fries': 4.5,
    'Bacon Cheese Fries': 4.9,
    'BBQ Fries': 4.3,
    'Chili Cheese Fries': 4.6,
    'Garlic Parmesan Fries': 4.8,
    'Spicy Fries': 4.2,
    'Loaded Fries': 5.0,
    'Curly Fries': 4.4,
    'Sweet Potato Fries': 4.1,
  },
  'Fried Chicken': {
    'Classic Fried Chicken': 4.9,
    'Spicy Fried Chicken': 4.7,
    'Chicken Wings': 4.8,
    'Chicken Drumsticks': 4.6,
    'Chicken Tenders': 4.5,
    'Korean-Style Fried Chicken': 5.0,
    'Garlic Butter Chicken': 4.4,
    'BBQ Fried Chicken': 4.7,
    'Crispy Chicken Bites': 4.3,
    'Extra Crispy Chicken': 4.9,
  },
  'Soft Drinks': {
    'Classic Cola': 4.8,
    'Lemon-Lime Soda': 4.5,
    'Orange Soda': 4.4,
    'Grape Soda': 4.3,
    'Root Beer': 4.6,
    'Strawberry Soda': 4.7,
    'Pineapple Soda': 4.2,
    'Green Apple Soda': 4.5,
    'Vanilla Cola': 4.1,
    'Cherry Cola': 4.9,
  },
}

const OFFICIAL_SPECIFICATIONS = {
  'Soft Drinks': {
    'Classic Cola': 'Dark cola served chilled with ice and visible carbonation.',
    'Lemon-Lime Soda': 'Clear, crisp lemon-lime beverage served over ice.',
    'Orange Soda': 'Bright orange carbonated drink served chilled with ice.',
    'Grape Soda': 'Deep purple carbonated drink served chilled with ice.',
    'Root Beer': 'Dark brown soda served over ice with a creamy foam.',
    'Strawberry Soda': 'Vibrant pink, strawberry-flavored carbonated drink served with ice.',
    'Pineapple Soda': 'Golden-yellow pineapple-flavored soda served with ice.',
    'Green Apple Soda': 'Bright green apple-flavored soda served chilled with ice.',
    'Vanilla Cola': 'Dark cola with subtle vanilla notes served chilled over ice.',
    'Cherry Cola': 'Dark cherry-flavored cola served over ice.',
  },
  Burgers: {
    'Classic Cheeseburger': 'Seared beef patty, American cheese, lettuce, tomatoes, pickles, white onions, and signature burger sauce on a toasted sesame seed bun.',
    'Bacon Deluxe': 'Hardwood smoked bacon, beef patty, sharp cheddar, lettuce, sliced tomatoes, and mayonnaise on a brioche bun.',
    'BBQ Ranch & Onion Ring Burger': 'Beef patty, crispy onion rings, tangy BBQ sauce, pepper jack cheese, applewood smoked bacon, and buttermilk ranch.',
    'Spicy Jalapeño Smash Burger': 'Two thin smashed beef patties, sliced jalapeños, Monterey Jack cheese, spicy chipotle mayo, fresh cilantro, and pickled red onions on a toasted bun.',
    'Truffle Garlic Butter Burger': 'Garlic butter-infused prime beef patty, caramelized onions, aged white cheddar, arugula, and black truffle mayonnaise.',
    'Avocado Turkey Burger': 'Seasoned turkey patty, sliced avocado, alfalfa sprouts, red onion, sliced tomato, and herb-lemon yogurt sauce on a whole grain bun.',
    'Signature Double Cheeseburger': 'Two seared beef patties, melted cheddar, lettuce, tomato slices, red onions, and house sauce on a toasted brioche bun.',
    'Veggie Black Bean Burger': 'Spiced black bean and sweet corn patty, pepper jack cheese, pico de gallo, lettuce, and guacamole on a toasted brioche bun.',
    'Hawaiian Teriyaki Burger': 'Seared beef patty with sweet teriyaki glaze, grilled pineapple ring, Swiss cheese, lettuce, and mayo on a toasted sesame seed bun.',
    'Mushroom Swiss Burger': 'Sautéed cremini and button mushrooms, seasoned beef patty, Swiss cheese, and garlic aioli on a toasted potato roll.',
  },
  'French Fries': {
    'Classic French Fries': 'Golden, straight-cut, and lightly salted.',
    'Cheese Fries': 'Covered in smooth melted cheddar cheese sauce.',
    'Bacon Cheese Fries': 'Topped with melted cheese and crispy bacon pieces.',
    'BBQ Fries': 'Topped with smoky barbecue sauce and melted cheese.',
    'Chili Cheese Fries': 'Topped with savory chili beef and melted cheese sauce.',
    'Garlic Parmesan Fries': 'Seasoned with garlic and topped with grated parmesan.',
    'Spicy Fries': 'Coated in a visible spicy seasoning blend.',
    'Loaded Fries': 'Topped with melted cheese, bacon pieces, onions, and savory sauce.',
    'Curly Fries': 'Spiral-shaped fries featuring a seasoned exterior.',
    'Sweet Potato Fries': 'Irregularly shaped golden-orange sweet potatoes, lightly seasoned.',
  },
  'Fried Chicken': {
    'Classic Fried Chicken': 'Features a crunchy seasoned coating over juicy, tender meat.',
    'Spicy Fried Chicken': 'Coated in a flavorful, hot, and savory spicy seasoning.',
    'Chicken Wings': 'Juicy meat enclosed in a crunchy seasoned coating.',
    'Chicken Drumsticks': 'Juicy tender meat with a flavorful seasoned crust.',
    'Chicken Tenders': 'Tender chicken strips covered in a crispy golden breading.',
    'Korean-Style Fried Chicken': 'Coated with a glossy sweet and spicy sauce.',
    'Garlic Butter Chicken': 'Coated with a rich garlic butter sauce and savory seasoning.',
    'BBQ Fried Chicken': 'Coated with smoky barbecue sauce.',
    'Crispy Chicken Bites': 'Bite-sized juicy chicken pieces in a crunchy golden coating.',
    'Extra Crispy Chicken': 'Large pieces featuring an extra-thick crunchy coating.',
  },
  Pizza: {
    'Classic Pepperoni Pizza': 'Tomato sauce, melted mozzarella cheese, and generous pepperoni slices.',
    'Four Cheese Pizza': 'Mozzarella, cheddar, parmesan, and an additional rich melted cheese blend.',
    'Hawaiian Pizza': 'Savory ham, sweet pineapple chunks, tomato sauce, and melted mozzarella.',
    'Bacon Pizza': 'Crispy bacon, melted mozzarella, tomato sauce, and a savory cheese blend.',
    'Chicken BBQ Pizza': 'Grilled chicken, smoky barbecue sauce, onions, and melted mozzarella.',
    'Supreme Pizza': 'Pepperoni, sausage, mushrooms, onions, bell peppers, and melted mozzarella.',
    'Margherita Pizza': 'Tomato sauce, fresh mozzarella, and basil.',
    'Spicy Beef Pizza': 'Seasoned ground beef, spicy peppers, onions, tomato sauce, and melted mozzarella.',
    'Garlic Chicken Pizza': 'Seasoned chicken, garlic, onions, and mozzarella cheese.',
    'Meat Lovers Pizza': 'Pepperoni, bacon, sausage, beef, tomato sauce, and melted mozzarella.',
  },
}

const LEGACY_PRODUCT_NAMES = {
  Burgers: {
    'Bacon Cheeseburger': 'Bacon Deluxe',
    'BBQ Burger': 'BBQ Ranch & Onion Ring Burger',
    'Crispy Chicken Burger': 'Avocado Turkey Burger',
    'Deluxe Beef Burger': 'Truffle Garlic Butter Burger',
    'Double Beef Burger': 'Signature Double Cheeseburger',
    'Hawaiian Burger': 'Hawaiian Teriyaki Burger',
    'Spicy Chicken Burger': 'Spicy Jalapeño Smash Burger',
    'Triple Cheese Burger': 'Veggie Black Bean Burger',
  },
}

const OFFICIAL_BURGER_DETAILS = {
  'Classic Cheeseburger': {
    price: 220,
    description: 'A timeless favorite featuring a seared beef patty topped with melted American cheese, crisp lettuce, ripe tomatoes, pickles, white onions, and a dash of signature burger sauce on a toasted sesame seed bun.',
  },
  'Bacon Deluxe': {
    price: 280,
    description: 'Thick-cut hardwood smoked bacon layered over a juicy beef patty, topped with sharp cheddar cheese, fresh lettuce, sliced tomatoes, and creamy mayonnaise on a soft brioche bun.',
  },
  'Mushroom Swiss Burger': {
    price: 295,
    description: 'Sautéed cremini and button mushrooms piled high on a seasoned beef patty, melted under a blanket of nutty Swiss cheese, finished with garlic aioli on a toasted potato roll.',
  },
  'BBQ Ranch & Onion Ring Burger': {
    price: 320,
    description: 'A smoky combination of a beef patty topped with crispy golden onion rings, tangy BBQ sauce, melted pepper jack cheese, applewood smoked bacon, and a drizzle of buttermilk ranch dressing.',
  },
  'Spicy Jalapeño Smash Burger': {
    price: 310,
    description: 'Two thin, crispy-edged beef patties smashed with sliced jalapeños, covered in melted Monterey Jack cheese, spicy chipotle mayo, fresh cilantro, and pickled red onions on a toasted bun.',
  },
  'Truffle Garlic Butter Burger': {
    price: 360,
    description: 'An elevated gourmet option featuring a prime beef patty infused with garlic butter, topped with caramelized onions, aged white cheddar, arugula, and rich black truffle mayonnaise.',
  },
  'Avocado Turkey Burger': {
    price: 290,
    description: 'A lean, seasoned turkey patty paired with fresh sliced avocado, alfalfa sprouts, red onion, sliced tomato, and a splash of herb-lemon yogurt sauce on a whole grain bun.',
  },
  'Signature Double Cheeseburger': {
    price: 330,
    description: 'Two juicy seared beef patties stacked with melted cheddar cheese, crisp lettuce, fresh tomato slices, red onions, and house sauce on a toasted brioche bun.',
  },
  'Veggie Black Bean Burger': {
    price: 260,
    description: 'A house-made black bean and sweet corn patty spiced with cumin and smoked paprika, topped with pepper jack cheese, pico de gallo, fresh lettuce, and guacamole on a toasted brioche bun.',
  },
  'Hawaiian Teriyaki Burger': {
    price: 285,
    description: 'A seared beef patty glazed in sweet teriyaki sauce, topped with a grilled pineapple ring, melted Swiss cheese, crisp lettuce, and mayo on a toasted sesame seed bun.',
  },
}

const BURGER_IMAGE_ASSETS = {
  'Classic Cheeseburger': 'Classic Cheeseburger',
  'Bacon Deluxe': 'Bacon Cheeseburger',
  'Mushroom Swiss Burger': 'Mushroom Swiss Burger',
  'BBQ Ranch & Onion Ring Burger': 'BBQ Burger',
  'Spicy Jalapeño Smash Burger': 'Spicy Chicken Burger',
  'Truffle Garlic Butter Burger': 'Deluxe Beef Burger',
  'Avocado Turkey Burger': 'Crispy Chicken Burger',
  'Signature Double Cheeseburger': 'Double Beef Burger',
  'Veggie Black Bean Burger': 'Triple Cheese Burger',
  'Hawaiian Teriyaki Burger': 'Hawaiian Burger',
}

function getAssetImageSrc(category, name) {
  const assetName = category === 'Burgers' ? BURGER_IMAGE_ASSETS[name] ?? name : name
  return `/images/products/${category}/${assetName}.png`
}

export function getOfficialSpecification(product) {
  const name = LEGACY_PRODUCT_NAMES[product.category]?.[product.name] ?? product.name
  return OFFICIAL_SPECIFICATIONS[product.category]?.[name] ?? ''
}

export function applyOfficialSpecifications(products) {
  return products.map((product) => {
    const name = LEGACY_PRODUCT_NAMES[product.category]?.[product.name] ?? product.name
    const burgerDetails = product.category === 'Burgers' ? OFFICIAL_BURGER_DETAILS[name] : null
    return {
      ...product,
      name,
      ...(burgerDetails
        ? { price: burgerDetails.price, description: burgerDetails.description }
        : {}),
      ...(product.imageSourceType === 'asset'
        ? { imageSrc: getAssetImageSrc(product.category, name) }
        : {}),
      specifications: getOfficialSpecification(product) || product.specifications || '',
    }
  })
}

export function applyOfficialRatings(products) {
  return products.map((product) => {
    const rating = OFFICIAL_RATINGS[product.category]?.[product.name]
    return rating === undefined ? product : { ...product, rating }
  })
}

function createProducts(category, records) {
  return records.map(([name, price = null, description = '']) => ({
    id: `${category}-${name}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    name,
    category,
    imageSourceType: 'asset',
    imageSrc: getAssetImageSrc(category, name),
    imageKey: '',
    description,
    specifications: getOfficialSpecification({ category, name }),
    rating: OFFICIAL_RATINGS[category][name],
    price,
    quantity: 300,
  }))
}

export const defaultProducts = [
  ...createProducts('Pizza', [
    [
      'Classic Pepperoni Pizza',
      399,
      'A freshly baked pizza topped with tomato sauce, melted mozzarella cheese, and generous slices of pepperoni.',
    ],
    [
      'Four Cheese Pizza',
      420,
      'A creamy cheese pizza featuring mozzarella, cheddar, parmesan, and another rich melted cheese blend.',
    ],
    [
      'Hawaiian Pizza',
      380,
      'A cheesy pizza topped with savory ham and sweet pineapple chunks over tomato sauce and melted mozzarella.',
    ],
    [
      'Bacon Pizza',
      399,
      'A freshly baked pizza topped with crispy bacon, melted mozzarella, tomato sauce, and a savory cheese blend.',
    ],
    [
      'Chicken BBQ Pizza',
      440,
      'A cheesy pizza topped with grilled chicken, smoky barbecue sauce, onions, and melted mozzarella cheese.',
    ],
    [
      'Supreme Pizza',
      460,
      'A loaded pizza topped with pepperoni, sausage, mushrooms, onions, bell peppers, and melted mozzarella cheese.',
    ],
    [
      'Margherita Pizza',
      350,
      'A simple Italian-style pizza topped with tomato sauce, fresh mozzarella, and basil.',
    ],
    [
      'Spicy Beef Pizza',
      430,
      'A savory pizza topped with seasoned ground beef, spicy peppers, onions, tomato sauce, and melted mozzarella cheese.',
    ],
    [
      'Garlic Chicken Pizza',
      440,
      'A creamy cheesy pizza topped with seasoned chicken, garlic, onions, and mozzarella cheese.',
    ],
    [
      'Meat Lovers Pizza',
      480,
      'A hearty pizza loaded with pepperoni, bacon, sausage, beef, tomato sauce, and melted mozzarella cheese.',
    ],
  ]),
  ...createProducts('Fried Chicken', [
    [
      'Classic Fried Chicken',
      550,
      'Crispy golden fried chicken with a crunchy seasoned coating and juicy tender meat.',
    ],
    [
      'Spicy Fried Chicken',
      580,
      'Crispy fried chicken coated with a flavorful spicy seasoning for a hot and savory taste.',
    ],
    [
      'Chicken Wings',
      570,
      'Golden crispy chicken wings with juicy meat and a crunchy seasoned coating.',
    ],
    [
      'Chicken Drumsticks',
      580,
      'Crispy golden chicken drumsticks with juicy tender meat and a flavorful seasoned crust.',
    ],
    [
      'Chicken Tenders',
      560,
      'Tender strips of chicken covered in a crispy golden breading.',
    ],
    [
      'Korean-Style Fried Chicken',
      620,
      'Crispy fried chicken coated with a glossy sweet and spicy sauce.',
    ],
    [
      'Garlic Butter Chicken',
      610,
      'Crispy fried chicken coated with a rich garlic butter sauce and savory seasoning.',
    ],
    [
      'BBQ Fried Chicken',
      600,
      'Golden crispy chicken pieces coated with smoky barbecue sauce.',
    ],
    [
      'Crispy Chicken Bites',
      550,
      'Bite-sized pieces of juicy chicken covered in a crunchy golden coating.',
    ],
    [
      'Extra Crispy Chicken',
      630,
      'Large pieces of fried chicken with an extra-thick crunchy coating and juicy tender meat.',
    ],
  ]),
  ...createProducts('French Fries', [
    [
      'Classic French Fries',
      99,
      'Golden crispy straight-cut French fries with a lightly salted, natural appearance.',
    ],
    [
      'Cheese Fries',
      120,
      'Golden French fries generously covered with smooth melted cheddar cheese sauce.',
    ],
    [
      'Bacon Cheese Fries',
      150,
      'Crispy golden fries topped with melted cheese and realistic crispy bacon pieces.',
    ],
    [
      'BBQ Fries',
      130,
      'Golden fries topped with smoky barbecue sauce and melted cheese.',
    ],
    [
      'Chili Cheese Fries',
      160,
      'Crispy fries topped with savory chili beef and melted cheese sauce.',
    ],
    [
      'Garlic Parmesan Fries',
      140,
      'Golden fries seasoned with garlic and generously topped with grated parmesan cheese.',
    ],
    [
      'Spicy Fries',
      110,
      'Crispy golden fries covered with a visible spicy seasoning blend.',
    ],
    [
      'Loaded Fries',
      170,
      'Crispy fries topped with melted cheese, bacon pieces, onions, and savory sauce.',
    ],
    [
      'Curly Fries',
      130,
      'Crispy golden spiral-shaped fries with a seasoned exterior.',
    ],
    [
      'Sweet Potato Fries',
      140,
      'Crispy golden-orange sweet potato fries with naturally irregular shapes and lightly seasoned surfaces.',
    ],
  ]),
  ...createProducts('Soft Drinks', [
    [
      'Classic Cola',
      75,
      'A chilled dark cola served with ice, visible bubbles, and realistic condensation on the cup.',
    ],
    [
      'Lemon-Lime Soda',
      75,
      'A refreshing clear lemon-lime soft drink served over ice with bubbles and a crisp appearance.',
    ],
    [
      'Orange Soda',
      75,
      'A bright orange carbonated soft drink served chilled with ice and realistic bubbles.',
    ],
    [
      'Grape Soda',
      75,
      'A deep purple carbonated soft drink served chilled with ice and visible carbonation.',
    ],
    [
      'Root Beer',
      85,
      'A rich dark brown carbonated soft drink served over ice with a creamy foamy appearance.',
    ],
    [
      'Strawberry Soda',
      80,
      'A vibrant pink strawberry-flavored carbonated drink served chilled with ice and realistic bubbles.',
    ],
    [
      'Pineapple Soda',
      80,
      'A refreshing golden-yellow pineapple-flavored carbonated drink served with ice.',
    ],
    [
      'Green Apple Soda',
      80,
      'A bright green apple-flavored carbonated drink served chilled with ice and visible bubbles.',
    ],
    [
      'Vanilla Cola',
      85,
      'A dark cola with a subtle vanilla-inspired appearance, served chilled over ice with realistic carbonation.',
    ],
    [
      'Cherry Cola',
      85,
      'A dark cherry-flavored cola served over ice with realistic bubbles and condensation.',
    ],
  ]),
  ...createProducts('Burgers', [
    ...Object.entries(OFFICIAL_BURGER_DETAILS).map(([name, details]) => [
      name,
      details.price,
      details.description,
    ]),
  ]),
]
