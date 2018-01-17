<?php

include '../common.php';
include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 mysqli_set_charset($con,"utf8");


	$json = file_get_contents('php://input');

	 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);

	 // name store into $name.
	$memberID = $obj['memberID'];

	// same with $userID.
	$memberPassword = get_encrypt_string($obj['memberPassword']);

	// same with $password.
	$memberName = $obj['memberName'];
  $cellphone = $obj['cellphone'];
  $email = $obj['email'];


	if($obj['memberID']!="")
	{

  $Query = "select * FROM g5_member where mb_id='$memberID'";
	$result= mysqli_query($con, $Query);
  //
  //
		if($result->num_rows>0){
       echo json_encode('아이디가 이미 존재합니다.');  // alert msg in react native
		}
		else
		{
				$Sql_Query = "insert into g5_member
				 set mb_id = '$memberID',
				 mb_password = '$memberPassword',
				 mb_name = '$memberName',
				 mb_hp='$cellphone',
				 mb_email='$email',
				 mb_datetime='".G5_TIME_YMDHIS."',
				 mb_today_login='1111-11-11 11:11:11',
				 mb_nick_date ='1111-11-11 11:11:11',
				 mb_email_certify ='1111-11-11 11:11:11',
				 mb_open_date='1111-11-11 11:11:11',
				 mb_7='1111-11-11 11:11:11',
				 mb_signature= '',
				 mb_memo ='',
				 mb_lost_certify='',
				 mb_profile=''
				 ";
        // $Sql_Query = "insert into g5_member set mb_id='$memberID',mb_password=PASSWORD('$memberPassword'),mb_name='$memberName',mb_hp='$cellphone',mb_email='$email'";

				// mysqli_query($con,$Sql_Query) or die("Error in Selecting " . mysqli_error($con));
			 if(mysqli_query($con,$Sql_Query)){
        //       $MSG = 'Data Inserted Successfully into MySQL Database' ;
        //       $json = json_encode($MSG);
        //  echo $json;
				echo json_encode('회원가입이 완료되었습니다.'); // alert msg in react native
			}
			else{
			   echo json_encode('check internet connection'); // our query fail
			}


	}
}
	else{
	  echo json_encode('try again');
	}


?>
