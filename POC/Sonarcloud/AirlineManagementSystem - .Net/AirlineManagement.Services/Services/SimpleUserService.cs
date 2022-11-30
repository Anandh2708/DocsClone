using AirlineManagement.Model.Bookings;
using AirlineManagement.Model.Users;
using AirlineManagement.Services.Interfaces;
using AirlineManagement.Utils;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Services.Services
{
    public class SimpleUserService : IUserService
    {

        IRepository<User, string> _userRepository;
        IRepository<Booking, int> _bookingRepository;
        ILogger<SimpleUserService> logger;

        public SimpleUserService(IRepository<User, string> userRepository, IRepository<Booking, int> bookingRepository, ILogger<SimpleUserService> logger)
        {
            _userRepository = userRepository;
            _bookingRepository = bookingRepository;
            this.logger = logger;
        }

        /// <summary>
        /// This method calls the Get All method of user repository
        /// </summary>
        /// <returns>Returns info about all users without password</returns>
        public async Task<List<UserInfo>> GetAllUsers()
        {
            logger.LogInformation("Entered GetAllUsers method of SimpleUserService");

            return (from user in (await _userRepository.GetAll())
                    select CreateUserInfo(user))
                    .ToList();
            

        }

        /// <summary>
        /// This method takes an user email
        /// Passes it to Get By Id method of user repository
        /// </summary>
        /// <param name="email">user email</param>
        /// <returns>Info about the corresponding user with password</returns>
        public async Task<UserInfo> GetUserByEmail(string email)
        {
            logger.LogInformation("Entered GetUserByEmail method of SimpleUserService");

            return CreateUserInfo(await _userRepository.GetById(email));
        }

        /// <summary>
        /// This method takes an user email and password
        /// Checks if the coressponding user is present in the user repository
        /// </summary>
        /// <param name="email">user email</param>
        /// <param name="password">user password</param>
        /// <returns>returns the user info if the credentials are correct</returns>
        /// <exception cref="InvalidCredentialsException">throws invalid credentials exception if no such user exists</exception>
        public async Task<UserInfo> Login(string email, string password)
        {
            logger.LogInformation("Entered Login method of SimpleUserService");

            
            var user = await _userRepository.GetById(email);
            if (user.Email == email && user.Password == password)
                return CreateUserInfo(user);
           
            this.logger.LogError("Invalid Credentials");
            throw new InvalidCredentialsException("Invalid Credentials");
        }

        /// <summary>
        /// This method takes a user object
        /// passes it to the add method of user repository
        /// </summary>
        /// <param name="user"></param>
        /// <returns>created user info with password field</returns>
        public async Task<UserInfo> Register(User user)
        {
            logger.LogInformation("Entered Register method of SimpleUserService"); 

            await _userRepository.Add(user);
            await _userRepository.Save();

            return CreateUserInfo(user);
        }

        /// <summary>
        /// This method takes an user object
        /// Creates user info without password field
        /// </summary>
        /// <param name="user"></param>
        /// <returns>user info without password field</returns>
        private static UserInfo CreateUserInfo(User user)
        {

            return new UserInfo()
            {
                Email = user.Email,
                Name = user.Name,
                ProfilePicture = user.ProfilePicture,
                Gender = user.Gender,
               
            };
        }

        /// <summary>
        /// This methods takes an user email
        /// Calls the get all method of boooking repository to return all the bookings
        /// From this, bookings made by corresponding user is filtered
        /// </summary>
        /// <param name="email">user email</param>
        /// <returns>List of all bookings made by the user</returns>
        public async Task<List<Booking>> GetAllBookings(string email)
        {
            logger.LogInformation("Entered GetAllBookings method of SimpleUserService");

            var bookings = await _bookingRepository.GetAll();
            var user = await _userRepository.GetById(email);
            return bookings.Where(b => b.UserEmail == email).ToList();
        }
    }
}
