import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSheetComponent } from './scroll-sheet.component';

describe('ScrollSheetComponent', () => {
  let component: ScrollSheetComponent;
  let fixture: ComponentFixture<ScrollSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
