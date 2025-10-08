<?php
session_start();

include("DatabaseConnection.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {  //using the post method to connect the client to the server which is the database to the website.
  $gmail = $_POST['mail']; //mail from 'form' declaration down there and connect it to $gmail as a declaration for a variable.
  $password = $_POST['pass']; //pass from 'form' declaration down there and connect it to $password as a declaration for a variable.

  if (!empty($gmail) && !empty($password) && !is_numeric($gmail)) { // if not empty then execute the query to select the email from the database which got registered.
    $query = "select * from form where email='$gmail' limit 1"; // limit 1 used to only recieve one email by a time not all the emails in the database. thats we limited it to 1.
    $result = mysqli_query($conn, $query); // execute the query

    if ($result) { // to check if the variable result is not empty and to check the rows
      if ($result && mysqli_num_rows($result) > 0) { //to check if there are rows returned or not.
        $user_data = mysqli_fetch_assoc($result); // if yes then fetch it from the database from first row.
        if ($user_data['pass'] == $password) { // to check if pass is matched with the database one.
          $_SESSION["email"] = $user_data['email']; // session start for email and firstmname so can be used in index.php to welcome the user in the page.
          $_SESSION["firstname"] = $user_data['fname'];

          header("location: index.php"); // when logged in then return to index.php
          die;
        }
      }
    }
    echo "<script type='text/javascript'> alert('Wrong Username or Password')</script>";
  } else {
    echo "<script type='text/javascript'> alert('Wrong Username or Password')</script>";

  }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="images/ArabianFoodIcon.jpg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="stylesLogin.css" />
  <title>Account Login</title>
</head>

<body>
  <header>
    <div class="logo">
      <a href="index.php">
        <img src="images/logo.PNG" alt="Arabian Food" />
      </a>
    </div>
  </header>
  <div class="login"></div>
  <h1>Login</h1>
  <form method="POST">
    <label>Email:</label>
    <input type="email" name="mail" required>
    <label>Password:</label>
    <input type="password" name="pass" required>
    <input type="submit" name="" value="Submit">
  </form>
  <p>Not have an account?<a href="AccountRegister.php"> Sign Up Here</a></p>
  <p>Home Page to Explore?<a href="index.php"> Click Here</a></p>

</body>

</html>