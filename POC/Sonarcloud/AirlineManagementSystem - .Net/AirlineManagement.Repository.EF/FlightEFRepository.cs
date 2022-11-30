using AirlineManagement.Model;
using AirlineManagement.Model.Flights;
using AirlineManagement.Utils;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Repository.EF
{
    public class FlightEFRepository : IRepository<Flight, string>
    {
        AMSContext context;
        ILogger<FlightEFRepository> logger;
        public FlightEFRepository(AMSContext context, ILogger<FlightEFRepository> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        /// <summary>
        /// This method takes a flight object
        /// Adds it to the Flights table of database
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Added flight</returns>
        public async Task<Flight> Add(Flight entity)
        {
            
           
            context.Flights.Add(entity);
            await context.SaveChangesAsync();   
            return entity;
        }

        /// <summary>
        /// this method returns all the flights present in the Flights table of database
        /// </summary>
        /// <returns>All flights present</returns>
        public async Task<List<Flight>> GetAll()
        {
            await Task.CompletedTask;
            return context.Flights.ToList();
        }

        /// <summary>
        /// This method takes a flight id
        /// Returns the corresponding flight info present in the Flights table
        /// </summary>
        /// <param name="id">flight id</param>
        /// <returns>Corresponding flight</returns>
        public async Task<Flight> GetById(string id)
        {
            var flight = await context.Flights.FindAsync(id);
            if(flight == null)
            {
                this.logger.LogError($"No Flight Found with Id:{id}");
                throw new InvalidIdException(id, $"No Flight Found with Id:{id}");
            }
            else
            {
                return flight;
            }
           
        }

        /// <summary>
        /// This method takes a flight id
        /// Removes it form the Flights table
        /// </summary>
        /// <param name="id">flight id</param>
        /// <returns></returns>
        public async Task Remove(string id)
        {
            var flight = await GetById(id);  
            context.Flights.Remove(flight);
            await context.SaveChangesAsync();   
        }

        /// <summary>
        /// This method saves all the changes made in the database
        /// </summary>
        /// <returns></returns>
        public async Task Save()
        {
           await context.SaveChangesAsync();
        }

        /// <summary>
        /// this method takes a flight object with updated fields and an action 
        /// the action specifies the changes to be made to the existing flight
        /// Gets the corresponding old flight and updates the flight by performing the changes
        /// </summary>
        /// <param name="entity">flight object with updated fields</param>
        /// <param name="mergeOldNew">Action to be performed between old and new flight</param>
        /// <returns></returns>
        public async Task Update(Flight entity, Action<Flight, Flight> mergeOldNew)
        {
            var old = await GetById(entity.Id);
            mergeOldNew(old, entity);
            await context.SaveChangesAsync();
        }
    }
}
