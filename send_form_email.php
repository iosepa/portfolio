<?php

$name = urldecode($_POST["name"]);
$email_from = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
$message = urldecode($_POST["comments"]);
 
$EmailTo = "jboxborrow@gmx.com";
$Subject = "iosepa.io message";
 
// prepare email body text
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
 
$Body .= "Email: ";
$Body .= $email_from;
$Body .= "\n";
 
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";
 
// send email
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
$success = @mail($EmailTo, $Subject, $message, $headers); 

//file_put_contents("php_output.txt", $name . " " .$headers ." ". $message, FILE_APPEND);

// redirect to success page
if ($success){
   echo " Expect a response within two business days.";
}else{
    echo " Sorry, we're having technical difficulties.";
}

?>
