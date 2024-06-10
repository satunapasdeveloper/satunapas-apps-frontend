import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendaftaranPasienBaruComponent } from './pendaftaran-pasien-baru.component';

describe('PendaftaranPasienBaruComponent', () => {
  let component: PendaftaranPasienBaruComponent;
  let fixture: ComponentFixture<PendaftaranPasienBaruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PendaftaranPasienBaruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendaftaranPasienBaruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
