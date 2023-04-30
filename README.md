# headversitySorting
Sorting assignment for Headversity

This sorting projects leverages the power of LINQ to sort objects. With LINQ, sorting by number, alphabet, grouping, and custom keyword sorting is made possible.

NOTES: 
Security - Authentication can be considered but was not included because it was not required in this type of application. If we do add some sort of login, then this can be implemented.

Supports multiple sorting 
Ex: 
Group -> Sort
Flatten -> Sort
Sort within group

### TODO
Front-end changes
- [ ] Add/Show exposed endpoints

Back-end changes
- [ ] Convert functions to async
- [ ] Update CORS policy to only allow certain methods (also update origin urls -- localhost:3000)
- [ ] Sorting algorithms has statistics


## Frontend 
Uses Semantic ui modules for front end design
Should handle loading especially with high loads
Should have a feedback option at the footer for improvements

The front-end is designed to be simple to demonstrate a clear interaction design with the users. 

Sample layout:
```yaml
data:
[
    {
        "id": 4,
        "name": "John Doe",
        "age": 20,
        "weight": "175 (lbs)",
        "height": "188 (cm)"
    },
    {
        "id": 1,
        "name": "Jane Smith",
        "age": 22,
        "weight": "120 (lbs)",
        "height": "155 (cm)"
    }
]
```
sort by: age
sort order: highest -> lowest

## Backend
### Sorting algorithms
- quicksort
- heapsort

### Available endpoints
POST request
- returns sorted values with the statistics of how long it took to sort (maybe what algorithm was used to sort it)
```yaml
request = {
    id: requestId,
    date: submissionDate,
    options: sortingOptions
    contents: [
        {
            id: contentId,
            name: contentName
        }
    ]
}
```


### Sorting functions

#### Simple sorting
User can enter text separated by , in a text area
User can sort numbers, alphabet
Sorting within an array (2D, 3D arrays sorting)
Sort by length of words

#### Sorting objects 
Sort by ID
Sort by keys
Sort by date
Sort by size (length)
Sort by type
Sort by file name
Shape sorting -- similar shapes (dimensions)?
Colour sorting -- group colours together?
Sort by height
Sort by weight
Group together (for common values?)

### Logging
The backend has a custom logging for the purpose of tracking requests that might have failed in the process. This allows for easy debugging.
Uses Serilog.ASPnet for logging