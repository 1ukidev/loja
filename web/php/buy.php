<?php
    $street = $_POST["street"];
    $number = $_POST["number"];
    $district = $_POST["district"];
    $city = $_POST["city"];
    $state = $_POST["state"];
    
    $servername = "localhost";
    $username = "root";
    $password = "123456";
    $dbname = "teste23";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "";
    // $sql = "INSERT INTO Orders (street, number, district, city, state) VALUES ()";

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