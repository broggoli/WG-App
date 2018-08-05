import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from "../../_services"

@Component({
  selector: 'app-enter-code',
  templateUrl: './enter-code.component.html',
  styleUrls: ['./enter-code.component.sass']
})
export class EnterCodeComponent implements OnInit {

  flatCodeForm: FormGroup
  flatCode: FormControl

  constructor(private register: RegisterService) { }

  ngOnInit() {
    this.createFormControls()
    this.createForm()
  }

  createFormControls(){
    this.flatCode = new FormControl("",
              [ Validators.required
              ])
  }
  createForm(){
    this.flatCodeForm = new FormGroup({
      flatCode: this.flatCode,
    })
  }
  checkCode(){
    if(this.flatCodeForm.valid ){
      this.register.enterCode(this.flatCode.value)
    }else{
      console.log("Error occured")
    }
  }

}
