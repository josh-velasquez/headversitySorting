import React from "react";
import { Container, Grid, GridColumn, Icon, Segment } from "semantic-ui-react";

class SortFormatSamples extends React.Component {
  render() {
    return (
      <Grid columns={3} divided="vertically" textAlign="center">
        <Grid.Column width={6}>
          <Segment style={{ backgroundColor: "#eff6e0" }} textAlign="left">
            <Segment secondary>[5,3,10,7,12,56]</Segment>
            <Segment secondary>[red,blue,red,black,blue,yellow,blue]</Segment>
            <Segment secondary>[b,d,a,K,r]</Segment>

            <Segment secondary>
              <pre>
                {JSON.stringify(
                  {
                    id: 8,
                    name: "Star",
                    age: 1,
                    weight: "195.67 (lbs)",
                    height: "15.06 (cm)",
                  },
                  null,
                  2
                )}
                ,
                {JSON.stringify(
                  {
                    id: 4,
                    name: "Gareth",
                    age: 2,
                    weight: "53.72 (lbs)",
                    height: "82.21 (cm)",
                  },
                  null,
                  2
                )}
                ,
                {JSON.stringify(
                  {
                    id: 11,
                    name: "Tailor",
                    age: 3,
                    weight: "140.27 (lbs)",
                    height: "223.43 (cm)",
                  },
                  null,
                  2
                )}
                ,
                {JSON.stringify(
                  {
                    id: 2,
                    name: "Agretha",
                    age: 4,
                    weight: "46 (lbs)",
                    height: "249.2 (cm)",
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
                Sort by Number
                <Icon className="arrow right" />
              </Container>
            </Segment>
            <Segment secondary>
              <Container>
                Sort by Group
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
                Sort by Keyword (id)
                <Icon className="arrow right" />
              </Container>
            </Segment>
          </Segment>
        </GridColumn>
        <Grid.Column width={6}>
          <Segment style={{ backgroundColor: "#eff6e0" }} textAlign="left">
            <Segment secondary>[3,5,7,10,12,56]</Segment>
            <Segment secondary>
              [[black],[blue,blue,blue],[red,red],[yellow]]
            </Segment>
            <Segment secondary>[a,b,d,K,r]</Segment>
            <Segment secondary>
              <pre>
                {JSON.stringify(
                  {
                    id: 4,
                    name: "Gareth",
                    age: 2,
                    weight: "53.72 (lbs)",
                    height: "82.21 (cm)",
                  },
                  null,
                  2
                )}
                ,
                {JSON.stringify(
                  {
                    id: 8,
                    name: "Star",
                    age: 1,
                    weight: "195.67 (lbs)",
                    height: "15.06 (cm)",
                  },
                  null,
                  2
                )}
                ,
                {JSON.stringify(
                  {
                    id: 9,
                    name: "Agretha",
                    age: 4,
                    weight: "46 (lbs)",
                    height: "249.2 (cm)",
                  },
                  null,
                  2
                )}
                ,
                {JSON.stringify(
                  {
                    id: 11,
                    name: "Tailor",
                    age: 3,
                    weight: "140.27 (lbs)",
                    height: "223.43 (cm)",
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
