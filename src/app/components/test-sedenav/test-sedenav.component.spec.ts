import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSedenavComponent } from './test-sedenav.component';

describe('TestSedenavComponent', () => {
  let component: TestSedenavComponent;
  let fixture: ComponentFixture<TestSedenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSedenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSedenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
