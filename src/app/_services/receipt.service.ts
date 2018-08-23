import { Injectable } from '@angular/core';
import { ReceiptEntry } from "../models/flat.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor( private http: HttpClient ) { }

  saveNewEntry(newEntry: ReceiptEntry) {
    console.log(newEntry)
  }
  getPurchases( month: string ) {

    const postData = {
      task: "getPurchases",
      data: month
    }
    this.http.post("/api/php/auth.php", JSON.stringify(postData))
  }
}
