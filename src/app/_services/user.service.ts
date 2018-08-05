import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { CryptoService } from './crypto.service'
import { UserData } from "../modules/user.module"

interface Response {
    message: string,
    success: boolean
}
interface logoutStatus{
    success: boolean
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private crypto: CryptoService,
              private http: HttpClient) { }

  getSomeData() {
      return this.http.get<Response>("/api/database.php")
  }

  
  
  saveNewUser(userData: UserData, password: string){
    console.log(userData)
    //hashing the name and encrypt with password so it can't easily be read out of the db
    const dbData = {
      pointer: userData.pointer,
      encryptedData: this.crypto.encryptData(userData, password)
  }
    const postData = {
      data: dbData,
      task: "saveNewUser"
    }
    // post these details to API server return
    return this.http.post<Response>('/api/php/register.php', JSON.stringify(postData))
  }
  getUserPointer(username: string, password: string) {
    return this.crypto.getUserPointer(username, password)
  }

  logout() {
    return this.http.get<logoutStatus>("/api/logout.php")
  }

}
