using AirlineManagement.Model.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Model.Flights
{
    [Flight]
    public class Flight
    {
        [Key]
        public string Id { get; set; }

        public string Boarding { get; set; }
        public string Destination { get; set; }

        public DateTime DepartureTime { get; set; }

        public DateTime ArrivalTime { get; set; }

        public int? SeatsLeft { get; set; }

        [Range(1,10000)]
        public double TicketPrice { get; set; }

        [Range(1,400)]
        public int Capacity { get; set; }
        
        public string Company { get; set; }


        [StringLength(6000, MinimumLength = 40)]
        public string Description { get; set; }
        

        

    }
}
