import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilelistingsComponent } from './filelistings.component';

describe('FilelistingsComponent', () => {
  let component: FilelistingsComponent;
  let fixture: ComponentFixture<FilelistingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilelistingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilelistingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
