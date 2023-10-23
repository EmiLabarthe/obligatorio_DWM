import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGuestNicknameComponent } from './select-guest-nickname.component';

describe('SelectGuestNicknameComponent', () => {
  let component: SelectGuestNicknameComponent;
  let fixture: ComponentFixture<SelectGuestNicknameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectGuestNicknameComponent]
    });
    fixture = TestBed.createComponent(SelectGuestNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
