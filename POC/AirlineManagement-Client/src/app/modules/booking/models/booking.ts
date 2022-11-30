import { Flight } from "../../flight/models/flight";
import { User } from "../../user/models/user";

export interface Booking{
    bookingId:number,
    flight?:Flight,
    flightId:string,
    user?:User,
    userEmail:string,
    numberOfTickets:number,
    totalPrice:number
}