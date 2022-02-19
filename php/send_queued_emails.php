<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer-6.5.4/src/Exception.php';
require 'phpmailer/PHPMailer-6.5.4/src/PHPMailer.php';
require 'phpmailer/PHPMailer-6.5.4/src/SMTP.php';

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


// close connection early, but keep executing script
// https://stackoverflow.com/a/141026/5157195
ob_end_clean();
header("Connection: close");
ignore_user_abort(true);
ob_start();
//echo('Some status message');
$size = ob_get_length();
header("Content-Length: $size");
header("Content-Encoding: none");
ob_end_flush();
flush();
// connection is closed at this point


send_queued_emails($mysqli);

function send_queued_emails($con) {

    // avoid concurrent access
    $con->query('START TRANSACTION;');

    $con->query("SELECT EmailQueueId, Subject, Body FROM EmailQueue LIMIT 1");

    // read one item from the queue    
    $result = $con->query("SELECT EmailQueueId, Subject, Body FROM EmailQueue LIMIT 1");

    $row = $result->fetch_object();

    $EmailQueueId = $row->EmailQueueId;
    $Subject = $row->Subject;
    $Body = $row->Body;

    // if no more datasets are found, exit the function
    if (!$result || (mysqli_num_rows($result) == 0))
      return; 
    
    SendEmailPHPMailer($Subject, $Body);

    $con->query("DELETE FROM EmailQueue WHERE EmailQueueId = " . $EmailQueueId);
    
    // commit transaction
    $con->query('COMMIT;');

    // recursively call the function
    send_queued_emails($con);

};

function SendEmailPHPMailer($subject, $body)
{
    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        //$mail->Mailer = "smtp";
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                  //Enable verbose debug output
        $mail->SMTPDebug  = 0;
        $mail->isSMTP();                                          //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                 //Enable SMTP authentication
        $mail->Username   = 'billstracker4@gmail.com';            //SMTP username
        $mail->Password   = 'billstracker_hello';                 //SMTP password
        //$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;        //Enable implicit TLS encryption
        $mail->SMTPSecure = "tls";
        //$mail->Port     = 465;                                  //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        $mail->Port = 587;

        //Recipients
        $mail->setFrom('billstracker4@gmail.com', 'Bills Tracker');
        $mail->addAddress('billstracker4@gmail.com');                  //Add a recipient
        //$mail->addAddress('ellen@example.com', 'optional');     //Name is optional
        $mail->addReplyTo('billstracker4@gmail.com', 'Reply');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');

        //Attachments
        //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

        //Content
        $mail->isHTML(true);                                    //Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $body;
        //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();

        //echo 'Message has been sent';
        
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

?>