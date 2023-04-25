namespace Sorting.Util
{
    public static class SortingAlgorithms
    {
        public static void NumberSort(int[] values)
        {
            Array.Sort(values);
        }

        public static string[] AlphabetSort(int[] values)
        {
            string[] strValues = new string[values.Length];
            Array.Sort(values);
            return strValues;
        }

        public static int[] ConvertObject(string values)
        {
            string[] strVal = values.Split(new char[] { ',', '[', ']' }).Where(x => !string.IsNullOrEmpty(x)).ToArray();
            int[] ints = Array.ConvertAll(strVal, int.Parse);
            return ints;
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