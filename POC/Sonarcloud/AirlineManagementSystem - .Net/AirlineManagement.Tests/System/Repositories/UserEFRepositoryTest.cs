using AirlineManagement.Model;
using AirlineManagement.Model.Users;
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
    public class UserEFRepositoryTest : IDisposable
    {
        protected readonly AMSContext _context;
        private readonly ILogger<UserEFRepository> _logger;



        private List<User> users;
        private UserEFRepository sut;

        public UserEFRepositoryTest()
        {
            _logger = Mock.Of<ILogger<UserEFRepository>>();
            var options = new DbContextOptionsBuilder<AMSContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
            _context = new AMSContext(options);
            _context.Database.EnsureCreated();


            users = UserMockData.GetUsers();
            _context.Users.AddRange(users);
            _context.SaveChanges();
            sut = new UserEFRepository(_context, _logger);

        }


        [Fact]
        public async Task GetAllReturnsAllUsers()
        {
            /// Arrange

            /// Act
            var result = await sut.GetAll();

            /// Assert
            result.Should().HaveCount(UserMockData.GetUsers().Count);
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
            var user = UserMockData.NewUser();

            /// Act
            await sut.Add(user);
            var result = await sut.GetAll();

            /// Assert
            result.Should().HaveCount(UserMockData.GetUsers().Count+1);
        }

        [Fact]
        public async Task GetByIdReturnsUser()
        {
            /// Arrange          
            var user = users[0];
           
            
            /// Act
            var result = await sut.GetById(user.Email);

            // Assert
          
            result.Should().BeSameAs(user);
        }

        [Fact]
        public async Task UpdateUpdatesUserData()
        {
            /// Arrange          
            var user = users[0];
            user.Password = "Pass";


            /// Act
            await sut.Update(user, (oldUser, newUser)=>{

                oldUser.Password = newUser.Password;

            });
            var result = await sut.GetById(user.Email);

            // Assert
            
            result.Password.Should().BeSameAs(user.Password);
        }

        [Fact]
        public async Task RemoveRemovesUser()
        {
            /// Arrange          
            var user = users[0];

            /// Act
            await sut.Remove(user.Email);


            // Assert

            await Assert.ThrowsAsync<InvalidIdException>(async () => await sut.GetById(user.Email));         

        }




        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
