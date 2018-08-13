import { Component, OnInit, } from '@angular/core';
import { RegisterService } from "../_services"
import {  FormControl, 
          FormGroup, 
          Validators } from '@angular/forms';
import { FlatMateRegister } from '../models/register.model';

@Component({
  selector: 'app-add-flat-mates',
  templateUrl: './add-flat-mates.component.html',
  styleUrls: ['./add-flat-mates.component.sass']
})
export class AddFlatMatesComponent implements OnInit {
  
  addFlatMatesForm: FormGroup
  mateFirstName: FormControl
  mateLastName: FormControl
  flatMates: FlatMateRegister[]

  constructor(public register: RegisterService) { }

  ngOnInit() {
    this.createFormControls()
    this.createForm()
    this.flatMates = this.register.registerData.flatMates
  }
  
  createFormControls(){
    this.mateFirstName = new FormControl("",
              [ Validators.minLength(1)
              ])
    this.mateLastName = new FormControl("")
  }
  createForm(){
    this.addFlatMatesForm = new FormGroup({
      mateFirstName: this.mateFirstName,
      mateLastName: this.mateLastName
    })
  }
  
  deleteFlatMate(mate){
    var index = this.flatMates.indexOf(mate);
    if (index > -1) {
      this.flatMates.splice(index, 1);
      this.register.setFlatMates = this.flatMates
    }
  }
  addFlatMate() {
    if(this.addFlatMatesForm.valid)
    {
      this.flatMates.push(
      {
        names: {
            firstName: this.mateFirstName.value,
            lastName: this.mateLastName.value,
          }
      })
      this.register.setFlatMates = this.flatMates
      this.addFlatMatesForm.reset()
    }else{
      console.log("an error occured")
    }
  }
}
