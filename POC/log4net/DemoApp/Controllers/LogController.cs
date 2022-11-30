using log4net.Models;
using Microsoft.AspNetCore.Mvc;

namespace MovieBooking.Controllers
{
    [ApiController]
    [Route("/api/logs")]
    public class LogController:Controller
    {
        ILogger<LogController> _logger;
        public LogController(ILogger<LogController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Log([FromBody] LoggingInfo log)
        {
            var msg = "Client Log :"
                + $"File:{log.FileName}"
                + $"Line Number:{log.LineNumber}"
                + $"Message:{log.Message}";

            if (log.Level == LoggingInfo.logLevel.ERROR)
                _logger.LogError(msg);
            else if (log.Level == LoggingInfo.logLevel.INFO)
                _logger.LogInformation(msg);
            else if (log.Level == LoggingInfo.logLevel.DEBUG)
                _logger.LogDebug(msg);        
            else if (log.Level == LoggingInfo.logLevel.WARN)
                _logger.LogWarning(msg);
            else
                _logger.LogInformation(msg);

            return Ok();
        }
    }
}
