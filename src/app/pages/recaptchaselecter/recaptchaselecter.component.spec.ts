import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaptchaselecterComponent } from './recaptchaselecter.component';

describe('RecaptchaselecterComponent', () => {
  let component: RecaptchaselecterComponent;
  let fixture: ComponentFixture<RecaptchaselecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecaptchaselecterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecaptchaselecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
