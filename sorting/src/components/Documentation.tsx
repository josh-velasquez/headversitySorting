import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Menu,
  Segment,
} from "semantic-ui-react";
import SortFormatSamples from "./SortFormatSamples";

const Documentation: React.FC = () => {
  return (
    <Container>
      <Segment raised clearing className="segment-container" inverted>
        <Header as="h2">Documentation</Header>
        <Divider />
        <Segment className="segment-content">
          <span>Here are some examples of what you can sort!</span>
        </Segment>
        <SortFormatSamples />
        <Segment className="segment-content">
          <h3>Hey, can I use Omnisort?</h3>
          <Divider />
          <span>
            Of course you can! We try to encourage creativity with your sorting
            needs and so we have exposed some RESTful API endpoints for you to
            use for your own purpose. Below are the list of endpoints exposed
            along with their information on the shape of expected payloads.
          </span>
          <Segment>
            <h4>Available endpoints</h4>
            <Divider />
            <h5>Send a list to sort</h5>
            <span>
              You can use this endpoint for the default sorting as long as you
              provide the to sort values and sort direction. Here is the sample
              payload that you can send to the server.
            </span>
            <Grid celled="internally">
              <Grid.Row>
                <Grid.Column width={3}>Payload: POST</Grid.Column>
                <Grid.Column width={10}>Route: .../api/sort</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>sortStrings: string</Grid.Column>
                <Grid.Column width={10}>[]</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>formFile: File</Grid.Column>
                <Grid.Column width={10}>null</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>sortDirection: string</Grid.Column>
                <Grid.Column width={10}>Ascending, Descending</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>
                  sortKeyword: string (optional)
                </Grid.Column>
                <Grid.Column width={10}>""</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>sortType: string (optional)</Grid.Column>
                <Grid.Column width={10}>
                  Number, Alphabet, Grouping, CustomKeyword
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <pre>
              {JSON.stringify(
                {
                  sortStrings: "[7,2,0,1,4,3,9]",
                  formFile: "",
                  sortDirection: "Ascending",
                  sortKeyword: "",
                  sortType: "Number",
                },
                null,
                2
              )}
            </pre>
            <span>
              If you want to send a JSON object then you can format it like
              this!
            </span>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(
                {
                  sortStrings:
                    '[{"id":5,"name":"John Doe","age":26,"weight":"175 (lbs)","height":"188 (cm)"},{"id":2,"name":"Jane Smith","age":22,"weight":"120 (lbs)","height":"155 (cm)"}]',
                  formFile: "",
                  sortDirection: "Ascending",
                  sortKeyword: "id",
                  sortType: "CustomKeyword",
                },
                null,
                2
              )}
            </pre>
            <h5>Send a file to sort</h5>
            <span>
              You can also send a file filled with values to be sorted! Just
              make sure the formFile if of type File when sending to the server!
            </span>
            <Grid celled="internally">
              <Grid.Row>
                <Grid.Column width={3}>Payload: POST</Grid.Column>
                <Grid.Column width={10}>Route: .../api/sort/file</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>sortStrings: string</Grid.Column>
                <Grid.Column width={10}>null</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>formFile: File</Grid.Column>
                <Grid.Column width={10}></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>sortDirection: string</Grid.Column>
                <Grid.Column width={10}>Ascending, Descending</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>
                  sortKeyword: string (optional)
                </Grid.Column>
                <Grid.Column width={10}>""</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>sortType: string (optional)</Grid.Column>
                <Grid.Column width={10}>
                  Number, Alphabet, Grouping, CustomKeyword
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <pre>
              {JSON.stringify(
                {
                  sortStrings: "",
                  formFile: "file.txt",
                  sortDirection: "Ascending",
                  sortKeyword: "",
                  sortType: "Grouping",
                },
                null,
                2
              )}
            </pre>
          </Segment>
        </Segment>
      </Segment>
    </Container>
  );
};

export default Documentation;
