import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaImcComponent } from './tabela-imc.component';

describe('TabelaImcComponent', () => {
  let component: TabelaImcComponent;
  let fixture: ComponentFixture<TabelaImcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaImcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaImcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
