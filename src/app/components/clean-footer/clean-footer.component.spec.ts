import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanFooterComponent } from './clean-footer.component';

describe('CleanFooterComponent', () => {
  let component: CleanFooterComponent;
  let fixture: ComponentFixture<CleanFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CleanFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CleanFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
