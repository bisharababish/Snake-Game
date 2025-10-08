<!-- php Code to connect the email from the database and from AccountRegister 
so when logging into the website it loads the email you were signed with. -->
<?php
session_start();

if (isset($_SESSION["email"])) {
  $email = $_SESSION["email"]; // compares if the email from database is the same as the one who got registered with.
} else {                       // if connected then connect and show the email and procceed, IF NOT then leaves it empty and breaks.
  $email = "";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="images/ArabianFoodIcon.jpg"> <!-- Icon of the Website  -->
  <title>Arabian Cuisine</title>
</head>

<body>
  <header>
    <div class="logo">
      <a href="index.php">
        <img src="images/logo.png" alt="Arabian Cuisine" />
      </a>
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

    <?php if (isset($_SESSION["firstname"])): ?>
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
  <div class="Food">
    <div>
      <h1 id="FoodLabel">Food</h1>
    </div>
    <div class="LineUnder"></div>
    <div class="FoodImages">
      <div class="food-item">
        <img src="FoodImages/Kabsa.jpg" alt="Kabsa">
        <span>Kabsa</span>
      </div>
      <div class="food-item">
        <img src="FoodImages/Mnokheyye.jpg" alt="Mnokheyye">
        <span>Mnokheyye</span>
      </div>
      <div class="food-item">
        <img src="FoodImages/Kebab.jpg" alt="Kebab">
        <span>Kebab</span>
      </div>
      <div class="food-item">
        <img src="FoodImages/Maftool.jpg" alt="Maftool">
        <span>Maftool</span>
      </div>
      <div class="food-item">
        <img src="FoodImages/Maqluba.jpg" alt="Maqluba">
        <span>Maqluba</span>
      </div>
      <div class="food-item">
        <img src="FoodImages/Kufta.jpg" alt="Kufta">
        <span>Kufta</span>
      </div>
      <div class="food-item">
        <img src="FoodImages/WarakDawali.jpg" alt="WarakDawali">
        <span>Warak Dawali</span>
      </div>
      <div class="food-item">
        <img src="FoodImages/Musakhan.jpg" alt="Musakhan">
        <span>Musakhan</span>
      </div>
      <div class="food-item">
        <img src="FoodImages/Mansaf.jpg" alt="Mansaf">
        <span>Mansaf</span>
      </div>
    </div>
  </div>
  <div class="Drinks">
    <div>
      <h1 id="DrinksLabel">Drinks</h1>
    </div>
    <div class="LineUnder"></div>
    <div class="DrinksImages">
      <div class="drink-item">
        <img src="DrinksImages/CocaCola.jpg" alt="CocaCola">
        <span>Coca Cola</span>
      </div>
      <div class="drink-item">
        <img src="DrinksImages/CocaColaZero.jpg" alt="CocaColaZero">
        <span>Coca Cola Zero</span>
      </div>
      <div class="drink-item">
        <img src="DrinksImages/Sprite.jpg" alt="Sprite">
        <span>Sprite</span>
      </div>
      <div class="drink-item">
        <img src="DrinksImages/Fanta.jpg" alt="Fanta">
        <span>Fanta</span>
      </div>
      <div class="drink-item">
        <img src="DrinksImages/Shani.jpg" alt="Shani">
        <span>Shani</span>
      </div>
      <div class="drink-item">
        <img src="DrinksImages/Water.jpg" alt="Water">
        <span>Water</span>
      </div>
      <div class="drink-item">
        <img src="DrinksImages/Coffee.jpg" alt="Black Coffee">
        <span>Black Coffee</span>
      </div>
      <div class="drink-item">
        <img src="DrinksImages/Tea.jpg" alt="Tea">
        <span>Tea</span>
      </div>
      <div class="drink-item">
        <img src="DrinksImages/Sahlab.jpg" alt="Sahlab">
        <span>Sahlab</span>
      </div>
    </div>
  </div>

  <div class="SaladAndDeserts">
    <div>
      <h1 id="SaladDesertsLabel">Salad And Deserts</h1>
    </div>
    <div class="LineUnder"></div>
    <div class="SaladAndDesertsImages">
      <div class="SaladDeserts-item">
        <img src="SaladAndDesertsImages/Shakshuka.jpg" alt="Shakshuka">
        <span>Shakshuka</span>
      </div>
      <div class="SaladDeserts-item">
        <img src="SaladAndDesertsImages/Falafel.jpg" alt="Falafel">
        <span>Falafel</span>
      </div>
      <div class="SaladDeserts-item">
        <img src="SaladAndDesertsImages/Tabbouleh.jpg" alt="Tabbouleh">
        <span>Tabbouleh</span>
      </div>
      <div class="SaladDeserts-item">
        <img src="SaladAndDesertsImages/Sfeeha.jpg" alt="Sfeeha">
        <span>Sfeeha</span>
      </div>
      <div class="SaladDeserts-item">
        <img src="SaladAndDesertsImages/Hummus.jpg" alt="Hummus">
        <span>Hummus</span>
      </div>
      <div class="SaladDeserts-item">
        <img src="SaladAndDesertsImages/Knafeh.jpg" alt="Knafeh">
        <span>Knafeh</span>
      </div>
      <div class="SaladDeserts-item">
        <img src="SaladAndDesertsImages/Dolma.jpg" alt="Dolma">
        <span>Dolma</span>
      </div>
      <div class="SaladDeserts-item">
        <img src="SaladAndDesertsImages/Baklava.jpg" alt="Baklava">
        <span>Baklava</span>
      </div>
      <div class="SaladDeserts-item">
        <img src="SaladAndDesertsImages/CesarSalad.jpg" alt="Cesar Salad">
        <span>Cesar Salad</span>
      </div>
    </div>
  </div>


  <br><br><br>

  <script src="scripts/AddingOrders.js"></script>
  <footer>
    <p>&copy; Arabian Food Restaurant 2024</p>
  </footer>
</body>

</html>