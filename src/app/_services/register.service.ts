import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service'
import { UserService } from './user.service'
import { FlatService } from './flat.service'

import { RegisterData, 
        RegiterUserData} from "../modules/register.model"
import { UserData } from "../modules/user.module"

interface ValidationMessage {
  message: string;
  valid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  // Form Position 
  steps: string[]
  registerData: RegisterData;

  constructor(private crypto: CryptoService,
              private user: UserService,
              private flat: FlatService) {
    
    this.registerData = {
      join: undefined,
      flatCode: "",
      flatCodeHash: "",
      userData: {
        names:{
          firstName: "",
          lastName: "",
          userName: ""
        },
        passwords: {
          PW: "",
          confirmPW: ""
        }
      },
      flatData: {
        name: ""
      },
      flatMates: []
    }
    this.steps = ["flatDetails"]
    //this.steps = ["addFlatMates"]
  }

  enterCode(code: string) {
    if( validateCode(code) ){
      this.registerData.flatCode = code;
      this.registerData.flatCodeHash = this.crypto.hash(code);
      this.steps.push("enterUserData")
    }

    
    // toDo: check whether flatcode exists
    function validateCode(code){
      return true;
    }
  }

  get getJoin(){
    return this.registerData.join;
  }
  get getCurrentStep(){
    //return last element from stack
    return this.steps[this.steps.length-1];
  }
  get getPrevious(){
    if(this.steps.length > 1){
      return this.steps.pop();
    }else{
      return this.getCurrentStep;
    }
  }
  set setJoin(join){
    this.registerData.join = join
    
    //redirect
    join 
    ? this.steps.push("enterCode") 
    : this.steps.push("enterUserData") 
  }
  set setUserData(userData: RegiterUserData){
    this.registerData.userData = userData

    //redirect if the user generates a new flat, otherwise Register
    if( this.registerData.join === false){
      this.steps.push("addFlatMates") 
    }else if( this.registerData.join === true){
      this.registerUserInExistingFlat();
      console.log("Registering user in existing Flat")
    }else{
      console.log("Join not definded: " + this.registerData.join)
    }
  }
  set setFlatMates(flatMates) {
    this.registerData.flatMates = flatMates
  }


  generateNewFlat(){
    if( this.registerData.join === false){

      console.log(this.registerData)
    }else{
      console.log("Join isnt set to false!")
    }
  }

  registerUserInExistingFlat() {
    if( this.registerData.join === true){
      const userData: UserData = this.getUserData()
      const PW =  this.registerData.userData.passwords.PW
      const userName =  this.registerData.userData.names.userName
      
      const userDataVal = validateUserData(userData)
      const passwordVal = validatePassword(PW)

      if( userDataVal.valid === true && passwordVal.valid === true){
        this.user.saveNewUser(userData, PW)
        const userPointer = this.user.getUserPointer(userName, PW)
        this.flat.linkFlatToUser(this.registerData.flatCode, userPointer)
      }else{
        console.log(userDataVal.message)
      }
    }else{
      console.log("Join isnt set to true!")
    }
  }

  getUserData(): UserData{
    const userData = this.registerData.userData;
    return  {
                names:  processNames(userData.names)
            }
  }
}

function processNames(names): any{
  let processedNames = {};
  for(let name in names) {
    processedNames[name] = names[name].trim().toLowerCase()
  }
  return processedNames
}

function validateUserData(userData): ValidationMessage{
  for(let name in userData.names ) {
    if(!name || name === ""){
      return {
        message: `${name} is empty or invaldid`,
        valid: false
      };
    }
  }
  return {
    message: `Everything is valid`,
    valid: true
  };
}
function validatePassword(pw): ValidationMessage{
  if(!pw || pw === ""){
    return {
      message: `Password is empty or invaldid`,
      valid: false
    };
  }
  return {
    message: `Everything is valid`,
    valid: true
  };
}
