<?php

// include '../common.php';
include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 mysqli_set_charset($con,"utf8");


 function get_next_num($table)
 {
     // 가장 작은 번호를 얻어
     global $con;
 
     $sql = "select min(wr_num) as min_wr_num from $table";
     
     $result=mysqli_query($con,$sql);
     $row=mysqli_fetch_assoc($result);
     
     // 가장 작은 번호에 1을 빼서 넘겨줌
     return (int)($row['min_wr_num'] - 1);
     
 }

 function roomTypeConvert($string){
     if($string =='원룸'){
         return 1;
     }
     
     if($string =='투룸'){
        return 2;
    }
    if($string =='쓰리룸'){
        return 3;
    }
    if($string =='1.5룸'){
      return 4;
  }
 }

 function rentTypeConvert($string){
  if($string =='월세'){
      return 1;
  }
  
  if($string =='전세'){
     return 2;
 }

}

 function boolConvert($bool){
    if($bool == true){
        return 1;
    }
    if($bool == false){
        return 0;
   }
  
}
//  function get_next_parent($table)
//  {
//      // 가장 작은 번호를 얻어
//      global $con;
 
//      $sql = "select max(wr_id) as max_wr_id from $table";
     
//      $result=mysqli_query($con,$sql);
//      $row=mysqli_fetch_assoc($result);
     
//      // 가장 작은 번호에 1을 빼서 넘겨줌
//      return (int)($row['max_wr_id'] + 1);
     
//  }


	$json = file_get_contents('php://input');

	 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);

	
    $memberID = $obj['memberID'];
    $memberName = $obj['memberName'];
    $contact = $obj['contact'];


    $response = array();
    $response['error'] = false;
    $response['item'] = '';

  
    $bld_name = mysqli_real_escape_string($con,$obj['bld_name']);
    $bld_address = mysqli_real_escape_string($con,$obj['bld_address']);
    $bld_contact = mysqli_real_escape_string($con,$obj['bld_contact']);
    $bld_floor= $obj['bld_floor'];
    $bld_roomPerFloor= $obj['bld_roomPerFloor'];
    $bld_subway = mysqli_real_escape_string($con,$obj['bld_subway']);
    $bld_Bfloor = $obj['bld_Bfloor'];
    $bld_firstRoomNumber = $obj['bld_firstRoomNumber'];
    $bld_posx= $obj['bld_posx'];
    $bld_posy= $obj['bld_posy'];
    $bld_hasElev= $obj['bld_hasElev'];
    $bld_hasParking= $obj['bld_hasParking'];
    $bld_memo = mysqli_real_escape_string($con,$obj['bld_memo']);
    $bld_datetime = date('Y-m-d H:i:s');
    $bld_datetime_mod = '1111-11-11 11:11:11';
    $rooms = $obj['rooms'];
    

    $sql_query = "INSERT IGNORE INTO bld_$memberID SET
    
    bld_name = '$bld_name',
    bld_address = '$bld_address',
    bld_contact = '$bld_contact',
    bld_floor = '$bld_floor',
    bld_roomPerFloor = '$bld_roomPerFloor',
    bld_subway = '$bld_subway',
    bld_Bfloor = '$bld_Bfloor',
    bld_firstRoomNumber = '$bld_firstRoomNumber',
    bld_posx = '$bld_posx',
    bld_posy = '$bld_posy',
    bld_hasElev = '$bld_hasElev',
    bld_hasParking = '$bld_hasParking',
    bld_memo = '$bld_memo',
    bld_datetime = '$bld_datetime',
    bld_datetime_mod = '$bld_datetime_mod'";
    
    if(checkValidity_bld()){
        $result= mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));

        $wr_bld_match_id = mysqli_insert_id($con);

         for ( $i = 0,  $size = count($rooms); $i < $size; ++$i){

            $wr_room_number = $rooms[$i]['wr_room_number'];
            $wr_floor = $rooms[$i]['wr_room_number'][0];
            $wr_room_type = roomTypeConvert($rooms[$i]['wr_room_type']);
            $wr_rent_type = rentTypeConvert($rooms[$i]['wr_rent_type']);
            $wr_area_p = floatval($rooms[$i]['wr_area_p']);
            $wr_area_m = floatval($rooms[$i]['wr_area_m']);
            $wr_rent_deposit = intval($rooms[$i]['wr_rent_deposit']);
            $wr_m_rate = intval($rooms[$i]['wr_m_rate']);
            $wr_mt_cost = intval($rooms[$i]['wr_mt_cost']);
            $wr_mt_separate = boolConvert($rooms[$i]['wr_mt_separate']);
            $wr_o_vacant = $rooms[$i]['wr_o_vacant'];

            $wr_mt_elec = $rooms[$i]['mt_options'][0]['wr_mt_elec'];
            $wr_mt_water = $rooms[$i]['mt_options'][1]['wr_mt_water'];
            $wr_mt_gas = $rooms[$i]['mt_options'][2]['wr_mt_gas'];
            $wr_mt_tv = $rooms[$i]['mt_options'][3]['wr_mt_tv'];
            $wr_mt_internet = $rooms[$i]['mt_options'][4]['wr_mt_internet'];

            $wr_o_tv = $rooms[$i]['options'][0]['wr_o_tv'];
            $wr_o_air_cond = $rooms[$i]['options'][1]['wr_o_air_cond'];
            $wr_o_fridger = $rooms[$i]['options'][2]['wr_o_fridger'];
            $wr_o_washer = $rooms[$i]['options'][3]['wr_o_washer'];
            $wr_o_sink = $rooms[$i]['options'][4]['wr_o_sink'];
            $wr_o_internet = $rooms[$i]['options'][5]['wr_o_internet'];
            $wr_o_microwave = $rooms[$i]['options'][6]['wr_o_microwave'];
            $wr_o_desk = $rooms[$i]['options'][7]['wr_o_desk'];
            $wr_o_bed = $rooms[$i]['options'][8]['wr_o_bed'];
            $wr_o_closet = $rooms[$i]['options'][9]['wr_o_closet'];
            $wr_o_shoe_rack = $rooms[$i]['options'][10]['wr_o_shoe_rack'];
            $wr_o_bookshelf = $rooms[$i]['options'][11]['wr_o_bookshelf'];

            $wr_room_inactive = boolConvert($rooms[$i]['wr_room_inactive']);

            $sql_query2 = "INSERT IGNORE INTO g5_write_$memberID SET
        
            wr_room_number = '$wr_room_number',
            wr_floor = '$wr_floor',
            wr_room_type = '$wr_room_type',
            wr_area_p = '$wr_area_p',
            wr_area_m = '$wr_area_m',
            wr_rent_deposit = '$wr_rent_deposit',
            wr_m_rate = '$wr_m_rate',
            wr_mt_cost = '$wr_mt_cost',
            wr_mt_separate = '$wr_mt_separate',
            wr_o_vacant = '$wr_o_vacant',

            wr_mt_elec = '$wr_mt_elec',
            wr_mt_water = '$wr_mt_water',
            wr_mt_gas = '$wr_mt_gas',
            wr_mt_tv = '$wr_mt_tv',
            wr_mt_internet = '$wr_mt_internet',

            wr_o_tv = '$wr_o_tv',
            wr_o_air_cond = '$wr_o_air_cond',
            wr_o_fridger = '$wr_o_fridger',
            wr_o_washer = '$wr_o_washer',
            wr_o_sink = '$wr_o_sink',
            wr_o_internet = '$wr_o_internet',
            wr_o_microwave = '$wr_o_microwave',
            wr_o_desk = '$wr_o_desk',
            wr_o_bed = '$wr_o_bed',
            wr_o_closet = '$wr_o_closet',
            wr_o_shoe_rack = '$wr_o_shoe_rack',
            wr_o_bookshelf = '$wr_o_bookshelf',

            wr_datetime= '$bld_datetime',
            wr_bld_match_id = '$wr_bld_match_id',
            wr_room_inactive = '$wr_room_inactive',
            board_list = 1

            ";
            $result2= mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));
            
        }
        echo json_encode($response,JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode($response,JSON_UNESCAPED_UNICODE);
    }
    

 
  
  function checkValidity_bld(){
      
    global $response;  
    global $bld_name;
    global $bld_address;
    global $bld_contact;
    global $bld_floor;
    global $bld_roomPerFloor;
        
    
    if(strlen($bld_name)==0){
        $response['error'] = true;
        $response['typeError'] = false;
        $response['item'] = '건물명';
        return false;
      }

      if(strlen($bld_address)<=0){
        $response['error'] = true;
        $response['typeError'] = false;
        $response['item'] = '건물주소';
        return false;
      } 
      
      if(strlen($bld_contact)<=0){
        $response['error'] = true;
        $response['typeError'] = false;
        $response['item'] = '건물주연락처';
        return false;
      }

      if(strlen($bld_floor)<=0){
        $response['error'] = true;
        $response['typeError'] = false;
        $response['item'] = '건물층수';
        return false;
      }
      if( !($bld_floor>0 && $bld_floor<10)){
        $response['error'] = true;
        $response['typeError'] = true;
        $response['item'] = '건물층수';
        return false;
      }

      if(strlen($bld_roomPerFloor)<=0){
        $response['error'] = true;
        $response['item'] = '층당 최대 호실 수';
        return false;
      }   

      if(  !($bld_roomPerFloor>0 && $bld_roomPerFloor<16)){
        $response['error'] = true;
        $response['typeError'] = true;
        $response['item'] = '층당 최대 호실 수';
        return false;
      }

   
    return true;

  }

  

?>
