<?php

include 'DBconfig.php';
include 'common.php';

$sql="select mb_id from `g5_member`";
$result = sql_query($sql);

// update `$id` set wr_important = 1 where wr_writer ='$writer' 
// and wr_address ='$address' and wr_subject ='$subject



// for ($i=0; $row=sql_fetch_array($result); $i++) {
// sql_query("ALTER TABLE `g5_write_$row[mb_id]` ADD `wr_sold_out` INT NOT NULL AFTER `wr_sale_type`");
// print_r ('g5_write_'.$row[mb_id].'<br>');
// }
for ($i=0; $row=sql_fetch_array($result); $i++) {
sql_query("update `g5_write_$row[mb_id]` set wr_sold_out = 1 where wr_sale_type = 3");
// print_r ('g5_write_'.$row[mb_id].'<br>');
}
?>


