import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HitCFComponent } from './hit-cf.component';

describe('HitCFComponent', () => {
  let component: HitCFComponent;
  let fixture: ComponentFixture<HitCFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitCFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HitCFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
