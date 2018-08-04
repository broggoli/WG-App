import { Component, OnInit, Input } from '@angular/core';
import { RegisterService } from "../../_services"

@Component({
  selector: 'app-new-or-join',
  templateUrl: './new-or-join.component.html',
  styleUrls: ['./new-or-join.component.sass']
})
export class NewOrJoinComponent implements OnInit {

  constructor(private register: RegisterService) { }

  ngOnInit() {
  }

}
