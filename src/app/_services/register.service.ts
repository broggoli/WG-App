import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CryptoService } from './crypto.service'

interface sendRegisterData {
    success: boolean;
    message: string;
}
interface UserData {
  names: {
    firstName:  string;
    lastName:   string;
    userName:   string;
  },
  passwords: {
    PW:        string;
    confirmPW: string;
  }
}
interface FlatData {
  name: string;
}
interface FlatMateRegister {
  names: {
    firstName:  string;
    lastName:   string;
  }
}

interface RegisterData {
  join: boolean;    // true -> join, false -> create new Flat
  flatCode: string,
  flatCodeHash: string,
  userData: UserData;
  flatData: FlatData;
  flatMates: FlatMateRegister[]
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  // Form Position 
  steps: string[]
  registerData: RegisterData;

  constructor(private crypto: CryptoService,
              private http : HttpClient) {
    
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
    this.steps = ["newOrJoin"]
    //this.steps = ["addFlatMates"]
  }

  enterCode(code: string) {
    // toDo: check whether flatcode exists
    this.registerData.flatCode = code;
    this.registerData.flatCodeHash = this.crypto.hash(code);
  }
/*
  saveNewUser(userDataForDB, password){
        //hashing the name and encrypt with password so it can't easily be read out of the db
    const dbData = JSON.stringify({'dbData': this.crypto.encryptForDB(userDataForDB, password)})
    // post these details to API server return user info if correct
    return this.http.post<sendRegisterData>('/api/php/register.php', dbData)
  }*/

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
  set setUserData(userData: UserData){
    this.registerData.userData = userData

    //redirect
    this.steps.push("addFlatMates") 
  }
  set setFlatMates(flatMates) {
    this.registerData.flatMates = flatMates
  }
  generateNewFlat(mates){
    console.log("mates.... ")
    this.setFlatMates = mates
    console.log(this.registerData)
  }
}
