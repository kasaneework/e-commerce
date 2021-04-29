import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSliderComponent } from './sidebar-slider.component';

describe('SidebarSliderComponent', () => {
  let component: SidebarSliderComponent;
  let fixture: ComponentFixture<SidebarSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
