import {  Component,
          OnInit} from '@angular/core'
import {  Validators,
          FormGroup,
          FormControl } from '@angular/forms'
import { RegisterService } from "../_services"
import { Router } from "@angular/router"

@Component({
selector: 'app-register',
templateUrl: './register.component.html',
styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private register: RegisterService,
            private router: Router) { 
  }
  ngOnInit() {
    document.querySelector("#logOutButton").classList.add("loggedOut")
  }
}