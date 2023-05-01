# Omnisort

Sorting assignment for Headversity

This sorting projects leverages the power of LINQ to sort enumarable objects. With LINQ, sorting by number, alphabet, grouping, and custom keyword sorting is made possible.

This project uses react for the front-end and uses .NET 6 for the back-end.

The target server url is located in config.json with the default url https://localhost:7006

## Sort options

1. Number - send a list of numbers to be sorted
2. Alphabet - send a list of letters/words and be sorted alphabetically
3. Grouping - send a list of values and will group like values
4. Custom Keyword - send an object and sort according to a key value provided

You can sort varying inputs as long as they conform to the following:

1. The input is enclosed in [] and is separated by , to denote the varying elements to be sorted
2. When using the custom keyword option, ensure that the keyword you want to sort by is present in the object that you are trying to sort

## NOTES

### Security

Authentication was considered but was not included because it was not required in this type of implementation. If we do add some sort of login where a user can store their sorting files etc..., then this can be considered to be implemented.

### Scaling (storage)

Even though we support file upload sorting, the resulting sorted values sent back to the front-end is of type string rather than a download file link provided by the back-end from a blob storage. That being said, the size of the content that is sent from the server to the client is very limited and is also dependent on which [browser](https://www.motobit.com/help/scptutl/pa98.htm) is used. Once a blob storage is implemented then the user can send a file to be sorted which is then read in the server and is written back to a file which is then stored in a blob storage. The server will then send back a payload which contains a download link to the file which is only available for a certain period of time and is then deleted to manage storage resources.

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
