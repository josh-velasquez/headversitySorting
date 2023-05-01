using Sorting.Enums;

namespace Sorting.Models
{
    public class SortedValues
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public SortingStatus SortingStatus { get; set; }
        public string? Payload { get; set; }
    }
}