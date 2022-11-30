using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Model
{
    public enum LogLevelEnum { TRACE, DEBUG, INFO, LOG, WARN, ERROR, FATAL ,OFF }
    public class LogInfo
    {
        public LogLevelEnum Level { get; set; }
        public DateTime? Timestamp { get; set; }
        public string? FileName { get; set; }
        public int? LineNumber { get; set; }
        public string? Message { get; set; }

       
    }
}
