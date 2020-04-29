import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpredictionComponent } from './jobprediction.component';

describe('JobpredictionComponent', () => {
  let component: JobpredictionComponent;
  let fixture: ComponentFixture<JobpredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobpredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobpredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
