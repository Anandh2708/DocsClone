using AirlineManagement.Model.Bookings;
using AirlineManagement.Model.Flights;
using AirlineManagement.Model.Users;
using AirlineManagement.Services.Interfaces;
using AirlineManagement.Utils;
using AirlineManagement.Utils.Exceptions;
using log4net.Core;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Services.Services
{
    public class SimpleBookingService : IBookingService
    {
        IRepository<Booking, int> bookingRepository;
        IRepository<User, string> userRepository;
        IRepository<Flight, string> flightRepository;
        ILogger<SimpleBookingService> logger;

        public SimpleBookingService(IRepository<Booking, int> repository, IRepository<User, string> userRepository, IRepository<Flight, string> flightRepository, ILogger<SimpleBookingService> logger)
        {
            this.bookingRepository = repository;
            this.userRepository = userRepository;
            this.flightRepository = flightRepository;
            this.logger = logger;
        }

        /// <summary>
        /// this method takes a booking object
        /// call the add method of booking repository
        /// </summary>
        /// <param name="booking"></param>
        /// <returns>booking object added</returns>
        public async Task<Booking> AddBooking(Booking booking)
        {
            logger.LogInformation("Entered AddBooking method of SimpleBookingService");

            var user = await userRepository.GetById(booking.UserEmail);
            var flight = await flightRepository.GetById(booking.FlightId);

            if (flight.SeatsLeft - booking.NumberOfTickets < 0)
            {
                this.logger.LogError("Seats are unavailable. Seats Left : " + flight.SeatsLeft);
                throw new SeatsUnavailableException("Seats are unavailable. Seats Left : " + flight.SeatsLeft);
            }

            var bookingAdded = await bookingRepository.Add(booking);

            flight.SeatsLeft = flight.SeatsLeft - booking.NumberOfTickets;
            await flightRepository.Update(flight, (oldFlight, newFlight) =>
            {
                oldFlight.SeatsLeft = newFlight.SeatsLeft;
            });

            return bookingAdded;
        }

        /// <summary>
        /// This method takes a booking id
        /// passes it to the remove method of booking repository
        /// </summary>
        /// <param name="id">booking id</param>
        /// <returns></returns>
        public async Task DeleteBooking(int id)
        {
            logger.LogInformation("Entered DeleteBooking method of SimpleBookingService");

            var booking = await bookingRepository.GetById(id);
            var flight = await flightRepository.GetById(booking.FlightId);

            await bookingRepository.Remove(id);

            flight.SeatsLeft = flight.SeatsLeft + booking.NumberOfTickets;
            await flightRepository.Update(flight, (oldFlight, newFlight) =>
            {
                oldFlight.SeatsLeft = newFlight.SeatsLeft;
            });
          
        }

        /// <summary>
        /// This method calls the get all method of booking repository
        /// Returns the list of all bookings 
        /// </summary>
        /// <returns>List of all bookings</returns>
        public async Task<List<Booking>> GetAllBookings()
        {
            logger.LogInformation("Entered GetAllBookings method of SimpleBookingService");

            return await bookingRepository.GetAll();
        }

        /// <summary>
        /// This method takes a booking id
        /// passes it to the get by id method of booking repository
        /// </summary>
        /// <param name="id">booking id</param>
        /// <returns>info about the corresponding booking</returns>
        public async Task<Booking> GetBookingById(int id)
        {
            logger.LogInformation("Entered GetBookingById method of SimpleBookingService");

            return await bookingRepository.GetById(id);
        }

        /// <summary>
        /// This method takes a booking object
        /// calls the update method of booking repository
        /// updates all the fields of booking object other than booking id, flight id and user id
        /// </summary>
        /// <param name="booking"></param>
        /// <returns></returns>
        public async Task UpdateBooking(Booking booking)
        {
            logger.LogInformation("Entered UpdateBooking method of SimpleBookingService");

            var existingBooking = await bookingRepository.GetById(booking.BookingId);
            var flight = await flightRepository.GetById(booking.FlightId);

            if ((flight.SeatsLeft + existingBooking.NumberOfTickets) - booking.NumberOfTickets < 0)
            {
                this.logger.LogError("Seats are unavailable. Seats Left : " + flight.SeatsLeft);
                throw new SeatsUnavailableException("Seats are unavailable. Seats Left : " + (flight.SeatsLeft + existingBooking.NumberOfTickets));
            }
               

            flight.SeatsLeft = (flight.SeatsLeft + existingBooking.NumberOfTickets) - booking.NumberOfTickets;

            await bookingRepository.Update(booking, (o, n) =>
            {
                o.NumberOfTickets = n.NumberOfTickets;
                o.TotalPrice = n.TotalPrice;
            });
           
            await flightRepository.Update(flight, (oldFlight, newFlight) =>
            {
                oldFlight.SeatsLeft = newFlight.SeatsLeft;
            });


        }
    }
}
