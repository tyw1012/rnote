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


            $sql_query2 = "select * FROM bld_$memberID order by bld_id DESC limit $limitFrom, $limitNum";
            $result2 = mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));
            $emparray['bld_data'] =array();
            
           
            while($row2 =mysqli_fetch_assoc($result2))
            {
                $emparray['bld_data'][] = $row2;
              
            }

            if(count( $emparray['bld_data'])>0){
                $or_query = "AND (";
        
                for ( $i = 0,  $size = count($emparray['bld_data']); $i < $size; ++$i){
                    $bld_id = $emparray['bld_data'][$i]['bld_id'];
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

            $sql_query4 = "select a.bld_Bfloor, a.bld_address, a.bld_contact, a.bld_firstRoomNumber, a.bld_floor, a.bld_hasElev, a.bld_hasParking, a.bld_id, a.bld_memo, a.bld_name, a.bld_posx, a.bld_posy, a.bld_roomPerFloor, a.bld_sale_type,  a.bld_subway, b.board_list, b.wr_area_m, b.wr_area_p, b.wr_bld_match_id, b.wr_bookmark, b.wr_content, b.wr_floor, b.wr_m_rate, b.wr_memo, b.wr_mt_cost, b.wr_mt_elec, b.wr_mt_gas, b.wr_mt_internet, b.wr_mt_separate, b.wr_mt_tv, b.wr_mt_water,b.wr_o_air_cond, b.wr_o_bed, b.wr_o_bookshelf, b.wr_o_closet, b.wr_o_desk, wr_o_fridger, b.wr_o_internet, b.wr_o_microwave, b.wr_o_shoe_rack, b.wr_o_sink, b.wr_o_tv, b.wr_o_vacant, b.wr_o_washer, b.wr_rent_deposit, b.wr_rent_type, b.wr_room_inactive, b.wr_room_number, b.wr_writer_id FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id "."$or_query"."order by b.wr_id DESC";
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


            $sql_query2 = "select a.bld_Bfloor, a.bld_address, a.bld_contact, a.bld_firstRoomNumber, a.bld_floor, a.bld_hasElev, a.bld_hasParking, a.bld_id, a.bld_memo, a.bld_name, a.bld_posx, a.bld_posy, a.bld_roomPerFloor, a.bld_sale_type,  a.bld_subway, b.board_list, b.wr_area_m, b.wr_area_p, b.wr_bld_match_id, b.wr_bookmark, b.wr_content, b.wr_floor, b.wr_m_rate, b.wr_memo, b.wr_mt_cost, b.wr_mt_elec, b.wr_mt_gas, b.wr_mt_internet, b.wr_mt_separate, b.wr_mt_tv, b.wr_mt_water,b.wr_o_air_cond, b.wr_o_bed, b.wr_o_bookshelf, b.wr_o_closet, b.wr_o_desk, wr_o_fridger, b.wr_o_internet, b.wr_o_microwave, b.wr_o_shoe_rack, b.wr_o_sink, b.wr_o_tv, b.wr_o_vacant, b.wr_o_washer, b.wr_rent_deposit, b.wr_rent_type, b.wr_room_inactive, b.wr_room_number, b.wr_writer_id FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id and b.wr_o_vacant = 1 order by b.wr_id DESC limit $limitFrom, $limitNum";
            $result2 = mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));
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

                $sql_query4 = "select a.bld_Bfloor, a.bld_address, a.bld_contact, a.bld_firstRoomNumber, a.bld_floor, a.bld_hasElev, a.bld_hasParking, a.bld_id, a.bld_memo, a.bld_name, a.bld_posx, a.bld_posy, a.bld_roomPerFloor, a.bld_sale_type,  a.bld_subway, b.board_list, b.wr_area_m, b.wr_area_p, b.wr_bld_match_id, b.wr_bookmark, b.wr_content, b.wr_floor, b.wr_m_rate, b.wr_memo, b.wr_mt_cost, b.wr_mt_elec, b.wr_mt_gas, b.wr_mt_internet, b.wr_mt_separate, b.wr_mt_tv, b.wr_mt_water,b.wr_o_air_cond, b.wr_o_bed, b.wr_o_bookshelf, b.wr_o_closet, b.wr_o_desk, wr_o_fridger, b.wr_o_internet, b.wr_o_microwave, b.wr_o_shoe_rack, b.wr_o_sink, b.wr_o_tv, b.wr_o_vacant, b.wr_o_washer, b.wr_rent_deposit, b.wr_rent_type, b.wr_room_inactive, b.wr_room_number, b.wr_writer_id FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id "."$or_query"."order by b.wr_id DESC";
                $result4 = mysqli_query($con, $sql_query4) or die("Error in Selecting " . mysqli_error($con));
                $emparray['room_extra_data'] =array();
                while($row4 =mysqli_fetch_assoc($result4))
                {
                    $emparray['room_extra_data'][] = $row4;
                }
            
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

            $sql_query4 = "select a.bld_Bfloor, a.bld_address, a.bld_contact, a.bld_firstRoomNumber, a.bld_floor, a.bld_hasElev, a.bld_hasParking, a.bld_id, a.bld_memo, a.bld_name, a.bld_posx, a.bld_posy, a.bld_roomPerFloor, a.bld_sale_type,  a.bld_subway, b.board_list, b.wr_area_m, b.wr_area_p, b.wr_bld_match_id, b.wr_bookmark, b.wr_content, b.wr_floor, b.wr_m_rate, b.wr_memo, b.wr_mt_cost, b.wr_mt_elec, b.wr_mt_gas, b.wr_mt_internet, b.wr_mt_separate, b.wr_mt_tv, b.wr_mt_water,b.wr_o_air_cond, b.wr_o_bed, b.wr_o_bookshelf, b.wr_o_closet, b.wr_o_desk, wr_o_fridger, b.wr_o_internet, b.wr_o_microwave, b.wr_o_shoe_rack, b.wr_o_sink, b.wr_o_tv, b.wr_o_vacant, b.wr_o_washer, b.wr_rent_deposit, b.wr_rent_type, b.wr_room_inactive, b.wr_room_number, b.wr_writer_id FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id order by b.wr_id DESC limit $limitFrom, $limitNum";
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


            $sql_query2 = "select a.bld_Bfloor, a.bld_address, a.bld_contact, a.bld_firstRoomNumber, a.bld_floor, a.bld_hasElev, a.bld_hasParking, a.bld_id, a.bld_memo, a.bld_name, a.bld_posx, a.bld_posy, a.bld_roomPerFloor, a.bld_sale_type,  a.bld_subway, b.board_list, b.wr_area_m, b.wr_area_p, b.wr_bld_match_id, b.wr_bookmark, b.wr_content, b.wr_floor, b.wr_m_rate, b.wr_memo, b.wr_mt_cost, b.wr_mt_elec, b.wr_mt_gas, b.wr_mt_internet, b.wr_mt_separate, b.wr_mt_tv, b.wr_mt_water,b.wr_o_air_cond, b.wr_o_bed, b.wr_o_bookshelf, b.wr_o_closet, b.wr_o_desk, wr_o_fridger, b.wr_o_internet, b.wr_o_microwave, b.wr_o_shoe_rack, b.wr_o_sink, b.wr_o_tv, b.wr_o_vacant, b.wr_o_washer, b.wr_rent_deposit, b.wr_rent_type, b.wr_room_inactive, b.wr_room_number, b.wr_writer_id FROM bld_$memberID a, g5_write_$memberID b where a.bld_id = b.wr_bld_match_id and b.wr_o_vacant = 1 order by b.wr_id DESC limit $limitFrom, $limitNum";
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
