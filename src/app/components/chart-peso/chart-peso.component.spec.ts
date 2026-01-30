import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPesoComponent } from './chart-peso.component';

describe('ChartPesoComponent', () => {
  let component: ChartPesoComponent;
  let fixture: ComponentFixture<ChartPesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartPesoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
