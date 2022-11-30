using AirlineManagement.Model;
using AirlineManagement.Model.Bookings;
using AirlineManagement.Model.Users;
using AirlineManagement.Services.Interfaces;
using AirlineWebApi.Utils;
using AirlineWebApi.ViewModel;
using log4net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;

namespace AirlineWebApi.Controllers
{
    [ApiController]
    [Route("/api/users")]
    [ExceptionMapper(ExceptionType = typeof(InvalidIdException), StatusCode = 404)]

    public class UserApiController : Controller
    {
        IUserService userService;
        IConfiguration configuration;
        ILogger<UserApiController> logger;

       

        public UserApiController(IUserService userService, IConfiguration configuration, ILogger<UserApiController> logger )
        {
            this.userService = userService;
            this.configuration = configuration;
            this.logger = logger;
        }

        /// <summary>
        /// This method takes the user object
        /// Passes it to register method of user service
        /// </summary>
        /// <param name="user">user object</param>
        /// <returns>User info without password field</returns>
        [HttpPost("register")]
        [ExceptionMapper(ExceptionType = typeof(DbUpdateException), StatusCode = 400, Message = "Duplicate Email")]
        public async Task<IActionResult> Register(User user)
        {
            logger.LogInformation("Entered Register method of UserApiController");

            var info = await userService.Register(user);

            return Created("", info);
        }

        /// <summary>
        /// This method takes user email and password
        /// Passes it to login method of user service
        /// Generates JWT web token
        /// </summary>
        /// <param name="info">user email and password</param>
        /// <returns>user object and generated token</returns>
        [HttpPost("login")]
        [ExceptionMapper(ExceptionType = typeof(InvalidCredentialsException), StatusCode = 401)]
        public async Task<IActionResult> Login([FromBody] LoginInfo info)
        {
            logger.LogInformation("Entered Login method of UserApiController");

            var user = await userService.Login(info.Email, info.Password);
            // 
            var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub,configuration["Jwt:Subject"]!),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    //new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Name", user.Name),
                    new Claim("Email", user.Email),
                   
           };
            //
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));

            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new
            {
                token = tokenString,
                user = user

            });
        }

        /// <summary>
        /// This method calls the GetAllUsers method of user service
        /// </summary>
        /// <returns>List of all users present with the password info</returns>
        [HttpGet]
        public async Task<List<UserInfo>> GetAllUsers()
        {
            logger.LogInformation("Entered GetAllUsers method of UserApiController");
            
            return await userService.GetAllUsers();          
        }

        /// <summary>
        /// This method takes an user email
        /// Passes it to GetUserbyEmail method of user service
        /// </summary>
        /// <param name="email">email of an user</param>
        /// <returns>User information without password</returns>
        [HttpGet("{email}")]
        public async Task<UserInfo> GetUserByEmail(string email)
        {
            logger.LogInformation("Entered GetUserByEmail method of UserApiController");

            return await userService.GetUserByEmail(email);     
        }

        /// <summary>
        /// This method takes an user email
        /// Returns all the bookings made by the corresponding user
        /// </summary>
        /// <param name="email">User email</param>
        /// <returns>List of all bookings made by an user</returns>
        [HttpGet("{email}/bookings")]
        [Authorize]
        public async Task<List<Booking>> GetAllBookings(string email)
        {
            logger.LogInformation("Entered GetAllBookings method of UserApiController");

            return await userService.GetAllBookings(email);
        }
       
    }

}
