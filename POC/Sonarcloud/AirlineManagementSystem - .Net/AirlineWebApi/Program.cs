using AirlineManagement.Model.Users;
using AirlineManagement.Repository.EF;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;


using Microsoft.EntityFrameworkCore;
using AirlineManagement.Utils;
using AirlineManagement.Services.Interfaces;
using AirlineManagement.Services.Services;
using AirlineManagement.Model.Flights;
using AirlineManagement.Model.Bookings;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
builder
    .Services
    .AddControllers()
    .AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });


//configure the authentication services
builder
      .Services
      .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(opt =>
      {

          opt.RequireHttpsMetadata = false;
          opt.SaveToken = true;
          opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
          {
              ValidateIssuer = true,
              ValidateAudience = true,

              ValidAudience = builder.Configuration["Jwt:Audience"],
              ValidIssuer = builder.Configuration["Jwt:Issuer"],
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
          };

      });


builder.Services.AddAuthorization();

builder.Services.AddDbContext<AMSContext>((provider, opt) =>
{
    var configuration = provider.GetService<IConfiguration>();

    var connectionString = configuration["ConnectionStrings:AirlineWebEF"];
    opt.UseSqlServer(connectionString);
    // opt.UseLazyLoadingProxies();
});


builder.Services.AddTransient<IUserService, SimpleUserService>();
builder.Services.AddTransient<IRepository<User,string>, UserEFRepository>();
builder.Services.AddTransient<IFlightService, SimpleFlightService>();
builder.Services.AddTransient<IRepository<Flight, string>, FlightEFRepository>();
builder.Services.AddTransient<IBookingService, SimpleBookingService>();
builder.Services.AddTransient<IRepository<Booking, int>, BookingEFRepository>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddSwaggerGen(option =>
{
    
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
    
});




builder.Host.ConfigureLogging(logger => logger.AddLog4Net("log4net.config"));



var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(opt =>
{
    opt.AllowAnyHeader();
    opt.AllowAnyOrigin();
    opt.AllowAnyMethod();
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
