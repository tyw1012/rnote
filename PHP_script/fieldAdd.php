<?php
include '../common.php';

include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 mysqli_set_charset($con,"utf8");

// $memberID = 'test7';

// echo "<br>";
// print_r ($emparray);
// echo "</br>";
// $sql="select mb_id from `g5_member` where mb_id != 'admin' ";
// $result = sql_query($sql);

        

// for ($i=0; $row=sql_fetch_array($result); $i++) {

    
//    $sql2 = "ALTER TABLE `g5_write_test10`
//      ADD COLUMN `wr_room_number` INT NOT NULL DEFAULT '0' AFTER `wr_room_type`,
//      ADD COLUMN `wr_mt_separate` INT NOT NULL DEFAULT '0' AFTER `wr_mt_cost`,
//      ADD COLUMN `wr_mt_elec` INT NOT NULL DEFAULT '0' AFTER `wr_mt_separate`,
//      ADD COLUMN `wr_mt_water` INT NOT NULL DEFAULT '0' AFTER `wr_mt_elec`,
//      ADD COLUMN `wr_mt_gas` INT NOT NULL DEFAULT '0' AFTER `wr_mt_water`,
//      ADD COLUMN `wr_mt_tv` INT NOT NULL DEFAULT '0' AFTER `wr_mt_gas`,
//      ADD COLUMN `wr_mt_internet` INT NOT NULL DEFAULT '0' AFTER `wr_mt_tv`";
   
//    echo $sql2;
//    echo '<br>';
//    $result= mysqli_query($con, $sql2) or die("Error in Selecting " . mysqli_error($con));

// ALTER TABLE Customer CHANGE Address Addr char(50);
$sql2 = "ALTER TABLE `g5_write_test10`  CHANGE wr_direction wr_o_bidet varchar(1)";
// $sql2 = "ALTER TABLE `g5_write_test10`  ADD `wr_rent_type`  INT NULL AFTER `wr_room_type`";
echo $sql2;
echo '<br>';
sql_query($sql2);
   
// }


?>