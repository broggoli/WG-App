import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from "../../_services"

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  userRegisterForm: FormGroup
  names: FormGroup
  firstName: FormControl
  lastName: FormControl
  userName: FormControl
  passwords: FormGroup
  PW: FormControl
  confirmPW: FormControl
  
  constructor(private register: RegisterService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(){
    this.firstName = new FormControl("",
              [ Validators.required,
                Validators.pattern("^[-'a-zA-ZÀ-ÖØ-öø-ſ]+$")
              ])
    this.lastName = new FormControl("",
              [ Validators.required,
                Validators.pattern("^[-'a-zA-ZÀ-ÖØ-öø-ſ]+$")
              ])
    this.userName = new FormControl("",
              [ Validators.required,
                Validators.pattern("^[-'a-zA-ZÀ-ÖØ-öø-ſ]+$")
              ])
    this.PW = new FormControl("",
              [ Validators.required,
                Validators.minLength(6)
              ])
    this.confirmPW = new FormControl("",
              [ Validators.required,
                Validators.minLength(6)
              ])
    }
  createForm(){
    this.passwords = new FormGroup({
      PW: this.PW,
      confirmPW: this.confirmPW
    }, equalValidator)

    this.names = new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName
    })

    this.userRegisterForm = new FormGroup({
      passwords: this.passwords,
      names: this.names
    })
    
  }
  
  sendUserData() {
    if( this.userRegisterForm.valid) { 
      this.register.setUserData = this.userRegisterForm.value 
    }else{
      console.log("Data not valid")
    }
  }
}

function equalValidator(group: FormGroup){
  const password = group.get('PW').value
  const repeatPassword = group.get('confirmPW').value

  // If the first password doesn't match the second, return a validation error
  return password === repeatPassword ? null : { mismatch: true }
}
