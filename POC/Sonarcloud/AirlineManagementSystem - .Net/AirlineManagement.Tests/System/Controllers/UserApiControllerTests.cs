using AirlineManagement.Model.Users;
using AirlineManagement.Services.Interfaces;
using AirlineManagement.Services.Services;
using AirlineManagement.Tests.MockData;
using AirlineWebApi.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client.Extensions.Msal;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Tests.System.Controllers
{
    public class UserApiControllerTests
    {
        private UserApiController? sut;
        private List<UserInfo> users;
        private Mock<IUserService> userService;
        private ILogger<UserApiController> logger;
        private IConfiguration configuration;

        public UserApiControllerTests()
        {
            userService = new Mock<IUserService>();
            logger = Mock.Of<ILogger<UserApiController>>();
            configuration = Mock.Of<IConfiguration>();      
            
            users = UserMockData.GetUsersInfo();
            
        }

        [Fact]
        public async Task GetAllUsersReturnsListOfUsers()
        {
            /// Arrange
            userService.Setup(u=> u.GetAllUsers()).ReturnsAsync(UserMockData.GetUsersInfo());
            sut = new UserApiController(userService.Object, configuration, logger);

            /// Act
            var result = await sut.GetAllUsers();


            // /// Assert
            result.Should().HaveCount(UserMockData.GetUsersInfo().Count);
        }

        [Fact]
        public async Task GetUserByEmailReturnsUser()
        {
            /// Arrange
            var user = UserMockData.GetUsersInfo().First();
            userService.Setup(u => u.GetUserByEmail(user.Email)).ReturnsAsync(user);
            sut = new UserApiController(userService.Object, configuration, logger);

            /// Act
            var result = await sut.GetUserByEmail(user.Email);


            // /// Assert
            result.Name.Should().BeSameAs(user.Name);
        }

        [Fact]
        public async Task RegisterReturns201ForSuccessfullRegistration()
        {
            /// Arrange
            var user = UserMockData.GetUsers().First();
            var userInfo = UserMockData.GetUsersInfo().First();
            userService.Setup(u => u.Register(user)).ReturnsAsync(userInfo);
            sut = new UserApiController(userService.Object, configuration, logger);

            /// Act
            var result = (CreatedResult)await sut.Register(user);


            // /// Assert
            result.StatusCode.Should().Be(201);
        }

       
        [Fact]
        public async Task GetAllBookingsReturnsListOfBookingsForUser()
        {
            /// Arrange
            var user = UserMockData.NewUser();
            var userInfo = UserMockData.NewUserInfo();
            userService.Setup(u => u.GetAllBookings(user.Email)).ReturnsAsync(BookingMockData.GetBookings());
            sut = new UserApiController(userService.Object, configuration, logger);

            /// Act
            var result = await sut.GetAllBookings(user.Email);


            // /// Assert
            result.Should().HaveCount(BookingMockData.GetBookings().Count);
        }




        /* [Fact]
         public async Task LoginReturns200ForSuccessfullLogin()
         {
             /// Arrange
             var userInfo = UserMockData.NewUserInfo();
             var user = UserMockData.NewUser();
             var loginInfo = UserMockData.NewLoginInfo();


             userService.Setup(u => u.Login(user.Email,user.Password)).ReturnsAsync(userInfo);
             sut = new UserApiController(userService.Object, configuration!, logger);

             /// Act
             var result = (OkObjectResult) await sut.Login(loginInfo);


             // /// Assert
             result.StatusCode.Should().Be(200);
         }
 */


    }
}
