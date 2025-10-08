<!-- php Code to connect the email from the database and from AccountRegister 
so when logging into the website it loads the email you were signed with. -->
<?php
session_start();

if (isset ($_SESSION["email"])) {
  $email = $_SESSION["email"]; // compares if the email from database is the same as the one who got registered with.
} else {                       // if connected then connect and show the email and procceed, IF NOT then leaves it empty and breaks.
  $email = "";
}

if (isset ($_SESSION["addToCartMessage"])) {
  $message = $_SESSION["addToCartMessage"];
  unset($_SESSION["addToCartMessage"]); // Clear message after displaying
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="stylesOrders.css">
  <link rel="stylesheet" href="styles.css" />

  <link rel="icon" href="images/ArabianFoodIcon.jpg"> <!-- Icon of the Website  -->
  <title>Arabian Cuisine - Orders</title>

</head>

<body>
  <header>
    <div class="logo">
      <a href="index.php">
        <img src="images/logo.png" alt="Arabian Food" />
    </div>
    <nav>
      <a href="index.php">Menu</a>
      <a href="orders.php">Orders</a>
      <a href="aboutus.php">About Us</a>
      <a href="contactus.php">Contact Us</a>
    </nav>
    <!-- to show email as a logged user,same as for the firstname. -->
    <!-- <?php if ($email != ""): ?>
      <p>Welcome, <span id="loggedInUser">
      <?php echo $email; ?>
        </span></p>
      <button class="signup-btn" onclick="window.location.href='logout.php'">Logout</button>
    <?php else: ?>
      <button class="signup-btn" onclick="window.location.href='AccountLogin.php'">Join Us</button>
    <?php endif; ?> -->

    <?php if (isset ($_SESSION["firstname"])): ?>
      <!-- if firstname taken then log in and print "Welcome,Firstname" of the user registered in database -->
      <p>Welcome, <span id="loggedInUser">
          <!--then it shows the name, and when this happens it shows a button called Logout that ends the session.-->
          <?php echo $_SESSION["firstname"]; ?>!
        </span></p>
      <button class="signup-btn" onclick="window.location.href='logout.php'">Logout</button>

    <?php else: ?>
      <button class="signup-btn" onclick="window.location.href='AccountLogin.php'">Join Us</button>
      <!-- else it shows Join us when logged out. -->
    <?php endif; ?>

  </header>
  <div class="container">
    <h1>Your Orders</h1>
    <!-- if there is no email logged inp the website then it will show a msg called "login to view ur orders." -->
    <?php if ($email != ""): ?>
      <form id="cart_items" method="POST" action="AddToCartOrders.php">
        <div class="category">
          <label for="food">Food</label>
          <select id="food" name="food">
            <option value="0">Select an Item</option>
            <option value="Kabsa" data-price="5">Kabsa</option>
            <option value="Mnokheyye" data-price="7">Mnokheyye</option>
            <option value="Kebab" data-price="9">Kebab</option>
            <option value="Maftool" data-price="15">Maftool</option>
            <option value="Maqluba" data-price="8">Maqluba</option>
            <option value="Kufta" data-price="11">Kufta</option>
            <option value="WarakDawali" data-price="12">Warak Dawali</option>
            <option value="Musakhan" data-price="17">Musakhan</option>
            <option value="Mansaf" data-price="25">Mansaf</option>
          </select>
          <input type="number" id="foodQuantity" name="foodQuantity" min="0" placeholder="Quantity">
          <!--Quantity Text area to choose how many things u want!-->

        </div>

        <div class="category">
          <label for="drinks">Drinks</label>
          <select id="drinks" name="drinks">
            <option value="0">Select an Item</option>
            <option value="CocaCola" data-price="3">Coca Cola</option>
            <option value="CocaColaZero" data-price="3">Coca Cola Zero</option>
            <option value="Sprite" data-price="3">Sprite</option>
            <option value="Fanta" data-price="3">Fanta</option>
            <option value="Shani" data-price="3">Shani</option>
            <option value="Water" data-price="3">Water</option>
            <option value="BlackCoffee" data-price="5">Black Coffee</option>
            <option value="Tea" data-price="5">Tea</option>
            <option value="Sahlab" data-price="5">Sahlab</option>
          </select>
          <input type="number" id="drinkQuantity" name="drinkQuantity" min="0" placeholder="Quantity">
          <!--Quantity Text area to choose how many things u want!-->

        </div>

        <div class="category">
          <label for="salad">Salad and Desserts</label>
          <select id="salad" name="salad">
            <option value="0">Select an Item</option>
            <option value="Shakshuka" data-price="5">Shakshuka</option>
            <option value="Falafel" data-price="5">Falafel</option>
            <option value="Tabbouleh" data-price="5">Tabbouleh</option>
            <option value="Sfeeha" data-price="5">Sfeeha</option>
            <option value="Hummus" data-price="5">Hummus</option>
            <option value="Knafeh" data-price="5">Knafeh</option>
            <option value="Dolma" data-price="5">Dolma</option>
            <option value="Baklava" data-price="5">Baklava</option>
            <option value="CesarSalad" data-price="10">Cesar Salad</option>
          </select>
          <input type="number" id="saladQuantity" name="saladQuantity" min="0" placeholder="Quantity">
          <!--Quantity Text area to choose how many things u want!-->

        </div>

        <div class="submit-btn">
          <button type="button" onclick="addToCart()">Add to Cart</button>
          <!--takes the addtocart from the AddingOrder javascript code to add the quantity to cart.-->
        </div>
      </form>

      <div id="addToCartMessage" style="display: none;"></div>
    <?php else: ?>
      <p id="ViewOrder">Please log in to view your orders. <a href="AccountLogin.php" id="ViewOrdersLogin">Login</a></p>
    </div>
  <?php endif; ?>

  <footer>
    <p>&copy; Arabian Food Restaurant 2024</p>
  </footer>
  <div id="addToCartMessage">
    <?php if (isset ($message))
      echo $message; ?>
  </div>

  <script src="scripts/AddingOrders.js"></script>
</body>

</html>