<?php

include '../common.php';
include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 mysqli_set_charset($con,"utf8");


	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);
   
    $memberID = $obj['memberID'];
    $memberName = $obj['memberName'];
    $level = $obj['level'];
    $boss = $obj['boss'];
    $selectedIndex = $obj['selectedIndex'];
    $limitFrom = $obj['myoffering_from'];
    $limitNum = $obj['countPerLoad'];


	$name = $obj['name'];
    $saleArea = $obj['saleArea'];
    $addr = $obj['addr'];
    $writer = $obj['writer'];
    $floorMin = $obj['floorMin'];
    $floorMax = $obj['floorMax'];
    $areaMin = $obj['areaMin'];
    $areaMax = $obj['areaMax'];
    $depositMin = $obj['depositMin'];
    $depositMax = $obj['depositMax'];
    $mrateMin = $obj['mrateMin'];
    $mrateMax = $obj['mrateMax'];
    $premoMin = $obj['premoMin'];
    $premoMax = $obj['premoMax'];
    $sumMin = $obj['sumMin'];
    $sumMax = $obj['sumMax'];


    if($level == 'emp'){
        if($selectedIndex==0){
            $sql_query = "select count(*) as count from g5_write_$memberID where wr_sale_type = 1 and wr_sold_out != 1 ";        
        }
        else if($selectedIndex==1){
            $sql_query = "select count(*) as count from g5_write_$memberID where wr_sale_type = 2 and wr_sold_out != 1 ";
        }
        else{
            $sql_query = "select count(*) as count from g5_write_$memberID where wr_sold_out = 1 ";
        }
        
    }
    else{
        
        if($selectedIndex==0){
            $sql_query = "select count(*) as count from g5_write_$memberID where wr_office_permission='' AND wr_writer = '$memberName' and wr_sold_out != 1 AND wr_sale_type = 1 ";
        }
        else if($selectedIndex==1){
            $sql_query = "select count(*) as count from g5_write_$memberID where wr_office_permission='' AND wr_writer = '$memberName' and wr_sold_out != 1 AND wr_sale_type = 2 ";
        }
        else{
            $sql_query = "select count(*) as count from g5_write_$memberID where wr_office_permission='' AND wr_writer = '$memberName' AND wr_sold_out = 1 ";
        }
    }
        
        
  
        
    if(strlen($name)>0){

        $sql_query .= "AND wr_subject LIKE '%$name%' ";

    }
    if(strlen($saleArea)>0){
        
        $sql_query .= "AND wr_sale_area LIKE '%$saleArea%' ";

    }
    if(strlen($addr)>0){
        
        $sql_query .= "AND wr_address LIKE '%$addr%' ";

    }
    if(strlen($writer)>0){
        
        $sql_query .= "AND wr_writer LIKE '%$writer%' ";

    }
    if(strlen($floorMin)>0){
        
        $sql_query .= "AND wr_floor >= $floorMin ";

    }
    if(strlen($floorMax)>0){
        
        $sql_query .= "AND wr_floor <= $floorMax ";

    }
    if(strlen($areaMin)>0){
        
        $sql_query .= "AND wr_area_p >= $areaMin ";

    }
    if(strlen($areaMax)>0){
        
        $sql_query .= "AND wr_area_p <= $areaMax ";

    }
    if(strlen($depositMin)>0){
        
        $sql_query .= "AND wr_rent_deposit >= $depositMin ";

    }
    if(strlen($depositMax)>0){
        
        $sql_query .= "AND wr_rent_deposit <= $depositMax ";
        
    }
    if(strlen($mrateMin)>0){
        
        $sql_query .= "AND wr_m_rate >= $mrateMin ";

    }
    if(strlen($mrateMax)>0){
        
        $sql_query .= "AND wr_m_rate <= $mrateMax ";

    }
    if(strlen($premoMin)>0){
        
        $sql_query .= "AND wr_premium_o >= $premoMin ";

    }
    if(strlen($premoMax)>0){
        
        $sql_query .= "AND wr_premium_o <= $premoMax ";

    }
    if(strlen($sumMin)>0){
        
        $sql_query .= "AND wr_rent_deposit+wr_premium_o >= $sumMin ";

    }
    if(strlen($sumMax)>0){
        
        $sql_query .= "AND wr_rent_deposit+wr_premium_o <= $sumMax ";

    }
    
    $sql_query .= "order by wr_id DESC";   
	
    $result= mysqli_query($con, $sql_query)or die("Error in Selecting " . mysqli_error($con));

    $emparray = array();
    $row = mysqli_fetch_assoc($result);
    $emparray['count'] = $row;



    if($level == 'emp'){
        if($selectedIndex==0){
            $sql_query2 = "select * from g5_write_$memberID where wr_sale_type = 1 and wr_sold_out != 1 ";        
        }
        else if($selectedIndex==1){
            $sql_query2 = "select * from g5_write_$memberID where wr_sale_type = 2 and wr_sold_out != 1 ";
        }
        else{
            $sql_query2 = "select * from g5_write_$memberID where wr_sold_out = 1 ";
        }
        
    }
    else{
        
        if($selectedIndex==0){
            $sql_query2 = "select * from g5_write_$memberID where wr_office_permission='' AND wr_writer = '$memberName' and wr_sold_out != 1 AND wr_sale_type = 1 ";
        }
        else if($selectedIndex==1){
            $sql_query2 = "select * from g5_write_$memberID where wr_office_permission='' AND wr_writer = '$memberName' and wr_sold_out != 1 AND wr_sale_type = 2 ";
        }
        else{
            $sql_query2 = "select * from g5_write_$memberID where wr_office_permission='' AND wr_writer = '$memberName' AND wr_sold_out = 1 ";
        }
    }
        
        
  
        
    if(strlen($name)>0){

        $sql_query2 .= "AND wr_subject LIKE '%$name%' ";

    }
    if(strlen($saleArea)>0){
        
        $sql_query2 .= "AND wr_sale_area LIKE '%$saleArea%' ";

    }
    if(strlen($addr)>0){
        
        $sql_query2 .= "AND wr_address LIKE '%$addr%' ";

    }
    if(strlen($writer)>0){
        
        $sql_query2 .= "AND wr_writer LIKE '%$writer%' ";

    }
    if(strlen($floorMin)>0){
        
        $sql_query2 .= "AND wr_floor >= $floorMin ";

    }
    if(strlen($floorMax)>0){
        
        $sql_query2 .= "AND wr_floor <= $floorMax ";

    }
    if(strlen($areaMin)>0){
        
        $sql_query2 .= "AND wr_area_p >= $areaMin ";

    }
    if(strlen($areaMin)>0){
        
        $sql_query2 .= "AND wr_area_p <= $areaMin ";

    }
    if(strlen($depositMin)>0){
        
        $sql_query2 .= "AND wr_rent_deposit >= $depositMin ";

    }
    if(strlen($depositMax)>0){
        
        $sql_query2 .= "AND wr_rent_deposit <= $depositMax ";
        
    }
    if(strlen($mrateMin)>0){
        
        $sql_query2 .= "AND wr_m_rate >= $mrateMin ";

    }
    if(strlen($mrateMax)>0){
        
        $sql_query2 .= "AND wr_m_rate <= $mrateMax ";

    }
    if(strlen($premoMin)>0){
        
        $sql_query2 .= "AND wr_premium_o >= $premoMin ";

    }
    if(strlen($premoMax)>0){
        
        $sql_query2 .= "AND wr_premium_o <= $premoMax ";

    }
    if(strlen($sumMin)>0){
        
        $sql_query2 .= "AND wr_rent_deposit+wr_premium_o >= $sumMin ";

    }
    if(strlen($sumMax)>0){
        
        $sql_query2 .= "AND wr_rent_deposit+wr_premium_o <= $sumMax ";

    }
    
    $sql_query2 .= "order by wr_id DESC limit $limitFrom, $limitNum";
   
	
    $result2= mysqli_query($con, $sql_query2)or die("Error in Selecting " . mysqli_error($con));
    $emparray['data'] =array();

    while($row2 =mysqli_fetch_assoc($result2))
    {
        $emparray['data'][] = $row2;
    }
    echo json_encode($emparray,JSON_UNESCAPED_UNICODE);

?>
 