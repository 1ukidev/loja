<?php
    $email = $_POST["email"];
    $password = $_POST["password"];
    
    $servername = "localhost";
    $username = "root";
    $dbpassword = "123456";
    $dbname = "projeto";

    $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT name_user, email, password FROM cegonha WHERE email=? AND password=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<script>" . "profileName.push('" . $row["name_user"] . "')" . "</script>";

        echo "<script>
                localStorage.setItem('profileName', JSON.stringify(profileName));
                alertify.success('Logado com sucesso!');
                displayProducts();
                document.getElementById('login').remove();
                document.getElementById('profile').style.display = 'block';
                userEmail.push('$email');
                localStorage.setItem('userEmail', JSON.stringify(userEmail));
            </script>";
    } else {
        echo "<script>
                alertify.error('Este usuário não existe');
                displayProducts();
            </script>";
    }

    $stmt->close();
    $conn->close();
?>