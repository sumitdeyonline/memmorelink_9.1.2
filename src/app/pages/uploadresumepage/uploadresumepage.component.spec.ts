import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadresumepageComponent } from './uploadresumepage.component';

describe('UploadresumepageComponent', () => {
  let component: UploadresumepageComponent;
  let fixture: ComponentFixture<UploadresumepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadresumepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadresumepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
