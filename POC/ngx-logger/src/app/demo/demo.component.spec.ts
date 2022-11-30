import { ComponentFixture } from '@angular/core/testing';


import { DemoComponent } from './demo.component';

import { LoggerTestingModule } from "ngx-logger/testing";

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoComponent ],
      imports :[LoggerTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

var TestBed:any;