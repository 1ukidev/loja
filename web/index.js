$(document).ready(function () {
    $("#brinquedos").click(function () {
        $("#main").load("produtos/brinquedos/");
    });

    $("#roupas").click(function () {
        $("#main").load("produtos/roupas/");
    });

    $("#enxoval").click(function () {
        $("#main").load("produtos/enxoval/");
    });

    $("#higiene").click(function () {
        $("#main").load("produtos/higiene/");
    });

    $("#saude").click(function () {
        $("#main").load("produtos/saude/");
    });

    $("#carrinho").click(function () {
        $("#main").load("carrinho.php");
    });

    $("#pato").click(function () {
        $("#main").load("produtos/brinquedos/pato.php");
    });

    $("#roupa").click(function () {
        $("#main").load("produtos/roupas/roupa.php");
    });

    $("#bebe").click(function () {
        $("#main").load("produtos/enxoval/bebe.php");
    });

    $("#escova").click(function () {
        $("#main").load("produtos/higiene/escova.php");
    });

    $("#brinquedos").click(function () {
        $("#main").load("produtos/brinquedos/");
    });

    $("#button-buy").click(function () {
        $("#main").load("adicionar_ao_carrinho.php");
    });
});