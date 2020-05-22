import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoreuserComponent } from './remoreuser.component';

describe('RemoreuserComponent', () => {
  let component: RemoreuserComponent;
  let fixture: ComponentFixture<RemoreuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoreuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoreuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
