<?php
    $street = $_POST["street"];
    $number = $_POST["number"];
    $district = $_POST["district"];
    $city = $_POST["city"];
    $state = $_POST["state"];
    $userEmail = $_POST["userEmail"];
    $name_buyer = $_POST["profileName"];
    $price = $_POST["price"];
    
    $servername = "localhost";
    $username = "root";
    $password = "123456";
    $dbname = "projeto";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id_user FROM cegonha WHERE email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $userEmail);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id_user = $row["id_user"];

        $sql = "INSERT INTO buy (buyer, name_buyer, price, street, num, district, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isssisss", $id_user, $name_buyer, $price, $street, $number, $district, $city, $state);
        if($stmt->execute()) {
            echo "<script>
                    alertify.success('Comprado com sucesso!');
                    localStorage.removeItem('cart');
                    location.hash = '';
                </script>";
        } else {
            echo "<script>
                    alertify.error('Compra não realizada / Tente mais tarde');
                    location.hash = '';
                </script>";
        }
    } else {
        echo "<script>
                alertify.error('Compra não realizada / Faça login antes');
                location.hash = '';
            </script>";
    }

    $stmt->close();
    $conn->close();
?>
