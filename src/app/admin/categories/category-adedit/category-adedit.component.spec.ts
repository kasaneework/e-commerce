import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAdeditComponent } from './category-adedit.component';

describe('CategoryAdeditComponent', () => {
  let component: CategoryAdeditComponent;
  let fixture: ComponentFixture<CategoryAdeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAdeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAdeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
