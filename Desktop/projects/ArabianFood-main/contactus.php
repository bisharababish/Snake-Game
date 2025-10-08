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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="stylesContactUS.css" />
  <link rel="stylesheet" href="styles.css" />


  <link rel="icon" href="images/ArabianFoodIcon.jpg"> <!-- Icon of the Website  -->

  <title>Arabian Cuisine - Contact US</title>

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

    <h1>Contact Us</h1>
    <form method="POST" action="submit_feedback.php" onsubmit="showMessage()">
      <!-- takes the method post and the action which is the code in sumbit_feedback and the showmessage  -->
      <script>                                                               // <!-- so it shows as a pop out msg   -->
        function showMessage() {  // Function to show popup message with its alert which has to be a script.
          alert("Message received! Thank you for your feedback.");
        }
      </script>
      <textarea id="message" name="message" required placeholder="Your Feedback"></textarea>
      <input type="submit" name="save" value="Submit">
    </form>
    <p id="word">We value your feedback. Please feel free to share any comments, suggestions, or concerns with us.</p>
  </div>

  <footer>
    <p>&copy; Arabian Food Restaurant 2024</p>
  </footer>
</body>

</html>