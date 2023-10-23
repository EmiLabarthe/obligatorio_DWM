import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestWaitComponent } from './guest-wait.component';

describe('GuestWaitComponent', () => {
  let component: GuestWaitComponent;
  let fixture: ComponentFixture<GuestWaitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestWaitComponent]
    });
    fixture = TestBed.createComponent(GuestWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
