import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdeditComponent } from './product-adedit.component';

describe('ProductAdeditComponent', () => {
  let component: ProductAdeditComponent;
  let fixture: ComponentFixture<ProductAdeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAdeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
