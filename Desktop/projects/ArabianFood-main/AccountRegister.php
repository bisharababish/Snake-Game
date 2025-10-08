<?php
session_start();

include("DatabaseConnection.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') { //using the post method to connect the client to the server which is the database to the website.
  $firstname = $_POST['fname']; //fname from 'form' declaration down there and connect it to $firstname as a declaration for a variable.
  $lastname = $_POST['lname']; //lname from 'form' declaration down there and connect it to $lastname as a declaration for a variable.
  $num = $_POST['number']; //number from 'form' declaration down there and connect it to $num as a declaration for a variable.
  $address = $_POST['add']; //add from 'form' declaration down there and connect it to $address as a declaration for a variable.
  $gmail = $_POST['mail']; //mail from 'form' declaration down there and connect it to $gmail as a declaration for a variable.
  $password = $_POST['pass']; //pass from 'form' declaration down there and connect it to $password as a declaration for a variable.

  if (!empty($gmail) && !empty($password) && !is_numeric($gmail)) { // if not empty then insert to the table which is called form
    $query = "insert into form (fname,lname,cnum,address,email,pass) values('$firstname','$lastname','$num','$address','$gmail','$password')"; //variables in form table and values from the declaration.
    mysqli_query($conn, $query); // to execute the query  
    echo "<script type='text/javascript'> alert('Successfully Registered')</script>"; // pop out the alert  if works.

  } else {
    echo "<script type='text/javascript'> alert('Please Enter some Valid Information')</script>"; // pop out the alert if smth happend.


  }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="images/ArabianFoodIcon.jpg">

  <title>Account Registration</title>
  <link rel="stylesheet" href="stylesLogin.css" />
  <link rel=" icon" href="images/ArabianFoodIcon.jpg"> <!-- Icon of the Website  -->

</head>

<body>
  <header>
    <div class="logo">
      <a href="index.php">
        <img src="images/logo.PNG" alt="Arabian Food" />
      </a>
    </div>
  </header>
  <div class="signup"></div>
  <h1>Sign Up</h1>
  <h4>it's free and only takes a minute.</h4>
  <!--Using the POST method which we used up there,declaration each of the text areas to input information.-->
  <form method="POST">
    <label>First Name:</label>
    <input type="text" name="fname" required>
    <label>Last Name:</label>
    <input type="text" name="lname" required>
    <label>Contact Address:</label>
    <input type="tel" name="number" required>
    <label>Address:</label>
    <input type="text" name="add" required>
    <label>Email:</label>
    <input type="email" name="mail" required>
    <label>Password:</label>
    <input type="password" name="pass" required>
    <input type="submit" name="" value="Submit">
  </form>
  <p>Already have an account?<a href="AccountLogin.php"> Login Here</a></p>
</body>

</html>