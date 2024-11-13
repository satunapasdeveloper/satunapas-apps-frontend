import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBarangKeluarComponent } from './history-barang-keluar.component';

describe('HistoryBarangKeluarComponent', () => {
  let component: HistoryBarangKeluarComponent;
  let fixture: ComponentFixture<HistoryBarangKeluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryBarangKeluarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryBarangKeluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
