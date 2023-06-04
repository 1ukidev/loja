<?php
    $email = $_POST["email"];
    $password = $_POST["password"];

    $servername = "localhost";
    $username = "root";
    $password_db = "";
    $dbname = "projeto";

    $conn = new mysqli($servername, $username, $password_db, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT name_user, email, password FROM cegonha WHERE email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row["password"];

        if (password_verify($password, $hashedPassword)) {
            echo "<script>
                    while (profileName.length) { profileName.pop(); }
                    profileName.push('" . $row["name_user"] . "')
                    localStorage.setItem('profileName', JSON.stringify(profileName));
                    alertify.success('Logado com sucesso!');
                    location.hash = '';
                    document.getElementById('login').remove();
                    document.getElementById('profile').style.display = 'block';
                    userEmail.push('$email');
                    localStorage.setItem('userEmail', JSON.stringify(userEmail));
                </script>";
        } else {
            echo "<script>
                    alertify.error('Senha incorreta');
                    location.hash = '';
                </script>";
        }
    } else {
        echo "<script>
                alertify.error('Este usuário não existe');
                location.hash = '';
            </script>";
    }

    $stmt->close();
    $conn->close();
?>