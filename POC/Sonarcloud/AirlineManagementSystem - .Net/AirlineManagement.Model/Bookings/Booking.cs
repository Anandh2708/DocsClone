using AirlineManagement.Model.Flights;
using AirlineManagement.Model.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Model.Bookings
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        public virtual Flight? Flight { get; set; }

        public string FlightId { get; set; }

        public virtual User? User { get; set; }

        public string UserEmail { get; set; }

        public int NumberOfTickets { get; set; }

        public double TotalPrice { get; set; }

    }
}
