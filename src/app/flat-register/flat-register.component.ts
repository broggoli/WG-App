import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../_services"

@Component({
  selector: 'app-flat-register',
  templateUrl: './flat-register.component.html',
  styleUrls: ['./flat-register.component.sass']
})
export class FlatRegisterComponent implements OnInit {

  flatDetailsForm: FormGroup
  flatName: FormControl

  constructor(public register: RegisterService) { }

  ngOnInit() {
    this.createFormControls()
    this.createForm()
  }
  createFormControls(){
    this.flatName = new FormControl(this.register.registerData.flatData.name,
              [ Validators.required
              ])
  }
  createForm(){
    this.flatDetailsForm = new FormGroup({
      flatName: this.flatName
    })
  }
  
}
