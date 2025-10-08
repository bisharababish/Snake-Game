<?php
session_start();

include ("DatabaseConnection.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = isset($_SESSION["email"]) ? $_SESSION["email"] : "";
    $cartitems = ""; // Initialize variable to store cart items

    // Gather selected items and quantities
    if (isset($_POST['food']) && isset($_POST['foodQuantity'])) {
        $cartitems .= $_POST['food'] . ":" . $_POST['foodQuantity'] . ",";
    }
    if (isset($_POST['drinks']) && isset($_POST['drinkQuantity'])) {
        $cartitems .= $_POST['drinks'] . ":" . $_POST['drinkQuantity'] . ",";
    }
    if (isset($_POST['salad']) && isset($_POST['saladQuantity'])) {
        $cartitems .= $_POST['salad'] . ":" . $_POST['saladQuantity'] . ",";
    }

    // Remove trailing comma
    $cartitems = rtrim($cartitems, ",");

    if (!empty($cartitems) && !empty($email)) {
        // Update cart items in the database
        $query = "UPDATE form SET cart_items='$cartitems' WHERE email='$email'";
        mysqli_query($conn, $query);
        // Redirect to orders.php
        header("Location: orders.php");
        exit();
    } else {
        echo "<script type='text/javascript'> alert('Please Add Something To Cart')</script>";
        header("Location: orders.php");
        exit();
    }
}
?>