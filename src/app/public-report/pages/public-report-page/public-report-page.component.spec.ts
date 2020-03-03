import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReportPageComponent } from './public-report-page.component';

describe('PublicReportPageComponent', () => {
  let component: PublicReportPageComponent;
  let fixture: ComponentFixture<PublicReportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicReportPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
