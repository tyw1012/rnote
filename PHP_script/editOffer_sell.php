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


	$json = file_get_contents('php://input');

	 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);

	  
    
    $memberID = $obj['memberID'];
    $wr_id = $obj['wr_id'];
       
    $wr_subject = $obj['wr_subject'];
    $wr_address = $obj['wr_address'];    
    $wr_seller_contact = $obj['wr_seller_contact'];
    
    $wr_address_sale = $obj['wr_address_sale'];
    $wr_area_p_all = $obj['wr_area_p_all'];
    $wr_area_m_all = $obj['wr_area_m_all'];
    $wr_sale_price = $obj['wr_sale_price'];
    $wr_p_sale_price = $obj['wr_p_sale_price'];

    $wr_sale_deposit = $obj['wr_sale_deposit'];
    $wr_total_rfee = $obj['wr_total_rfee'];
    $wr_year_rate = $obj['wr_year_rate'];
    $wr_loan = $obj['wr_loan'];
    $wr_int_rate = $obj['wr_int_rate'];
    $wr_year_int = $obj['wr_year_int'];
    $wr_mon_int = $obj['wr_mon_int'];
    $wr_mon_income = $obj['wr_mon_income'];
    $wr_year_income = $obj['wr_year_income'];
    $wr_silinsu = $obj['wr_silinsu'];
    $wr_profit_rate = $obj['wr_profit_rate'];

    $wr_rand_type = $obj['wr_rand_type'];
    $wr_zoning_district = $obj['wr_zoning_district'];
    $wr_floor = $obj['wr_floor'];
    $wr_gross_area = $obj['wr_gross_area'];
    $wr_memo = $obj['wr_memo'];
    $wr_content = $obj['wr_content'];

    $wr_posx = $obj['wr_posx'];
    $wr_posy = $obj['wr_posy'];

    // $wr_datetime = date('Y-m-d H:i:s');
    // $wr_num = get_next_num('g5_write_'.$memberID);
    

    $response = array();
    $response['error'] = false;
    $response['item'] = '';
    

//   $sql_query = "INSERT IGNORE INTO g5_write_$memberID (wr_subject, wr_address, wr_sale_area, wr_renter_contact, wr_lessor_contact, wr_rec_sectors, wr_floor, wr_area_p, wr_rent_deposit, wr_m_rate, wr_premium_o, wr_premium_b, wr_memo, wr_content, wr_datetime, wr_posx, wr_posy, wr_sale_type, wr_important) VALUES ('$wr_subject', '$wr_address', '$wr_sale_area', '$wr_renter_contact', '$wr_lessor_contact', '$wr_rec', '$wr_floor', '$wr_area_p', '$wr_rent_deposit', '$wr_m_rate', '$wr_premium_o', '$wr_premium_b', '$wr_memo', '$wr_content', '$wr_datetime', '$wr_posx', '$wr_posy', 1, 2, )";


  $sql_query = "UPDATE g5_write_$memberID SET 
  

  wr_subject='$wr_subject',
  wr_address='$wr_address',  
  wr_seller_contact='$wr_seller_contact',
   
  wr_address_sale='$wr_address_sale',
  wr_area_p_all='$wr_area_p_all', 
  wr_area_m_all='$wr_area_m_all',
  wr_sale_price='$wr_sale_price',
  wr_p_sale_price='$wr_p_sale_price',

  wr_sale_deposit='$wr_sale_deposit',
  wr_total_rfee = '$wr_total_rfee',
  wr_year_rate = '$wr_year_rate',
  wr_loan = '$wr_loan',
  wr_int_rate = '$wr_int_rate',
  wr_mon_income = '$wr_mon_income',
  wr_year_income = '$wr_year_income',
  wr_year_int='$wr_year_int',
  wr_mon_int='$wr_mon_int',
  wr_silinsu = '$wr_silinsu',
  wr_profit_rate = '$wr_profit_rate',

  wr_rand_type = '$wr_rand_type',
  wr_zoning_district = '$wr_zoning_district',
  wr_floor = '$wr_floor',
  wr_gross_area = '$wr_gross_area',
  wr_memo = '$wr_memo',
  wr_content = '$wr_content',
  
  wr_posx = '$wr_posx',
  wr_posy = '$wr_posy' WHERE wr_id = '$wr_id'
  ";

  function checkValidity(){
      
    global $response;  
    global $wr_subject;
    global $wr_address;
    global $wr_seller_contact;
    global $wr_renter_contact;
    global $wr_area_p_all;
    global $wr_sale_price;
  
    
    
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
      
    
      if(strlen($wr_seller_contact)<=0){
        $response['error'] = true;
        $response['item'] = '매도인연락처';
        return false;
      }

      if(strlen($wr_area_p_all)<=0){
        $response['error'] = true;
        $response['item'] = '평';
        return false;
      }   

      if(strlen($wr_sale_price)<=0){
        $response['error'] = true;
        $response['item'] = '총매도가';
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
