<?php
include 'DBconfig.php';
include '../common.php';

header("Content-Type: text/html; charset=UTF-8");

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

mysqli_set_charset($con,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$memberID = $obj['memberID'];
$bm_id = $obj['bm_id'];

$response = "finished";
   
$sql_query = "DELETE FROM `bookmark_$memberID` WHERE bm_id = $bm_id";

$result = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));



echo json_encode($response);


?>
