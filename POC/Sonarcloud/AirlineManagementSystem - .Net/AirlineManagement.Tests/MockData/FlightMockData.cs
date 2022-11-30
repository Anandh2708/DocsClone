using AirlineManagement.Model.Flights;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Tests.MockData
{
    public class FlightMockData
    {

        public static  List<Flight> GetFlights()
        {
            return new List<Flight>
            {
                new Flight
                {
                    Id = "JA8089",
                    Boarding = "Chennai",
                    Destination = "Bangalore",
                    DepartureTime = DateTime.Now,
                    ArrivalTime = DateTime.Now,
                    SeatsLeft = 100,
                    TicketPrice = 3000,
                    Capacity = 100,
                    Company = "Indigo",
                    Description = "InterGlobe Aviation Ltd., doing business as IndiGo, is an Indian low-cost airline headquartered in Gurgaon, Haryana, India. It is the largest airline in India by passengers carried and fleet size, with a 57.7%"

                },

                 new Flight
                {
                    Id = "JA8088",
                    Boarding = "Chennai",
                    Destination = "Bangalore",
                    DepartureTime = DateTime.Now,
                    ArrivalTime = DateTime.Now,
                    SeatsLeft = 100,
                    TicketPrice = 3000,
                    Capacity = 100,
                    Company = "Indigo",
                    Description = "InterGlobe Aviation Ltd., doing business as IndiGo, is an Indian low-cost airline headquartered in Gurgaon, Haryana, India. It is the largest airline in India by passengers carried and fleet size, with a 57.7%"

                },
                new Flight
                {
                    Id = "JA8080",
                    Boarding = "Chennai",
                    Destination = "Bangalore",
                    DepartureTime = DateTime.Now,
                    ArrivalTime = DateTime.Now,
                    SeatsLeft = 100,
                    TicketPrice = 3000,
                    Capacity = 100,
                    Company = "Indigo",
                    Description = "InterGlobe Aviation Ltd., doing business as IndiGo, is an Indian low-cost airline headquartered in Gurgaon, Haryana, India. It is the largest airline in India by passengers carried and fleet size, with a 57.7%"

                }
            };
        }

        public static List<Flight> GetEmptyFlights()
        {
            return new List<Flight>
            {

            };
        }

        public static Flight NewFlight()
        {
            return new Flight
            {

                Id = "JA8090",
                Boarding = "Chennai",
                Destination = "Bangalore",
                DepartureTime = DateTime.Now,
                ArrivalTime = DateTime.Now,
                SeatsLeft = 100,
                TicketPrice = 3000,
                Capacity = 100,
                Company = "Indigo",
                Description = "InterGlobe Aviation Ltd., doing business as IndiGo, is an Indian low-cost airline headquartered in Gurgaon, Haryana, India. It is the largest airline in India by passengers carried and fleet size, with a 57.7%"

            };
        }


    }
}
