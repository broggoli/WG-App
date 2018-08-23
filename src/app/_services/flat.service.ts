import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { CryptoService } from './crypto.service'
import { Flat } from "../models/flat.model"
import { FlatData } from '../models/register.model';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  
  get getReceiptCategories(): string[] {
    return [
      "Grundnahrungsmittel",
      "Haushalt",
      "Katzen",
      "Internet",
      "Gemüseabo"
    ]
  }
  linkFlatToUser(flatCode: string, userPointer: string): Observable<Response> {

    return this.update( this.crypto.hash(flatCode), this.getFlatDataOnline(flatCode).pipe(map( res => {
      let flatData: Flat = JSON.parse(this.crypto.decryptData(res.data.data, flatCode))
      if( flatData.residents.indexOf( userPointer ) === -1) {
        flatData.residents.push(userPointer) 
      }else {
        console.log("error: this user already exists!")
      }
      return flatData
    }))
    )
  }

  exists( flatCode: string): Observable<boolean>{
    return this.getFlatDataOnline(flatCode).pipe(map( flatDataRes => {
      return flatDataRes.success
    }))
  }

  update( pointer: string, updatedData: Observable<Flat>): Observable<Response> {

    //hashing the name and encrypt with password so it can't easily be read out of the db
    return updatedData.pipe(switchMap( newData => {
      const dbData = {
        pointer,
        encryptedData: this.crypto.encryptData(newData, newData.flatCode)
      }
      const postData = {
        data: dbData,
        task: "updateFlat"
      }
      console.log(JSON.stringify(postData), updatedData)

    // post these details to API server return
    return this.http.post<Response>('/api/php/auth.php', JSON.stringify(postData))
    }))
  }
  saveNewFlat( flatData: FlatData, firstResident: string, flatCode: string ){
    // firstResident is the pointer to the user who is generating this flat
    const newFlat: Flat = {
      flatPointer : this.crypto.hash(flatCode),
      name : flatData.name,
      residents : [firstResident],
      flatCode,
      receiptData: {
        receiptDBPointer: "",
        receiptCategories: [],
        receipts: []
      }
    }
    
    //hashing the name and encrypt with password so it can't easily be read out of the db
    const dbData = {
      pointer: newFlat.flatPointer,
      encryptedData: this.crypto.encryptData(newFlat, newFlat.flatCode)
  }
    const postData = {
      data: dbData,
      task: "registerFlat"
    }
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
