import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDetalheRefeicoesComponent } from './chart-detalhe-refeicoes.component';

describe('ChartDetalheRefeicoesComponent', () => {
  let component: ChartDetalheRefeicoesComponent;
  let fixture: ComponentFixture<ChartDetalheRefeicoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartDetalheRefeicoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartDetalheRefeicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
