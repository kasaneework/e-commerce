import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdeditComponent } from './user-adedit.component';

describe('UserAdeditComponent', () => {
  let component: UserAdeditComponent;
  let fixture: ComponentFixture<UserAdeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAdeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
