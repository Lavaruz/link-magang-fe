import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdditionalsComponent } from './admin-additionals.component';

describe('AdminAdditionalsComponent', () => {
  let component: AdminAdditionalsComponent;
  let fixture: ComponentFixture<AdminAdditionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAdditionalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdditionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
