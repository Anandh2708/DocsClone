using AirlineManagement.Model.Bookings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Services.Interfaces
{
    public interface IBookingService
    {
        Task<List<Booking>> GetAllBookings();

        Task<Booking> GetBookingById(int id);

        Task<Booking> AddBooking(Booking booking);

        Task UpdateBooking(Booking booking);

        Task DeleteBooking(int id);
    }
}
