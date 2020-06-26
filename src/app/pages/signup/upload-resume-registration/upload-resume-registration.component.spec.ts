import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResumeRegistrationComponent } from './upload-resume-registration.component';

describe('UploadResumeRegistrationComponent', () => {
  let component: UploadResumeRegistrationComponent;
  let fixture: ComponentFixture<UploadResumeRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadResumeRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadResumeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
