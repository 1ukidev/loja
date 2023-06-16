<?php
    $street = $_POST["street"];
    $number = $_POST["number"];
    $district = $_POST["district"];
    $city = $_POST["city"];
    $state = $_POST["state"];
    $userEmail = $_POST["userEmail"];
    $hash_email = $_POST["hash_email"];
    $name_buyer = $_POST["profileName"];
    $price = $_POST["price"];
    
    $servername = "localhost";
    $username = "root";
    $password = "123456";
    $dbname = "projeto";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    $sql = "SELECT id_user, hash_email FROM cegonha WHERE email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $userEmail);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id_user = $row["id_user"];
        $stored_hash_email = $row["hash_email"];

        if ($stored_hash_email === $hash_email) {
            $sql = "INSERT INTO buy (buyer, name_buyer, price, street, num, district, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("isssisss", $id_user, $name_buyer, $price, $street, $number, $district, $city, $state);
            if($stmt->execute()) {
                echo "<script>
                        alertify.success('Comprado com sucesso! Veja o seu e-mail para mais detalhes');
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
                    alertify.error('Compra não realizada / Hash de e-mail inválido');
                    changeHash('');
                </script>";
        }
    } else {
        echo "<script>
                alertify.error('Compra não realizada / Faça login antes');
                changeHash('');
            </script>";
    }

    $stmt->close();
    $conn->close();
?>