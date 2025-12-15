import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AguaPageComponent } from './agua-page.component';

describe('AguaPageComponent', () => {
  let component: AguaPageComponent;
  let fixture: ComponentFixture<AguaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AguaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AguaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
