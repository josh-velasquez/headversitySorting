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
                    Debug.WriteLine("Alphabet Sort");
                    string[] alphabetVals = SortingAlgorithms.AlphabetSort(sortStrings);
                    string alphabetResults = Converters.ConvertToString(alphabetVals);
                    result.Payload = alphabetResults;
                    return result;

                case SortType.Number:
                    Debug.WriteLine("Number Sort");
                    string[] numberVals = SortingAlgorithms.NumberSortAscending(sortStrings);
                    string numberResults = Converters.ConvertToString(numberVals);
                    result.Payload = numberResults;
                    return result;

                case SortType.Grouping:
                    Debug.WriteLine("Grouping Sort");
                    IGrouping<string, string>[] groupVals = SortingAlgorithms.GroupStringSort(sortStrings);
                    string groupingResults = Converters.ConvertToString(groupVals);
                    result.Payload = groupingResults;
                    return result;

                case SortType.CustomKeyword:
                    Debug.WriteLine("Custom Sort");

                    //// sort here
                    //foreach (var item in sortObjects)
                    //{
                    //    Debug.WriteLine(item);
                    //    dynamic sortObject = JObject.Parse(item.ToString());
                    //    string id = sortObject[sortKeyword];
                    //    Debug.WriteLine(id);
                    //}
                    //break;
                    // TODO: Fix custom objects
                    JArray sortObjects = JArray.Parse(sortStrings);
                    JToken[] customResult = SortingAlgorithms.ObjectSort(sortObjects, sortKeyword);
                    string[] res = Converters.ConvertObjectToStringArray(customResult);
                    string test = Converters.ConvertToString(res);
                    result.Payload = test;
                    return result;

                default:
                    return new SortedValues() { Id = 1, Date = DateTime.Now, Payload = "123" };
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
        }

        [HttpPost("file")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<SortedValuesFile> SortValuesFile([FromForm] SortValuesFile toSortValuesFile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (toSortValuesFile == null)
            {
                return BadRequest(toSortValuesFile);
            }

            Debug.WriteLine("FILE: " + toSortValuesFile.FormFile.FileName);
            Debug.WriteLine("SortKeyword: " + toSortValuesFile.SortKeyword);
            Debug.WriteLine("SortOrder: " + toSortValuesFile.SortType);

            return new SortedValuesFile();
        }
    }
}