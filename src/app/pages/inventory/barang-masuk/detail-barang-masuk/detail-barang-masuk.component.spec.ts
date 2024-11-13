import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarangMasukComponent } from './detail-barang-masuk.component';

describe('DetailBarangMasukComponent', () => {
  let component: DetailBarangMasukComponent;
  let fixture: ComponentFixture<DetailBarangMasukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBarangMasukComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailBarangMasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
