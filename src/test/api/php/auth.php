<?php

  require_once('db.php');

  session_start();
  $response = new StdClass();
  $response->success = false;

  $dbInterface = new DBInterface();

  $request_body = json_decode( file_get_contents('php://input') );
  if(isset($request_body) && !empty($request_body)) {
    if(property_exists($request_body, "task")) {
      switch ($request_body->task) {
        case "login":
          $pointer =  filter_var($request_body->data->pointer, FILTER_SANITIZE_STRING);
          $userData = $dbInterface->getUserData($pointer);
        
          if( $userData->success ){
            $userData->data["pointer"] = $pointer;
            $_SESSION['user'] = $userData->data;
            $response = $userData;
          }else{
            $response->message = $userData->message;
          }
          break;

        case "registerFlat":
          $flatData = (string) $request_body->data->encryptedData;
          $pointer = (string) $request_body->data->pointer;

          $registerFlat = $dbInterface->registerFlat( $pointer, $flatData);
          $response = $registerFlat;
          break;
        
        case "getFlatData":
          $pointer =  filter_var($request_body->data->pointer, FILTER_SANITIZE_STRING);
          $flatData = $dbInterface->getFlatData( $pointer );
        
          if( $flatData->success ){
            $_SESSION['flat'] = $flatData->data;
            $response = $flatData;
          }else{
            $response->message = $flatData->message;
          }
          break;
        
        case "updateFlat": 
          $pointer =  filter_var($request_body->data->pointer, FILTER_SANITIZE_STRING);
          $newData = (string) $request_body->data->encryptedData;
            
          $updateData = $dbInterface->replaceFlatData( $pointer, $newData );
          $response = $updateData;
          break;

        case "registerUser":
          $userData = (string) $request_body->data->encryptedData;
          $pointer = (string) $request_body->data->pointer;

          $registerUser = $dbInterface->registerUser( $pointer, $userData );
          $response = $registerUser;
          break;

        case "deleteUser":
          $pointer = (string) $request_body->data->pointer;

          $deleteUser = $dbInterface->deleteUser( $pointer );
          $response = $deleteUser;
          break;

        case "isLoggedIn":
          if( isset($_SESSION['user']) && !empty($_SESSION['user']) ) {
            $response->success = true;
            $response->message = "User logged in!";
            $response->data = true;
          }else{
            $response->success = true;
            $response->message = "User not logged in!";
            $response->data = false;
          }
          break;
        }
    }else{
      $response->message = "No task recieved!";
    }
  } else {
    $response->message = "No Data recieved!";
  }

  echo json_encode($response);
?>
