using Newtonsoft.Json.Linq;
using Sorting.Models;

namespace Sorting.Util
{
    public static class SortingAlgorithms
    {
        private static readonly char[] delimeters = new char[] { ',', '[', ']' };

        public static string[] AlphabetSort(string values, SortDirection sortDirection)
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

        public static IGrouping<string, string>[] GroupStringSort(string values, SortDirection sortDirection)
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

        public static string[] NumberSort(string values, SortDirection sortDirection)
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

        public static JToken[] ObjectSortByKeyword(JArray values, string sortKeyword, SortDirection sortDirection)
        {
            switch (sortDirection)
            {
                case SortDirection.Ascending:
                    return new JArray(values.OrderBy(obj => obj[sortKeyword])).ToArray();

                case SortDirection.Descending:
                    return new JArray(values.OrderByDescending(obj => obj[sortKeyword])).ToArray();

                default:
                    break;
            }
            return new JArray(values.OrderBy(obj => obj[sortKeyword])).ToArray();
        }

        #region QuickSort

        public static int[] QuickSort(int[] values)
        {
            QuickSortHelper(values, 0, values.Length - 1);
            return values;
        }

        private static void Swap(int[] arr, int i, int j)
        {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        private static int Partition(int[] arr, int low, int high)
        {
            int pivot = arr[high];

            int i = (low - 1);

            for (int j = low; j <= high; j++)
            {
                if (arr[j] < pivot)
                {
                    i++;
                    Swap(arr, i, j);
                }
            }
            Swap(arr, i + 1, high);
            return (i + 1);
        }

        private static void QuickSortHelper(int[] arr, int low, int high)
        {
            if (low < high)
            {
                int partitionIndex = Partition(arr, low, high);

                QuickSortHelper(arr, low, partitionIndex - 1);
                QuickSortHelper(arr, partitionIndex + 1, high);
            }
        }

        #endregion QuickSort
    }
}