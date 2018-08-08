import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { CryptoService } from './crypto.service'
import { Flat } from "../models/flat.model"
import { FlatData } from '../models/register.model';

interface Response {
  message: string,
  success: boolean,
  data: any
}
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

  saveNewFlat( flatData: FlatData, firstResident: string, flatCode: string ){
    // firstResident is the pointer to the user who is generating this flat
    const newFlat: Flat = {
      flatPointer : this.crypto.hash(flatCode),
      name : flatData.name,
      residents : [firstResident],
      flatCode
    }
    console.log(this.crypto.hash(flatCode))
    //hashing the name and encrypt with password so it can't easily be read out of the db
    const dbData = {
      pointer: newFlat.flatPointer,
      encryptedData: this.crypto.encryptData(newFlat, newFlat.flatPointer)
  }
    const postData = {
      data: dbData,
      task: "registerFlat"
    }
    console.log(newFlat, dbData)
    // post these details to API server return
    return this.http.post<Response>('/api/php/auth.php', JSON.stringify(postData))
  }

  getFlatDataOnline( flatCode ) {
    const flatPointer = this.crypto.hash(flatCode)
    const postData = {
      data: {
        pointer: flatPointer
      },
      task: "getFlatData"
    }
    console.log(flatPointer,flatCode)
    return this.http.post<Response>('/api/php/auth.php', JSON.stringify(postData))
  }
  generateFlatCode(){
    var code = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÄÖÜäöü!£&%{}";
  
    for (var i = 0; i < this.flatCodeLength; i++)
      code += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return code;
  }
}
