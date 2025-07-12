import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepedentsListComponent } from './depedents-list.component';

describe('DepedentsListComponent', () => {
  let component: DepedentsListComponent;
  let fixture: ComponentFixture<DepedentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepedentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepedentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
