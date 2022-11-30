using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Utils.Exceptions
{
    public class SeatsUnavailableException : Exception
    {
        public SeatsUnavailableException()
        {
        }

        public SeatsUnavailableException(string? message) : base(message)
        {
        }
    }
}
