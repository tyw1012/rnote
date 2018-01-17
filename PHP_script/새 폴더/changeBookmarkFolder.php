<?php
include 'DBconfig.php';
include '../common.php';

header("Content-Type: text/html; charset=UTF-8");

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

mysqli_set_charset($con,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$memberID = $obj['memberID'];
$bmf_name = $obj['bmf_name'];
$bmf_id = $obj['bmf_id'];

$response = array();
$response['error'] = false;
$response['item'] = '';

function check_validity($table, $name)
{
  
    global $con;
    global $response;

    if(strlen($name)<=0){
        $response['error']=true;
        $response['item']='no_value';
        return false;
    }

    $sql = "select count(bmf_id) as count from `$table` where bmf_name = '$name'";
    
    $result=mysqli_query($con,$sql);
    $row=mysqli_fetch_assoc($result);
    
    // 가장 작은 번호에 1을 빼서 넘겨줌
    if ($row['count'] == 0){
        return true;
    }
    else{
        $response['error']=true;
        $response['item']='same_value';
        return false;
    }
    
}
if(check_validity('bookmark_'.$memberID.'_folder', $bmf_name)){
   
    $sql_query = "UPDATE `bookmark_".$memberID."_folder` SET bmf_name = '$bmf_name' where bmf_id = '$bmf_id' ";
    
    $result = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));
}


echo json_encode($response);


?>
