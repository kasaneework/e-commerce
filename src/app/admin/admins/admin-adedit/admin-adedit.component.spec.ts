import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdeditComponent } from './admin-adedit.component';

describe('AdminAdeditComponent', () => {
  let component: AdminAdeditComponent;
  let fixture: ComponentFixture<AdminAdeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
