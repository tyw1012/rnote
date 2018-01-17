<?php

// include '../common.php';
include 'DBconfig.php';
header("Content-Type: text/html; charset=UTF-8");

 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 mysqli_set_charset($con,"utf8");


//  function get_next_num($table)
//  {
//      // 가장 작은 번호를 얻어
//      global $con;
 
//      $sql = "select min(wr_num) as min_wr_num from $table";
     
//      $result=mysqli_query($con,$sql);
//      $row=mysqli_fetch_assoc($result);
     
//      // 가장 작은 번호에 1을 빼서 넘겨줌
//      return (int)($row['min_wr_num'] - 1);
     
//  }


	$json = file_get_contents('php://input');

	 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);

	
    $memberID = $obj['memberID'];
    $wr_id = $obj['wr_id'];
    $wr_subject = $obj['wr_subject'];
    $wr_address = $obj['wr_address'];
    $wr_sale_area = $obj['wr_sale_area'];
    $wr_renter_contact = $obj['wr_renter_contact'];
    $wr_lessor_contact = $obj['wr_lessor_contact'];
    $wr_code = $obj['wr_code'];
    $wr_rec = $obj['wr_rec_sectors'];
    $wr_floor = $obj['wr_floor'];
    $wr_area_p = $obj['wr_area_p'];
    $wr_rent_deposit = $obj['wr_rent_deposit'];
    $wr_m_rate = $obj['wr_m_rate'];
    $wr_premium_o = $obj['wr_premium_o'];
    $wr_premium_b = $obj['wr_premium_b'];
    $wr_memo = $obj['wr_memo'];
    $wr_content = $obj['wr_content'];
    $wr_posx = $obj['wr_posx'];
    $wr_posy = $obj['wr_posy'];
    // $wr_datetime = date('Y-m-d H:i:s');
    // $wr_num = get_next_num('g5_write_'.$memberID);
    

      
    // $wr_datetime = '".G5_TIME_YMDHIS."';

   
       
    $response = array();
    $response['error'] = false;
    $response['item'] = '';
    

//   $sql_query = "INSERT IGNORE INTO g5_write_$memberID (wr_subject, wr_address, wr_sale_area, wr_renter_contact, wr_lessor_contact, wr_rec_sectors, wr_floor, wr_area_p, wr_rent_deposit, wr_m_rate, wr_premium_o, wr_premium_b, wr_memo, wr_content, wr_datetime, wr_posx, wr_posy, wr_sale_type, wr_important) VALUES ('$wr_subject', '$wr_address', '$wr_sale_area', '$wr_renter_contact', '$wr_lessor_contact', '$wr_rec', '$wr_floor', '$wr_area_p', '$wr_rent_deposit', '$wr_m_rate', '$wr_premium_o', '$wr_premium_b', '$wr_memo', '$wr_content', '$wr_datetime', '$wr_posx', '$wr_posy', 1, 2, )";




  $sql_query = "UPDATE g5_write_$memberID SET 
--   wr_writer_id='$memberID',
--   wr_writer='$memberName',
--   board_list= 3,
  wr_subject='$wr_subject',
  wr_address='$wr_address',
  wr_sale_area='$wr_sale_area', 
  wr_renter_contact='$wr_renter_contact',
  wr_lessor_contact='$wr_lessor_contact',
  wr_code = '$wr_code',
  wr_rec_sectors='$wr_rec',
  wr_floor='$wr_floor',
  wr_area_p='$wr_area_p', 
  wr_rent_deposit='$wr_rent_deposit', 
  wr_m_rate='$wr_m_rate', 
  wr_premium_o='$wr_premium_o', 
  wr_premium_b='$wr_premium_b', 
  wr_memo='$wr_memo', 
  wr_content='$wr_content', 
  wr_posx= '$wr_posx',
  wr_posy= '$wr_posy' WHERE wr_id = '$wr_id'";


 

  
  function checkValidity(){
      
    global $response;  
    global $wr_subject;
    global $wr_address;
    global $wr_sale_area;
    global $wr_renter_contact;
    global $wr_floor;
    global $wr_area_p;
    global $wr_rent_deposit;
    global $wr_m_rate;
    global $wr_premium_o;
    global $wr_premium_b;
    global $wr_posx;
    global $wr_posy;

    
    
    if(strlen($wr_subject)==0){
        $response['error'] = true;
        $response['item'] = '매물명';
        return false;
      }

      if(strlen($wr_address)<=0){
        $response['error'] = true;
        $response['item'] = '주소';
        return false;
      } 
      
      if(strlen($wr_sale_area)<=0){
        $response['error'] = true;
        $response['item'] = '상권명';
        return false;
      }

      if(strlen($wr_renter_contact)<=0){
        $response['error'] = true;
        $response['item'] = '임차인연락처';
        return false;
      }

      if(strlen($wr_floor)<=0){
        $response['error'] = true;
        $response['item'] = '층';
        return false;
      }   

      if(strlen($wr_area_p)<=0){
        $response['error'] = true;
        $response['item'] = '평';
        return false;
      }   

      if(strlen($wr_rent_deposit)<=0){
        $response['error'] = true;
        $response['item'] = '보증금';
        return false;
      }   

      if(strlen($wr_m_rate)<=0){
        $response['error'] = true;
        $response['item'] = '월세';
        return false;
      }   

      if(strlen($wr_premium_o)<=0){
        $response['error'] = true;
        $response['item'] = '권리금';
        return false;
      }   

      if(strlen($wr_premium_b)<=0){
        $response['error'] = true;
        $response['item'] = '권리금절충가';
        return false;
      }   
    
    return true;

  }

  if(checkValidity()){
    $result= mysqli_query($con, $sql_query) or die("Error in Selecting " . mysqli_error($con));    
    echo json_encode($response);
  }
  else{
    echo json_encode($response);
  }
	


?>
