<?php

// this function is used to check the php url to make sure it is valid
// before performing the call. if valid then return 1 else empty string

$url = "https://bms.closedarea.com/BillingTracker/php/grid_get_post.php?queryName=griduserbills&billingAccountId=1&sortColumn=null&sortDirection=null&pageNumber=1&pageSize=4";

//$url = "https://bms.closedarea.com/BillingTracker";


function is_url($url){
    $response = array();

    //Check if URL is empty
    if(!empty($url)) {

        $response = get_headers($url);
    }

    //print_r($response);

    // return value is 1 if url valid, else return empty string if url not valid    
    return (bool)in_array("HTTP/1.1 200 OK", $response, true);
}

echo is_url($url);



/*Array
(
[0] => HTTP/1.1 200 OK 
[Date] => Sat, 29 May 2004 12:28:14 GMT
[Server] => Apache/1.3.27 (Unix)  (Red-Hat/Linux)
[Last-Modified] => Wed, 08 Jan 2003 23:11:55 GMT
[ETag] => "3f80f-1b6-3e1cb03b"
[Accept-Ranges] => bytes
[Content-Length] => 438
[Connection] => close
[Content-Type] => text/html
)
*/ 


?>