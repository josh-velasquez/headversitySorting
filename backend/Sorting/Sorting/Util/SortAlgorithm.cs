using Newtonsoft.Json.Linq;
using Sorting.Enums;
using Sorting.Models;

namespace Sorting.Util
{
    public static class SortAlgorithm
    {
        private static readonly char[] delimeters = new char[] { ',', '[', ']' };

        public static string Sort(string sortStrings, SortDirection sortDirection, string sortKeyword, SortingType sortType)
        {
            switch (sortType)
            {
                case SortingType.Alphabet:
                    string[] alphabetVals = AlphabetSort(sortStrings, sortDirection);
                    return Converters.ConvertToString(alphabetVals);

                case SortingType.Number:
                    string[] numberVals = NumberSort(sortStrings, sortDirection);
                    return Converters.ConvertToString(numberVals);

                case SortingType.Grouping:
                    IGrouping<string, string>[] groupVals = GroupStringSort(sortStrings, sortDirection);
                    return Converters.ConvertToString(groupVals);

                case SortingType.CustomKeyword:
                    JArray sortObjects = JArray.Parse(sortStrings);
                    JToken[] customResult = ObjectSortByKeyword(sortObjects, sortKeyword, sortDirection);
                    return Converters.ConvertToString(customResult);

                default:
                    return string.Empty;
            }
        }

        private static string[] AlphabetSort(string values, SortDirection sortDirection)
        {
            IEnumerable<string> results = values
                .Split(delimeters)
                .Select(x => x.Trim())
                .Where(x => !string.IsNullOrEmpty(x));
            switch (sortDirection)
            {
                case SortDirection.Ascending:
                    results = results.OrderBy(x => x);
                    break;

                case SortDirection.Descending:
                    results = results.OrderByDescending(x => x);
                    break;

                default:
                    results = results.OrderBy(x => x);
                    break;
            }
            return results.ToArray();
        }

        private static IGrouping<string, string>[] GroupStringSort(string values, SortDirection sortDirection)
        {
            IEnumerable<string> results = values
                .Split(delimeters)
                .Select(x => x.Trim())
                .Where(x => !string.IsNullOrEmpty(x));
            switch (sortDirection)
            {
                case SortDirection.Ascending:
                    results = results.OrderBy(x => x);
                    break;

                case SortDirection.Descending:
                    results = results.OrderByDescending(x => x);
                    break;

                default:
                    results = results.OrderBy(x => x);
                    break;
            }
            return results.GroupBy(x => x).ToArray();
        }

        private static string[] NumberSort(string values, SortDirection sortDirection)
        {
            IEnumerable<string> results = values
                .Split(delimeters)
                .Select(x => x.Trim())
                .Where(x => !string.IsNullOrEmpty(x));
            switch (sortDirection)
            {
                case SortDirection.Ascending:
                    results = results.OrderBy(x => float.Parse(x));
                    break;

                case SortDirection.Descending:
                    results = results.OrderByDescending(x => float.Parse(x));
                    break;

                default:
                    results = results.OrderBy(x => float.Parse(x));
                    break;
            }
            return results.ToArray();
        }

        private static JToken[] ObjectSortByKeyword(JArray values, string sortKeyword, SortDirection sortDirection)
        {
            switch (sortDirection)
            {
                case SortDirection.Ascending:
                    return new JArray(values.OrderBy(x =>
                    {
                        if (float.TryParse((string?)x[sortKeyword], out float intVal))
                        {
                            return float.Parse(Convert.ToString(intVal));
                        }
                        return x[sortKeyword];
                    })).ToArray();

                case SortDirection.Descending:
                    return new JArray(values.OrderByDescending(x =>
                    {
                        if (float.TryParse((string?)x[sortKeyword], out float intVal))
                        {
                            return float.Parse(Convert.ToString(intVal));
                        }
                        return x[sortKeyword];
                    })).ToArray();

                default:
                    break;
            }
            return new JArray(values.OrderBy(obj => obj[sortKeyword])).ToArray();
        }
    }
}