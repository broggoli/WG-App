import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services';
import { Router } from "@angular/router"

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault()
    const target = event.target
    //getting the text out of the form
    const username = target.querySelector("#username").value
    const password = target.querySelector("#password").value

    /* Tryes to get the user's data from the backend */
    this.Auth.getUserDetails(username, password).subscribe(data => {
        if(data.success){
            //if the backend says everything is ok -> redirect to user's page
            this.router.navigate(["admin"])
            this.Auth.setLoggedIn(true)
        }else{
            console.log(data.message)
        }
    })
    console.log(username, password)
  }

}
