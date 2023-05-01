namespace Sorting.Models
{
    public class SortValues
    {
        public string SortType { get; set; }
        public string SortDirection { get; set; }
        public string? SortStrings { get; set; }
        public IFormFile? FormFile { get; set; }
        public string? SortKeyword { get; set; }
    }
}