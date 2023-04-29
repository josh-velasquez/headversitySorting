using Newtonsoft.Json.Linq;

namespace Sorting.Util
{
    public static class Converters
    {
        public static string ConvertToString(string[] values)
        {
            return "[" + string.Join(",", values) + "]";
        }

        public static string ConvertToString(int[] values)
        {
            return "[" + string.Join(",", values) + "]";
        }

        public static string ConvertToString(IGrouping<string, string> values)
        {
            return "[" + string.Join(",", values) + "]";
        }

        public static string ConvertToString(IGrouping<string, string>[] values)
        {
            List<string> valuesList = new List<string>();
            foreach (var value in values)
            {
                valuesList.Add(ConvertToString(value));
            }
            return ConvertToString(valuesList.ToArray<string>());
        }

        //public static string[] ConvertObjectToStringArray(string values)
        //{
        //    string[] strVal = values
        //        .Split(new char[] { ',', '[', ']' })
        //        .Select(x => x.Trim())
        //        .Where(x => !string.IsNullOrEmpty(x))
        //        .ToArray();
        //    Array.Sort(strVal);
        //    return strVal;
        //}

        public static string[] ConvertObjectToStringArray(JToken[] values)
        {
            List<string> test = new List<string>();
            foreach (var value in values)
            {
                test.Add(value.ToObject<string>());
            }
            return test.ToArray();
        }

        public static int[] ConvertObjectToIntArray(string values)
        {
            string[] strVal = values.Split(new char[] { ',', '[', ']' }).Where(x => !string.IsNullOrEmpty(x)).ToArray();
            int[] ints = Array.ConvertAll(strVal, int.Parse);
            return ints;
        }
    }
}