using AirlineManagement.Model.Bookings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Tests.MockData
{
    public class BookingMockData
    {
        public static List<Booking> GetBookings()
        {
            return new List<Booking>
            {
                new Booking
                {
                    BookingId = 1111,
                    FlightId = "JA8089",
                    UserEmail = "anbu@gmail.com",
                    NumberOfTickets = 1,
                    TotalPrice = 3000
                },
                new Booking 
                {
                    BookingId = 111,
                    FlightId = "JA8089",
                    UserEmail = "goms@gmail.com",
                    NumberOfTickets = 3,
                    TotalPrice = 9000
                },
                 new Booking
                {
                    BookingId = 121,
                    FlightId = "JA8089",
                    UserEmail = "anandh@gmail.com",
                    NumberOfTickets = 2,
                    TotalPrice = 6000
                }
            };
        }

        public static Booking NewBooking()
        {
            return new Booking
            {
                
                    BookingId = 131,
                    FlightId = "JA8089",
                    UserEmail = "ajmeer@gmail.com",
                    NumberOfTickets = 2,
                    TotalPrice = 6000

            };
        }


        public static List<Booking> GetEmptyBookings()
        {
            return new List<Booking>
            {

            };
        }

    }
}
