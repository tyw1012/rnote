<?php
include 'DBconfig.php';
include 'common.php';
header("Content-Type: text/html; charset=UTF-8");

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

mysqli_set_charset($con,"utf8");


// $memberID = 'test7';

// echo "<br>";
// print_r ($emparray);
// echo "</br>";

$sql="select mb_id from `g5_member`";
$result = sql_query($sql);


for ($i=0; $row=sql_fetch_array($result); $i++) {

    // print_r ("g5_write_$row[mb_id],");
    $id = "g5_write_$row[mb_id]";
    
    $sql_query = "select b.wr_subject, b.wr_writer, b.wr_address from `g5_write_ekdna8284` a, `g5_write_$row[mb_id]` b where a.wr_writer = b.wr_writer and a.wr_address = b.wr_address and a.wr_subject = b.wr_subject";
    $result2 = mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));
    $emparray = array();
       while($row =mysqli_fetch_assoc($result2))
       {
           $emparray[] = $row;
       }
    // print_r ($emparray);
    // print_r (sizeof($emparray));
    for ($i=0; $i<=sizeof($emparray)-1; $i++){
        // echo $id;
        $writer= $emparray[$i]['wr_writer'];
        $address= $emparray[$i]['wr_address'];
        $subject = $emparray[$i]['wr_subject'];
        $sql_query2= "update `$id` set wr_important = 1 where wr_writer ='$writer' 
        and wr_address ='$address' and wr_subject ='$subject'";

        echo $sql_query2;
        echo "</br>";
        sql_query($sql_query2);
    }



}



?>
