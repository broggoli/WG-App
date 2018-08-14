import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-receipt-item',
  templateUrl: './add-receipt-item.component.html',
  styleUrls: ['./add-receipt-item.component.sass']
})
export class AddReceiptItemComponent implements OnInit {

  defaultDate: string

  addReceiptForm: FormGroup
  receiptDate: FormControl
  receiptCategory: FormControl
  itemName: FormControl
  itemPrice: FormControl

  categories: string[]

  constructor() { 
    this.defaultDate = yyyymmdd(new Date())
    this.categories = [
      "Grundnahrungsmittel",
      "Haushalt",
      "Katzen",
      "Internet",
      "Gemüseabo"
    ]
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  createFormControls(){
    this.receiptDate = new FormControl(this.defaultDate,
              [ Validators.required
              ])
    this.receiptCategory = new FormControl(this.categories[0],
              [ Validators.required
              ])
    this.itemName = new FormControl("",
              [ Validators.required
              ])
    this.itemPrice = new FormControl("",
              [ Validators.required,
                Validators.pattern("/^\d+\.\d{0,2}$/")
              ])
    }
  createForm(){
    this.addReceiptForm = new FormGroup({
      receiptDate: this.receiptDate,
      receiptCategory: this.receiptCategory,
      itemName: this.itemName,
      itemPrice: this.itemPrice
    })
  }
  addReceipt() {
    console.log("asd")
  }
}
function yyyymmdd(date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [date.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};