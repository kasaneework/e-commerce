import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTagComponent } from './sidebar-tag.component';

describe('SidebarTagComponent', () => {
  let component: SidebarTagComponent;
  let fixture: ComponentFixture<SidebarTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
