import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteActivityComponent } from './vote-activity.component';

describe('VoteActivityComponent', () => {
  let component: VoteActivityComponent;
  let fixture: ComponentFixture<VoteActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoteActivityComponent]
    });
    fixture = TestBed.createComponent(VoteActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
