import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSubmitButtonComponent } from './custom-submit-button.component';

describe('CustomSubmitButtonComponent', () => {
  let component: CustomSubmitButtonComponent;
  let fixture: ComponentFixture<CustomSubmitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSubmitButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
