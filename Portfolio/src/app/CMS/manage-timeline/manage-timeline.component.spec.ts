import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTimelineComponent } from './manage-timeline.component';

describe('ManageTimelineComponent', () => {
  let component: ManageTimelineComponent;
  let fixture: ComponentFixture<ManageTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
