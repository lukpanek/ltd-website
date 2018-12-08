<?php
    require_once("Mail.php");
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');

    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $arr = array ('email'=>$email,'subject'=>$subject,'message'=>$message);

    $from = "web@liturkey.eu";
    $to = "lukaspanek5@gmail.com";
    $subject = '[WEB] ' . $subject;
    $body = "$message\n\nE-mail: $email\nPředmět: $subject";

    $host = "smtp.seznam.cz";
    $username = "web@liturkey.eu";
    $password = "722740595Lukas";

    $headers = array('From' => $from, 'To' => $to, 'Subject' => $subject);

    $smtp = Mail::factory('smtp', array ('host' => $host,
                                        'port' => '25',
                                        'auth' => true,
                                        'username' => $username,
                                        'password' => $password));

    $mail = $smtp->send($to, $headers, $body);

    if ( PEAR::isError($mail) ) {
        $arr['status'] = 'error_email';
    } else {
        $arr['status'] = 'ok';
    }

    echo json_encode($arr);
?>