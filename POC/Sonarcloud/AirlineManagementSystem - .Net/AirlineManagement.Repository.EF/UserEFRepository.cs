using AirlineManagement.Model;
using AirlineManagement.Model.Bookings;
using AirlineManagement.Model.Users;
using AirlineManagement.Utils;
using Castle.Components.DictionaryAdapter.Xml;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Repository.EF
{
    public class UserEFRepository : IRepository<User, string>
    {
        private AMSContext context;
        private ILogger<UserEFRepository> _logger;

        public UserEFRepository(AMSContext context,ILogger<UserEFRepository> logger)
        {
            this.context = context;
            _logger = logger;
        }

        /// <summary>
        /// This method takes an user object
        /// Adds it to the Users table of database
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Added user</returns>
        public async Task<User> Add(User entity)
        {
            context.Users.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        /// <summary>
        /// this method returns all the users present in the Users table of database
        /// </summary>
        /// <returns>All users present</returns>
        public async Task<List<User>> GetAll()
        {
            await Task.CompletedTask;
            return context.Users.ToList();
        }

        /// <summary>
        /// This method takes an user email
        /// Returns the corresponding user info present in the Users table
        /// </summary>
        /// <param name="id">user email</param>
        /// <returns>Corresponding user</returns>
        /// <exception cref="InvalidIdException"></exception>
        public async Task<User> GetById(string id)
        {
            var user = await context.Users.FindAsync(id);
            if(user == null)
            {
                this._logger.LogError($"No User with email '{id}'");
                throw new InvalidIdException(id, $"No User with email '{id}'");
            }
            else
            {
                return user;
            }
            
        }

        /// <summary>
        /// This method takes an user email
        /// Removes it form the users table
        /// </summary>
        /// <param name="id">user email</param>
        /// <returns></returns>
        public async Task Remove(string id)
        {
            var user = await context.Users.FindAsync(id);
            context.Users.Remove(user!);
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
        /// this method takes an user object with updated fields and an action 
        /// the action specifies the changes to be made to the existing user
        /// Gets the corresponding old user and updates the user by performing the changes
        /// </summary>
        /// <param name="entity">User object with updated fileds</param>
        /// <param name="mergeOldNew">Action to be performed between old and new user</param>
        /// <returns></returns>
        public async Task Update(User entity, Action<User, User> mergeOldNew)
        {
            var old = await GetById(entity.Email);

            mergeOldNew(old, entity);
            await context.SaveChangesAsync();
        }
    }
}
