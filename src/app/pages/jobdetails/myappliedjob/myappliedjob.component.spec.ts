import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyappliedjobComponent } from './myappliedjob.component';

describe('MyappliedjobComponent', () => {
  let component: MyappliedjobComponent;
  let fixture: ComponentFixture<MyappliedjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyappliedjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyappliedjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
