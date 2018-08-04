import { Component, OnInit, } from '@angular/core';
import { RegisterService } from "../../_services"
import {  FormControl, 
          FormGroup, 
          Validators } from '@angular/forms';

interface Mate {
  firstName: string,
  lastName: string
}

@Component({
  selector: 'app-add-flat-mates',
  templateUrl: './add-flat-mates.component.html',
  styleUrls: ['./add-flat-mates.component.sass']
})
export class AddFlatMatesComponent implements OnInit {
  
  addFlatMatesForm: FormGroup
  mateFirstName: FormControl
  mateLastName: FormControl
  flatMates: Mate[]

  constructor(private register: RegisterService) { }

  ngOnInit() {
    this.createFormControls()
    this.createForm()
    this.flatMates = []
  }
  
  createFormControls(){
    this.mateFirstName = new FormControl("",
              [ Validators.required
              ])
    this.mateLastName = new FormControl("",
              [ Validators.required
              ])
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
    }
  }
  addFlatMate() {
    if(this.addFlatMatesForm.valid)
    {
      this.flatMates.push({
        firstName: this.mateFirstName.value,
        lastName: this.mateLastName.value,
      })
    }else{
      console.log("an error occured")
    }
  }
}
