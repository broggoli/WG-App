import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CryptoService } from './crypto.service'
import { UserData } from '../models/user.model'
import { Observable, of } from "rxjs"
import { map } from 'rxjs/operators';

interface Response {
  success: boolean,
  message: string,
  data: any
}

interface LoginStatus {
  local: boolean,
  online: Observable<boolean>
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private crypto: CryptoService,
    private http: HttpClient) { }

  saveData( whatToSave: string, data: string, key: string){
    const decryptedData: UserData = JSON.parse(this.crypto.decryptData(data, key))
    localStorage.setItem(whatToSave, JSON.stringify(decryptedData))
    console.log(localStorage.getItem(whatToSave))
  }
  /// get acts like a property name even though it's a function
  get isLoggedIn(): LoginStatus {
    if( localStorage.getItem("userData") !== null ){
      console.log(localStorage.getItem("userData"))
      return {  
                local: true,
                online: this.http.post<Response>('/api/php/auth.php', JSON.stringify({task: 'isLoggedIn'})).pipe(map( res => {
                    if( res.success === true ) {
                      if( JSON.parse(res.data) === true ) {
                        return true
                      }else {
                        return false
                      }
                    }
                }))
            }
    }else{
      return {  
          local: false,
          online: of(false)
        }
    }
  }

  login(userName: string, password: string) {
    const pointer = JSON.stringify({
      data:
      {
        'pointer': this.crypto.getUserPointer(userName, password)
      },
      task: "login"
    })
    // post these details to API server return user info if correct
    return this.http.post<Response>('/api/php/auth.php', pointer)
  }

}
