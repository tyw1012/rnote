<?php
include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

mysqli_set_charset($con,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$memberID = $obj['memberID'];
$level = $obj['level'];

$sql_query = "select a.mb_id,a.mb_name,a.mb_hp,a.mb_email,b.gm_block from g5_member a, g5_group_member b where a.mb_id = b.mb_id and a.mb_1 = '$memberID'";

$result = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));



$emparray= array();
// $row =mysqli_fetch_assoc($result);
// echo json_encode($row,JSON_UNESCAPED_UNICODE);
while($row =mysqli_fetch_assoc($result))
{
    
    $id = $row['mb_id'];    
    $sql_query2 = "select count(wr_id) from g5_write_$memberID where wr_writer_id = '$id'";
    
    $result2 = mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));
    $row['count'] = mysqli_fetch_assoc($result2)['count(wr_id)'];

    $emparray[] = $row;
    
}


echo json_encode($emparray,JSON_UNESCAPED_UNICODE);



?>
