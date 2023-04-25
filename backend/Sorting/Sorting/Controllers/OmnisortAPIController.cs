using Microsoft.AspNetCore.Mvc;
using Sorting.Models;
using Sorting.Util;

namespace Sorting.Controllers
{
    [Route("api/omnisort")]
    [ApiController]
    public class OmnisortAPIController : ControllerBase
    {
        //[HttpGet]
        //public ActionResult<TotalSortedResults> GetTotalSortedResults()
        //{
        //    _logger.LogInformation("Getting total sorted requests");
        //    return new TotalSortedResults();
        //}

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<SortedValues> SortValues([FromBody] SortValues toSortValues)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (toSortValues == null)
            {
                return BadRequest(toSortValues);
            }

            // Process values here
            //Debug.WriteLine("Strings: " + toSortValues.SortStrings);
            //Debug.WriteLine("Keyword: " + toSortValues.SortKeyword);
            //Debug.WriteLine("Order: ");
            //for (int i = 0; i < toSortValues.SortOrder.Length; i++)
            //{
            //    Debug.Write(toSortValues.SortOrder[i] + " ");
            //}

            // Make sure to implement an async functionality
            int[] intArray = SortingAlgorithms.ConvertObject(toSortValues.SortStrings);
            SortingAlgorithms.NumberSort(intArray);

            string result = "[" + string.Join(",", intArray) + "]";

            return new SortedValues() { Id = 2, Date = DateTime.Now, Payload = result };
        }
    }
}