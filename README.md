# headversitySorting
Sorting assignment for Headversity

## Frontend 
Should handle loading especially with high loads
Should have a feedback option at the footer for improvements

Sample layout:
data:
[
    {
        id: 0
        name: John Doe,
        age: 20,
        weight: 175 (lbs),
        height: 188 (cm)
    },
    {
        id: 1,
        name: Jane Smith,
        age: 22,
        weight: 120 (lbs),
        height: 155 (cm)
    }
]
sort by: age
sort order: highest -> lowest

## Backend
### Sorting algorithms
- quicksort
- heapsort

### Available endpoints
POST request
- returns sorted values with the statistics of how long it took to sort (maybe what algorithm was used to sort it)

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
