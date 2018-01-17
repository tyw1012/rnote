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
$level = $obj['level'];
$selectedSegment = $obj['selectedSegment'];
$limitFrom = $obj['myoffering_from'];
$limitNum = $obj['countPerLoad'];
// $memberID = 'test7';
if($level == 'emp'){

    if($selectedSegment=='임대'){
        $sql_query = "select * FROM g5_write_$memberID where board_list = '$selectedOfferingType' and wr_sold_out != 1 AND wr_sale_type = 1 order by wr_id DESC limit $limitFrom, $limitNum";
    }
    else if($selectedSegment=='매매'){
        $sql_query = "select * FROM g5_write_$memberID where board_list = '$selectedOfferingType' and wr_sold_out != 1 AND wr_sale_type = 2 order by wr_id DESC limit $limitFrom, $limitNum";
              
    }
    else{
        $sql_query = "select * FROM g5_write_$memberID where board_list = '$selectedOfferingType' and wr_sold_out = 1 order by wr_id DESC limit $limitFrom, $limitNum";
    }

}
else{
    if($selectedSegment=='임대'){
        $sql_query = "select * FROM g5_write_$memberID where board_list = '$selectedOfferingType' and wr_writer = '$memberName' AND (wr_office_permission='' or wr_office_permission = 2) and wr_sold_out != 1 AND wr_sale_type = 1 order by wr_id DESC limit $limitFrom, $limitNum";
    }
    else if($selectedSegment=='매매'){
        $sql_query = "select * FROM g5_write_$memberID where board_list = '$selectedOfferingType' and wr_writer = '$memberName' AND (wr_office_permission='' or wr_office_permission = 2) and wr_sold_out != 1 AND wr_sale_type = 2 order by wr_id DESC limit $limitFrom, $limitNum";
       
    }
    else{
        $sql_query = "select * FROM g5_write_$memberID where board_list = '$selectedOfferingType' and wr_writer = '$memberName' AND (wr_office_permission='' or wr_office_permission = 2) and wr_sold_out = 1 order by wr_id DESC limit $limitFrom, $limitNum";
    }
}


$result = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));
$emparray = array();
   while($row =mysqli_fetch_assoc($result))
   {
       $emparray[] = $row;
   }
echo json_encode($emparray,JSON_UNESCAPED_UNICODE);
// echo json_encode("hello",JSON_UNESCAPED_UNICODE);


?>
