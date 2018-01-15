<?php

include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 mysqli_set_charset($con,"utf8");


	$json = file_get_contents('php://input');

	 // decoding the received JSON and store into $obj variable.
	 $obj = json_decode($json,true);

	 // name store into $name.
	$name = $obj['name'];

	// same with $userID.
	$userID = $obj['userID'];

	// same with $password.
	$password = $obj['password'];

	if($obj['userID']!="")
	{

  $Query = "select * FROM users where userID='$userID'";
	$result= mysqli_query($con, $Query);
  //
  //
		if($result->num_rows>0){
       echo json_encode('userID already exist');  // alert msg in react native
		}
		else
		{
        $Sql_Query = "insert into users (name,userID,password) values('$name','$userID','$password')";

			 if(mysqli_query($con,$Sql_Query)){
        //       $MSG = 'Data Inserted Successfully into MySQL Database' ;
        //       $json = json_encode($MSG);
        //  echo $json;
				echo json_encode('User Registered Successfully'); // alert msg in react native
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
