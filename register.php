<?php
require_once '../config/database.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/html');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Log incoming data
        error_log(print_r($_POST, true));

        // Modern way to sanitize strings in PHP
        $fullName = htmlspecialchars(trim($_POST['fullName']), ENT_QUOTES, 'UTF-8');
        $regNumber = htmlspecialchars(trim($_POST['regNumber']), ENT_QUOTES, 'UTF-8');
        $sex = htmlspecialchars(trim($_POST['sex']), ENT_QUOTES, 'UTF-8');
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $region = htmlspecialchars(trim($_POST['region']), ENT_QUOTES, 'UTF-8');
        $district = htmlspecialchars(trim($_POST['district']), ENT_QUOTES, 'UTF-8');
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

        // Validate the data
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format');
        }

        if (!preg_match('/^BCS-\d{2}-\d{4}-\d{4}$/', $regNumber)) {
            throw new Exception('Invalid registration number format');
        }

        // Prepare SQL statement
        $stmt = $pdo->prepare("INSERT INTO users (full_name, reg_number, sex, email, region, district, password) 
                              VALUES (:fullName, :regNumber, :sex, :email, :region, :district, :password)");

        // Bind parameters
        $stmt->bindParam(':fullName', $fullName);
        $stmt->bindParam(':regNumber', $regNumber);
        $stmt->bindParam(':sex', $sex);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':region', $region);
        $stmt->bindParam(':district', $district);
        $stmt->bindParam(':password', $password);

        // Execute the statement
        $stmt->execute();

        echo '<script>
                alert("Registration successful");
                if (confirm("Do you want to go to the home page?")) {
                    window.location.href = "home.html";
                }
              </script>';
    } catch (PDOException $e) {
        error_log($e->getMessage());
        http_response_code(500);
        echo '<script>alert("Database error occurred");</script>';
    } catch (Exception $e) {
        http_response_code(400);
        echo '<script>alert("' . $e->getMessage() . '");</script>';
    }
}
?>