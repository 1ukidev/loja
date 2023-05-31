<?php
    $name = $_POST["name"];

    $cpf = $_POST["cpf"];
    $cpf = str_replace(".", "", $cpf);
    $cpf = str_replace("-", "", $cpf);

    $email = $_POST["email"];
    $password = $_POST["password"];
    
    $servername = "localhost";
    $username = "root";
    $password_db = "123456";
    $dbname = "projeto";

    $conn = new mysqli($servername, $username, $password_db, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO cegonha (name_user, email, password, cpf) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Error: " . $conn->error);
    }

    $stmt->bind_param("ssss", $name, $email, $password, $cpf);

    if ($stmt->execute()) {
        echo "<script>
                alertify.success('Cadastro com sucesso!');
                profileName = [];
                profileName.push('$name');
                localStorage.setItem('profileName', JSON.stringify(profileName));
                displayProducts();
                document.getElementById('login').remove();
                document.getElementById('profile').style.display = 'block';
                userEmail.push('$email');
                localStorage.setItem('userEmail', JSON.stringify(userEmail));
            </script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
?>
