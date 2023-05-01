using Microsoft.VisualStudio.TestTools.UnitTesting;
using Sorting.Enums;
using Sorting.Models;

namespace Sorting.Util.Tests
{
    [TestClass()]
    public class SortAlgorithmTests
    {
        [TestMethod("When no sort strings are provided then an empty string is returned")]
        public void SortEmptyString()
        {
            string sortString = string.Empty;
            SortDirection sortDirection = SortDirection.Descending;
            string sortKeyword = string.Empty;

            // Alphabet
            string resultAlphabet = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, SortingType.Alphabet);
            Assert.AreEqual(resultAlphabet, "[]");

            // Number
            string resultNumber = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, SortingType.Number);
            Assert.AreEqual(resultNumber, "[]");

            // Grouping
            string resultGrouping = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, SortingType.Grouping);
            Assert.AreEqual(resultGrouping, "[]");

            // Custom Keyword
            string customEmptyString = @"[]";
            string resultCustomKeyword = SortAlgorithm.Sort(customEmptyString, sortDirection, sortKeyword, SortingType.CustomKeyword);
            Assert.AreEqual(resultCustomKeyword, "[]");
        }

        [TestMethod("Sort alphabet strings in ascending order")]
        public void SortAlphabetAscending()
        {
            string sortString = "[hello,world,omnisort,tests]";
            SortDirection sortDirection = SortDirection.Ascending;
            string sortKeyword = string.Empty;
            SortingType sortingType = SortingType.Alphabet;
            string result = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, sortingType);
            string expectedResult = "[hello,omnisort,tests,world]";
            Assert.AreEqual(result, expectedResult);
        }

        [TestMethod("Sort alphabet strings in descending order")]
        public void SortAlphabetDescending()
        {
            string sortString = "[hello,world,omnisort,tests]";
            SortDirection sortDirection = SortDirection.Descending;
            string sortKeyword = string.Empty;
            SortingType sortingType = SortingType.Alphabet;
            string result = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, sortingType);
            string expectedResult = "[world,tests,omnisort,hello]";
            Assert.AreEqual(result, expectedResult);
        }

        [TestMethod("Sort number strings in ascending order")]
        public void SortNumberAscending()
        {
            string sortString = "[6,1,8,2,0,7,-1,0.9]";
            SortDirection sortDirection = SortDirection.Ascending;
            string sortKeyword = string.Empty;
            SortingType sortingType = SortingType.Number;
            string result = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, sortingType);
            string expectedResult = "[-1,0,0.9,1,2,6,7,8]";
            Assert.AreEqual(result, expectedResult);
        }

        [TestMethod("Sort number strings in descending order")]
        public void SortNumberDescending()
        {
            string sortString = "[6,1,8,2,0,7,-1,0.9]";
            SortDirection sortDirection = SortDirection.Descending;
            string sortKeyword = string.Empty;
            SortingType sortingType = SortingType.Number;
            string result = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, sortingType);
            string expectedResult = "[8,7,6,2,1,0.9,0,-1]";
            Assert.AreEqual(result, expectedResult);
        }

        [TestMethod("Sort grouping strings in ascending order")]
        public void SortGroupingAscending()
        {
            string sortString = "[red,green,black,blue,red,green,green]";
            SortDirection sortDirection = SortDirection.Ascending;
            string sortKeyword = string.Empty;
            SortingType sortingType = SortingType.Grouping;
            string result = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, sortingType);
            string expectedResult = "[[black],[blue],[green,green,green],[red,red]]";
            Assert.AreEqual(result, expectedResult);
        }

        [TestMethod("Sort grouping strings in descending order")]
        public void SortGroupingDescending()
        {
            string sortString = "[red,green,black,blue,red,green,green]";
            SortDirection sortDirection = SortDirection.Descending;
            string sortKeyword = string.Empty;
            SortingType sortingType = SortingType.Grouping;
            string result = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, sortingType);
            string expectedResult = "[[red,red],[green,green,green],[blue],[black]]";
            Assert.AreEqual(result, expectedResult);
        }

        [TestMethod("Sort custom keyword strings in ascending order")]
        public void SortCustomKeywordAscending()
        {
            string sortString =
                @"[{
                    'id': 2,
                    'name': 'Jarvis Jarvan',
                    'age': 6
                   },
                   {
                    'id': 6,
                    'name': 'Arthur Alvarez',
                    'age': 87
                   },
                   {
                    'id': 12,
                    'name': 'Jamie June',
                    'age': 15
                   }]";
            SortDirection sortDirection = SortDirection.Ascending;
            string sortKeyword = "name";
            SortingType sortingType = SortingType.CustomKeyword;
            string result = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, sortingType);
            string expectedResult = "[{\r\n  \"id\": 6,\r\n  \"name\": \"Arthur Alvarez\",\r\n  \"age\": 87\r\n},{\r\n  \"id\": 12,\r\n  \"name\": \"Jamie June\",\r\n  \"age\": 15\r\n},{\r\n  \"id\": 2,\r\n  \"name\": \"Jarvis Jarvan\",\r\n  \"age\": 6\r\n}]";
            Assert.AreEqual(result, expectedResult);
        }

        [TestMethod("Sort custom keyword strings in descending order")]
        public void SortCustomKeywordDescending()
        {
            string sortString =
                @"[{
                    'id': 2,
                    'name': 'Jarvis Jarvan',
                    'age': 6
                   },
                   {
                    'id': 6,
                    'name': 'Arthur Alvarez',
                    'age': 87
                   },
                   {
                    'id': 12,
                    'name': 'Jamie June',
                    'age': 15
                   }]";
            SortDirection sortDirection = SortDirection.Descending;
            string sortKeyword = "id";
            SortingType sortingType = SortingType.CustomKeyword;
            string result = SortAlgorithm.Sort(sortString, sortDirection, sortKeyword, sortingType);
            string expectedResult = "[{\r\n  \"id\": 12,\r\n  \"name\": \"Jamie June\",\r\n  \"age\": 15\r\n},{\r\n  \"id\": 6,\r\n  \"name\": \"Arthur Alvarez\",\r\n  \"age\": 87\r\n},{\r\n  \"id\": 2,\r\n  \"name\": \"Jarvis Jarvan\",\r\n  \"age\": 6\r\n}]";
            Assert.AreEqual(result, expectedResult);
        }
    }
}