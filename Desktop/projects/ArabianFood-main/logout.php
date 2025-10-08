<?php
session_start();

$_SESSION = array();


session_destroy(); // terminates the session

header("Location: AccountLogin.php"); // when logout has been clicked then it redirects the user to accountlogin.php which is login page.
exit;
?>