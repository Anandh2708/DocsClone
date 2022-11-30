using AirlineManagement.Model;
using AirlineManagement.Model.Bookings;
using AirlineManagement.Model.Users;
using AirlineManagement.Repository.EF;
using AirlineManagement.Tests.MockData;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Tests.System.Repositories
{
    public class BookingEFRepositoryTests : IDisposable
    {
        protected readonly AMSContext _context;
        private readonly ILogger<BookingEFRepository> _logger;
        private List<Booking> bookings;
        private BookingEFRepository sut;

        public BookingEFRepositoryTests()
        {
            _logger = Mock.Of<ILogger<BookingEFRepository>>();
            var options = new DbContextOptionsBuilder<AMSContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
            _context = new AMSContext(options);
            _context.Database.EnsureCreated();


            bookings = BookingMockData.GetBookings();
            _context.Bookings.AddRange(bookings);
            _context.SaveChanges();
            sut = new BookingEFRepository(_context,_logger);

        }

        [Fact]
        public async Task GetAllReturnsAllBookings()
        {
            /// Arrange

            /// Act
            var result = await sut.GetAll();

            /// Assert
            result.Should().HaveCount(BookingMockData.GetBookings().Count);
        }

        [Fact]
        public async Task GetAllReturnsEmptyList()
        {
            /// Arrange
            _context.Database.EnsureDeleted();
            _context.SaveChanges();

            /// Act
            var result = await sut.GetAll();

            /// Assert
            result.Should().HaveCount(0);
        }

        [Fact]
        public async Task AddAddsNewBooking()
        {
            /// Arrange
            var booking = BookingMockData.NewBooking();

            /// Act
            await sut.Add(booking);
            var result = await sut.GetAll();

            /// Assert
            result.Should().HaveCount(BookingMockData.GetBookings().Count + 1);
        }

        [Fact]
        public async Task GetByIdReturnsBooking()
        {
            /// Arrange          
            var booking = bookings[0];


            /// Act
            var result = await sut.GetById(booking.BookingId);

            // Assert

            result.Should().BeSameAs(booking);
        }

        [Fact]
        public async Task UpdateUpdatesBookingData()
        {
            /// Arrange          
            var booking = bookings[0];
            booking.NumberOfTickets = 9;
           


            /// Act
            await sut.Update(booking, (oldbooking, newbooking) => {

                oldbooking.NumberOfTickets = newbooking.NumberOfTickets;

            });
            var result = await sut.GetById(booking.BookingId);

            // Assert

            Assert.Equal(booking.NumberOfTickets, result.NumberOfTickets);
        }

        [Fact]
        public async Task RemoveRemovesBooking()
        {
            /// Arrange          
            var booking = bookings[0];

            /// Act
            await sut.Remove(booking.BookingId);


            // Assert

            await Assert.ThrowsAsync<InvalidIdException>(async () => await sut.GetById(booking.BookingId));

        }


        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
