﻿using System.ComponentModel.DataAnnotations;

namespace Sorting.Models
{
    public class SortValues
    {
        [Required]
        public string SortStrings { get; set; }

        public string? SortKeyword { get; set; }
        public string? SortType { get; set; }
    }

    public class SortValuesFile
    {
        [Required]
        public IFormFile FormFile { get; set; }
        public string? SortKeyword { get; set; }
        public string? SortType { get; set; }
    }
}