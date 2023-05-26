import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloggedAreaComponent } from './unlogged-area.component';

describe('UnloggedAreaComponent', () => {
  let component: UnloggedAreaComponent;
  let fixture: ComponentFixture<UnloggedAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnloggedAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnloggedAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
