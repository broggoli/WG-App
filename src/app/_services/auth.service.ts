import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

interface myData {
    success: boolean,
    message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem("loggedIn") || "false")

  constructor(private http: HttpClient) { }

  setLoggedIn(status: boolean){
      this.loggedInStatus = status
      localStorage.setItem("loggedIn", "true")
  }
  // get acts like a propertyname even thiugh it's a function
  get isLoggedIn(){
    return JSON.parse(localStorage.getItem("loggedIn") || this.loggedInStatus.toString())
  }

  getUserDetails(formData) {
    // post these details to API server return user info if correct
    return this.http.post('/api/auth.php', formData)
  }

}
