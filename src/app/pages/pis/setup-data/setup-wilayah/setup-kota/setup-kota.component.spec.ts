import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupKotaComponent } from './setup-kota.component';

describe('SetupKotaComponent', () => {
  let component: SetupKotaComponent;
  let fixture: ComponentFixture<SetupKotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SetupKotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupKotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
