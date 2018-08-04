import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlatMatesComponent } from './add-flat-mates.component';

describe('AddFlatMatesComponent', () => {
  let component: AddFlatMatesComponent;
  let fixture: ComponentFixture<AddFlatMatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFlatMatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlatMatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
