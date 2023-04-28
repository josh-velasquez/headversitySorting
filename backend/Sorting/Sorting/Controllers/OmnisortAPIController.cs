using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Sorting.Models;
using Sorting.Util;
using System.Diagnostics;

namespace Sorting.Controllers
{
    [Route("api/sort")]
    [ApiController]
    public class OmnisortAPIController : ControllerBase
    {

        private SortedValues SortObjects(SortValues sortValues)
        {
            string sortStrings = sortValues.SortStrings.Trim();
            string sortKeyword = sortValues.SortKeyword ?? string.Empty.Trim();
            SortType sortType = Enum.Parse<SortType>(sortValues.SortType ?? string.Empty);

            SortedValues result = new SortedValues()
            {
                Id = 1,
                Date = DateTime.Now
            };

            switch (sortType)
            {
                case SortType.Alphabet:
                    string[] alphabetVals = Converters.ConvertObjectToStringArray(sortStrings);
                    SortingAlgorithms.StringSort(alphabetVals);
                    string alphabetResults = Converters.ConvertToString(alphabetVals);
                    result.Payload = alphabetResults;
                    return result;
                case SortType.Number:
                    int[] vals = Converters.ConvertObjectToIntArray(sortStrings);
                    SortingAlgorithms.NumberSort(vals);
                    string numberResults = Converters.ConvertToString(vals);
                    result.Payload = numberResults;
                    return result;
                case SortType.Grouping:
                    // grouping
                    string[] groupVals = Converters.ConvertObjectToStringArray(sortStrings);
                    IGrouping<string, string>[] test = SortingAlgorithms.GroupSort(groupVals);
                    string groupingResults = Converters.ConvertToString(test);
                    result.Payload = groupingResults;
                    return result;
                case SortType.CustomKeyword:
                    JArray sortObjects = JArray.Parse(sortStrings);
                    // sort here
                    foreach (var item in sortObjects)
                    {
                        Debug.WriteLine(item);
                        dynamic sortObject = JObject.Parse(item.ToString());
                        string id = sortObject[sortKeyword];
                        Debug.WriteLine(id);
                    }
                    break;
                default:
                    return new SortedValues() { Id = 1, Date=  DateTime.Now, Payload = "123"};

            }
            return new SortedValues() { Id = 1, Date = DateTime.Now, Payload = "123" };
        }

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
            try
            {
                return SortObjects(toSortValues);
            }
            // TODO: fix sort type typing
            catch (Exception ex)
            {
                return BadRequest(toSortValues);
            }

            return new SortedValues() { Id = 2, Date = DateTime.Now, Payload = "Test" };
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
            Debug.WriteLine("SortOrder: " + toSortValuesFile.SortType);

            return new SortedValuesFile();
        }
    }
}