// import Header from './Header'
import Sort from "./Sort";
import React from "react";
import { Container, Header, Grid, Divider } from "semantic-ui-react";
import SortingCriteria from "./SortingCriteria";
import SortFormatSamples from "./SortFormatSamples";
import NavBar from "./NavBar";

class App extends React.Component {
  render() {
    return (
      // 875
      <div style={{ backgroundColor: "#FFD1DC", height: 1500 }}>
        <NavBar />
        <Container>
          <Header as="h1" icon textAlign="center">
            Sorting
            <Header.Subheader>Sort anything you want!</Header.Subheader>
          </Header>
          <Divider />
          <Grid divided>
            <Grid.Row>
              {/* <Grid.Column width={4} color="red">
                <h4>Formatting Samples</h4>
                <Divider />
                <SortFormatSamples />
              </Grid.Column> */}
              <Grid.Column color="blue">
                <p>
                  <Sort />
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column color="green">
                <h4>Sorting Criteria</h4>
                <Divider />
                <SortingCriteria />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Grid>
            <Grid.Column width={6} color="red">
              <h4>Formatting Samples</h4>
              <Divider />
              <SortFormatSamples />
            </Grid.Column>
            <Grid.Column width={10} color="purple">
              <h4>Information about the sorting functions</h4>
              <Divider />
              The sorter can sort any type of arrays that you throw at it.
            </Grid.Column>
          </Grid>
          <Divider />
        </Container>
      </div>
    );
  }
}

export default App;
