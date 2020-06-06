import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantappliedComponent } from './applicantapplied.component';

describe('ApplicantappliedComponent', () => {
  let component: ApplicantappliedComponent;
  let fixture: ComponentFixture<ApplicantappliedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantappliedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantappliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
