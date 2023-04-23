import React from "react";
import { Container, Grid, GridColumn, Icon, Segment } from "semantic-ui-react";

class SortFormatSamples extends React.Component {
  render() {
    return (
      <Grid columns={3} divided="vertically" textAlign="center">
        <Grid.Column width={6}>
          <Segment style={{ backgroundColor: "#eff6e0" }} textAlign="left">
            <Segment secondary>
              ['red','blue','green','red','red','green']
            </Segment>
            <Segment secondary>
              [[8,4,19,3],[19,18,[2,0,1]],[[6,2],9,9,1]]
            </Segment>
            <Segment secondary>[😃,🤪,🥸,😍,😭]</Segment>
            <Segment secondary>[''b','d','a','K','r'']</Segment>
            <Segment secondary>[5,3,10,7,12,56]</Segment>
            <Segment secondary>
              <pre>
                {JSON.stringify(
                  {
                    id: 0,
                    name: "John Doe",
                    age: 20,
                    weight: "175 (lbs)",
                    height: "188 (cm)",
                  },
                  null,
                  2
                )}
                ,
                {JSON.stringify(
                  {
                    id: 1,
                    name: "Jane Smith",
                    age: 22,
                    weight: "120 (lbs)",
                    height: "155 (cm)",
                  },
                  null,
                  2
                )}
              </pre>
            </Segment>
          </Segment>
        </Grid.Column>
        <GridColumn
          width={4}
          textAlign="center"
          align="center"
          style={{ justifyContent: "center", justify: "center" }}
        >
          <Segment style={{ backgroundColor: "#eff6e0" }}>
            <Segment secondary>
              <Container>
                Sort by group
                <Icon className="arrow right" />
              </Container>
            </Segment>
            <Segment secondary>
              <Container>
                Flatten and sort
                <Icon className="arrow right" />
              </Container>
            </Segment>
            <Segment secondary>
              <Container>
                Sort by Unicode
                <Icon className="arrow right" />
              </Container>
            </Segment>
            <Segment secondary>
              <Container>
                Sort by Alphabet
                <Icon className="arrow right" />
              </Container>
            </Segment>
            <Segment secondary>
              <Container>
                Sort by Number
                <Icon className="arrow right" />
              </Container>
            </Segment>
            <Segment secondary>
              <Container>
                Sort by Keyword
                <Icon className="arrow right" />
              </Container>
            </Segment>
          </Segment>
        </GridColumn>
        <Grid.Column width={6}>
          <Segment style={{ backgroundColor: "#eff6e0" }} textAlign="left">
            <Segment secondary>
              [['red','red','red'],'blue',['green','green]]
            </Segment>
            <Segment secondary>
              [[3,4,8,19],[18,19,[0,1,2]],[[2,6],1,9,9]]
            </Segment>
            <Segment secondary>[😃,🤪,🥸,😍,😭]</Segment>
            <Segment secondary>[''b','d','a','K','r'']</Segment>
            <Segment secondary>[5,3,10,7,12,56]</Segment>
            <Segment secondary>
              <pre>
                {JSON.stringify(
                  {
                    id: 0,
                    name: "John Doe",
                    age: 20,
                    weight: "175 (lbs)",
                    height: "188 (cm)",
                  },
                  null,
                  2
                )}
                ,
                {JSON.stringify(
                  {
                    id: 1,
                    name: "Jane Smith",
                    age: 22,
                    weight: "120 (lbs)",
                    height: "155 (cm)",
                  },
                  null,
                  2
                )}
              </pre>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default SortFormatSamples;
