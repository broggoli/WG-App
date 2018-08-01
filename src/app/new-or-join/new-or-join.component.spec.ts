import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrJoinComponent } from './new-or-join.component';

describe('NewOrJoinComponent', () => {
  let component: NewOrJoinComponent;
  let fixture: ComponentFixture<NewOrJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
