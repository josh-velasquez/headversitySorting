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

        public static string ConvertToString(JToken[] values)
        {
            string[] valuesArray = new string[values.Length];
            for (int i = 0; i < valuesArray.Length; i++)
            {
                valuesArray[i] = JObject.Parse(values[i].ToString().Trim()).ToString(); //.ToString();
            }
            return ConvertToString(valuesArray);
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

        public static int[] ConvertObjectToIntArray(string values)
        {
            string[] strVal = values.Split(new char[] { ',', '[', ']' }).Where(x => !string.IsNullOrEmpty(x)).ToArray();
            int[] ints = Array.ConvertAll(strVal, int.Parse);
            return ints;
        }
    }
}