using System.ComponentModel;

namespace Sorting.Models
{
    public enum SortType
    {
        Alphabet,
        Number,
        Grouping,

        [Description("Custom Keyword")]
        CustomKeyword
    }
}