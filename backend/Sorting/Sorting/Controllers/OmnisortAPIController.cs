using Microsoft.AspNetCore.Mvc;
using Sorting.Models;
using Sorting.Util;
using System.Diagnostics;

namespace Sorting.Controllers
{
    [Route("api/sort")]
    [ApiController]
    public class OmnisortAPIController : ControllerBase
    {
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

            // Make sure to implement an async functionality
            int[] intArray = SortingAlgorithms.ConvertObject(toSortValues.SortStrings);
            SortingAlgorithms.NumberSort(intArray);

            string result = "[" + string.Join(",", intArray) + "]";

            return new SortedValues() { Id = 2, Date = DateTime.Now, Payload = result };
        }

        [HttpPost("file")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<SortedValuesFile> SortValuesFile([FromForm] SortValuesFile toSortValuesFile) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            if (toSortValuesFile == null) {
                return BadRequest(toSortValuesFile);
            }

            Debug.WriteLine("FILE: " + toSortValuesFile.FormFile.FileName);
            Debug.WriteLine("SortKeyword: " + toSortValuesFile.SortKeyword);
            Debug.WriteLine("SortOrder: " + toSortValuesFile.SortOrder);

            return new SortedValuesFile();
        }
    }
}