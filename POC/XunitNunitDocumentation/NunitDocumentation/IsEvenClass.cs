using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NunitDocumentation
{
    public class IsEvenClass
    {
        //funtion to return if a number is prime or not
        public bool IsEven(int number)
        {
            //if number modulo 2 is 0, it is even
            if(number%2 == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}


