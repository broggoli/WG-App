<?php
  class DBInterface {

    /* User specific functions */
    function getUserData( $userPointer ) {
      $userData = $this->getDataFromDB("user_db", $userPointer);
      //Check whether the data header exists
      if($userData->success != true){
        $userData->message = "No users with this credentials found!";
      }else{
        $userData->message = "User data successfully retrieved!";
      }
      return $userData;
    }
    function deleteUserData( $userPointer ) {
      $deleteUserData = $this->deleteData("user_db", $pointer);
      //Check whether the data header exists
      if($deleteUserData->success != true){
        $deleteUserData->message = "No data to this pointer found!";
      }else{
        $deleteUserData->message = "User data successfully deleted!";
      }
      return $deleteUserData;
    }
    function registerUser( $userPointer, $data ) {
      $saveNewUserData = $this->saveData("user_db", $userPointer, $data);
      //Check whether the data header exists
      if($saveNewUserData->success != true){
        $saveNewUserData->message = "This user already exists";
      }else{
        $saveNewUserData->message = "New User successufully saved!";
      }
      return $saveNewUserData;
    }
    function replaceUserData( $userPointer, $data ) {
      $replaceUserData = $this->replaceData("user_db", $userPointer, $data);
      //Check whether the data header exists
      if($replaceUserData->success != true){
        $replaceUserData->message = "No data to this pointer found!";
      }else{
        $replaceUserData->message = "Successfully deleted and resaved user data!";
      }
      return $replaceUserData;
    }


    /* Flat specific functions */
    function getFlatData( $flatPointer ) {
      $flatData = $this->getDataFromDB("flat_db", $flatPointer);
      //Check whether the data header exists
      if($flatData->success != true){
        $flatData->message = "No flat with this pointer found!";
      }else{
        $flatData->message = "Flat data successfully retrieved!";
      }
      return $flatData;
    }
    function deleteFlatData( $flatPointer ) {
      $deleteFlatData = $this->deleteData("flat_db", $flatPointer);
      //Check whether the data header exists
      if($deleteFlatData->success != true){
        $deleteFlatData->message = "No data to this pointer found!";
      }else{
        $deleteFlatData->message = "Flat data successfully deleted!";
      }
      return $deleteFlatData;
    }
    function registerFlat( $flatPointer, $data ) {
      $saveNewFlatData = $this->saveData("flat_db", $flatPointer, $data);
      //Check whether the data header exists
      if($saveNewFlatData->success != true){
        echo json_encode($saveNewFlatData);
        $saveNewFlatData->message = "This flat already exists";
      }else{
        $saveNewFlatData->message = "New flat successufully saved!";
      }
      return $saveNewFlatData;
    }
    function replaceFlatData( $flatPointer, $data ) {
      $replaceFlatData = $this->replaceData("flat_db", $userPointer, $data);
      //Check whether the data header exists
      if($replaceFlatData->success != true){
        $replaceFlatData->message = "No data to this pointer found!";
      }else{
        $replaceFlatData->message = "Successfully deleted and resaved flat data!";
      }
      return $replaceFlatData;
    }


    private function saveData( $dbName, $pointer, $data ) {
      $response = new StdClass();
      $response->success = false;
      //Getting the DB as an object
      $dBObject = $this->getDB( $dbName );
  
      //Check whether the data header already exists
      if(property_exists($dBObject, $pointer)){
        $response->message = "User already exists!";
        return $response;
      }else if( isset($pointer) && $pointer != "" ){
        //If everything is allright save the new user intop the json DB
        //Getting the Dataheader to use as key for the json object
        //setting the expiration date to approximately one year
        $db_path = "../db/";
        $newDataEntry = new StdClass();

        $newDataEntry->initializedTime = time();
        $newDataEntry->data = $data;
  
        $dBObject->{$pointer} = $newDataEntry;
  
        // encode array to json and save to file
        file_put_contents($db_path.$dbName.".json", json_encode($dBObject));
        $response->success = true;
  
        $response->message = "Successfully saved new entry with pointer: ".$pointer;
      }else{
        $response->message = "No pointer Recieved!";
      }
      return $response;
    }
    /* Deletes the data from the given db when given a pointer that is in it */
    private function deleteData( $db_name, $pointer) {
      $db_path = "../db/";

      $response = new StdClass();
      $response->success = false;
  
      $dBObject = $this->getDB( $db_name );
  
      $dataToDelete = $this->getDataFromDB( $db_name, $pointer );
  
      if($dataToDelete->success == true){
  
        //delete the element form the object
        unset($dBObject->{$pointer});
  
        // encode array to json and save to file
        file_put_contents($db_path.$dbName.".json", json_encode($dBObject));
  
        $response->message = "Data successsfully deleted.";
        $response->success = true;
      }else{
        $response = $dataToDelete;
      }
      return $response;
    }
    /* Replaces the data from the given db when given a pointer that is in it */
    private function replaceData( $db_name, $pointer, $data) {

      $response = new StdClass();
      $response->success = false;
  
      $dBObject = $this->getDB( $db_name );
  
      $deleteData = $this->deleteData( $db_name, $pointer );
      $saveData = $this->saveData( $db_name, $pointer, $data );
  
      if( $deleteData->success != true){
        return $deleteData;
      }else if( $saveData->success != true){
          return $saveUser;
      }else{
        // Successfully deleted and resaved data
        $response->message = "Successfully replaced user data.";
        $response->success = true;
      }
    }
    /* returns the Data saved in the jsn data base with the $pointer as key*/
    private function getDataFromDB( $dbName, $pointer ) {
      $response = new StdClass();
      $response->success = false;
      //Getting the DB as an object
      $dBObject = $this->getDB($dbName);

      //Check whether the data header exists
      if(property_exists($dBObject, $pointer)){
        $response->message = "Data header exists!";
        //returning the data
        $response->data = $dBObject->{$pointer};
        $response->success = true;
      }else{
        $response->message = "No data for this pointer found!";
      }
      return $response;
    }
    /* returns the whole user data base as an object */
    private function getDB( $dbName ){
      $db_path = "../db/";
      //Get the data base as a string
      $DBString = file_get_contents($db_path.$dbName.".json");
      if($DBString == "" || $DBString == "null"){
        $DBString = "{}";
      }
      //convert JSON string to object
      $DBObject =  (object) json_decode($DBString, true);

      return $DBObject;
    }
  }