import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMedidasComponent } from './chart-medidas.component';

describe('ChartMedidasComponent', () => {
  let component: ChartMedidasComponent;
  let fixture: ComponentFixture<ChartMedidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartMedidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartMedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
