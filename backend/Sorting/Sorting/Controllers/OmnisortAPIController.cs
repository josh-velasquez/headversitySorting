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
            // TODO: Fix formatting of this code (extract this function to another class maybe)
            string sortStrings = sortValues.SortStrings.Trim();
            SortDirection sortDirection = Enum.Parse<SortDirection>(sortValues.SortDirection ?? string.Empty);
            string sortKeyword = sortValues.SortKeyword ?? string.Empty.Trim();
            SortType sortType = Enum.Parse<SortType>(sortValues.SortType ?? string.Empty);

            SortedValues result = new SortedValues()
            {
                Id = Guid.NewGuid(),
                Date = DateTime.Now
            };

            switch (sortType)
            {
                case SortType.Alphabet:
                    Debug.WriteLine("Alphabet Sort");
                    string[] alphabetVals = SortingAlgorithms.AlphabetSort(sortStrings, sortDirection);
                    string alphabetResults = Converters.ConvertToString(alphabetVals);
                    result.Payload = alphabetResults;
                    return result;

                case SortType.Number:
                    Debug.WriteLine("Number Sort");
                    string[] numberVals = SortingAlgorithms.NumberSort(sortStrings, sortDirection);
                    string numberResults = Converters.ConvertToString(numberVals);
                    result.Payload = numberResults;
                    return result;

                case SortType.Grouping:
                    Debug.WriteLine("Grouping Sort");
                    IGrouping<string, string>[] groupVals = SortingAlgorithms.GroupStringSort(sortStrings, sortDirection);
                    string groupingResults = Converters.ConvertToString(groupVals);
                    result.Payload = groupingResults;
                    return result;

                case SortType.CustomKeyword:
                    Debug.WriteLine("Custom Sort"); JArray sortObjects = JArray.Parse(sortStrings);
                    JToken[] customResult = SortingAlgorithms.ObjectSortByKeyword(sortObjects, sortKeyword, sortDirection);
                    string customKeywordResults = Converters.ConvertToString(customResult);
                    result.Payload = customKeywordResults;
                    return result;

                default:
                    result.Payload = "No valid sorting...";
                    return result;
            }
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
            catch (Exception ex)
            {
                return BadRequest("Unable to sort objects: " + ex);
            }
        }

        private SortedValuesFile SortObjectsInFile(SortValuesFile sortValuesFile)
        {
            //string sortStrings = sortValues.SortStrings.Trim();
            IFormFile file = sortValuesFile.FormFile;
            SortDirection sortDirection = Enum.Parse<SortDirection>(sortValuesFile.SortDirection ?? string.Empty);
            string sortKeyword = sortValuesFile.SortKeyword ?? string.Empty.Trim();
            SortType sortType = Enum.Parse<SortType>(sortValuesFile.SortType ?? string.Empty);
            
            using (var memStream = new MemoryStream())
            {
                file.CopyTo(memStream);
            }
            return new SortedValuesFile();
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
            try
            {
                return SortObjectsInFile(toSortValuesFile);
            }catch (Exception ex)
            {
                return BadRequest("Unable to sort objects: " + ex);
            }

            Debug.WriteLine("FILE: " + toSortValuesFile.FormFile.FileName);
            Debug.WriteLine("SortKeyword: " + toSortValuesFile.SortKeyword);
            Debug.WriteLine("SortOrder: " + toSortValuesFile.SortType);

            return new SortedValuesFile();
        }
    }
}