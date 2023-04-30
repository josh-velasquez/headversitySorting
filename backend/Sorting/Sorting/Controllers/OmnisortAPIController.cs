using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Sorting.Models;
using Sorting.Util;
using System.Diagnostics;
using System.Text;

namespace Sorting.Controllers
{
    [Route("api/sort")]
    [ApiController]
    public class OmnisortAPIController : ControllerBase
    {

        private string SortValues(string sortStrings, SortDirection sortDirection, string sortKeyword, SortType sortType)
        {
            // TODO: Fix formatting of this code (extract this function to another class maybe)
            switch (sortType)
            {
                case SortType.Alphabet:
                    Debug.WriteLine("Alphabet Sort");
                    string[] alphabetVals = SortingAlgorithms.AlphabetSort(sortStrings, sortDirection);
                    return Converters.ConvertToString(alphabetVals);

                case SortType.Number:
                    Debug.WriteLine("Number Sort");
                    string[] numberVals = SortingAlgorithms.NumberSort(sortStrings, sortDirection);
                    return Converters.ConvertToString(numberVals);

                case SortType.Grouping:
                    Debug.WriteLine("Grouping Sort");
                    IGrouping<string, string>[] groupVals = SortingAlgorithms.GroupStringSort(sortStrings, sortDirection);
                    return Converters.ConvertToString(groupVals);

                case SortType.CustomKeyword:
                    Debug.WriteLine("Custom Sort"); JArray sortObjects = JArray.Parse(sortStrings);
                    JToken[] customResult = SortingAlgorithms.ObjectSortByKeyword(sortObjects, sortKeyword, sortDirection);
                    return Converters.ConvertToString(customResult);

                default:
                    return string.Empty;
            }
        }

        private SortedValues SortObjects(SortValues sortValues)
        {
            string sortStrings = sortValues.SortStrings.Trim();
            SortDirection sortDirection = Enum.Parse<SortDirection>(sortValues.SortDirection ?? string.Empty);
            string sortKeyword = sortValues.SortKeyword ?? string.Empty.Trim();
            SortType sortType = Enum.Parse<SortType>(sortValues.SortType ?? string.Empty);

            SortedValues result = new SortedValues()
            {
                Id = Guid.NewGuid(),
                Date = DateTime.Now,
                Payload = SortValues(sortStrings, sortDirection, sortKeyword, sortType)
            };

            return result;
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
            IFormFile file = sortValuesFile.FormFile;
            string fileName = file.FileName;
            SortDirection sortDirection = Enum.Parse<SortDirection>(sortValuesFile.SortDirection ?? string.Empty);
            string sortKeyword = sortValuesFile.SortKeyword ?? string.Empty.Trim();
            SortType sortType = Enum.Parse<SortType>(sortValuesFile.SortType ?? string.Empty);
            
            // TODO: move to async function
            StringBuilder stringBuilder = new StringBuilder();
            using (StreamReader reader = new StreamReader(file.OpenReadStream()))
            {
                while (reader.Peek() >= 0)
                {
                    stringBuilder.Append(reader.ReadLine());
                }
            }
            string sortStrings = stringBuilder.ToString();
            string payload = SortValues(sortStrings, sortDirection, sortKeyword, sortType);



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
        }
    }
}