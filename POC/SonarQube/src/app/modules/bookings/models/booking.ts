
import { Movie } from "../../movies/models/Movie";
import { User } from "../../users/models/user";





export interface BookingInfo

{

    

    movieId:string;

    userEmail:string;

    seatsBooked:number;

    totalAmount:number;

}



export interface Booking extends BookingInfo

{

    id:number;

    movie:Movie;

    user:User;

}