
namespace log4net.Models
{
    public class LoggingInfo
    {
        public enum logLevel { DEBUG, INFO, WARN, ERROR }
        public logLevel? Level { get; set; }
        public string? Message { get; set; }
        public DateTime? TimeStamp { get; set; }
        public string? FileName { get; set; }
        public int? LineNumber { get; set; }

    }
}
