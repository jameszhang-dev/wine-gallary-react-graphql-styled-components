/**
 * Returns a formatted number with different number of decimals.
 * @param {number} number - number to be transformed
 * @param {number} decimal - number of decimals you want to show
 * @param {boolean} hasThousandSeparator - in case you want to show thousand separator
 * @return {string}
 * */
const formatNumber = (number, decimal = 2, hasThousandSeparator = true) => {
  if (hasThousandSeparator && number > 999.99) {
    return (
      parseFloat(Math.round(number * 100) / 100)
        .toFixed(decimal)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
  }
  return parseFloat(Math.round(number * 100) / 100).toFixed(decimal);
};

/**
 * Sets time out with async/await features (useful for testing mutations).
 * @param {number} ms - milliseconds to be waited
 * @return {Promise<any>}
 * */
const wait = ms => new Promise(r => setTimeout(r, ms));

/**
 * Saves or removes item from local storage. In case duplicated it will increase or decrease the quantity.
 * @param {Object} shoppingCartItem
 * @param {boolean} isItemIncreased - if user is increasing item quantity
 * @param {boolean} isItemDecreased - if user is decreasing item quantity
 * @param {boolean} isProductRemoved - if user is removing product
 * @return {Promise<void>}
 * */
const saveCartItemToLocalStorage = async (
  shoppingCartItem, isItemIncreased = false, isItemDecreased = false, isProductRemoved = false
) => {
  const newItemsJson = { items: [] };
  const previousItemsJson = JSON.parse(localStorage.getItem('shoppingCart')) || newItemsJson;

  // Verifies if shopping cart has any item and if it is a duplicated product
  const isDuplicated = previousItemsJson.items.length
    && previousItemsJson.items.some(sc => sc.product.id === shoppingCartItem.product.id);

  // Adds new product only if the new item is duplicated or if the shopping cart is empty
  if (isDuplicated && !isProductRemoved && (isItemDecreased || isItemIncreased)) {
    newItemsJson.items = previousItemsJson.items.map(item => {
      const newItem = item;

      // Checks if current item is the targeted item
      if (item.product.id === shoppingCartItem.product.id) {

        // Decreases quantity of that wine in the shopping cart
        if (isItemDecreased) {
          newItem.quantity = item.quantity - 1;

          // Sets quantity to ZERO if user tries to decrease quantity to less than ZERO
          if (newItem.quantity < 1) {
            newItem.quantity = 0;
          }

          // Increases quantity of that wine in the shopping cart
        } else if (isItemIncreased) {
          newItem.quantity = item.quantity + 1;
        }
      }
      return newItem;
    });

    //  Removes all the items of that product
  } else if (isProductRemoved) {
    newItemsJson.items = previousItemsJson.items.filter(
      product => product.product.id !== shoppingCartItem.product.id
    );

    //  Adds new product to shopping cart
  } else {
    previousItemsJson.items.push(shoppingCartItem);
    newItemsJson.items = previousItemsJson.items;
  }

  // Saves new shopping cart to browser local storage
  localStorage.setItem('shoppingCart', JSON.stringify(newItemsJson));
};

/**
 * Gets shopping cart from local storage and parses into an JSON object.
 * @return {Object} shopping cart from local storage
 * */
const shoppingCartLocalStorage = () => JSON.parse(localStorage.getItem('shoppingCart'));

export {
  formatNumber,
  shoppingCartLocalStorage,
  saveCartItemToLocalStorage,
  wait,
};
