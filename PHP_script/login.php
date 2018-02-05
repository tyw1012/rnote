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
  $memberPassword = $obj['memberPassword'];
  $mb = get_member($memberID);
  $gr = get_group($memberID);
  $gr2 = get_group($mb['mb_1']);



  if (!$mb['mb_id'] || !check_password($memberPassword, $mb['mb_password'])) {
        $message ='가입된 아이디가 아니거나 비밀번호가 틀립니다.';
        $response = array("message"=>$message);
        echo json_encode($response);
  }
  else{
    $token = array();
    $token['id'] = $memberID;
    $token['name'] = $mb['mb_name'];
    $token['contact']=$mb['mb_hp'];
    $token['email'] = $mb['mb_email'];
    $token['level'] = $gr['gr_1'];
    $token['min_write'] = $gr2['gr_write_permission'];
    $token['boss_office'] = $gr2['gr_subject'];
    $token['boss'] = $mb['mb_1'];
    $token['selectedOfferingType'] = $mb['mb_3'];
    $jsonWebToken = JWT::encode($token, $jwtKey);

    $message = 'ok';
    $response = array("message"=>$message,"memberID"=>$memberID,"token"=>JsonHelper::getJson("token", $jsonWebToken));
    echo json_encode($response);

  }

	// if($obj['memberID']!=""){
  //
	// $sql_query = "select * FROM g5_member where mb_id='$memberID' and mb_password='$memberPassword'";
	// $result= mysqli_query($con, $sql_query);
  // $sql_query_2 = "select * FROM g5_group where gr_id='$memberID'";
  // $result_2 = mysqli_query($con,$sql_query_2);
  //
	// 	if($result->num_rows==0){
  //     $message = 'Wrong Details';
  //     $response = array("message"=>$message,"memberID"=>'');
  //
	// 		echo json_encode($message);
	// 	}
	// 	else{
  //     $token = array();
  //     $token['id'] = $memberID;
  //     $token['name'] = mysqli_fetch_array($result, MYSQLI_ASSOC)['mb_name'];
  //     $token['email'] = mysqli_fetch_array($result, MYSQLI_ASSOC)['mb_email'];
  //     $token['level'] = mysqli_fetch_array($result_2, MYSQLI_ASSOC)['gr_1'];
  //     $jsonWebToken = JWT::encode($token, $jwtKey);
  //
  //     $message = 'ok';
  //     $response = array("message"=>$message,"memberID"=>$memberID,"token"=>JsonHelper::getJson("token", $jsonWebToken));
	// 	  echo json_encode($response);
  //
	// 	}
	// }
	// else{
	//   echo json_encode('try again');
	// }

?>
