import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOutStokOpnameComponent } from './print-out-stok-opname.component';

describe('PrintOutStokOpnameComponent', () => {
  let component: PrintOutStokOpnameComponent;
  let fixture: ComponentFixture<PrintOutStokOpnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintOutStokOpnameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintOutStokOpnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
