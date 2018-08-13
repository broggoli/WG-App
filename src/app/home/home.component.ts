import { Component, OnInit } from '@angular/core';
import { UserData } from "../models/user.model"
import { Flat } from "../models/flat.model"
import {  UserService,
          FlatService,
          CryptoService } from '../_services'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData: UserData
  flatData: Flat
  constructor( private user: UserService,
    private crypto: CryptoService,
                private flat: FlatService ) { }

  ngOnInit() {
    console.log("home loaded")
    this.userData = JSON.parse(localStorage.getItem("userData"))
    this.flatData = {
      flatPointer: "",
      name: "",
      residents: [],
      flatCode: ""
    }
    this.flat.getFlatDataOnline( this.userData.flatCode ).subscribe( res => {
      this.flatData = JSON.parse(this.crypto.decryptData(res.data.data, this.userData.flatCode))
    })
  }

  

}
