import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthlandingpageComponent } from './authlandingpage.component';

describe('AuthlandingpageComponent', () => {
  let component: AuthlandingpageComponent;
  let fixture: ComponentFixture<AuthlandingpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthlandingpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthlandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
