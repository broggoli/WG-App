import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { UserData } from "../models/user.model"

interface userData {
  surname: string,
  prename: string,
  email: string
}
interface enryptedData {
  pointer: string,
  encryptedData: string
}

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encryptForDB(data: any, password: string): enryptedData {
    return {
      pointer: this.getUserPointer(data.names.userName, password),
      encryptedData: this.encryptData(data, password)
    }
  }
  //returns the name concatonated with the password as a sha256 hash
  getUserPointer(userName: string, password: string): string {
    console.log(userName, password, this.hash(userName + password))
    return this.hash(userName + password)
  }

  // Gets an encrypted String that is returned as a parsed Object
  decryptData(encryptedData: string, password: string): string {
    return crypto.AES.decrypt(encryptedData, password)
      .toString(crypto.enc.Utf8)
  };

  // Gets an object that is being stringyfied then encrypted
  //using the password
  encryptData(data: any, password: string): string {
    return crypto.AES.encrypt(JSON.stringify(data), password)
      .toString()
  };

  hash(str: string): string {
    console.log( str, crypto.SHA256(str).toString())
    return crypto.SHA256(str).toString()
  }
}
