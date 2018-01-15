<?php

include 'DBconfig.php';

include '../common.php';

header("Content-Type: text/html; charset=UTF-8");

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

mysqli_set_charset($con,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json,true);


$memberID = $obj['memberID'];
$checkedOffering = $obj['checkedOffering'];
$selectedFolder= $obj['selectedFolder'];

$response = array();
$response['error'] = false;
$response['item'] = '';

$sql = "select bmf_id from `bookmark_".$memberID."_folder` where bmf_name = '$selectedFolder'";
$result=mysqli_query($con,$sql);
$match_bmf_id=mysqli_fetch_assoc($result)['bmf_id'];

function check_validity(){

    global $con;
    global $response;
    global $memberID;
    global $checkedOffering;
    global $selectedFolder;
    global $match_bmf_id;

   
    
    for ( $i = 0,  $size = count($checkedOffering); $i < $size; ++$i){
        
        $selected_id = $checkedOffering[$i]['wr_id'];
        $selected_name = $checkedOffering[$i]['wr_subject'];
    
        $sql2 = "select count(bm_id) as count from bookmark_$memberID where bm_bmf_id = '$match_bmf_id' and bm_match_id ='$selected_id' and bm_from = 2 ";
    
        $result2 = mysqli_query($con,$sql2) or die("Error in Selecting " . mysqli_error($con));
        $countCheck=mysqli_fetch_assoc($result2)['count'];
    
        if($countCheck !="0") {

            $response['error'] = true;
            $response['item'] = $selected_name;
    
            return false;

        }
    
        
    }

    return true;

}


if(check_validity()){
    for ( $i = 0,  $size = count($checkedOffering); $i < $size; ++$i){
        $selected_id = $checkedOffering[$i]['wr_id'];
        $sql3= "Insert into bookmark_$memberID set bm_match_id = '$selected_id', bm_date = '".G5_TIME_YMDHIS."', bm_from = 2, bm_bmf_id ='$match_bmf_id'";
        $result3 = mysqli_query($con,$sql3) or die("Error in Selecting " . mysqli_error($con));

    }
    
}


 echo json_encode($response,JSON_UNESCAPED_UNICODE);

// $sql="Insert into bookmark_$memberID (bm_date, bm_match_id, bm_from) values ('".G5_TIME_YMDHIS."', 137, 1 )";



// $result = sql_query($sql);
;




?>

