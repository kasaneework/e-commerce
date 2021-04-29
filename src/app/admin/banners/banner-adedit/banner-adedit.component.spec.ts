import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAdeditComponent } from './banner-adedit.component';

describe('BannerAdeditComponent', () => {
  let component: BannerAdeditComponent;
  let fixture: ComponentFixture<BannerAdeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerAdeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerAdeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
