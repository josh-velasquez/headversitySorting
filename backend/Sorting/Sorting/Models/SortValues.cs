using System.ComponentModel.DataAnnotations;

namespace Sorting.Models
{
    public class SortValues
    {
        [Required]
        public string? SortStrings { get; set; }

        public string? SortKeyword { get; set; }
        public string[]? SortOrder { get; set; }

        public IFormFile? FormFile { get; set; }
    }
}