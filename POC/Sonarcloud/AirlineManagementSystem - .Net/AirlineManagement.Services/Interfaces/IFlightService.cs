using AirlineManagement.Model.Flights;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Services.Interfaces
{

    public interface IFlightService
    {
        Task<Flight> AddFlight(Flight flight);

        Task RemoveFlight(string id);

        Task UpdateFlight(Flight flight);

        Task<List<Flight>> GetAllFlights();

        Task<Flight> GetFlightById(string id);
    }
}
