import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBarangKeluarComponent } from './input-barang-keluar.component';

describe('InputBarangKeluarComponent', () => {
  let component: InputBarangKeluarComponent;
  let fixture: ComponentFixture<InputBarangKeluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBarangKeluarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputBarangKeluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
