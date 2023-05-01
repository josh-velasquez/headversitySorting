# Omnisort

Sorting assignment for Headversity

This sorting projects leverages the power of LINQ to sort objects. With LINQ, sorting by number, alphabet, grouping, and custom keyword sorting is made possible.

This project uses react for the front-end and uses .NET 6 for the back-end.

The default server url is located in config.json at https://localhost:7006

## Sort options

1. Number - send a list of numbers to be sorted
2. Alphabet - send a list of letters/words and be sorted alphabetically
3. Grouping - send a list of values and will group like values
4. Custom Keyword - send an object and sort according to a key value provided

You can sort varying inputs as long as they conform to the following.

1. The input is enclosed in [] and is separated by , to denote the varying elements to be sorted
2. When using the custom keyword option, ensure that the keyword you want to sort by is present in the object that you are trying to sort

## NOTES

### Security

Authentication was considered but was not included because it was not required in this type of implementation. If we do add some sort of login, then this can be implemented.

### Scaling (storage)

Even though we support file upload sorting, the resulting sorted values sent back to the front-end is of type string rather than a download file link provided by a blob storage. That being said, the size of the content that is sent to the server to be processed is very limited. Future changes can include a blob storage in the back-end to store the files and provide a downloadable link that expires after a certain amount of time.

## Available endpoints

POST request

Route: .../api/sort

### Send a list to sort

```yaml
{
  sortStrings: [7, 2, 1, 9, 0],
  sortDirection: "Ascending",
  formFile: "",
  sortKeyword: "",
  sortType: "Number",
}
```

### Send an object to sort

Route: .../api/sort

```yaml
{
  sortStrings:
    [
      {
        "id": 8,
        "name": "Star",
        "age": 1,
        "weight": "195.67 (lbs)",
        "height": "15.06 (cm)",
      },
      {
        "id": 4,
        "name": "Gareth",
        "age": 2,
        "weight": "53.72 (lbs)",
        "height": "82.21 (cm)",
      },
    ],
  formFile: "",
  sortDirection: "Ascending",
  sortKeyword: "id",
  sortType: "CustomKeyword",
}
```

### Send a file to sort

Route: .../api/sort/file

```yaml
{
    sortStrings: "",
    formFile: "file.txt",
    sortDirection: "Ascending",
    sortKeyword: ""
    sortType: "Number"
}
```

## Logging

The backend has logging for the purpose of tracking requests that might have failed in the process. This allows for easy debugging.
Uses Serilog.ASPnet for logging
