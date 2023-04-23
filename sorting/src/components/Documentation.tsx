import React from "react";
import { Container, Divider, Header, Segment } from "semantic-ui-react";
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
          <h4>Hey, can I use Omnisort?</h4>
          <Divider />
          <span>
            Of course you can! We try to encourage creativity with your sorting
            needs and so we have exposed some RESTful API endpoints for you to
            use for your own purpose. Below are the list of endpoints exposed
            along with their information on the shape of expected payloads.
          </span>
          <Segment>Available endpoints</Segment>
        </Segment>
      </Segment>
    </Container>
  );
};

export default Documentation;
