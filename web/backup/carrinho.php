<?php

session_start();
$id = $_SESSION['id'] . $_REQUEST['id'];

echo $id;

?>