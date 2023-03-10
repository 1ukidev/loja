<?php
    $email = $_POST["email"];
    $password = $_POST["password"];
    
    $servername = "localhost";
    $username = "root";
    $password = "123456";
    $dbname = "teste23";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT email, password FROM teste23 WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<h3>Logado com sucesso!<h3>";
    } else {
        echo "<h3>Este usuário não existe</h3>";
    }

    $conn->close();
?>