import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedReportSectionItemComponent } from './completed-report-section-item.component';

describe('CompletedReportSectionItemComponent', () => {
  let component: CompletedReportSectionItemComponent;
  let fixture: ComponentFixture<CompletedReportSectionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedReportSectionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedReportSectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
