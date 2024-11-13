import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBarangMasukComponent } from './input-barang-masuk.component';

describe('InputBarangMasukComponent', () => {
  let component: InputBarangMasukComponent;
  let fixture: ComponentFixture<InputBarangMasukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBarangMasukComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputBarangMasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
