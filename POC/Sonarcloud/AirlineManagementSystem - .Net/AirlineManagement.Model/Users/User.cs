using AirlineManagement.Model.Bookings;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Model.Users
{

    public class UserInfo
    {

        public string Name { get; set; }

        [Key]
        [EmailAddress]
        public string Email { get; set; }

        [Url]
        public string ProfilePicture { get; set; }

        public string Gender { get; set; }  

    }


    public class User : UserInfo
    {
        public string Password { get; set; }

    }


}
