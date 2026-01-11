import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPesoPageComponent } from './detalhes-peso-page.component';

describe('DetalhesPesoPageComponent', () => {
  let component: DetalhesPesoPageComponent;
  let fixture: ComponentFixture<DetalhesPesoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalhesPesoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesPesoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
