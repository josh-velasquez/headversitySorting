using Sorting.Enums;
using Sorting.Util;
using System.Text;

namespace Sorting.Models
{
    public class Sort
    {
        private SortValues sortValues;

        public Sort(SortValues sortValues)
        {
            this.sortValues = sortValues;
        }

        public string SortObjects()
        {
            if (sortValues.SortStrings == null)
            {
                return string.Empty;
            }
            string sortStrings = sortValues.SortStrings.Trim();
            SortDirection sortDirection = Enum.Parse<SortDirection>(sortValues.SortDirection ?? string.Empty);
            string sortKeyword = sortValues.SortKeyword ?? string.Empty.Trim();
            SortingType sortType = Enum.Parse<SortingType>(sortValues.SortType ?? string.Empty);
            string sortedStrings = SortAlgorithm.Sort(sortStrings, sortDirection, sortKeyword, sortType);
            return sortedStrings;
        }

        public string SortObjectsInFile()
        {
            if (sortValues.FormFile == null)
            {
                return string.Empty;
            }
            IFormFile file = sortValues.FormFile;
            SortDirection sortDirection = Enum.Parse<SortDirection>(sortValues.SortDirection ?? string.Empty);
            string sortKeyword = sortValues.SortKeyword ?? string.Empty.Trim();
            SortingType sortType = Enum.Parse<SortingType>(sortValues.SortType ?? string.Empty);

            StringBuilder stringBuilder = new StringBuilder();
            using (StreamReader reader = new StreamReader(file.OpenReadStream()))
            {
                while (reader.Peek() >= 0)
                {
                    stringBuilder.Append(reader.ReadLine());
                }
            }
            string sortStrings = stringBuilder.ToString();
            string sortedStrings = SortAlgorithm.Sort(sortStrings, sortDirection, sortKeyword, sortType);
            return sortedStrings;
        }
    }
}