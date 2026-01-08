import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizaPesoPageComponent } from './atualiza-peso-page.component';

describe('AtualizaPesoPageComponent', () => {
  let component: AtualizaPesoPageComponent;
  let fixture: ComponentFixture<AtualizaPesoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtualizaPesoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtualizaPesoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
