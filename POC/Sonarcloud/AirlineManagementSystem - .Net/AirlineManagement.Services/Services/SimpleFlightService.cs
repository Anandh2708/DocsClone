using AirlineManagement.Model.Flights;
using AirlineManagement.Services.Interfaces;
using AirlineManagement.Utils;
using log4net.Core;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Services.Services
{
    public class SimpleFlightService : IFlightService
    {
        IRepository<Flight, string> flightRepository;
        ILogger<SimpleFlightService> logger;

        public SimpleFlightService(IRepository<Flight, string> flightRepository, ILogger<SimpleFlightService> logger)
        {
            this.flightRepository = flightRepository;
            this.logger = logger;
        }

        /// <summary>
        /// this method takes a flight object
        /// call the add method of flight repository
        /// </summary>
        /// <param name="flight"></param>
        /// <returns>flight object added</returns>
        public async Task<Flight> AddFlight(Flight flight)
        {
            logger.LogInformation("Entered AddFlight method of SimpleFlightService");

            return await flightRepository.Add(flight);
        }

        /// <summary>
        /// This method calls the get all method of flight repository
        /// Returns the list of all flights 
        /// </summary>
        /// <returns>List of all flights</returns>
        public async Task<List<Flight>> GetAllFlights()
        {
            logger.LogInformation("Entered GetAllFlights method of SimpleFlightService");

            return await flightRepository.GetAll();
        }

        /// <summary>
        /// This method takes a flight id
        /// passes it to the get by id method of flight repository
        /// </summary>
        /// <param name="id">flight id</param>
        /// <returns>info about the corresponding flight</returns>
        public async Task<Flight> GetFlightById(string id)
        {
            logger.LogInformation("Entered GetFlightById method of SimpleFlightService");

            return await flightRepository.GetById(id);
        }

        /// <summary>
        /// This method takes a flight id
        /// passes it to the remove method of flight repository
        /// </summary>
        /// <param name="id">flight id</param>
        /// <returns></returns>
        public async Task RemoveFlight(string id)
        {
            logger.LogInformation("Entered RemoveFlight method of SimpleFlightService");

            await flightRepository.Remove(id);
        }

        /// <summary>
        /// This method takes a flight object
        /// calls the update method of flight repository
        /// updates all the fields of flight object other than flight id
        /// </summary>
        /// <param name="flight"></param>
        /// <returns></returns>
        public async Task UpdateFlight(Flight flight)
        {
            logger.LogInformation("Entered UpdateFlight method of SimpleFlightService");

            await flightRepository.Update(flight, (oldFlight, newFlight) =>
            {
                oldFlight.Boarding = newFlight.Boarding;
                oldFlight.Destination = newFlight.Destination;
                oldFlight.DepartureTime = newFlight.DepartureTime;
                oldFlight.ArrivalTime = newFlight.ArrivalTime;
                oldFlight.TicketPrice = newFlight.TicketPrice;
                oldFlight.Capacity = newFlight.Capacity;
                oldFlight.SeatsLeft = newFlight.SeatsLeft;
                oldFlight.Description = newFlight.Description;
                oldFlight.Company = newFlight.Company;

            });
        }
    }
}
