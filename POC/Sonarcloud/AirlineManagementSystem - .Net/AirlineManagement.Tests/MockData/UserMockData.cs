using AirlineManagement.Model.Users;
using AirlineWebApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Tests.MockData
{
    public class UserMockData
    {

        public static List<User> GetUsers()
        {
            return new List<User>
            {
                new User
                {
                    Name = "Anbu",
                    Email = "anbu@gmail.com",
                    ProfilePicture = "https://media-exp1.licdn.com/dms/image/C5603AQFNn9hFrIAhSA/profile-displayphoto-shrink_800_800/0/1625852781819?e=2147483647&v=beta&t=FJCf9nT3yvjOnvtFGjol-LKR9qEApQO7M9AShGanQCU",
                    Gender = "Male",
                    Password = "pass#1"
                },

                new User
                {
                    Name = "Anandh",
                    Email = "anandh@gmail.com",
                    ProfilePicture = "https://cdn.dribbble.com/users/1223630/screenshots/8115260/char_still_2x.gif?compress=1&resize=400x300",
                    Gender = "Male",
                    Password = "pass#1"
                },

                new User
                {
                    Name = "Goms",
                    Email = "goms@gmail.com",
                    ProfilePicture = "https://media-exp1.licdn.com/dms/image/C5603AQFa1s3ZeH0rbw/profile-displayphoto-shrink_800_800/0/1634498777105?e=2147483647&v=beta&t=0fsGc9JcUK5c-PHwMKV6tmvt9G0eYpK44b_tjhZDJEM",
                    Gender = "Male",
                    Password = "pass#1"
                }
            };
        }

        public static List<User> GetEmptyUsers()
        {
            return new List<User>();
        }

        public static User NewUser()
        {
            return new User
            {
                Name = "Ajmeer",
                Email = "ajmeer@gmail.com",
                ProfilePicture = "https://media-exp1.licdn.com/dms/image/C5603AQFa1s3ZeH0rbw/profile-displayphoto-shrink_800_800/0/1634498777105?e=2147483647&v=beta&t=0fsGc9JcUK5c-PHwMKV6tmvt9G0eYpK44b_tjhZDJEM",
                Gender = "Male",
                Password = "pass#1"
            };
        }


        public static List<UserInfo> GetUsersInfo()
        {
            return new List<UserInfo>
            {
                new UserInfo
                {
                    Name = "Anbu",
                    Email = "anbu@gmail.com",
                    ProfilePicture = "https://media-exp1.licdn.com/dms/image/C5603AQFNn9hFrIAhSA/profile-displayphoto-shrink_800_800/0/1625852781819?e=2147483647&v=beta&t=FJCf9nT3yvjOnvtFGjol-LKR9qEApQO7M9AShGanQCU",
                    Gender = "Male",
                   
                },

                new UserInfo
                {
                    Name = "Anandh",
                    Email = "anandh@gmail.com",
                    ProfilePicture = "https://cdn.dribbble.com/users/1223630/screenshots/8115260/char_still_2x.gif?compress=1&resize=400x300",
                    Gender = "Male",
                    
                },

                new UserInfo
                {
                    Name = "Goms",
                    Email = "goms@gmail.com",
                    ProfilePicture = "https://media-exp1.licdn.com/dms/image/C5603AQFa1s3ZeH0rbw/profile-displayphoto-shrink_800_800/0/1634498777105?e=2147483647&v=beta&t=0fsGc9JcUK5c-PHwMKV6tmvt9G0eYpK44b_tjhZDJEM",
                    Gender = "Male",
                   
                }
            };
        }


        public static UserInfo NewUserInfo()
        {
            return new UserInfo
            {
                Name = "Ajmeer",
                Email = "ajmeer@gmail.com",
                ProfilePicture = "https://media-exp1.licdn.com/dms/image/C5603AQFa1s3ZeH0rbw/profile-displayphoto-shrink_800_800/0/1634498777105?e=2147483647&v=beta&t=0fsGc9JcUK5c-PHwMKV6tmvt9G0eYpK44b_tjhZDJEM",
                Gender = "Male",
               
            };
        }


        public static List<UserInfo> GetEmptyUsersInfo()
        {
            return new List<UserInfo>();
        }

        public static LoginInfo NewLoginInfo()
        {
            return new LoginInfo
            {
                
                Email = "ajmeer@gmail.com",
                Password = "pass#1"

            };
        }

    }
}
