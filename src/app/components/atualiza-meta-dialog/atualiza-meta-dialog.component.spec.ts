import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizaMetaDialogComponent } from './atualiza-meta-dialog.component';

describe('AtualizaMetaDialogComponent', () => {
  let component: AtualizaMetaDialogComponent;
  let fixture: ComponentFixture<AtualizaMetaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtualizaMetaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtualizaMetaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
