using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Model.Flights
{
    public class FlightAttribute:ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var flight = validationContext.ObjectInstance as Flight;

            if( flight == null)
            {
                return ValidationResult.Success;
            }

            if(flight.Boarding.ToLower() == flight.Destination.ToLower())
            {
                return new ValidationResult("Boarding and Destination cannot be the same place");
            }
            if(flight.DepartureTime == flight.ArrivalTime)
            {
                return new ValidationResult("Departure and Arrival  Time should be diffrent");
            }
           
            else
            {
                return ValidationResult.Success;
            }
           
        }
    }
}
