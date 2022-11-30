import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpUserService } from "../../../users/services/http-user-service";
import { HttpBookingService } from "../../services/http-booking-service";
import { BookingListComponent } from "./booking-list.component";

describe('BookingListComponent', () => {
    let component: BookingListComponent;
    let fixture: ComponentFixture<BookingListComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ BookingListComponent ],
        imports:[
         HttpClientModule
        ],
        providers:[
      {provide:"UserService",useClass:HttpUserService},
    {provide:"BookingService",useClass:HttpBookingService}]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(BookingListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
      });
       it('should set handleCancel to be false', () => {
        component.showCancelDialog=true;
        component.handleCancel(false)
        expect(component.showCancelDialog).toBeFalse();
      });
    });