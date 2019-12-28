import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingReportPageComponent } from './reading-report-page.component';

describe('ReadingReportPageComponent', () => {
  let component: ReadingReportPageComponent;
  let fixture: ComponentFixture<ReadingReportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingReportPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
