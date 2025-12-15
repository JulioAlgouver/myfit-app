import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefeicoesPageComponent } from './refeicoes-page.component';

describe('RefeicoesPageComponent', () => {
  let component: RefeicoesPageComponent;
  let fixture: ComponentFixture<RefeicoesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefeicoesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefeicoesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
