<?php
session_start();

if (isset($_SESSION["email"])) {
  $email = $_SESSION["email"];
} else {
  $email = "";
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Arabian Cuisine - About Us</title>
  <link rel="stylesheet" href="stylesAboutUs.CSS" />
  <link rel="stylesheet" href="styles.css" />

  <link rel="icon" href="images/ArabianFoodIcon.jpg">

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

    <?php if (isset($_SESSION["firstname"])): ?>
      <p>Welcome, <span id="loggedInUser">
          <?php echo $_SESSION["firstname"]; ?>!
        </span></p>
      <button class="signup-btn" onclick="window.location.href='logout.php'">Logout</button>
    <?php else: ?>
      <button class="signup-btn" onclick="window.location.href='AccountLogin.php'">Join Us</button>
    <?php endif; ?>
  </header>



  <section class="story">
    <div class="container">

      <h1 id="outline">"ARAB FOOD BETTER FOOD"</h1>
      <p id="aftertext">It’s fresh, healthy, all the ingredients are premium quality. Arabian food less oil & less
        spice, tasty &
        armatic food in the world.</p>
      <br>
      <h1 id="outline">
        Story Of Arab Cuisine
      </h1>
      <p id="story">
        Arab food Better food It’s fresh, healthy, all the ingredients are premium
        quality less oil & less spicy food in the world. Arab cuisine is the cuisine of the Arabs,
        defined as the various regional cuisines spanning the Arab world.
        Driven by passion and a commitment to quality, we set out to create a
        dining experience that celebrates the rich traditions of Arabian
        hospitality. Each dish on our menu is crafted with care, using only
        the finest ingredients and time-honored recipes passed down through
        generations.
      </p>
      <br>
      <p id="story">
        At Arabian Delights, we invite you to join us on a culinary journey
        unlike any other. Whether you're savoring our savory kebabs, indulging
        in our decadent desserts, or simply enjoying the warm atmosphere of
        our restaurant, we promise an experience that will delight your senses
        and leave you craving more.
      </p>

    </div>
  </section>

  <footer >
  <p>&copy; Arabian Food Restaurant 2024</p>
  </footer>
</body>

</html>