import React, { useState } from "react";
import { TextArea, Container, Button, Form, Header, Divider } from "semantic-ui-react";
import axios from "axios";

interface SortingPayload {
  id: number;
  objects: string;
}

const Sort: React.FC = () => {
  const [values, setValues] = useState("");
  const [results, setResults] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post("https://localhost:7006/sorting", {
      payload: values,
    }).then(response => {
      setResults(JSON.stringify(response.data.payload));
    }).catch(error => {
      console.warn("ERROR: " + error)
    });
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <TextArea value={values} onChange={(e) => setValues(e.target.value)} placeholder="Enter your data here..." />
        <Button>Sort</Button>
      </Form>
      <Divider />
      <h4>Results:</h4>
      <Form>
        <TextArea value={results} placeholder="Results..." />
      </Form>
    </Container>
  );
};

export default Sort;
