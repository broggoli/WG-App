import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReceiptEntry } from "../models/flat.model"
import { FlatService,
          ReceiptService } from "../_services"

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
  itemCount: FormControl
  itemName: FormControl
  itemPrice: FormControl
  forMates: FormControl

  receiptCategories: string[]
  flatGroups: string[]

  constructor( private flat: FlatService,
                private receipt: ReceiptService ) { 

    this.receiptCategories = this.flat.getReceiptCategories
    this.flatGroups = [
      "Alli",
      "Mich",
      "Katzelüt",
      "MB",
      "KR",
      "FL",
      "LO",
      "LL",
      "AW",
      "NB"
    ]
  }

  ngOnInit() {
    this.defaultDate = yyyymmdd(new Date())
    this.createFormControls();
    this.createForm();
  }
  createFormControls(){
    this.receiptDate = new FormControl(this.defaultDate,
              [ Validators.required
              ])
    this.receiptCategory = new FormControl(this.receiptCategories[0],
              [ Validators.required
              ])
    this.itemCount = new FormControl("1",
              [ Validators.required
              ])
    this.itemName = new FormControl("",
              [ Validators.required
              ])
    this.itemPrice = new FormControl("0",
              [ Validators.required
              ])
    this.forMates = new FormControl(this.flatGroups[0],
    [ Validators.required
    ])
  }
  createForm(){
    this.addReceiptForm = new FormGroup({
      receiptDate: this.receiptDate,
      receiptCategory: this.receiptCategory,
      itemCount: this.itemCount,
      itemName: this.itemName,
      itemPrice: this.itemPrice,
      forMates: this.forMates
    })
  }

  addReceipt() {
    if( this.addReceiptForm.valid === true ) {

      let newEntry: ReceiptEntry
      
      newEntry = {
        date: new Date( this.receiptDate.value ),
        category: this.receiptCategory.value,
        amount: parseInt( this.itemCount.value ),
        item: this.itemName.value,
        price: parseFloat(this.itemPrice.value)
      }

      this.receipt.saveNewEntry( newEntry )
    } else {
      console.log("Error: couldn't add Entry")
    }
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