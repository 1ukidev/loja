<?php
    function connectToDatabase() {
        $servername = "localhost";
        $username = "root";
        $password_db = "123456";
        $dbname = "projeto";

        $conn = new mysqli($servername, $username, $password_db, $dbname);

        if ($conn->connect_error) {
            die("Conexão falhou: " . $conn->connect_error);
        }

        return $conn;
    }

    function checkExistingUser($conn, $email, $cpf) {
        $existingUserQuery = "SELECT id_user FROM cegonha WHERE email=? OR cpf=?";
        $existingUserStmt = $conn->prepare($existingUserQuery);
        $existingUserStmt->bind_param("ss", $email, $cpf);
        $existingUserStmt->execute();
        $existingUserResult = $existingUserStmt->get_result();
        $existingUserStmt->close();

        return $existingUserResult->num_rows > 0;
    }

    $requiredFields = ["name", "cpf", "email", "emailHash", "nameHash", "password"];
    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field])) {
            die("Erro: O campo '$field' é obrigatório");
        }
    }

    $name = $_POST["name"];

    $cpf = $_POST["cpf"];
    $cpf = str_replace(".", "", $cpf);
    $cpf = str_replace("-", "", $cpf);

    $email = $_POST["email"];
    $emailHash = $_POST["emailHash"];
    $nameHash = $_POST["nameHash"];
    $password = $_POST["password"];
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $conn = connectToDatabase();

    if (checkExistingUser($conn, $email, $cpf)) {
        echo "<script>
                changeHash('');
                alertify.error('Este usuário já está cadastrado');
            </script>";
        $conn->close();
        exit();
    }

    $sql = "INSERT INTO cegonha (name_user, hash_name, email, hash_email, password, cpf) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Erro: " . $conn->error);
    }

    $stmt->bind_param("ssssss", $name, $nameHash, $email, $emailHash, $hash, $cpf);

    if ($stmt->execute()) {
        echo "<script>
                while (profileName.length) { profileName.pop(); }
                profileName.push('$name');
                localStorage.setItem('profileName', JSON.stringify(profileName));
                document.getElementById('login').remove();
                document.getElementById('profile').style.display = 'block';
                
                while (userEmail.length) { userEmail.pop(); }
                userEmail.push('$email');
                localStorage.setItem('userEmail', JSON.stringify(userEmail));

                changeHash('');
                alertify.success('Cadastro com sucesso!');
            </script>";
    } else {
        echo "Erro: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
?>