import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPesoPageComponent } from './meu-peso-page.component';

describe('MeuPesoPageComponent', () => {
  let component: MeuPesoPageComponent;
  let fixture: ComponentFixture<MeuPesoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeuPesoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeuPesoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
