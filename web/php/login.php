<?php
    $email = $_POST["email"];
    $password = $_POST["password"];
    
    $servername = "localhost";
    $username = "root";
    $password = "123456";
    $dbname = "projeto";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT name_user, email, password FROM cegonha WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = mysqli_fetch_assoc($result);
        echo "<script>" . "profile.push('" . $row["name_user"] . "')" . "</script>";

        echo "<script>
                localStorage.setItem('profile', JSON.stringify(profile));
                alertify.success('Logado com sucesso!');
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