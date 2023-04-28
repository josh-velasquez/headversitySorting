using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Sorting.Models;
using System.Diagnostics;

namespace Sorting.Controllers
{
    [Route("api/sort")]
    [ApiController]
    public class OmnisortAPIController : ControllerBase
    {

        private void SortObjects(SortValues sortValues)
        {
            string sortStrings = sortValues.SortStrings;
            string sortKeyword = sortValues.SortKeyword ?? string.Empty;
            SortType sortType = Enum.Parse<SortType>(sortValues.SortType ?? string.Empty);
            switch (sortType)
            {
                case SortType.Alphabet:
                    // alphabet
                    Debug.WriteLine("Alphabet");
                    break;
                case SortType.Number:
                    // another
                    Debug.WriteLine("Number");
                    break;
                case SortType.Grouping:
                    // grouping
                    Debug.WriteLine("Grouping");
                    break;
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
                    return;

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
                SortObjects(toSortValues);
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