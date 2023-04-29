using Newtonsoft.Json.Linq;
using System;

namespace Sorting.Util
{
    public static class SortingAlgorithms
    {
        private readonly static char[] delimeters = new char[] { ',', '[', ']' };

        public static string[] AlphabetSort(string values)
        {
            return values
                .Split(delimeters)
                .Select(x => x.Trim())
                .Where(x => !string.IsNullOrEmpty(x))
                .OrderBy(x => x)
                .ToArray();
        }

        public static IGrouping<string, string>[] GroupStringSort(string values)
        {
            var strVal = values
                .Split(delimeters)
                .Select(x => x.Trim())
                .Where(x => !string.IsNullOrEmpty(x))
                .OrderBy(x => x)
                .GroupBy(x => x)
                .ToArray();
            return strVal;
        }

        public static string[] NumberSortAscending(string values)
        {
            return values
                .Split(delimeters)
                .Select(x => x.Trim())
                .Where(x => !string.IsNullOrEmpty(x))
                .OrderBy(x => int.Parse(x))
                .ToArray();
        }

        public static string[] NumberSortDescending(string values)
        {
            return values
                .Split(delimeters)
                .Select(x => x.Trim())
                .Where(x => !string.IsNullOrEmpty(x))
                .OrderByDescending(x => int.Parse(x))
                .ToArray();
        }

        public static JToken[] ObjectSort(JArray values, string sortKeyword)
        {
            return  new JArray(values.OrderBy(obj => (string)obj[sortKeyword])).ToArray();
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