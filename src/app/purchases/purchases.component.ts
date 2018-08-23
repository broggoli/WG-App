import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReceiptEntry } from "../models/flat.model"

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  defaultDate: string

  addReceiptForm: FormGroup
  receiptDate: FormControl
  constructor() { }

  ngOnInit() {
  }

}
