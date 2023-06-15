<?php
    $name = $_POST["name"];

    $cpf = $_POST["cpf"];
    $cpf = str_replace(".", "", $cpf);
    $cpf = str_replace("-", "", $cpf);

    $email = $_POST["email"];
    $hash_email = $_POST["hash_email"];
    $password = $_POST["password"];
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $servername = "localhost";
    $username = "root";
    $password_db = "123456";
    $dbname = "projeto";

    $conn = new mysqli($servername, $username, $password_db, $dbname);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    $existingUserQuery = "SELECT id_user FROM cegonha WHERE email=? OR cpf=?";
    $existingUserStmt = $conn->prepare($existingUserQuery);
    $existingUserStmt->bind_param("ss", $email, $cpf);
    $existingUserStmt->execute();
    $existingUserResult = $existingUserStmt->get_result();

    if ($existingUserResult->num_rows > 0) {
        echo "<script>
                changeHash('');
                alertify.error('Este usuário já está cadastrado');
            </script>";
        $existingUserStmt->close();
        $conn->close();
        exit();
    }

    $sql = "INSERT INTO cegonha (name_user, email, hash_email, password, cpf) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Erro: " . $conn->error);
    }

    $stmt->bind_param("sssss", $name, $email, $hash_email, $hash, $cpf);

    if ($stmt->execute()) {
        echo "<script>
                alertify.success('Cadastro com sucesso!');
                while (profileName.length) { profileName.pop(); }
                profileName.push('$name');
                localStorage.setItem('profileName', JSON.stringify(profileName));
                changeHash('');
                document.getElementById('login').remove();
                document.getElementById('profile').style.display = 'block';
                while (userEmail.length) { userEmail.pop(); }
                userEmail.push('$email');
                localStorage.setItem('userEmail', JSON.stringify(userEmail));
            </script>";
    } else {
        echo "Erro: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
?>