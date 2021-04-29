import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCatComponent } from './sidebar-cat.component';

describe('SidebarCatComponent', () => {
  let component: SidebarCatComponent;
  let fixture: ComponentFixture<SidebarCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
