import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { CryptoService } from './crypto.service'
import { Flat } from "../modules/flat.module"

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  flatCodeLength: number

  constructor(private crypto: CryptoService,
              private http: HttpClient) { 
      this.flatCodeLength = 6
    }

  linkFlatToUser(flatCode: string, userPointer: string) {
    console.log(userPointer, flatCode)
  }

  saveNewFlat(flatData){
    let newFlat: Flat
    newFlat = {
      flatPointer : this.generateFlatCode(),
      name : flatData.name,
      mates : []
    }
    //hashing the name and encrypt with password so it can't easily be read out of the db
    const dbData = {
      pointer: newFlat.flatPointer,
      encryptedData: this.crypto.encryptData(newFlat, newFlat.flatPointer)
  }
    const postData = {
      data: dbData,
      task: "saveNewFlat"
    }
    console.log(newFlat)
    // post these details to API server return
    return this.http.post<Response>('/api/php/register.php', JSON.stringify(postData))
  }

  generateFlatCode(){
    var code = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÄÖÜäöü!£&%{}";
  
    for (var i = 0; i < this.flatCodeLength; i++)
      code += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return code;
  }
}
