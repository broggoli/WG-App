import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService) { }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault()
    const target = event.target
    //getting the text out of the form
    const username = target.querySelector("#username").value
    const password = target.querySelector("#password").value

    this.Auth.getUserDetails(username, password)
    console.log(username, password)
  }

}
