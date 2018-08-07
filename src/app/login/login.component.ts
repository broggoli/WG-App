import { Component, OnInit } from '@angular/core';
import {  Validators,
          FormGroup,
          FormControl } from '@angular/forms';
import { AuthService } from '../_services';
import { Router } from '@angular/router';

interface ZiviDBObj {
  ziviDataHeader: string;
  encryptedZiviData: string;
  expirationDate: number;
}
/*
interface LoginData {
  success: boolean;
  data: ZiviDBObj;
  message: string;
}
*/

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userName: FormControl;
  password: FormControl;
  loginError = '';

  constructor(private auth: AuthService,
              private router: Router) { 
    this.createFormControls();
    this.createForm();
  }

  ngOnInit() {
    // Auto log in from index if data is already safed in localStorage
    if (this.auth.isLoggedIn) {
      this.router.navigate(['home']);
    } else {
      document.querySelector('#logOutButton').classList.add('loggedOut');
    }
  }
  createFormControls() {
    this.userName = new FormControl('',
            [ Validators.required
            ]);
    this.password = new FormControl('',
                [ Validators.required,
                  Validators.minLength(6)
                ]);
  }
  createForm() {
    this.loginForm = new FormGroup({
      userName: this.userName,
      password: this.password
    });
  }
  login() {

    if ( this.loginForm.valid ) {
      this.showLoader(true);
      const userName = this.userName.value,
            password = this.password.value;
      
      this.auth.login(userName, password).subscribe( loginRes => {
        this.showLoader(false);
        if( loginRes.success === true) {
          this.loginError = '';
          this.auth.saveData( "userData", loginRes.data.data, password)
          this.showInputsChecked(true);
          setTimeout(() => this.router.navigate(['home']), 500);
        }else{
          this.showInputsChecked(false);
          console.log(loginRes)
        }
      
      });
    }
  }
  showLoader( show: boolean ) {
    const loadingAnim: HTMLElement = document.querySelector('.loadingAnim');
    show ?  loadingAnim.style.display = 'block' :
            loadingAnim.style.display = 'none';
  }
  showInputsChecked( show: boolean ) {
    const loadingAnim: HTMLElement = document.querySelector('.inputsChecked');
    show ?  loadingAnim.style.display = 'block' :
          loadingAnim.style.display = 'none';
  }
}

