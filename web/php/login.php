<?php
    $email = $_POST["email"];
    $password = $_POST["password"];

    $servername = "localhost";
    $username = "root";
    $password_db = "123456";
    $dbname = "projeto";

    $conn = new mysqli($servername, $username, $password_db, $dbname);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    $sql = "SELECT name_user, hash_name, email, password FROM cegonha WHERE email=?";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        die("Erro: " . $conn->error);
    }
    
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row["password"];
        $stored_hash_name = $row["hash_name"];

        if (password_verify($password, $hashedPassword)) {
            echo "<script>
                    while (profileName.length) { profileName.pop(); }
                    profileName.push('" . $row["name_user"] . "')
                    localStorage.setItem('profileName', JSON.stringify(profileName));
                    alertify.success('Logado com sucesso!');
                    changeHash('');
                    document.getElementById('login').remove();
                    document.getElementById('profile').style.display = 'block';
                    while (userEmail.length) { userEmail.pop(); }
                    userEmail.push('$email');
                    localStorage.setItem('userEmail', JSON.stringify(userEmail));
                    localStorage.setItem('nameHash', '$stored_hash_name');
                    nameHash = '$stored_hash_name';
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

    $stmt->close();
    $conn->close();
?>