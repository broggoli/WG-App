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

  // Form Position 
  formPosition: number
  
  // Form groups
  registerForm: FormGroup
  newOrJoin:    FormGroup
  userDetails:  FormGroup
  addFlatMates: FormGroup
  flatDetails:  FormGroup

  joinFlat: FormControl;

  userName: FormGroup
  firstName: FormControl
  lastName: FormControl
  email: FormControl
  passwordInput: FormGroup
  password: FormControl
  repeatPassword: FormControl

  flatName: FormControl

  flatMateName: FormControl

  accessCode: FormControl

  registerError: string = ""

  constructor(private registry: RegisterService,
        private router: Router) { 

  this.createFormControls()
  this.createForm()
  }


  ngOnInit() {
    document.querySelector("#logOutButton").classList.add("loggedOut")
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
  this.flatName = new FormControl("",
            [ Validators.required,
              Validators.pattern("^[-'a-zA-ZÀ-ÖØ-öø-ſ]+$")
            ])
  this.accessCode= new FormControl("",
            [ Validators.required
            ])
  this.email = new FormControl("",
            [ Validators.required
            ])
  this.password = new FormControl("",
            [ Validators.required,
              Validators.minLength(6)
            ])
  this.repeatPassword = new FormControl("",
            [ Validators.required,
              Validators.minLength(6)
            ])
  
  this.flatMateName = new FormControl("",
            [ Validators.required,
              Validators.pattern("^[-'a-zA-ZÀ-ÖØ-öø-ſ]+$")
            ])
  this.joinFlat = new FormControl("",
        [ Validators.required
        ])
  }
  createForm(){
    this.passwordInput = new FormGroup({
      password: this.password,
      repeatPassword: this.repeatPassword
    }, equalValidator)

    this.userDetails = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName
      }),
      email: this.email,
      passwordInput: this.passwordInput
    })
    this.newOrJoin = new FormGroup({
      joinFlat: this.joinFlat
    })
    this.flatDetails = new FormGroup({
      flatname: this.flatName
    })
    this.addFlatMates = new FormGroup({
      flatMateName: this.flatMateName
    })

    this.registerForm = new FormGroup({
      newOrJoin: this.newOrJoin,
      userDetails: this.userDetails,
      addFlatMates: this.addFlatMates,
      flatDetails: this.flatDetails
    })
    
  }

  register(){
    if( this.registerForm.valid )
    {
      /*
    console.log("registring!")
    // this.registerForm.disable()
    this.showLoader(true)
    const password = this.password.value.trim()
    const userData = this.getUserDataObj
    console.log(userData)
    this.registry.saveNewUser(userData, password)
        .subscribe( data => {

            this.showLoader(false)
            console.log(data);
            if(data.success === true){
              // TODO: Output Message
              this.registerForm.reset()
              this.registerError = ""
              alert("Erfolgreich Registriert!");
              // this.registerForm.enable()
              this.showInputsChecked(true)
              setTimeout(() => this.router.navigate([""]), 500)
            }else{
              this.registerError = data.message
              this.showInputsChecked(false)
              // alert("Error: "+data.message);
            }
        })
*/
    }else {
    // TODO: Output Message
    validateAllFormFields(this.registerForm)
    // this.registerForm.enable()
    console.log("Validation failed!");
    }
  }

  /*
  get getUserDataObj(){
    return {
      name: {
              firstName: this.firstName.value.trim(),
              lastName: this.lastName.value.trim()
            },
      email: this.email.value.toLowerCase().trim(),
      abo: this.abo.value.trim(),
      date: {
        startDate: this.startDate.value.trim(),
        endDate: this.endDate.value.trim()
      } 
    }
  }
*/
  showLoader( show: boolean ) {
    showElement( show, ".loadingAnim");
  }
  showInputsChecked( show: boolean ) {
    showElement( show, '.inputsChecked');
  }
}

function showElement( show: boolean, elementClass: string) {
  const element : HTMLElement = document.querySelector(elementClass);
  show ? element.style.display = 'block' :
    element.style.display = 'none';
}

function validateAllFormFields(formGroup: FormGroup) {         //{1}
  Object.keys(formGroup.controls).forEach(field => {  //{2}
    const control = formGroup.get(field);             //{3}
    if (control instanceof FormControl) {             //{4}
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        //{5}
      validateAllFormFields(control);            //{6}
    }
  })
}

function dateValidator(group: FormGroup){
const startDate = Date.parse(group.get('startDate').value)
const endDate = Date.parse(group.get('endDate').value)

// If the starting date is after the ending date, return a validation error
if(endDate && startDate)
{
return endDate > startDate ? null : { endBeforeStart: true }
}
}

function equalValidator(group: FormGroup){
const password = group.get('password').value
const repeatPassword = group.get('repeatPassword').value


// If the first password doesn't match the second, return a validation error
return password === repeatPassword ? null : { mismatch: true }
}
