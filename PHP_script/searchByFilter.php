<?php

include '../common.php';
include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 mysqli_set_charset($con,"utf8");


	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);
   
    $selectedOfferingType= $obj['selectedOfferingType'];
    $memberID = $obj['memberID'];
    $memberName = $obj['memberName'];
    $level = $obj['level'];
    $boss = $obj['boss'];
    $selectedSegment =$obj['selectedSegment'];
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

    $wr_rec_sectors = $obj['wr_rec_sectors'];

    $depositMin = $obj['depositMin'];
    $depositMax = $obj['depositMax'];
    $mrateMin = $obj['mrateMin'];
    $mrateMax = $obj['mrateMax'];
    $premoMin = $obj['premoMin'];
    $premoMax = $obj['premoMax'];
    $sumMin = $obj['sumMin'];
    $sumMax = $obj['sumMax'];
    
    $name_sell = $obj['name_sell'];
    $addr_sell = $obj['addr_sell'];
    $writer_sell = $obj['writer_sell'];
    $areaMin_sell = $obj['areaMin_sell'];
    $areaMax_sell = $obj['areaMax_sell'];

    $salePriceMin = $obj['salePriceMin'];
    $salePriceMax = $obj['salePriceMax'];
    $psalePriceMin = $obj['psalePriceMin'];
    $psalePriceMax = $obj['psalePriceMax'];
    $silinsuMin = $obj['silinsuMin'];
    $silinsuMax = $obj['silinsuMax'];
    $profitMin = $obj['profitMin'];
    $profitMax = $obj['profitMax'];

    $name_fin = $obj['name_fin'];
    $addr_fin = $obj['addr_fin'];



    if($level == 'emp'){
        if($selectedSegment=='임대'){
            $sql_query = "select * from g5_write_$memberID where wr_sale_type = 1 and wr_sold_out != 1 ";        
        }
        else if($selectedSegment=='매매'){
            $sql_query = "select * from g5_write_$memberID where wr_sale_type = 2 and wr_sold_out != 1 ";
        }
        else{
            $sql_query = "select * from g5_write_$memberID where wr_sold_out = 1 ";
        }
        
    }
    else{
        
        if($selectedSegment=='임대'){
            $sql_query = "select * from g5_write_$memberID where (wr_office_permission='' or wr_office_permission = 2) AND wr_writer = '$memberName' and wr_sold_out != 1 AND wr_sale_type = 1 ";
        }
        else if($selectedSegment=='매매'){
            $sql_query = "select * from g5_write_$memberID where (wr_office_permission='' or wr_office_permission = 2) AND wr_writer = '$memberName' and wr_sold_out != 1 AND wr_sale_type = 2 ";
        }
        else{
            $sql_query = "select * from g5_write_$memberID where (wr_office_permission='' or wr_office_permission = 2) AND wr_writer = '$memberName' AND wr_sold_out = 1 ";
        }
    }
        
        
    if($selectedSegment =='임대'){

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

        if(count($wr_rec_sectors)>0){
            $sql_query .= "AND (";

            for ( $i = 0,  $size = count($wr_rec_sectors); $i < $size; ++$i){
                $sector = $wr_rec_sectors[$i];
                if($i == 0){

                    $sql_query .= "wr_rec_sectors LIKE '%$sector%' ";

                }
                
                if(0 < $i && $i < $size ){
                    $sql_query .= "OR wr_rec_sectors LIKE '%$sector%' ";
                }

                if($i == $size-1){

                    $sql_query .= ") ";

                }
            }
        
        }

    }

    if ($selectedSegment =='매매'){

        if(strlen($name_sell)>0){

            $sql_query .= "AND wr_subject LIKE '%$name_sell%' ";

        }
       
        if(strlen($addr_sell)>0){
            
            $sql_query .= "AND wr_address LIKE '%$addr_sell%' ";

        }
        if(strlen($writer_sell)>0){
            
            $sql_query .= "AND wr_writer LIKE '%$writer_sell%' ";

        }
     
        if(strlen($areaMin_sell)>0){
            
            $sql_query .= "AND wr_area_p_all >= $areaMin_sell ";

        }
        if(strlen($areaMax_sell)>0){
            
            $sql_query .= "AND wr_area_p_all <= $areaMax_sell ";

        }
        if(strlen($salePriceMin)>0){
            
            $sql_query .= "AND wr_sale_price >= $salePriceMin ";

        }
        if(strlen($salePriceMax)>0){
            
            $sql_query .= "AND wr_sale_price <= $salePriceMax ";
            
        }
        if(strlen($psalePriceMin)>0){
            
            $sql_query .= "AND wr_p_sale_price >= $psalePriceMin ";

        }
        if(strlen($psalePriceMax)>0){
            
            $sql_query .= "AND wr_p_sale_price <= $psalePriceMax ";

        }
        if(strlen($silinsuMin)>0){
            
            $sql_query .= "AND wr_silinsu >= $silinsuMin ";

        }
        if(strlen($silinsuMax)>0){
            
            $sql_query .= "AND wr_silinsu <= $silinsuMax ";

        }
        if(strlen($profitMin)>0){
            
            $sql_query .= "AND wr_profit_rate >= $profitMin ";

        }
        if(strlen($profitMax)>0){
            
            $sql_query .= "AND wr_profit_rate <= $profitMax ";

        }

    }
    if ($selectedSegment =='거래완료'){

        if(strlen($name_fin)>0){

            $sql_query .= "AND wr_subject LIKE '%$name_fin%' ";

        }
       
        if(strlen($addr_fin)>0){
            
            $sql_query .= "AND wr_address LIKE '%$addr_fin%' ";

        }

    }
        

    
    $sql_query .= "order by wr_id DESC limit $limitFrom, $limitNum";
   
	
    $result= mysqli_query($con, $sql_query)or die("Error in Selecting " . mysqli_error($con));
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray,JSON_UNESCAPED_UNICODE);

?>
 