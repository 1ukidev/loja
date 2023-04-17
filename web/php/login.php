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
    // $sql = "SELECT email, password FROM Users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<script>
                alertify.success('Logado com sucesso!');
                profile.push('Robson');
                localStorage.setItem('profile', JSON.stringify(profile));
                displayProducts();
                document.getElementById('login').remove();
                document.getElementById('profile').style.display = 'block';
            </script>";
    } else {
        echo "<script>
                alertify.error('Este usuário não existe');
                displayProducts();
            </script>";
    }

    $conn->close();
?>