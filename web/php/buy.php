<?php
    $street = $_POST["street"];
    $number = $_POST["number"];
    $district = $_POST["district"];
    $city = $_POST["city"];
    $state = $_POST["state"];
    $userEmail = $_POST["userEmail"];

    // TODO
    $name_buyer = "0";
    $category = "0";
    $price = "0";
    
    $servername = "localhost";
    $username = "root";
    $password = "123456";
    $dbname = "projeto";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id_user FROM cegonha WHERE email='$userEmail'";
    $result = $conn->query($sql);
    
    if($result->num_rows > 0) {
        $row = mysqli_fetch_assoc($result);
        $id_user = $row["id_user"];

        $sql = "
            INSERT INTO buy (buyer, name_buyer, category, price, street, num, district, city, state)
            VALUES ((SELECT id_user FROM cegonha WHERE id_user='$id_user'), '$name_buyer', '$category', '$price', '$street', '$number', '$district', '$city', '$state')
        ";

        $result = $conn->query($sql);

        echo "<script>
                alertify.success('Comprado com sucesso!');
                localStorage.removeItem('cart');
                displayProducts();
            </script>";
    } else {
        echo "<script>
                alertify.error('Compra não realizada');
                displayProducts();
            </script>";
    }

    $conn->close();
?>