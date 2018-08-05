<?php
    require_once('db.php');

    session_start();
    
    $request_body = json_decode(file_get_contents('php://input'));
    // TODO: sanitize
    if(isset($request_body) && !empty($request_body)) {
        if(property_exists($request_body, "task")) {
            switch($request_body->task) {
                case "saveNewFlat": 

                    $registerData = $request_body->data;

                    $saveFlat = saveFlat($registerData);
                    echo json_encode($saveFlat);
                    break;
                case "getFlatData": 
                    // TODO
                    $response = $saveRapportblatt;
                    echo json_encode($response);
                    break;
                case "saveNewUser": 
                $registerData = $request_body->data;

                $saveUser = saveUser($registerData);
                echo json_encode($saveUser);
                break;
            }
        } 
    }
?>