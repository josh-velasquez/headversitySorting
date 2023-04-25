using Microsoft.AspNetCore.Mvc;
using Sorting.Models;

namespace Sorting.Controllers
{
    [Route("api/sorting")]
    [ApiController]
    public class OmnisortAPIController : ControllerBase
    {
        private readonly ILogger<OmnisortAPIController> _logger;


        public OmnisortAPIController(ILogger<OmnisortAPIController> logger)
        {
            this._logger = logger;
        }

        [HttpGet]
        public ActionResult<TotalSortedResults> GetTotalSortedResults()
        {
            _logger.LogInformation("Getting total sorted requests");
            return new TotalSortedResults();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<SortedValues> SortValues([FromBody] SortValues toSortValues)
        {

            if (toSortValues == null)
            {
                _logger.LogInformation("Bad request for sorting values...");
                return BadRequest(toSortValues);
            }

            _logger.LogInformation("Sorting request values...");

            return new SortedValues();
        }
    }
}
