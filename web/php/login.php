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

    function getUserData($conn, $email) {
        $sql = "SELECT name_user, hash_name, email, password FROM cegonha WHERE email=?";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die("Erro: " . $conn->error);
        }

        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        return $result->fetch_assoc();
    }

    $requiredFields = ["email", "password"];
    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field])) {
            die("Erro: O campo '$field' é obrigatório");
        }
    }

    $email = $_POST["email"];
    $password = $_POST["password"];
    
    $conn = connectToDatabase();

    $userData = getUserData($conn, $email);

    if($userData) {
        $hashedPassword = $userData["password"];
        $stored_hash_name = $userData["hash_name"];

        if (password_verify($password, $hashedPassword)) {
            echo "<script>
                    while (profileName.length) { profileName.pop(); }
                    profileName.push('" . $userData["name_user"] . "')
                    localStorage.setItem('profileName', JSON.stringify(profileName));
                    document.getElementById('login').remove();
                    document.getElementById('profile').style.display = 'block';
                    
                    while (userEmail.length) { userEmail.pop(); }
                    userEmail.push('$email');
                    localStorage.setItem('userEmail', JSON.stringify(userEmail));

                    emailHash = createSignature('$email', secretKey);
                    if (emailHash) {
                        localStorage.setItem('emailHash', emailHash);
                        localStorage.setItem('nameHash', '$stored_hash_name');
                        nameHash = '$stored_hash_name';
                        changeHash('');
                        alertify.success('Logado com sucesso!');
                    } else {
                        alertify.error('Hash do e-mail está inválido');
                        setTimeout(() => { cleanAll(); }, 3000);
                    }
                </script>";
        } else {
            echo "<script>
                    alertify.error('Senha incorreta');
                    changeHash('');
                </script>";
        }
    } else {
        echo "<script>
                alertify.error('Este usuário não existe');
                changeHash('');
            </script>";
    }

    $conn->close();
?>