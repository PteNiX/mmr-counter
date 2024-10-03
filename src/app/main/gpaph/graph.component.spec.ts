import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaphComponent } from './graph.component';

describe('GpaphComponent', () => {
  let component: GpaphComponent;
  let fixture: ComponentFixture<GpaphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpaphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpaphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
