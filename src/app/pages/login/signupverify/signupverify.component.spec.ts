import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupverifyComponent } from './signupverify.component';

describe('SignupverifyComponent', () => {
  let component: SignupverifyComponent;
  let fixture: ComponentFixture<SignupverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
