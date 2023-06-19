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

    function getUserData($conn, $userEmail) {
        $sql = "SELECT id_user, hash_email, hash_name FROM cegonha WHERE email=?";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die("Erro: " . $conn->error);
        }

        $stmt->bind_param("s", $userEmail);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        return $result->fetch_assoc();
    }

    function insertBuyData($conn, $id_user, $name_buyer, $price, $street, $number, $district, $city, $state) {
        $sql = "INSERT INTO buy (buyer, name_buyer, price, street, num, district, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isssisss", $id_user, $name_buyer, $price, $street, $number, $district, $city, $state);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

    $requiredFields = ["street", "number", "district", "city", "state", "userEmail", "emailHash", "profileName", "nameHash", "price"];
    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field])) {
            die("Erro: O campo '$field' é obrigatório");
        }
    }

    $street = $_POST["street"];
    $number = $_POST["number"];
    $district = $_POST["district"];
    $city = $_POST["city"];
    $state = $_POST["state"];
    $userEmail = $_POST["userEmail"];
    $emailHash = $_POST["emailHash"];
    $name_buyer = $_POST["profileName"];
    $nameHash = $_POST["nameHash"];
    $price = $_POST["price"];
    
    $conn = connectToDatabase();

    $userData = getUserData($conn, $userEmail);

    if($userData) {
        $id_user = $userData["id_user"];
        $stored_hash_email = $userData["hash_email"];
        $stored_hash_name = $userData["hash_name"];

        if ($stored_hash_email === $emailHash && $stored_hash_name === $nameHash) {
            $buyDataInserted = insertBuyData($conn, $id_user, $name_buyer, $price, $street, $number, $district, $city, $state);
            
            if($buyDataInserted) {
                echo "<script>
                        alertify.success('Comprado com sucesso! Veja o seu e-mail para mais detalhes');
                        while (cart.length) { cart.pop(); }
                        localStorage.removeItem('cart');
                        changeHash('');
                    </script>";
            } else {
                echo "<script>
                        alertify.error('Compra não realizada / Tente mais tarde');
                        changeHash('');
                    </script>";
            }
        } else {
            echo "<script>
                    alertify.error('Compra não realizada / Hash do e-mail ou nome inválido');
                    changeHash('');
                </script>";
        }
    } else {
        echo "<script>
                alertify.error('Compra não realizada / Faça login antes');
                changeHash('');
            </script>";
    }

    $conn->close();
?>