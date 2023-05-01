using System.ComponentModel;

namespace Sorting.Enums
{
    public enum SortingType
    {
        Alphabet,
        Number,
        Grouping,

        [Description("Custom Keyword")]
        CustomKeyword
    }
}