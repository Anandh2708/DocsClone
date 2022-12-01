import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsListCardComponent } from './dogs-list-card.component';

describe('DogsListCardComponent', () => {
  let component: DogsListCardComponent;
  let fixture: ComponentFixture<DogsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DogsListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
