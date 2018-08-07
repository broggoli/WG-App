// Angluar imports
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { CryptoService } from './crypto.service'
import { UserService } from './user.service'
import { FlatService } from './flat.service'

// Modules
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
  registerData: RegisterData;
  errorMessage: string;
  startstep: string

  constructor(private crypto: CryptoService,
              private user: UserService,
              private flat: FlatService,
              private activatedRoute: ActivatedRoute) {

    this.registerData = this.getRegisterData
    this.setStartStep = "newOrJoin"
    this.errorMessage = ""
    this.startstep = "newOrJoin"
  }
  
  get getRegisterData() {
    let regData: RegisterData;
    const retrievedRegisterData = JSON.parse(sessionStorage.getItem("registerData"))
    if( retrievedRegisterData ) {
      regData = retrievedRegisterData
    }else{
      // retrun default 
      regData = {
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
    }
    return regData
  }
  tempSaveUserData() {
    sessionStorage.setItem("registerData", JSON.stringify(this.registerData) )
  }
  set setStartStep(step: string) {
    if(this.getSteps === []){
      sessionStorage.setItem("currentFormStep", JSON.stringify([step]) )
    }
  }
  get getSteps(): string[]{
    const savedStack = sessionStorage.getItem("currentFormStep")
    if( savedStack ){
      return <string[]>JSON.parse(savedStack)
    }else{
      return [this.startstep];
    }
  }
  set addStep(step: string) {
    const savedStack = this.getSteps;
    savedStack.push(step)
    sessionStorage.setItem("currentFormStep", JSON.stringify(savedStack) )
  }
  deleteLastStep() {
    let steps = this.getSteps
    const previousStep = steps.pop()
    sessionStorage.setItem("currentFormStep", JSON.stringify(steps) )
  }



  // Update User Data Obnject
  enterCode(code: string) {
    if( validateCode(code) ){
      this.registerData.flatCode = code;
      this.registerData.flatCodeHash = this.crypto.hash(code);
      this.addStep = "enterUserData"
      this.tempSaveUserData()
    }

    
    // toDo: check whether flatcode exists
    function validateCode(code){
      return true;
    }
  }

  get getJoin(){
    return this.registerData.join;
  }
  get getCurrentStep(): string {
    //return last element from stack
    const lastIndex = this.getSteps.length-1
    return this.getSteps[lastIndex];
  }
  get getPrevious(): string {
    if(this.getSteps.length > 1){
      let steps = this.getSteps
      const previousStep = steps.pop()
      this.deleteLastStep()
      return previousStep;
    }else{
      return this.getCurrentStep;
    }
  }
  set setJoin(join){
    this.registerData.join = join
    
    //redirect
    join 
    ? this.addStep = "enterCode" 
    : this.addStep = "enterUserData"
  }
  set setUserData(userData: RegiterUserData){
    this.registerData.userData = userData

    //redirect if the user generates a new flat, otherwise Register
    if( this.registerData.join === false){
      this.addStep ="addFlatMates"
    }else if( this.registerData.join === true){
      this.registerUserInExistingFlat();
      console.log("Registering user in existing Flat")
    }else{
      console.log("Join not definded: " + this.registerData.join)
    }
    
    this.tempSaveUserData()
  }
  set setFlatMates(flatMates) {
    this.registerData.flatMates = flatMates
  }

  set setFlatName(flatName: string) {
    this.registerData.flatData.name = flatName
  }

  generateNewUser() {
    const userData: UserData = this.getUserData()
    const PW =  this.registerData.userData.passwords.PW
    const userName =  this.registerData.userData.names.userName
    
    const userDataVal = validateUserData(userData)
    const passwordVal = validatePassword(PW)

    if( userDataVal.valid === true && passwordVal.valid === true){
      const saveNewUser = this.user.saveNewUser(userData, PW).subscribe( data => {
        console.log(data)
      })
    }else{
      console.log(userDataVal.message)
    }
  }

  generateNewFlat() {
    if( this.registerData.join === false){
      this.generateNewUser()
      this.flat.saveNewFlat( this.registerData.flatData).subscribe( data => {
        console.log(data)
      })
    }else{
      console.log("Join isnt set to false!")
    }
  }

  registerUserInExistingFlat() {
    if( this.registerData.join === true){
      this.generateNewUser()
      const userData: UserData = this.getUserData()
      const PW =  this.registerData.userData.passwords.PW
      const userName =  this.registerData.userData.names.userName
      
      const userPointer = this.user.getUserPointer(userName, PW)
      this.flat.linkFlatToUser(this.registerData.flatCode, userPointer)

    }else{
      console.log("Join isnt set to true!")
    }
  }

  getUserData(): UserData{
    const userData = this.registerData.userData;
    return  {
                pointer: "",
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
