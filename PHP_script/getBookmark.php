<?php
include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

mysqli_set_charset($con,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$selectedOfferingType = $obj['selectedOfferingType'];
$memberID = $obj['memberID'];
$memberName = $obj['memberName'];
$boss =  $obj['boss'];
$level = $obj['level'];

$sql_query = 'select * from `bookmark_'.$memberID.'_folder`'; // where selectedOfferingType = '$selectedOfferingType'

$result = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));

$emparray['folder'] = array();
while($row =mysqli_fetch_assoc($result))
{
    $emparray['folder'][] = $row;
}


$sql_query2 = "select * from g5_write_$memberID a, bookmark_$memberID b where a.wr_id = b.bm_match_id and b.bm_from = 1 
UNION ALL select * from g5_write_$boss a, bookmark_$memberID b where a.wr_id = b.bm_match_id and b.bm_from = 2";
//and a.board_list = $selectedOfferingType
$result2 = mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));

$emparray['data'] =array();
while($row2 =mysqli_fetch_assoc($result2))
{
    $emparray['data'][] = $row2;
}


echo json_encode($emparray,JSON_UNESCAPED_UNICODE);



?>
