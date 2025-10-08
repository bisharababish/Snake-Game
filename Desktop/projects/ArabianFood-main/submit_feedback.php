<?php
session_start(); // start the session for the database.

include("DatabaseConnection.php"); // taking the database php code which is connecting the database to the website

if ($_SERVER['REQUEST_METHOD'] == 'POST') { // using POST method to connect the client to the server it self which is the website.
    $email = isset($_SESSION["email"]) ? $_SESSION["email"] : ""; // gets the email from the database, and if not there then it puts its value to nothing 

    $feedback_message = $_POST['message']; // gets  the feedback message from the database

    if (!empty($feedback_message) && !empty($email)) { // checks if the msg and the email are not empty if not empty it updates the msg on the database from the sql code.
        $query = "UPDATE form SET feedback_message='$feedback_message' WHERE email='$email'";
        mysqli_query($conn, $query); // executes the connections and the query.

        header("Location: contactus.php"); // heads the user to the contactus.php 
        exit();
    } else {
        echo "<script type='text/javascript'> alert('Please Enter Some Feedback')</script>"; // if nothing is there then it says the alert.
        header("Location: contactus.php");
        exit();
    }
}
?>

