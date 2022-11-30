
export interface Flight{
    id:string;
    boarding:string;
    destination:string;
    departureTime:Date;
    arrivalTime:Date;
    seatsLeft?:number;
    ticketPrice:number;
    capacity:number;
    company:string;
    description:string;
}

