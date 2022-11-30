using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Model
{
    public class InvalidIdException : Exception
    {
        public Object Id { get; set; }

        public InvalidIdException(object id, string message = "Invalid Id") : base(message)
        {
            Id = id;
            
        }
    }
}
