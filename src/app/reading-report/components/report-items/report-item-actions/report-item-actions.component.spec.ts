import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportItemActionsComponent } from './report-item-actions.component';

describe('ReportItemActionsComponent', () => {
  let component: ReportItemActionsComponent;
  let fixture: ComponentFixture<ReportItemActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportItemActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportItemActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
