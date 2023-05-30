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

    $sql = "INSERT INTO cegonha (name_user, email, password, cpf) VALUES ('$name', '$email', '$password', '$cpf')";

    if($conn->query($sql) === TRUE) {
        echo "<script>
                alertify.success('Cadastro com sucesso!');
                profileName.push('$name');
                localStorage.setItem('profileName', JSON.stringify(profileName));
                displayProducts();
                document.getElementById('login').remove();
                document.getElementById('profile').style.display = 'block';
                userEmail.push('$email');
                localStorage.setItem('userEmail', JSON.stringify(userEmail));
            </script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
?>