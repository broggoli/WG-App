<?php
  $GLOBALS["userDBPath"]                  = "../db/user_db.json";
  $GLOBALS["logDBPath"]                   = "../db/log_db.json";
  $GLOBALS["flatDBPth"]                   = "../db/flat_db.json";

  function saveFlat($registerData){

    $flatData = new stdClass();
    $response = new StdClass();
    $response->success = false;
    //Getting the DB as an object
    $flatDB = getDB("flatDBPth");

    //Check whether the data header already exists
    if(property_exists($flatDB, $registerData->pointer)){
      $response->message = "Flat already exists!";
    }else{
      //User doesn't exist -> Save User
      $response->success = true;
    }

    //If everything is allright save the new user intop the json DB
    if($response->success == true){

      //Getting the Dataheader to use as key for the json object
      $pointer = (string)$registerData->pointer;

      $flatData->encryptedData = $registerData->encryptedData;

      $flatDB->{$pointer} = $flatData;

      // encode array to json and save to file
      file_put_contents($GLOBALS["flatDBPth"], json_encode($flatDB));

      $response->message = "Successfully registerd!";
    }
    return $response;
  }
  function getFlatData($pointer) {

    $response = new StdClass();
    $response->success = false;
    //Getting the DB as an object
    $flatDB = getDB("flatDBPth");

    //Check whether the data header exists
    if(property_exists($flatDB, $pointer)){
      $response->message = "Pointer exists!";
      //returning the encryptedZiviData
      $response->data = $flatDB->{$pointer};
      $response->success = true;
    }else{
      $response->message = "No flat with this credentials found!";
    }
    return $response;
  }
  function saveUser($registerData){

    $userData = new stdClass();
    $response = new StdClass();
    $response->success = false;
    //Getting the DB as an object
    $userDB = getDB("userDBPath");

    //Check whether the data header already exists
    if(property_exists($userDB, $registerData->pointer)){
      $response->message = "Flat already exists!";
    }else{
      //User doesn't exist -> Save User
      $response->success = true;
    }

    //If everything is allright save the new user intop the json DB
    if($response->success == true){

      //Getting the Dataheader to use as key for the json object
      $pointer = (string)$registerData->pointer;

      $userData->encryptedData = $registerData->encryptedData;

      $userDB->{$pointer} = $userData;

      // encode array to json and save to file
      file_put_contents($GLOBALS["userDBPath"], json_encode($userDB));

      $response->message = "Successfully registerd!";
    }
    return $response;
  }
  function getUserData($pointer) {

    $response = new StdClass();
    $response->success = false;
    //Getting the DB as an object
    $userDB = getDB("userDBPath");

    //Check whether the data header exists
    if(property_exists($userDB, $pointer)){
      $response->message = "Pointer exists!";
      //returning the encryptedZiviData
      $response->data = $userDB->{$pointer};
      $response->success = true;
    }else{
      $response->message = "No user with this credentials found!";
    }
    return $response;
  }
  function getDB( $DBName ) {
    //Get the data base as a string
    $DBStr = file_get_contents($GLOBALS["flatDBPth"]);
    if($DBStr == "" || $DBStr == "null"){
      $DBStr = "{}";
    }
    //convert JSON string to object
    $DBObject =  (object) json_decode($DBStr, true);

    return $DBObject;
  }
?>