<?php
include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

mysqli_set_charset($con,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$memberID = $obj['memberID'];
$empID = $obj['empID'];

$response = array();
$response['success'] = false;


$sql_query = "update g5_group_member set gm_block = 1 where gr_id = '$memberID' and mb_id = '$empID'";

$result = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));

if($result){
    $response['success'] = true;
    echo json_encode($response,JSON_UNESCAPED_UNICODE);
}



?>
