
using AirlineManagement.Model;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AirlineWebApi.Controllers
{
    [ApiController]
    [Route("/api/logs")]
    public class ClientLogApiController:Controller
    {
        ILogger<ClientLogApiController> logger;
        public ClientLogApiController(ILogger<ClientLogApiController> logger)
        {
            this.logger = logger;
        }

        [HttpPost]
        public IActionResult Log([FromBody] LogInfo log)
        {
            var msg = "Airline Client logging - "+$"MESSAGE: {log.Message} - " +
                        $"FILE: {log.FileName} - " +
                        $"LEVEL: {log.Level} - " +
                        $"LINENUMBER: {log.LineNumber} - " +
                        $"TIMESTAMP: {log.Timestamp}";

            if (log.Level == LogLevelEnum.TRACE)
                logger.LogInformation(msg);
            else if (log.Level == LogLevelEnum.ERROR)
                logger.LogError(msg);
            else if (log.Level == LogLevelEnum.INFO)
                logger.LogInformation(msg);
            else if (log.Level == LogLevelEnum.DEBUG)
                logger.LogError(msg);
            else if (log.Level == LogLevelEnum.WARN)
                logger.LogWarning(msg);
            else
                logger.LogInformation(msg);

            return Ok();
        }




    }
}
