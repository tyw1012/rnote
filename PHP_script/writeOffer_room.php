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

  
    $bld_name = $obj['bld_name'];
    $bld_address = $obj['bld_address'];
    $bld_contact = $obj['bld_contact'];
    $bld_floor= $obj['bld_floor'];
    $bld_roomPerFloor= $obj['bld_roomPerFloor'];
    $bld_posx= $obj['bld_posx'];
    $bld_posy= $obj['bld_posy'];
    $bld_hasElev= $obj['bld_hasElev'];
    $bld_hasParking= $obj['bld_hasParking'];
    $bld_datetime = date('Y-m-d H:i:s');
    $bld_datetime_mod = '1111-11-11 11:11:11';
    $rooms = $obj['rooms'];

    $sql_query = "INSERT IGNORE INTO bld_$memberID SET
    
    bld_name = '$bld_name',
    bld_address = '$bld_address',
    bld_contact = '$bld_contact',
    bld_floor = '$bld_floor',
    bld_roomPerFloor = '$bld_roomPerFloor',
    bld_posx = '$bld_posx',
    bld_posy = '$bld_posy',
    bld_hasElev = '$bld_hasElev',
    bld_hasParking = '$bld_hasParking',
    bld_datetime = '$bld_datetime',
    bld_datetime_mod = '$bld_datetime_mod'";
    
    $result= mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));
    $wr_bld_match_id = mysqli_insert_id($con);
    for ( $i = 0,  $size = count($rooms); $i < $size; ++$i){

        $wr_room_number = $rooms[$i]['roomNumber'];
        $wr_room_type = roomTypeConvert($rooms[$i]['wr_room_type']);
        $wr_area_p = $rooms[$i]['wr_area_p'];
        $wr_area_m = $rooms[$i]['wr_area_m'];
        $wr_rent_deposit = $rooms[$i]['wr_rent_deposit'];
        $wr_m_rate = $rooms[$i]['wr_m_rate'];
        $wr_mt_cost = $rooms[$i]['wr_mt_cost'];
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

        $wr_room_inactive = boolConvert($rooms[$i]['inActive']);

        $sql_query2 = "INSERT IGNORE INTO g5_write_$memberID SET
    
        wr_room_number = '$wr_room_number',
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
         $result= mysqli_query($con, $sql_query2) or die("Error in Selecting " . mysqli_error($con));

    }

    // print_r ($rooms);
    // $response = array();
    // $response['error'] = false;
    // $response['item'] = '';
    

//   $sql_query = "INSERT IGNORE INTO g5_write_$memberID SET 
//   wr_writer_id='$memberID',
//   wr_writer='$memberName',
//   board_list= 3,
//   wr_subject='$wr_subject',
//   wr_address='$wr_address',
//   wr_sale_area='$wr_sale_area', 
//   wr_renter_contact='$wr_renter_contact',
//   wr_lessor_contact='$wr_lessor_contact',
//   wr_rec_sectors='$wr_rec',
//   wr_floor='$wr_floor',
//   wr_area_p='$wr_area_p', 
//   wr_rent_deposit='$wr_rent_deposit', 
//   wr_m_rate='$wr_m_rate', 
//   wr_premium_o='$wr_premium_o', 
//   wr_premium_b='$wr_premium_b', 
//   wr_memo='$wr_memo', 
//   wr_content='$wr_content', 
//   wr_datetime='$wr_datetime', 
//   wr_posx= '$wr_posx',
//   wr_posy= '$wr_posy', 
//   wr_sale_type= 1, 
//   wr_important= 2,
//   wr_num = '$wr_num',
//   wr_hp = '$contact',
//   wr_code = '$wr_code'
//   ";


 

  
//   function checkValidity(){
      
//     global $response;  
//     global $wr_subject;
//     global $wr_address;
//     global $wr_sale_area;
//     global $wr_renter_contact;
//     global $wr_floor;
//     global $wr_area_p;
//     global $wr_rent_deposit;
//     global $wr_m_rate;
//     global $wr_premium_o;
//     global $wr_premium_b;
//     global $wr_posx;
//     global $wr_posy;

    
    
//     if(strlen($wr_subject)==0){
//         $response['error'] = true;
//         $response['item'] = '매물명';
//         return false;
//       }

//       if(strlen($wr_address)<=0){
//         $response['error'] = true;
//         $response['item'] = '주소';
//         return false;
//       } 
      
//       if(strlen($wr_sale_area)<=0){
//         $response['error'] = true;
//         $response['item'] = '상권명';
//         return false;
//       }

//       if(strlen($wr_renter_contact)<=0){
//         $response['error'] = true;
//         $response['item'] = '임차인연락처';
//         return false;
//       }

//       if(strlen($wr_floor)<=0){
//         $response['error'] = true;
//         $response['item'] = '층';
//         return false;
//       }   

//       if(strlen($wr_area_p)<=0){
//         $response['error'] = true;
//         $response['item'] = '평';
//         return false;
//       }   

//       if(strlen($wr_rent_deposit)<=0){
//         $response['error'] = true;
//         $response['item'] = '보증금';
//         return false;
//       }   

//       if(strlen($wr_m_rate)<=0){
//         $response['error'] = true;
//         $response['item'] = '월세';
//         return false;
//       }   

//       if(strlen($wr_premium_o)<=0){
//         $response['error'] = true;
//         $response['item'] = '권리금';
//         return false;
//       }   

//       if(strlen($wr_premium_b)<=0){
//         $response['error'] = true;
//         $response['item'] = '권리금절충가';
//         return false;
//       }   
    
//     return true;

//   }

//   if(checkValidity()){
//     $result= mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));
//     $wr_id = mysqli_insert_id($con);
//     mysqli_query($con, "update g5_write_$memberID set wr_parent = '$wr_id', wr_o_id = '$wr_id' where wr_id='$wr_id'");
//     echo json_encode($response);
//   }
//   else{
//     echo json_encode($response);
//   }
	


?>
