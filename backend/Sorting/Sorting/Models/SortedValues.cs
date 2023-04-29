namespace Sorting.Models
{
    public class SortedValues
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string? Payload { get; set; }
    }

    public class SortedValuesFile
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public IFormFile Payload { get; set; }
    }
}