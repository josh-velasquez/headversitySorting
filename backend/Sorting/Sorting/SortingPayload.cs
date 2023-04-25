namespace Sorting
{
    public class SortingPayload
    {
        public uint Id { get; set; }
        public DateTime Date { get; set; }
        public string[]? SortingOptions { get; set; }
        public SortingValue[]? SortingObjects { get; set; }
    }

    public class SortingValue : IComparable<SortingValue>
    {
        public uint Id { get; set; }
        public string? Value { get; set; }

        public int CompareTo(SortingValue? other)
        {
            throw new NotImplementedException();
        }
    }
}