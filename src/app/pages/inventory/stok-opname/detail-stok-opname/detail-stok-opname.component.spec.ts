import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStokOpnameComponent } from './detail-stok-opname.component';

describe('DetailStokOpnameComponent', () => {
  let component: DetailStokOpnameComponent;
  let fixture: ComponentFixture<DetailStokOpnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailStokOpnameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailStokOpnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
