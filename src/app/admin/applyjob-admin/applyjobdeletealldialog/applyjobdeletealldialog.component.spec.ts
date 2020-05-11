import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyjobdeletealldialogComponent } from './applyjobdeletealldialog.component';

describe('ApplyjobdeletealldialogComponent', () => {
  let component: ApplyjobdeletealldialogComponent;
  let fixture: ComponentFixture<ApplyjobdeletealldialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyjobdeletealldialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyjobdeletealldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
