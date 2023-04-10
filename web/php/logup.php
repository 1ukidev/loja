<?php
    $name = $_POST["name"];
    $cpf = $_POST["cpf"];
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

    $sql = "INSERT INTO teste23 (nome, email, password, cpf) VALUES ('$name', '$email', '$password', '$cpf')";

    if($conn->query($sql) === TRUE) {
        echo "<script>
                alertify.success('Cadastro com sucesso!');
                profile.push('Robson');
                localStorage.setItem('profile', JSON.stringify(profile));
                displayProducts();
                console.log(profile);
            </script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
?>