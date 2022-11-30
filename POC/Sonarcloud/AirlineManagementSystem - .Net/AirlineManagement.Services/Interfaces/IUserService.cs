using AirlineManagement.Model.Bookings;
using AirlineManagement.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserInfo> Register(User user);

        Task<UserInfo> Login(string email, string password);

        Task<List<UserInfo>> GetAllUsers();

        Task<UserInfo> GetUserByEmail(string email);

        Task<List<Booking>> GetAllBookings(string email);
    }
}
