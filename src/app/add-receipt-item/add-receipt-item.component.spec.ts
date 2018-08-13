import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiptItemComponent } from './add-receipt-item.component';

describe('AddReceiptItemComponent', () => {
  let component: AddReceiptItemComponent;
  let fixture: ComponentFixture<AddReceiptItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReceiptItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReceiptItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
