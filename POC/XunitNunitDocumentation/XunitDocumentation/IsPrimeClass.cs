using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XunitDocumentation
{
    public class IsPrimeClass
    {
        //funtion to return if a number is prime or not
        public bool IsPrime(int number)
        {
            //if number is less than 1, it's not a prime number
            if(number <= 1)
            {
                return false;
            }

            //check from 2 to square root of n
            for (int i = 2; i <= Math.Sqrt(number); i++)
            {
                //if number is divisible by anything is it not a prime
                if (number % i == 0)
                    return false;
            }

            //else it is prime
            return true;
        }
    }
}


