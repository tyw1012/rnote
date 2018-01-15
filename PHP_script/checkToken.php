<?php
include('jconfig.php');
$token = $_GET["token"];

require('jwt.php');

$json = JWT::decode($token, $jwtKey, true);
echo json_encode($json);

 ?>
