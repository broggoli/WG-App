import { Injectable } from '@angular/core';
import { ReceiptEntry } from "../models/flat.model"

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor() { }

  saveNewEntry(newEntry: ReceiptEntry) {
    console.log(newEntry)
  }
}
