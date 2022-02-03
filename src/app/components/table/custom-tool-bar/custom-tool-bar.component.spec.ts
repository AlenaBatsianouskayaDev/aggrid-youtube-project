import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomToolBarComponent } from './custom-tool-bar.component';

describe('CustomToolBarComponent', () => {
  let component: CustomToolBarComponent;
  let fixture: ComponentFixture<CustomToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomToolBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
