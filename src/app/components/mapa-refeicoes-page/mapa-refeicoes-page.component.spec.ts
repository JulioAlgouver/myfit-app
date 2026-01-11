import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaRefeicoesPageComponent } from './mapa-refeicoes-page.component';

describe('MapaRefeicoesPageComponent', () => {
  let component: MapaRefeicoesPageComponent;
  let fixture: ComponentFixture<MapaRefeicoesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapaRefeicoesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapaRefeicoesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
