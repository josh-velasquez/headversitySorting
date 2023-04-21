import React from "react";
import { TextArea, Container, Button, Form } from "semantic-ui-react";

class Sort extends React.Component {
  render() {
    return (
      <Container>
        <Form>
          <TextArea placeholder="Enter your data here..." />
        </Form>
        <Button>Sort</Button>
      </Container>
    );
  }
}

export default Sort;
