import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavejobdetailsComponent } from './savejobdetails.component';

describe('SavejobdetailsComponent', () => {
  let component: SavejobdetailsComponent;
  let fixture: ComponentFixture<SavejobdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavejobdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavejobdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
