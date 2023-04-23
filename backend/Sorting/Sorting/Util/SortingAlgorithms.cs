namespace Sorting.Util
{
    public static class SortingAlgorithms
    {
        public static int[] NumberSort(string[] values)
        {
            int[] intValues = new int[values.Length];
            Array.Sort(intValues);
            return intValues;
        }
        
        public static string[] AlphabetSort(string[] values) {
            string[] strValues = new string[values.Length];
            Array.Sort(values);
            return strValues;
        }


        private static Object[] ConvertObject(string[] values)
        {
            return null;
        }
    }
}
