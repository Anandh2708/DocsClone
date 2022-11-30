using AirlineManagement.Model;
using AirlineManagement.Model.Bookings;
using AirlineManagement.Model.Flights;
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
    public class FlightEFRepositoryTests:IDisposable
    {
        protected readonly AMSContext _context;
        private readonly ILogger<FlightEFRepository> _logger;
        private List<Flight> flights;
        private FlightEFRepository sut;

        public FlightEFRepositoryTests()
        {
            _logger = Mock.Of<ILogger<FlightEFRepository>>();
            var options = new DbContextOptionsBuilder<AMSContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
            _context = new AMSContext(options);
            _context.Database.EnsureCreated();


            flights = FlightMockData.GetFlights();
            _context.Flights.AddRange(flights);
            _context.SaveChanges();
            sut = new FlightEFRepository(_context, _logger);

        }

        [Fact]
        public async Task GetAllReturnsAllFlights()
        {
            /// Arrange

            /// Act
            var result = await sut.GetAll();

            /// Assert
            result.Should().HaveCount(FlightMockData.GetFlights().Count);
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
        public async Task AddAddsUser()
        {
            /// Arrange
            var flight = FlightMockData.NewFlight();

            /// Act
            await sut.Add(flight);
            var result = await sut.GetAll();

            /// Assert
            result.Should().HaveCount(FlightMockData.GetFlights().Count + 1);
        }

        [Fact]
        public async Task GetByIdReturnsUser()
        {
            /// Arrange          
            var flight = flights[0];


            /// Act
            var result = await sut.GetById(flight.Id);

            // Assert

            result.Should().BeSameAs(flight);
        }

        [Fact]
        public async Task UpdateUpdatesUserData()
        {
            /// Arrange          
            var flight = flights[0];
            flight.Company = "AirIndia";


            /// Act
            await sut.Update(flight, (oldflight, newflight) => {

                oldflight.Company = newflight.Company;

            });
            var result = await sut.GetById(flight.Id);

            // Assert

            result.Company.Should().BeSameAs(flight.Company);
        }

        [Fact]
        public async Task RemoveRemovesUser()
        {
            /// Arrange          
            var flight = flights[0];

            /// Act
            await sut.Remove(flight.Id);


            // Assert

            await Assert.ThrowsAsync<InvalidIdException>(async () => await sut.GetById(flight.Id));

        }


        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
