var selectedItems = [];

function addToCart() {
  // Submit the form to add items to the cart

  var totalPrice = 0;

  var food = getItemDetails("food", "foodQuantity");
  var drinks = getItemDetails("drinks", "drinkQuantity");
  var salad = getItemDetails("salad", "saladQuantity");

  selectedItems.forEach(item => {
    totalPrice += item.totalPrice;
  });
  var message = "You have added:\n";
   selectedItems.forEach(item => {
    message += "- " + item.quantity + " " + item.item + " ($" + item.totalPrice + ")\n";
   });
  message += "\nYour total amount to pay is $" + totalPrice;

   var addToCartMessage = document.getElementById("addToCartMessage");
   addToCartMessage.innerText = message;
   addToCartMessage.style.display = "block";

  clearInputFields();
}


function getItemDetails(itemId, quantityId) {
  var item = document.getElementById(itemId).value;
  var quantity = parseInt(document.getElementById(quantityId).value);

  if (quantity > 0 && item.trim() !== "") {
    var price = parseFloat(document.getElementById(itemId).selectedOptions[0].getAttribute("data-price")) || 0;
    var existingItemIndex = selectedItems.findIndex(selItem => selItem.item === item);
    if (existingItemIndex !== -1) {
      selectedItems[existingItemIndex].quantity += quantity;
      selectedItems[existingItemIndex].totalPrice += price * quantity;
    } else {
      var totalPrice = price * quantity;
      selectedItems.push({ item: item, quantity: quantity, totalPrice: totalPrice });
    }
  }

  return { item: item, quantity: quantity, totalPrice: price * quantity };
}

function clearInputFields() {
  document.getElementById("foodQuantity").value = "";
  document.getElementById("drinkQuantity").value = "";
  document.getElementById("saladQuantity").value = "";
}
