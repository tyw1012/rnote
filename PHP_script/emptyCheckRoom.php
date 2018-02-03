<?php

// include '../common.php';
include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 mysqli_set_charset($con,"utf8");

$json = file_get_contents('php://input');

	 // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);
    

    $response = array();
    $response['error'] = false;
    $response['item'] = '';

	
    $memberID = $obj['memberID'];
    $bld_id = $obj['bld_id'];
    $rooms = $obj['rooms'];

    for ( $i = 0,  $size = count($rooms); $i < $size; ++$i){

        $wr_id = $rooms[$i]['wr_id']; 
        $wr_o_vacant = $rooms[$i]['wr_o_vacant'];
      
        $sql_query2 = "UPDATE g5_write_$memberID SET    
        wr_o_vacant = '$wr_o_vacant' WHERE wr_id = '$wr_id' AND wr_bld_match_id = '$bld_id'
        ";

        
        $result2= mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));

    }

    echo json_encode($response,JSON_UNESCAPED_UNICODE);



?>