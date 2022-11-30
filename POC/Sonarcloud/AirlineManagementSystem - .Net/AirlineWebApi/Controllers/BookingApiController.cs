using AirlineManagement.Model;
using AirlineManagement.Model.Bookings;
using AirlineManagement.Services.Interfaces;
using AirlineManagement.Utils.Exceptions;
using AirlineWebApi.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AirlineWebApi.Controllers
{
    [ApiController]
    [Route("/api/bookings")]
    [ExceptionMapper(ExceptionType = typeof(InvalidIdException), StatusCode = 404)]
    public class BookingApiController : Controller
    {

        IBookingService bookingService;
        ILogger<BookingApiController> logger;

        public BookingApiController(IBookingService bookingService, ILogger<BookingApiController> logger)
        {
            this.bookingService = bookingService;
            this.logger = logger;
        }

        /// <summary>
        /// This method returns information about all bookings
        /// </summary>
        /// <returns>List of all bookings</returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            logger.LogInformation("Entered GetAll method of BookingApiController");
            return Ok(await bookingService.GetAllBookings());
        }

        /// <summary>
        /// This method takes a booking id
        /// Passes it to the GetBookingById method of booking service
        /// </summary>
        /// <param name="id">booking id</param>
        /// <returns>Info about a booking</returns>
        [HttpGet("{id}", Name = "GetBookingById")]
        public async Task<IActionResult> GetById(int id)
        {
            logger.LogInformation("Entered GetById method of BookingApiController");

            return Ok(await bookingService.GetBookingById(id));
        }

        /// <summary>
        /// This method takes a booking object
        /// Passes it to add method of booking service
        /// </summary>
        /// <param name="booking"></param>
        /// <returns>The booking object added</returns>
        [HttpPost]
        [ExceptionMapper(ExceptionType = typeof(SeatsUnavailableException), StatusCode = 400)]
        [Authorize]
        public async Task<IActionResult> AddBooking([FromBody] Booking booking)
        {
            logger.LogInformation("Entered AddBooking method of BookingApiController");

            var result = await bookingService.AddBooking(booking);

            return Created("", result);

        }

        /// <summary>
        /// This method takes a booking id
        /// Passes it to the DeleteBooking method of booking service
        /// </summary>
        /// <param name="id">booking id</param>
        /// <returns>No content with status code 204</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            logger.LogInformation("Entered Delete method of BookingApiController");

            await bookingService.DeleteBooking(id);
            return NoContent();
        }

        /// <summary>
        /// this method takes a booking object
        /// returns bad request for url mismatch
        /// returns the updated booking ingo if update was successful
        /// </summary>
        /// <param name="id">booking id</param>
        /// <param name="booking">booking object</param>
        /// <returns>updated booking object</returns>
        [HttpPut("{id}")]
        [ExceptionMapper(ExceptionType = typeof(SeatsUnavailableException), StatusCode = 400)]
        [Authorize]
        public async Task<IActionResult> Update(int id, Booking booking)
        {
            logger.LogInformation("Entered Update method of BookingApiController");

            if (id != booking.BookingId)
                return BadRequest(new
                {
                    message = "current booking, url mistmatch",
                    url = Url.Link("GetBookingByIdRoute", new { id = id }),
                    correctUrl = Url.Link("GetBookingByIdRoute", new { id = booking.BookingId }),
                    BookId = booking.BookingId,

                });
            await bookingService.UpdateBooking(booking);
            return Accepted(booking);
        }

    }
}
