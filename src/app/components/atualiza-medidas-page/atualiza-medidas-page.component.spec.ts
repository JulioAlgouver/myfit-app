import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizaMedidasPageComponent } from './atualiza-medidas-page.component';

describe('AtualizaMedidasPageComponent', () => {
  let component: AtualizaMedidasPageComponent;
  let fixture: ComponentFixture<AtualizaMedidasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtualizaMedidasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtualizaMedidasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
