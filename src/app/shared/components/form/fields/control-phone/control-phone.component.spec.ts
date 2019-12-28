import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPhoneComponent } from './control-phone.component';

describe('ControlPhoneComponent', () => {
  let component: ControlPhoneComponent;
  let fixture: ComponentFixture<ControlPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
