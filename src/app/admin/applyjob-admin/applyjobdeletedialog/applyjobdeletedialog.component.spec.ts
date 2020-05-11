import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyjobdeletedialogComponent } from './applyjobdeletedialog.component';

describe('ApplyjobdeletedialogComponent', () => {
  let component: ApplyjobdeletedialogComponent;
  let fixture: ComponentFixture<ApplyjobdeletedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyjobdeletedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyjobdeletedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
