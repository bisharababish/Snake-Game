<?php
// Netlify-compatible database connection
// For production deployment, you'll need to use a cloud database service

// Option 1: Use environment variables for database credentials
$servername = $_ENV['DB_SERVER'] ?? 'localhost';
$username = $_ENV['DB_USER'] ?? 'root';
$password = $_ENV['DB_PASSWORD'] ?? '';
$dbname = $_ENV['DB_NAME'] ?? 'registrations';

// Option 2: For demo purposes without database
// Set this to true to disable database functionality
$DISABLE_DB = true;

if ($DISABLE_DB) {
    // Mock connection for demonstration
    $conn = null;
    $connection_status = "Database disabled for demo";
} else {
    // Real database connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $connection_status = "Connected successfully";
}

// Helper function to check if database is available
function isDatabaseAvailable() {
    global $conn, $DISABLE_DB;
    return !$DISABLE_DB && $conn !== null;
}
?>
