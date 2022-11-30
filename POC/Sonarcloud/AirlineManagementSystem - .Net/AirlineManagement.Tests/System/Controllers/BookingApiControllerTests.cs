using AirlineManagement.Services.Interfaces;
using AirlineManagement.Tests.MockData;
using AirlineWebApi.Controllers;
using Castle.Core.Logging;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Tests.System.Controllers
{
    public class BookingApiControllerTests
    {
        private Mock<IBookingService> bookingService;
        private ILogger<BookingApiController> logger;
        public BookingApiControllerTests()
        {
            bookingService = new Mock<IBookingService>();   
            logger = Mock.Of<ILogger<BookingApiController>>();
        }

        [Fact]
        public async Task GetAllReturn200ForValidRequest()
        {
            //Arrange
            bookingService.Setup(b => b.GetAllBookings()).ReturnsAsync(BookingMockData.GetBookings());
            var sut = new BookingApiController(bookingService.Object, logger);

            //Act
            var result = (OkObjectResult) await sut.GetAll();

            //Assert
            result.StatusCode.Should().Be(200);

        }

        [Fact]
        public async Task GetByIdReturn200ForValidCase()
        {
            //Arrange
            var booking = BookingMockData.NewBooking();
            bookingService.Setup(b => b.GetBookingById(booking.BookingId)).ReturnsAsync(booking);
            var sut = new BookingApiController(bookingService.Object, logger);

            //Act
            var result = (OkObjectResult)await sut.GetById(booking.BookingId);

            //Assert
            result.StatusCode.Should().Be(200);

        }


        [Fact]
        public async Task AddBookingReturn201ForValidCase()
        {
            //Arrange
            var booking = BookingMockData.NewBooking();
            bookingService.Setup(b => b.AddBooking(booking)).ReturnsAsync(booking);
            var sut = new BookingApiController(bookingService.Object, logger);

            //Act
            var result = (CreatedResult)await sut.AddBooking(booking);

            //Assert
            result.StatusCode.Should().Be(201);

        }

        [Fact]
        public async Task DeleteReturnNocontentForValidCase()
        {
            //Arrange
            var booking = BookingMockData.NewBooking();
            bookingService.Setup(b => b.DeleteBooking(booking.BookingId));
            var sut = new BookingApiController(bookingService.Object, logger);

            //Act
            var result = (NoContentResult)await sut.Delete(booking.BookingId);

            //Assert
            result.StatusCode.Should().Be(204);

        }

        [Fact]
        public async Task UpdateReturns202ForValidUpdate()
        {
            //Arrange
            var booking = BookingMockData.NewBooking();
            bookingService.Setup(b => b.UpdateBooking(booking));
            var sut = new BookingApiController(bookingService.Object, logger);

            //Act
            var result = (AcceptedResult)await sut.Update(booking.BookingId,booking);

            //Assert
            result.StatusCode.Should().Be(202);

        }

    }
}
