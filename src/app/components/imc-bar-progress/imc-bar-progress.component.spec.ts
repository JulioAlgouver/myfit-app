import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImcBarProgressComponent } from './imc-bar-progress.component';

describe('ImcBarProgressComponent', () => {
  let component: ImcBarProgressComponent;
  let fixture: ComponentFixture<ImcBarProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImcBarProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImcBarProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
