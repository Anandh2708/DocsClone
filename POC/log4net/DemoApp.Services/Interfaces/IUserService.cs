using DemoApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoApp.Services.Interfaces
{
    public interface IUserService
    {
        public Task<User> GetUserById(int id);
        public Task<List<User>> GetAllUsers();
    }
}
