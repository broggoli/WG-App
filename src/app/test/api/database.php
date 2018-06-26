<?php
    session_start();

    $user = $_SESSION["user"];

    //SELECT records from userTable where username=sanitizedUserName

    if($user == "admin"){
        echo "{
            'message': 'admin only text',
            'success': true
        }";
    }else{
        echo "{
            'message': 'Who tha fuck is u',
            'success': false
        }"
    }
 ?>
