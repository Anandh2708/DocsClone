using AirlineManagement.Services.Interfaces;
using AirlineManagement.Tests.MockData;
using AirlineWebApi.Controllers;
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
    public class FlightApiControllerTests
    {
        private ILogger<FlightApiController> logger;
        private Mock<IFlightService> flightService;
        public FlightApiControllerTests()
        {
            flightService = new Mock<IFlightService>();
            logger = Mock.Of<ILogger<FlightApiController>>();
        }

        [Fact]
        public async Task AddFlightreturn201ForValidCase()
        {
            //Arrange
            var flight = FlightMockData.NewFlight();
            flightService.Setup(f=>f.AddFlight(flight)).ReturnsAsync(flight);
            var sut = new FlightApiController(flightService.Object, logger);

            //Act
            var result = (CreatedResult)await sut.AddFlight(flight);

            //Assert
            result.StatusCode.Should().Be(201);
        }

        [Fact]
        public async Task GetAllFlightsReturnsListOfFlights()
        {
            //Arrange
            var flights = FlightMockData.GetFlights();
            flightService.Setup(f => f.GetAllFlights()).ReturnsAsync(flights);
            var sut = new FlightApiController(flightService.Object, logger);

            //Act
            var result = await sut.GetAllFlights();

            //Assert
            result.Should().HaveCount(flights.Count);
        }

        [Fact]
        public async Task GetByIdReturnsFlightForValidId()
        {
            //Arrange
            var flight = FlightMockData.NewFlight();
            flightService.Setup(f => f.GetFlightById(flight.Id)).ReturnsAsync(flight);
            var sut = new FlightApiController(flightService.Object, logger);

            //Act
            var result = await sut.GetFlightById(flight.Id);

            //Assert
            result.Id.Should().Be(flight.Id);
        }

        [Fact]
        public async Task DeleteFlightReturn204ForValidCase()
        {
            //Arrange
            var flight = FlightMockData.NewFlight();
            flightService.Setup(f => f.RemoveFlight(flight.Id));
            var sut = new FlightApiController(flightService.Object, logger);

            //Act
            var result = (NoContentResult)await sut.DeleteFlight(flight.Id);

            //Assert
            result.StatusCode.Should().Be(204);
        }

        [Fact]
        public async Task UpdateFlightReturn202ForValidCase()
        {

            //Arrange
            var flight = FlightMockData.NewFlight();
            flightService.Setup(f => f.UpdateFlight(flight));
            var sut = new FlightApiController(flightService.Object, logger);

            //Act
            var result = (AcceptedResult)await sut.UpdateFlight(flight.Id,flight);

            //Assert
            result.StatusCode.Should().Be(202);


        }


    }
}
