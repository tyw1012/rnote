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


    $rentType = $obj['rentType'];
    $roomType = $obj['roomType'];
    $addr = $obj['addr'];
    $subway = $obj['subway'];
    $floorMin = $obj['floorMin'];
    $floorMax = $obj['floorMax'];
    $areaMin = $obj['areaMin'];
    $areaMax = $obj['areaMax'];
    $parking = $obj['parking'];
    $elev = $obj['elev'];

    $depositMin = $obj['depositMin'];
    $depositMax = $obj['depositMax'];
    $mrateMin = $obj['mrateMin'];
    $mrateMax = $obj['mrateMax'];

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
        if($selectedSegment=='공실'){

            $sql_query = "select count(*) as count FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id and b.wr_o_vacant = 1 ";        
        }
        else if($selectedSegment=='건물'){
            $sql_query = "select count(*) as count from g5_write_$memberID where board_list = '$selectedOfferingType' and wr_sale_type = 2 and wr_sold_out != 1 ";
        }
               
    }
    else{
        
        if($selectedSegment=='공실'){
            $sql_query = "select count(*) as count from g5_write_$memberID where board_list = '$selectedOfferingType' and (wr_office_permission='' or wr_office_permission = 2) AND wr_writer = '$memberName' and wr_sold_out != 1 AND wr_sale_type = 1 ";
        }
        else if($selectedSegment=='건물'){
            $sql_query = "select count(*) as count from g5_write_$memberID where board_list = '$selectedOfferingType' and (wr_office_permission='' or wr_office_permission = 2) AND wr_writer = '$memberName' and wr_sold_out != 1 AND wr_sale_type = 2 ";
        }
        
    }
        
        
    if($selectedSegment == '공실'){

             
      
        if($rentType!='0'){
            
            $sql_query .= "AND b.wr_rent_type = '$rentType' ";

        }
        if($roomType!='0'){
            
            $sql_query .= "AND b.wr_room_type = '$roomType' ";

        }
        if(strlen($addr)>0){
            
            $sql_query .= "AND a.bld_address LIKE '%$addr%' ";

        }
        if(strlen($subway)>0){
            
            $sql_query .= "AND a.bld_subway LIKE '%$subway%' ";

        }
        if(strlen($floorMin)>0){
            
            $sql_query .= "AND b.wr_floor >= $floorMin ";

        }
        if(strlen($floorMax)>0){
            
            $sql_query .= "AND b.wr_floor <= $floorMax ";

        }
        if(strlen($areaMin)>0){
            
            $sql_query .= "AND b.wr_area_p >= $areaMin ";

        }
        if(strlen($areaMax)>0){
            
            $sql_query .= "AND b.wr_area_p <= $areaMax ";

        }
        if(strlen($depositMin)>0){
            
            $sql_query .= "AND b.wr_rent_deposit >= $depositMin ";

        }
        if(strlen($depositMax)>0){
            
            $sql_query .= "AND b.wr_rent_deposit <= $depositMax ";
            
        }
        if(strlen($mrateMin)>0){
            
            $sql_query .= "AND b.wr_m_rate >= $mrateMin ";

        }
        if(strlen($mrateMax)>0){
            
            $sql_query .= "AND b.wr_m_rate <= $mrateMax ";

        }

        $sql_query .= "order by b.wr_id DESC";   
	
        $result= mysqli_query($con, $sql_query)or die("Error in Selecting " . mysqli_error($con));

        $emparray = array();
        $row = mysqli_fetch_assoc($result);
        $emparray['room_count'] = $row;      
       

    }
   
    // if ($selectedSegment =='매매'){

    //     if(strlen($name_sell)>0){

    //         $sql_query .= "AND wr_subject LIKE '%$name_sell%' ";

    //     }
        
    //     if(strlen($addr_sell)>0){
            
    //         $sql_query .= "AND wr_address LIKE '%$addr_sell%' ";

    //     }
    //     if(strlen($writer_sell)>0){
            
    //         $sql_query .= "AND wr_writer LIKE '%$writer_sell%' ";

    //     }
        
    //     if(strlen($areaMin_sell)>0){
            
    //         $sql_query .= "AND wr_area_p_all >= $areaMin_sell ";

    //     }
    //     if(strlen($areaMax_sell)>0){
            
    //         $sql_query .= "AND wr_area_p_all <= $areaMax_sell ";

    //     }
    //     if(strlen($salePriceMin)>0){
            
    //         $sql_query .= "AND wr_sale_price >= $salePriceMin ";

    //     }
    //     if(strlen($salePriceMax)>0){
            
    //         $sql_query .= "AND wr_sale_price <= $salePriceMax ";
            
    //     }
    //     if(strlen($psalePriceMin)>0){
            
    //         $sql_query .= "AND wr_p_sale_price >= $psalePriceMin ";

    //     }
    //     if(strlen($psalePriceMax)>0){
            
    //         $sql_query .= "AND wr_p_sale_price <= $psalePriceMax ";

    //     }
    //     if(strlen($silinsuMin)>0){
            
    //         $sql_query .= "AND wr_silinsu >= $silinsuMin ";

    //     }
    //     if(strlen($silinsuMax)>0){
            
    //         $sql_query .= "AND wr_silinsu <= $silinsuMax ";

    //     }
    //     if(strlen($profitMin)>0){
            
    //         $sql_query .= "AND wr_profit_rate >= $profitMin ";

    //     }
    //     if(strlen($profitMax)>0){
            
    //         $sql_query .= "AND wr_profit_rate <= $profitMax ";

    //     }

    // }

    // if ($selectedSegment =='거래완료'){

    //     if(strlen($name_fin)>0){

    //         $sql_query .= "AND wr_subject LIKE '%$name_fin%' ";

    //     }
       
    //     if(strlen($addr_fin)>0){
            
    //         $sql_query .= "AND wr_address LIKE '%$addr_fin%' ";

    //     }

    // }

    



    if($level == 'emp'){
        if($selectedSegment=='공실'){
            $sql_query2 = "select * FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id and b.wr_o_vacant = 1 ";        
        }
        else if($selectedSegment=='매매'){
            $sql_query2 = "select * from g5_write_$memberID where board_list = '$selectedOfferingType' and wr_sale_type = 2 and wr_sold_out != 1 ";
        }
        else{
            $sql_query2 = "select * from g5_write_$memberID where board_list = '$selectedOfferingType' and wr_sold_out = 1 ";
        }
        
    }
    else{
        
        if($selectedSegment=='임대'){
            $sql_query2 = "select * from g5_write_$memberID where board_list = '$selectedOfferingType' and (wr_office_permission='' or wr_office_permission = 2) AND wr_writer = '$memberName' and wr_sold_out != 1 AND wr_sale_type = 1 ";
        }
        else if($selectedSegment=='매매'){
            $sql_query2 = "select * from g5_write_$memberID where board_list = '$selectedOfferingType' and (wr_office_permission='' or wr_office_permission = 2) AND wr_writer = '$memberName' and wr_sold_out != 1 AND wr_sale_type = 2 ";
        }
        else{
            $sql_query2 = "select * from g5_write_$memberID where board_list = '$selectedOfferingType' and (wr_office_permission='' or wr_office_permission = 2) AND wr_writer = '$memberName' AND wr_sold_out = 1 ";
        }
    }
        
        
   
    if($selectedSegment == '공실'){

             
      
        if($rentType!='0'){
            
            $sql_query2 .= "AND b.wr_rent_type = '$rentType' ";

        }
        if($roomType!='0'){
            
            $sql_query2 .= "AND b.wr_room_type = '$roomType' ";

        }
        if(strlen($addr)>0){
            
            $sql_query2 .= "AND a.bld_address LIKE '%$addr%' ";

        }
        if(strlen($subway)>0){
            
            $sql_query2 .= "AND a.bld_subway LIKE '%$subway%' ";

        }
        if(strlen($floorMin)>0){
            
            $sql_query2 .= "AND b.wr_floor >= $floorMin ";

        }
        if(strlen($floorMax)>0){
            
            $sql_query2 .= "AND b.wr_floor <= $floorMax ";

        }
        if(strlen($areaMin)>0){
            
            $sql_query2 .= "AND b.wr_area_p >= $areaMin ";

        }
        if(strlen($areaMax)>0){
            
            $sql_query2 .= "AND b.wr_area_p <= $areaMax ";

        }
        if(strlen($depositMin)>0){
            
            $sql_query2 .= "AND b.wr_rent_deposit >= $depositMin ";

        }
        if(strlen($depositMax)>0){
            
            $sql_query2 .= "AND b.wr_rent_deposit <= $depositMax ";
            
        }
        if(strlen($mrateMin)>0){
            
            $sql_query2 .= "AND b.wr_m_rate >= $mrateMin ";

        }
        if(strlen($mrateMax)>0){
            
            $sql_query2 .= "AND b.wr_m_rate <= $mrateMax ";

        }
      
       
        $sql_query2 .= "order by b.wr_id DESC limit $limitFrom, $limitNum";
   
	
        $result2= mysqli_query($con, $sql_query2)or die("Error in Selecting " . mysqli_error($con));
        $emparray['room_data'] =array();
    
        while($row2 =mysqli_fetch_assoc($result2))
        {
            $emparray['room_data'][] = $row2;
        }


        if(count( $emparray['room_data'])>0){

            $bldIdArray = array();
                    
            for ( $i = 0,  $size = count($emparray['room_data']); $i < $size; ++$i){
                $bld_id = $emparray['room_data'][$i]['wr_bld_match_id'];
                if (!in_array($bld_id, $bldIdArray)){
                    array_push($bldIdArray, $bld_id);
                }
           
            }

            if(count( $bldIdArray)>0){
                $or_query = "AND (";
        
                for ( $i = 0,  $size = count($bldIdArray); $i < $size; ++$i){
                    $bld_id = $bldIdArray[$i];
                    if($i == 0){
        
                        $or_query .= "a.bld_id = '$bld_id' ";
        
                    }
                    
                    if(0 < $i && $i < $size ){
                        $or_query .= "OR a.bld_id = '$bld_id' ";
                    }
        
                    if($i == $size-1){
        
                        $or_query .= ") ";
        
                    }
                }
            
            }

            $sql_query4 = "select * FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id "."$or_query"."order by b.wr_room_number";
            $result4 = mysqli_query($con, $sql_query4) or die("Error in Selecting " . mysqli_error($con));
            $emparray['room_extra_data'] =array();
            while($row4 =mysqli_fetch_assoc($result4))
            {
                $emparray['room_extra_data'][] = $row4;
            }
        
        }

    }
        
    // if ($selectedSegment =='매매'){

    //     if(strlen($name_sell)>0){

    //         $sql_query2 .= "AND wr_subject LIKE '%$name_sell%' ";

    //     }
        
    //     if(strlen($addr_sell)>0){
            
    //         $sql_query2 .= "AND wr_address LIKE '%$addr_sell%' ";

    //     }
    //     if(strlen($writer_sell)>0){
            
    //         $sql_query2 .= "AND wr_writer LIKE '%$writer_sell%' ";

    //     }
        
    //     if(strlen($areaMin_sell)>0){
            
    //         $sql_query2 .= "AND wr_area_p_all >= $areaMin_sell ";

    //     }
    //     if(strlen($areaMax_sell)>0){
            
    //         $sql_query2 .= "AND wr_area_p_all <= $areaMax_sell ";

    //     }
    //     if(strlen($salePriceMin)>0){
            
    //         $sql_query2 .= "AND wr_sale_price >= $salePriceMin ";

    //     }
    //     if(strlen($salePriceMax)>0){
            
    //         $sql_query2 .= "AND wr_sale_price <= $salePriceMax ";
            
    //     }
    //     if(strlen($psalePriceMin)>0){
            
    //         $sql_query2 .= "AND wr_p_sale_price >= $psalePriceMin ";

    //     }
    //     if(strlen($psalePriceMax)>0){
            
    //         $sql_query2 .= "AND wr_p_sale_price <= $psalePriceMax ";

    //     }
    //     if(strlen($silinsuMin)>0){
            
    //         $sql_query2 .= "AND wr_silinsu >= $silinsuMin ";

    //     }
    //     if(strlen($silinsuMax)>0){
            
    //         $sql_query2 .= "AND wr_silinsu <= $silinsuMax ";

    //     }
    //     if(strlen($profitMin)>0){
            
    //         $sql_query2 .= "AND wr_profit_rate >= $profitMin ";

    //     }
    //     if(strlen($profitMax)>0){
            
    //         $sql_query2 .= "AND wr_profit_rate <= $profitMax ";

    //     }

    // }
    
    // if ($selectedSegment =='거래완료'){

    //     if(strlen($name_fin)>0){

    //         $sql_query2 .= "AND wr_subject LIKE '%$name_fin%' ";

    //     }
       
    //     if(strlen($addr_fin)>0){
            
    //         $sql_query2 .= "AND wr_address LIKE '%$addr_fin%' ";

    //     }

    // }

    // $sql_query2 .= "order by wr_id DESC limit $limitFrom, $limitNum";
   
	
    // $result2= mysqli_query($con, $sql_query2)or die("Error in Selecting " . mysqli_error($con));
    // $emparray['room_data'] =array();

    // while($row2 =mysqli_fetch_assoc($result2))
    // {
    //     $emparray['room_data'][] = $row2;
    // }
    echo json_encode($emparray,JSON_UNESCAPED_UNICODE);

?>
 