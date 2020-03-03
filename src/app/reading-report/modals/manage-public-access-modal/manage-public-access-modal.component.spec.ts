import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublicAccessModalComponent } from './manage-public-access-modal.component';

describe('ManagePublicAccessModalComponent', () => {
  let component: ManagePublicAccessModalComponent;
  let fixture: ComponentFixture<ManagePublicAccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePublicAccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePublicAccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
