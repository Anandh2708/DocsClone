using AirlineManagement.Model;
using AirlineManagement.Model.Bookings;
using AirlineManagement.Utils;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Repository.EF
{
    public class BookingEFRepository : IRepository<Booking, int>
    {
        AMSContext context;
        ILogger<BookingEFRepository> logger;
        public BookingEFRepository(AMSContext context, ILogger<BookingEFRepository> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        /// <summary>
        /// This method takes a booking object
        /// Adds it to the Bookings table of database
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Added booking</returns>
        public async Task<Booking> Add(Booking entity)
        {
            context.Bookings.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        /// <summary>
        /// this method returns all the bookings present in the Bookings table of database
        /// </summary>
        /// <returns>All bookings present</returns>
        public async Task<List<Booking>> GetAll()
        {
            await Task.CompletedTask;
            return context.Bookings.ToList();
        }

        /// <summary>
        /// This method takes a booking id
        /// Returns the corresponding booking info present in the Bookings table
        /// </summary>
        /// <param name="id">booking id</param>
        /// <returns>Corresponding Booking</returns>
        public async Task<Booking> GetById(int id)
        {
            var booking = await context.Bookings.FindAsync(id);
            if(booking == null)
            {
                this.logger.LogError($"No Booking with Id '{id}'");
                throw new InvalidIdException(id, $"No Booking with Id '{id}'");
            }
            else
            {
                return booking;
            }
            

        }

        /// <summary>
        /// This method takes a booking id
        /// Removes it form the Bookings table
        /// </summary>
        /// <param name="id">booking id</param>
        /// <returns></returns>
        public async Task Remove(int id)
        {
            var booking = await GetById(id);
            context.Bookings.Remove(booking);
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
        /// this method takes a booking object with updated fields and an action 
        /// the action specifies the changes to be made to the existing booking
        /// Gets the corresponding old booking and updates the booking by performing the changes
        /// </summary>
        /// <param name="entity">booking object with updated fields</param>
        /// <param name="mergeOldNew">Action to be performed between old and new booking</param>
        /// <returns></returns>
        public async Task Update(Booking entity, Action<Booking, Booking> mergeOldNew)
        {
            var booking = await GetById(entity.BookingId);
            mergeOldNew(booking, entity);
            await context.SaveChangesAsync();
        }

    }
}
