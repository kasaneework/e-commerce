import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBrandsComponent } from './sidebar-brands.component';

describe('SidebarBrandsComponent', () => {
  let component: SidebarBrandsComponent;
  let fixture: ComponentFixture<SidebarBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
