namespace NunitDocumentation
{
    public class IsEvenTests
    {
        IsEvenClass isEvenService;
        [SetUp]
        public void Setup()
        {
            isEvenService = new IsEvenClass();
        }

        [Test]
        public void IsEvenReturnsTrueForEvenNumber()
        {
            //arrange
            var input = 10;

            //act
            bool result = isEvenService.IsEven(input);

            //assert
            Assert.True(result);
        }

        [Ignore("reason")]
        public void IsEvenReturnsFalseForOddNumber()
        {
            //arrange
            var input = 23;

            //act
            bool result = isEvenService.IsEven(input);

            //assert
            Assert.False(result);
        }
    }
}