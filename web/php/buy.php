<?php
    $street = $_POST["street"];
    $number = $_POST["number"];
    $district = $_POST["district"];
    $city = $_POST["city"];
    $state = $_POST["state"];
    $userEmail = $_POST["userEmail"];
    echo $userEmail;

    // Temporário
    $buyer = "0";
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

    // Incompleto
    $sql = "
        INSERT INTO buy (buyer, name_buyer, category, price, street, num, district, city, state)
        VALUES ('$buyer', '$name_buyer', '$category', '$price', '$street', '$number', '$district', '$city', '$state')
    ";

    if($conn->query($sql) === TRUE) {
        echo "<script>
                alertify.success('Enviado com sucesso!');
                displayProducts();
            </script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
?>