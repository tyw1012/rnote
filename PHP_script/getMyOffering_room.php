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
    
        if($selectedSegment=='건물'){

            $emparray = array();

            $sql_query = "select count(*) as count FROM bld_$memberID order by bld_id DESC";
            $result = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));
            $row = mysqli_fetch_assoc($result);
            $emparray['bld_count'] = $row;


            $sql_query2 = "select * FROM bld_$memberID order by bld_id DESC";
            $result2 = mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));
            $emparray['bld_data'] =array();
            while($row2 =mysqli_fetch_assoc($result2))
            {
                $emparray['bld_data'][] = $row2;
            }

            $sql_query4 = "select * FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id order by b.wr_room_number";
            $result4 = mysqli_query($con, $sql_query4) or die("Error in Selecting " . mysqli_error($con));
            $emparray['room_data'] =array();
            while($row4 =mysqli_fetch_assoc($result4))
            {
                $emparray['room_data'][] = $row4;
            }

        
        }
      
        else{

            $emparray = array();

            $sql_query = "select count(*) as count FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id and b.wr_o_vacant = 1";
            $result = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));
            $row = mysqli_fetch_assoc($result);
            $emparray['room_count'] = $row;


            $sql_query2 = "select * FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id and b.wr_o_vacant = 1 order by b.wr_room_number";
            $result2 = mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));
            $emparray['room_data'] =array();
            while($row2 =mysqli_fetch_assoc($result2))
            {
                $emparray['room_data'][] = $row2;
            }
        }
    
    }
    else{
        if($selectedSegment=='건물'){

            $emparray = array();

            $sql_query = "select count(*) as count FROM bld_$memberID order by bld_id DESC";
            $result = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));
            $row = mysqli_fetch_assoc($result);
            $emparray['bld_count'] = $row;


            $sql_query2 = "select * FROM bld_$memberID order by bld_id DESC limit $limitFrom, $limitNum";
            $result2 = mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));
            $emparray['bld_data'] =array();
            while($row2 =mysqli_fetch_assoc($result2))
            {
                $emparray['bld_data'][] = $row2;
            }

            $sql_query4 = "select * FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id order by b.wr_room_number DESC limit $limitFrom, $limitNum";
            $result4 = mysqli_query($con, $sql_query4) or die("Error in Selecting " . mysqli_error($con));
            $emparray['room_data'] =array();
            while($row4 =mysqli_fetch_assoc($result4))
            {
                $emparray['room_data'][] = $row4;
            }

        }
     
        else{

            $emparray = array();

            $sql_query = "select count(*) as count FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id and b.wr_o_vacant = 1";
            $result = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));
            $row = mysqli_fetch_assoc($result);
            $emparray['room_count'] = $row;


            $sql_query2 = "select * FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id and b.wr_o_vacant = 1 order by b.wr_room_number DESC limit $limitFrom, $limitNum";
            $result2 = mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));
            $emparray['room_data'] =array();
            while($row2 =mysqli_fetch_assoc($result2))
            {
                $emparray['room_data'][] = $row2;
            }
        }
    }
    
    


echo json_encode($emparray,JSON_UNESCAPED_UNICODE);
// echo json_encode("hello",JSON_UNESCAPED_UNICODE);


?>
