import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatRegisterComponent } from './flat-register.component';

describe('FlatRegisterComponent', () => {
  let component: FlatRegisterComponent;
  let fixture: ComponentFixture<FlatRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
