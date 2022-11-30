using FluentAssertions;

namespace XunitDocumentation
{
    public class PrimeTest
    {

        IsPrimeClass primeService;
        public PrimeTest()
        {
            //creating object for IsPrimeClass
            this.primeService = new IsPrimeClass();
        }

        [Fact]
        public void IsPrimeReturnsFalseForNonPrimeNumber()
        {
            //arrange
            var input = 10;

            //act
            bool result = primeService.IsPrime(input);

            //assert
            Assert.False(result);
        }

        [Fact(Skip ="reason")]
        public void IsPrimeReturnsTrueForPrimeNumber()
        {
            //arrange
            var input = 5;

            //act
            bool result = primeService.IsPrime(input);

            //assert
            Assert.True(result); 
        }

        [Fact]
        public void IsPrimeReturnsFalseForNegativeNumber()
        {
            //arrange
            var input = -1;

            //act
            bool result = primeService.IsPrime(input);

            //assert
            result.Should().Be(false);
        }

        [Fact]
        public void IsPrimeReturnsFalseForOne()
        {
            //assume
            var input = 1;

            //act
            bool result = primeService.IsPrime(input);

            //assert
            result.Should().Be(false);
        }
    }
}