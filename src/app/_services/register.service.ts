// Angluar imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from "rxjs"

// Services
import { CryptoService } from './crypto.service'
import { UserService } from './user.service'
import { FlatService } from './flat.service'
import { AuthService } from './auth.service'

// Modules
import { RegisterData, 
        RegiterUserData} from "../models/register.model"
import { UserData } from "../models/user.model"

interface ValidationMessage {
  message: string;
  valid: boolean;
}
interface Response {
  message: string,
  success: boolean,
  data: any
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  // Form Position
  registerData: RegisterData;
  errorMessage: string;
  startstep: string
  flatCode: string

  constructor(private crypto: CryptoService,
              private user: UserService,
              private auth: AuthService,
              private flat: FlatService,
              private router: Router) {

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

  generateNewUser(flatCode: string = ""): Observable<Response> {
    if( flatCode && flatCode != "") {
      this.flatCode = flatCode
    } else {
      this.flatCode = this.flat.generateFlatCode()
    }
    const userData: UserData = this.getUserData()
    const PW =  this.registerData.userData.passwords.PW
    
    const userDataVal = validateUserData(userData)
    const passwordVal = validatePassword(PW)

    if( userDataVal.valid === true && passwordVal.valid === true){
      return this.user.saveNewUser(userData, PW)
    }else{
      const res: Response = { 
        success: false,
        message: "User data not valid!",
        data: null
      }
      console.log(userDataVal.message)
      // making an observable out of the response object
      return of(res)
    }
  }

  generateNewFlat() {
    // Check whether the user chose to generate a new flat or not
    if( this.registerData.join === false) {
      //Generate the user and if that's successful generate the flat
      return this.generateNewUser().subscribe( registerUserRes => {
        const userData: UserData = this.getUserData()
        const PW =  this.registerData.userData.passwords.PW
        const userName =  userData.names.userName
        const userPointer = this.crypto.getUserPointer(userName, PW)

        if( registerUserRes.success === true){
          this.flat.saveNewFlat( this.registerData.flatData, userPointer, userData.flatCode ).subscribe( registerFlatRes => {
            if( registerFlatRes.success == true){

              this.login(userName, PW)
              return {
                success: true,
                message: "User and Flat successfully registered"
              }
            }else{
              return {
                success: false,
                message: "Flat could not be generated. Reversed Register"
              }
            }
          })
        }else {
          this.user.deleteUser(userPointer)
          console.log(registerUserRes)
          return {
            success: false,
            message: "User could not be registered. Reversed Register!"
          }
        }
      })
    }else{
      console.log("Join isnt set to false!")
    }
  }

  registerUserInExistingFlat() {
    if( this.registerData.join === true){

      // First check if there is a Flat with the given flatCode
    
    const flatCode = this.registerData.flatCode
    this.flat.exists( flatCode ).subscribe( exists => {

      if( exists === true ) {
        const PW =  this.registerData.userData.passwords.PW
        const userName =  this.registerData.userData.names.userName

        this.generateNewUser( flatCode ).subscribe( registerUserRes => {
          if( registerUserRes.success === true) {
            console.log("Registering user in existing Flat", registerUserRes)
            const userPointer = this.crypto.getUserPointer(userName, PW)

            this.flat.linkFlatToUser(flatCode, userPointer).subscribe( linkUserRes => {
              console.log(linkUserRes)
              if( linkUserRes.success === true) {
                this.login(userName, PW)
              }else{
                console.log("An error occured")
              }
            })
          }else{
            console.log(registerUserRes)
          }
        })
      } else {
        console.log("Error: Flat code doesn't match any existing flat")
      }
    })
    }else{
      console.log("Join isn't set to true!")
    }
  }

  getUserData(): UserData{
    const userData = this.registerData.userData;
    return  {
                names:  processNames(userData.names),
                flatCode: this.flatCode
            }
  }
  login(userName, PW) {
    this.auth.login(userName, PW).subscribe( loginRes => {
      if( loginRes.success === true) {
        this.auth.saveData( "userData", loginRes.data.data, PW)
        this.router.navigate([""])
      }else{
        console.log(loginRes)
      }
    })
  }
}

function processNames(names): any{
  let processedNames = {};
  for(let name in names) {
    processedNames[name] = names[name].trim()
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
