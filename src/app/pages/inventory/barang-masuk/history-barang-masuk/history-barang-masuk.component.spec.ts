import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBarangMasukComponent } from './history-barang-masuk.component';

describe('HistoryBarangMasukComponent', () => {
  let component: HistoryBarangMasukComponent;
  let fixture: ComponentFixture<HistoryBarangMasukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryBarangMasukComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryBarangMasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
