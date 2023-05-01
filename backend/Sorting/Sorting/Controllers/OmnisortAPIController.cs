using Microsoft.AspNetCore.Mvc;
using Sorting.Models;

namespace Sorting.Controllers
{
    [Route("api/sort")]
    [ApiController]
    public class OmnisortAPIController : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public ActionResult<SortedValues> SortValues([FromBody] SortValues toSortValues)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                Sort sort = new Sort(toSortValues);
                SortedValues result = new SortedValues()
                {
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now,
                    SortingStatus = Enums.SortingStatus.Success,
                    Payload = sort.SortObjects()
                };
                return result;
            }
            catch (Exception ex)
            {
                SortedValues result = new SortedValues()
                {
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now,
                    SortingStatus = Enums.SortingStatus.Error,
                    Payload = ex.Message
                };
                return result;
            }
        }

        [HttpPost("file")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public ActionResult<SortedValues> SortValuesFile([FromForm] SortValues toSortValuesFile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                Sort sort = new Sort(toSortValuesFile);
                SortedValues result = new SortedValues()
                {
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now,
                    SortingStatus = Enums.SortingStatus.Success,
                    Payload = sort.SortObjectsInFile()
                };
                return result;
            }
            catch (Exception ex)
            {
                SortedValues result = new SortedValues()
                {
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now,
                    SortingStatus = Enums.SortingStatus.Error,
                    Payload = ex.Message
                };
                return result;
            }
        }
    }
}