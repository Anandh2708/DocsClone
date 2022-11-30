import { Booking } from "../app/modules/booking/models/booking";
import { Flight } from "../app/modules/flight/models/flight";
import { LoggedInDetails, LoginInfo, User } from "../app/modules/user/models/user";

 
export const dummyBookings : Booking[] = [
    {
        "bookingId": 4002,
        "flight": {
            "id": "AS303",
            "boarding": "Madurai",
            "destination": "Chennai",
            "departureTime": new Date("2022-11-10T07:02:45"),
            "arrivalTime": new Date("2022-11-11T07:02:45"),
            "seatsLeft": 196,
            "ticketPrice": 1000,
            "capacity": 200,
            "company": "Indigo",
            "description": "IndiGo was founded in 2006 as a private company by Rahul Bhatia of InterGlobe Enterprises and Rakesh Gangwal.[10] InterGlobe had a 51.12% stake in IndiGo and 47.88% was held by Gangwal's Virginia-based company Caelum Investments. IndiGo placed a firm order for 100 Airbus A320-200 aircraft in June 2005 with plans to begin operations in mid-2006. IndiGo took delivery of its first aircraft on 28 July 2006, nearly a year after placing the order. It commenced operations on 4 August 2006 with a service from New Delhi to Imphal via Guwahati. By the end of 2006, the airline had six aircraft, and nine more were acquired in 2007. In December 2010, IndiGo replaced state-run carrier Air India as the third largest airline in India, behind Kingfisher Airlines and Jet Airways with a passenger market share of 17.3%"
        },
        "flightId": "AS303",
        "user": {
            "password": "12345",
            "name": "Muthulakshmi",
            "email": "muthu@gmail.com",
            "profilePicture": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            "gender": "Female"
        },
        "userEmail": "muthu@gmail.com",
        "numberOfTickets": 2,
        "totalPrice": 2000
    },
    {
        "bookingId": 4003,
        "flight": {
            "id": "AS304",
            "boarding": "Cuddalore",
            "destination": "Chennai",
            "departureTime": new Date("2022-11-11T07:02:45"),
            "arrivalTime": new Date("2022-11-12T07:02:45"),
            "seatsLeft": 197,
            "ticketPrice": 1500,
            "capacity": 200,
            "company": "Indigo",
            "description": "IndiGo was founded in 2006 as a private company by Rahul Bhatia of InterGlobe Enterprises and Rakesh Gangwal.[10] InterGlobe had a 51.12% stake in IndiGo and 47.88% was held by Gangwal's Virginia-based company Caelum Investments. IndiGo placed a firm order for 100 Airbus A320-200 aircraft in June 2005 with plans to begin operations in mid-2006. IndiGo took delivery of its first aircraft on 28 July 2006, nearly a year after placing the order. It commenced operations on 4 August 2006 with a service from New Delhi to Imphal via Guwahati. By the end of 2006, the airline had six aircraft, and nine more were acquired in 2007. In December 2010, IndiGo replaced state-run carrier Air India as the third largest airline in India, behind Kingfisher Airlines and Jet Airways with a passenger market share of 17.3%"
        },
        "flightId": "AS304",
        "user": {
            "password": "12345",
            "name": "Muthulakshmi",
            "email": "muthu@gmail.com",
            "profilePicture": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            "gender": "Female"
        },
        "userEmail": "muthu@gmail.com",
        "numberOfTickets": 3,
        "totalPrice": 4500
    }
]
export const dummyFlights : Flight[] = [
    {
        "id": "AS303",
        "boarding": "Madurai",
        "destination": "Chennai",
        "departureTime": new Date("2022-11-10T07:02:45"),
        "arrivalTime": new Date("2022-11-11T07:02:45"),
        "seatsLeft": 196,
        "ticketPrice": 1000,
        "capacity": 200,
        "company": "Indigo",
        "description": "IndiGo was founded in 2006 as a private company by Rahul Bhatia of InterGlobe Enterprises and Rakesh Gangwal.[10] InterGlobe had a 51.12% stake in IndiGo and 47.88% was held by Gangwal's Virginia-based company Caelum Investments. IndiGo placed a firm order for 100 Airbus A320-200 aircraft in June 2005 with plans to begin operations in mid-2006. IndiGo took delivery of its first aircraft on 28 July 2006, nearly a year after placing the order. It commenced operations on 4 August 2006 with a service from New Delhi to Imphal via Guwahati. By the end of 2006, the airline had six aircraft, and nine more were acquired in 2007. In December 2010, IndiGo replaced state-run carrier Air India as the third largest airline in India, behind Kingfisher Airlines and Jet Airways with a passenger market share of 17.3%"
    },
    {
        "id": "AS304",
        "boarding": "Cuddalore",
        "destination": "Chennai",
        "departureTime": new Date("2022-11-11T07:02:45"),
        "arrivalTime": new Date("2022-11-12T07:02:45"),
        "seatsLeft": 197,
        "ticketPrice": 1500,
        "capacity": 200,
        "company": "Indigo",
        "description": "IndiGo was founded in 2006 as a private company by Rahul Bhatia of InterGlobe Enterprises and Rakesh Gangwal.[10] InterGlobe had a 51.12% stake in IndiGo and 47.88% was held by Gangwal's Virginia-based company Caelum Investments. IndiGo placed a firm order for 100 Airbus A320-200 aircraft in June 2005 with plans to begin operations in mid-2006. IndiGo took delivery of its first aircraft on 28 July 2006, nearly a year after placing the order. It commenced operations on 4 August 2006 with a service from New Delhi to Imphal via Guwahati. By the end of 2006, the airline had six aircraft, and nine more were acquired in 2007. In December 2010, IndiGo replaced state-run carrier Air India as the third largest airline in India, behind Kingfisher Airlines and Jet Airways with a passenger market share of 17.3%"
    }
]

// export interface LoginInfo{
//     email:string;
//     password:string;
// }

// export interface User extends LoginInfo{
//     name:string;
//     profilePicture:string;
//     gender:string;
// }

// export interface LoggedInDetails{
//     user:User;
//     token:String;
// }

export const dummyLoginInfo: LoginInfo = {
    "email" : "muthu@gmail.com",
    "password" : "12345"
}

export const dummyUser : User = {
    "email" : "muthu@gmail.com",
    "password" : "12345",
    "name" : "Muthulakshmi",
    "gender" : "Female",
    "profilePicture" : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
}

export const dummyLoggedInDetails : LoggedInDetails = {
    "user" : {
        "email" : "muthu@gmail.com",
    "password" : "12345",
    "name" : "Muthulakshmi",
    "gender" : "Female",
    "profilePicture" : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBaXJsaW5lc0FwaVNlcnZlciIsImp0aSI6ImNiMWE1OWQzLWMwOTgtNDQyOC05MzQ0LWIyNTc0YTQzODA2YiIsIk5hbWUiOiJNdXRodSIsIkVtYWlsIjoibXV0aHVAZ21haWwuY29tIiwiZXhwIjoxNjY4NTE0NzIxLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNzQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwNzQifQ.9gz1AEYfGFQxtCbyQUEwfdyxtx2WYY8LAz_SyKGn3As"
}