import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarangKeluarComponent } from './detail-barang-keluar.component';

describe('DetailBarangKeluarComponent', () => {
  let component: DetailBarangKeluarComponent;
  let fixture: ComponentFixture<DetailBarangKeluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBarangKeluarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailBarangKeluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
