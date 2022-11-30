using AirlineManagement.Model;
using AirlineManagement.Model.Flights;
using AirlineManagement.Services.Interfaces;
using AirlineWebApi.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AirlineWebApi.Controllers
{
    [ApiController]
    [Route("/api/flights")]
    [ExceptionMapper(ExceptionType = typeof(InvalidIdException), StatusCode = 404)]
    public class FlightApiController : Controller
    {
        IFlightService flightService;
        ILogger<FlightApiController> logger;

        public FlightApiController(IFlightService flightService, ILogger<FlightApiController> logger)
        {
            this.flightService = flightService;
            this.logger = logger;
        } 
        
        /// <summary>
        /// This method takes a flight object
        /// Passes it to add flight method of flight service
        /// </summary>
        /// <param name="flight"></param>
        /// <returns>The flight object added</returns>
        [HttpPost]
        [ExceptionMapper(ExceptionType = typeof(DbUpdateException), StatusCode = 400, Message = "Duplicate Flight Id")]
        [Authorize]
        public async Task<IActionResult> AddFlight(Flight flight)
        {
            logger.LogInformation("Entered AddFlight method of FlightApiController");

            var result = await flightService.AddFlight(flight);
            return Created("",result);
        }

        /// <summary>
        /// This method returns information about all the flights
        /// </summary>
        /// <returns>List of flights</returns>
        [HttpGet]
        public async Task<List<Flight>> GetAllFlights()
        {
            logger.LogInformation("Entered GetAllFlights method of FlightApiController");

            return await flightService.GetAllFlights();
        }

        /// <summary>
        /// This methods takes a flight id
        /// Passes it to the GetFlightById of flight service
        /// </summary>
        /// <param name="id">flight id</param>
        /// <returns>Info about a flight</returns>
        [HttpGet("{id}", Name = "GetFlightById")]
        public async Task<Flight> GetFlightById(string id)
        {
            logger.LogInformation("Entered GetFlightById method of FlightApiController");

            return await flightService.GetFlightById(id);
        }

        /// <summary>
        /// This method takes a flight id
        /// Passes it to the RemoveFlight method of flight service
        /// </summary>
        /// <param name="id">Flight id</param>
        /// <returns>No content with status code 204</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteFlight(string id)
        {
            logger.LogInformation("Entered DeleteFlight method of FlightApiController");

            await flightService.RemoveFlight(id);
            return NoContent();
        }

        /// <summary>
        /// This method takes a flight object
        /// Returns Bad request for url mismatch
        /// Returns the updated flight info if update was successful
        /// </summary>
        /// <param name="id"> flight id</param>
        /// <param name="flight">flight object</param>
        /// <returns>Updated flight object</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateFlight(string id,Flight flight)
        {
            logger.LogInformation("Entered UpdateFlight method of FlightApiController");

            if (id != flight.Id)
            {
                return BadRequest(new
                {
                    message = "current Flight, url mistmatch",
                    url = Url.Link("GetFlightById", new { id = id }),
                    correctUrl = Url.Link("GetFlightById", new { id = flight.Id }),
                    FlightId = flight.Id,

                });
            }
            await flightService.UpdateFlight(flight);
            return Accepted(flight);

        }
    }
}
