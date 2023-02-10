<?php
session_start();
$_SESSION['id'] = "";
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presente da Cegonha</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="icon" type="image/png" href="https://cdn.pixabay.com/photo/2018/08/01/09/28/rubber-3576854_1280.png">
</head>

<body class="default-body">
    <nav class="default-navbar sans-font">
        <a class="navbar-title" id="title" href="#">Presente da Cegonha</a>
        <a class="navbar-text" id="brinquedos" href="#brinquedos">Brinquedos</a>
        <a class="navbar-text" id="roupas" href="#roupas">Roupas</a>
        <a class="navbar-text" id="enxoval" href="#enxoval">Enxoval</a>
        <a class="navbar-text" id="higiene" href="#higiene">Higiene</a>
        <a class="navbar-text" id="saude" href="#saude">Saúde</a>
        <a class="navbar-title" id="carrinho" href="#carrinho">Carrinho</a>
    </nav>

    <div id="main" class="default-main sans-font"></div>

    <script>
        fetch('json/products.json')
            .then(response => response.json())
            .then(data => {
                let productHtml = '';

                for (let i = 0; i < data.length; i++) {
                    let product = data[i];
                    productHtml += '<a class="product" href="#">'
                    productHtml += '<img height="75" src="' + product.img + '"</p>';
                    productHtml += '<p class="product-title">' + product.name + '</p>';
                    productHtml += '<p class="product-price">R$' + product.price + '</p>';
                    productHtml += '<p><button id="button' + i.toString() + '" class="buy-button">Comprar</button></p>'
                    productHtml += '</a>';
                }

                document.getElementById('main').innerHTML = productHtml;
            })
            .catch(error => {
                document.getElementById('main').innerHTML = 'Erro ao carregar os dados dos produtos';
            });
    </script>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
</body>

</html>