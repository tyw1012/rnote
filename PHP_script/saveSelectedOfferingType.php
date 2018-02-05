<?php
include '../common.php'; //그누보드
include 'DBconfig.php';
include 'jconfig.php';
require('jwt.php');
header("Content-Type: text/html; charset=UTF-8");

 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 mysqli_set_charset($con,"utf8");

	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

    $memberID = $obj['memberID'];
    $memberName = $obj['memberName'];
    $contact = $obj['contact'];
    $email = $obj['email'];
    $level = $obj['level'];
    $minWrite = $obj['minWrite'];
    $boss = $obj['boss'];
    $boss_office = $obj['boss_office'];
    $selectedOfferingType = $obj['selectedOfferingType'];
    

    $token = array();
    $token['id'] = $memberID;
    $token['name'] = $memberName;
    $token['contact']= $contact;
    $token['email'] = $email;
    $token['level'] = $level;
    $token['min_write'] = $minWrite;
    $token['boss_office'] = $boss_office;
    $token['boss'] = $boss;    
    $token['selectedOfferingType'] = $selectedOfferingType;

    $sql_query = "update g5_member set mb_3 = '$selectedOfferingType' where mb_id = '$memberID'";
    $result= mysqli_query($con, $sql_query)or die("Error in Selecting " . mysqli_error($con));

    $jsonWebToken = JWT::encode($token, $jwtKey);

    $message = 'ok';
    $response = array("token"=>JsonHelper::getJson("token", $jsonWebToken));
    echo json_encode($response);

?>