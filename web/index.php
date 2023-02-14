<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presente da Cegonha</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" type="image/png" href="https://cdn.pixabay.com/photo/2018/08/01/09/28/rubber-3576854_1280.png">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>
</head>

<body class="dark-mode">
    <div class="navbar sans-font">
        <a class="title" href="/loja/web/">Presente da Cegonha</a>
        <a onclick="displayProducts('Brinquedos')">Brinquedos</a>
        <a onclick="displayProducts('Roupas')">Roupas</a>
        <a onclick="displayProducts('Enxoval')">Enxoval</a>
        <a onclick="displayProducts('Higiene')">Higiene</a>
        <a onclick="displayProducts('Saúde')">Saúde</a>
        <a class="others" id="login" onclick="displayLogin()">Login</a>
        <a class="others" id="carrinho">Carrinho</a>
        <a class="others" id="dark-mode" onclick="enableDarkMode()">Modo escuro</a>
        <a class="others" id="carrinho" onclick="limpar()">Limpar carrinho</a>
    </div>

    <div id="main" class="sans-font"></div>

    <script src="js/script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
</body>

</html>