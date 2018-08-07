import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { CryptoService } from './crypto.service'
import { UserData } from "../models/user.model"

interface Response {
    message: string,
    success: boolean,
    data: any
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

  
  deleteUser(userPointer: string) {
    const postData = {
      data: {
        poiner: userPointer
      },
      task: "deleteUser"
    }
    return this.http.post<Response>('/api/php/auth.php', JSON.stringify(postData))
  }
  saveNewUser(userData: UserData, password: string){
    console.log(userData)
    //hashing the name and encrypt with password so it can't easily be read out of the db
    const dbData = this.crypto.encryptForDB(userData, password)
    const postData = {
      data: dbData,
      task: "registerUser"
    }
    console.log(userData, dbData)
    // post these details to API server return
    return this.http.post<Response>('/api/php/auth.php', JSON.stringify(postData))
  }
  getUserPointer(username: string, password: string) {
    return this.crypto.getUserPointer(username, password)
  }

  logout() {
    return this.http.get<logoutStatus>("/api/php/logout.php")
  }

}
