import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryStokOpnameComponent } from './history-stok-opname.component';

describe('HistoryStokOpnameComponent', () => {
  let component: HistoryStokOpnameComponent;
  let fixture: ComponentFixture<HistoryStokOpnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryStokOpnameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryStokOpnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
