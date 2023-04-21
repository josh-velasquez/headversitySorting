import React, { useState } from "react";
import { TextArea, Container, Button, Form } from "semantic-ui-react";
import axios from "axios";

interface SortingPayload {
  id: number;
  objects: string;
}

const Sort: React.FC = () => {
  const [values, setValues] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post("https://localhost:7006/sorting", {
      payload: values,
    });
    console.warn("SENT");
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <TextArea value={values} onChange={(e) => setValues(e.target.value)} placeholder="Enter your data here..." />
        <Button>Sort</Button>
      </Form>
    </Container>
  );
};

export default Sort;
