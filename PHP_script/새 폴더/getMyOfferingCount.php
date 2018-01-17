<?php
include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

mysqli_set_charset($con,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$memberID = $obj['memberID'];
$memberName = $obj['memberName'];
$level = $obj['level'];
$selectedSegment = $obj['selectedSegment'];

// $memberID = 'test7';
if($level == 'emp'){

    if($selectedSegment=='임대'){
        $sql_query = "select count(*) as count FROM g5_write_$memberID where wr_sold_out != 1 AND wr_sale_type = 1 order by wr_id DESC";
    }
    else if($selectedSegment=='매매'){
        $sql_query = "select count(*) as count FROM g5_write_$memberID where wr_sold_out != 1 AND wr_sale_type = 2 order by wr_id DESC";
              
    }
    else{
        $sql_query = "select count(*) as count FROM g5_write_$memberID where wr_sold_out = 1 order by wr_id DESC";
    }

}
else{
    if($selectedSegment=='임대'){
        $sql_query = "select count(*) as count FROM g5_write_$memberID where wr_writer = '$memberName' AND wr_office_permission='' and wr_sold_out != 1 AND wr_sale_type = 1 order by wr_id DESC";
    }
    else if($selectedSegment=='매매'){
        $sql_query = "select count(*) as count FROM g5_write_$memberID where wr_writer = '$memberName' AND wr_office_permission='' and wr_sold_out != 1 AND wr_sale_type = 2 order by wr_id DESC";
       
    }
    else{
        $sql_query = "select count(*) as count FROM g5_write_$memberID where wr_writer = '$memberName' AND wr_office_permission='' and wr_sold_out = 1 order by wr_id DESC";
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
