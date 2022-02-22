<?php

$user = 'root';
$password = 'root';
$db = 'BillingTracker';
$host = 'localhost';
$port = 8889;

$mysqli = new mysqli($host, $user, $password, $db, $port);

if($mysqli->connect_error) {
    echo "connection error";
}

$myArray = array();
$result;

$result = $mysqli->query("select BillsId, BillingAccount.AccountName as AccountName, BillingAccount.AccountNumber as AccountNumber, BillingAccount.AccountUserName as AccountUserName, DueDate, BillingNumber, AmountDue, date_add(DueDate, interval - 7 day) as 7day from BillingAccount inner join BillingAccountUserBills on BillingAccount.BillingAccountId = BillingAccountUserBills.BillingAccountId where date_add(DueDate, interval - 7 day) = curdate() and PaidDate is null");

while($row = $result->fetch_object()) {

    $AccountName = $row->AccountName;
    $AccountNumber = $row->AccountNumber;
    $AccountUserName = $row->AccountUserName;
    $DueDate = $row->DueDate;
    $BillingNumber = $row->BillingNumber;
    $AmountDue = $row->AmountDue;

    $dueDateCreate = date_create($DueDate);
    $dueDateFormat = date_format($dueDateCreate,"l, M-d-Y");

    $subject = "Bill for Account: " . $AccountName . " with Account Number: " . $AccountNumber . " is overdue in 7 days";
    $body = "<br><b>" . $AccountName . " Bill is overdue in 7 days</b>" .
            "<br><br>Account Name: " . $AccountName .
            "<br><br>Account Number: " . $AccountNumber .
            "<br><br>Account User Name: " . $AccountUserName .
            "<br><br>Due Date: " . $dueDateFormat .
            "<br><br>BillingNumber: " . $BillingNumber .
            "<br><br>Amount Due: " . $AmountDue;
            
    $mysqli->query("insert into EmailQueue (Subject, Body) values ('" . $subject . "','" . $body . "')");
}


$result = $mysqli->query("select BillsId, BillingAccount.AccountName as AccountName, BillingAccount.AccountNumber as AccountNumber, BillingAccount.AccountUserName as AccountUserName, DueDate, BillingNumber, AmountDue, date_add(DueDate, interval - 3 day) as 3day from BillingAccount inner join BillingAccountUserBills on BillingAccount.BillingAccountId = BillingAccountUserBills.BillingAccountId where date_add(DueDate, interval - 3 day) = curdate() and PaidDate is null");

while($row = $result->fetch_object()) {

    $AccountName = $row->AccountName;
    $AccountNumber = $row->AccountNumber;
    $AccountUserName = $row->AccountUserName;
    $DueDate = $row->DueDate;
    $BillingNumber = $row->BillingNumber;
    $AmountDue = $row->AmountDue;

    $dueDateCreate = date_create($DueDate);
    $dueDateFormat = date_format($dueDateCreate,"l, M-d-Y");

    $subject = "Bill for Account: " . $AccountName . " with Account Number: " . $AccountNumber . " is overdue in 3 days";
    $body = "<br><b>" . $AccountName . " Bill is overdue in 3 days</b>" .
            "<br><br>Account Name: " . $AccountName .
            "<br><br>Account Number: " . $AccountNumber .
            "<br><br>Account User Name: " . $AccountUserName .
            "<br><br>Due Date: " . $dueDateFormat .
            "<br><br>BillingNumber: " . $BillingNumber .
            "<br><br>Amount Due: " . $AmountDue;

    $mysqli->query("insert into EmailQueue (Subject, Body) values ('" . $subject . "','" . $body . "')");
}


curl_process_email_queue();

function curl_process_email_queue() {

    $c = curl_init();
    curl_setopt($c, CURLOPT_URL, "https://bms.closedarea.com/BillingTracker/php/send_queued_emails.php");
    curl_setopt($c, CURLOPT_FOLLOWLOCATION, true);  // Follow the redirects (needed for mod_rewrite)
    curl_setopt($c, CURLOPT_HEADER, false);         // Don't retrieve headers
    curl_setopt($c, CURLOPT_NOBODY, true);          // Don't retrieve the body
    curl_setopt($c, CURLOPT_RETURNTRANSFER, true);  // Return from curl_exec rather than echoing
    curl_setopt($c, CURLOPT_FRESH_CONNECT, true);   // Always ensure the connection is fresh
  
    // Timeout super fast once connected, so it goes into async.
    curl_setopt( $c, CURLOPT_TIMEOUT, 1 );

    return curl_exec( $c );
}

?>
