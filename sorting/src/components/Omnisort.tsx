import React, { useState } from "react";
import {
  TextArea,
  Container,
  Button,
  Form,
  Divider,
  Dropdown,
  DropdownItemProps,
  Segment,
} from "semantic-ui-react";
import axios from "axios";
import * as _ from "lodash";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

// interface SortingPayload {
//   id: number;
//   objects: string;
// }

enum Keywords {
  Alphabet = "Alphabet",
  Number = "Number",
  Grouping = "Grouping",
  CustomKeyword = "Custom keyword",
  Test1 = "test1",
  Test2 = "test2",
  Test3 = "test3",
  Test4 = "test4",
  LongTest1 = "long test 1",
  LongTest2 = "long test 2",
  LongTest3 = "long test 3",
  LongTest4 = "long test 4",
  LongTest5 = "long test 5",
  LongTest6 = "long test 6",
}

const Omnisort: React.FC = () => {
  const [values, setValues] = useState("");
  const [results, setResults] = useState("");
  const { requestApi } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state: any) => state.results
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    requestApi(values);
    if (error) {
      setResults("Oops something went wrong 🙁...");
    } else if (loading) {
      setResults("Fetching sorting results...");
    } else if (!error && !loading && data) {
      setResults(JSON.stringify(data));
    }

    // axios
    //   .post("https://localhost:7006/sorting", {
    //     payload: values,
    //   })
    //   .then((response) => {
    //     setResults(JSON.stringify(response.data.payload));
    //   })
    //   .catch((error) => {
    //     setResults("Oops something went wrong 🙁...");
    //     console.warn("ERROR: " + error);
    //   });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(results);
  };

  const keywords: string[] = Object.values(Keywords);

  const keywordOptions: DropdownItemProps[] = _.map(
    keywords,
    (keyword: string, index: number) => ({
      key: index,
      text: keyword,
      value: index,
    })
  );

  return (
    <Container>
      <Segment
        textAlign="center"
        raised
        inverted
        clearing
        className="segment-container"
      >
        <h3>Lorem ipsum dolor sit amet!</h3>
        <Divider />
        <span>
          Lorem ipsum dolor sit amet. Ea omnis consequatur aut exercitationem
          quisquam qui voluptates obcaecati et quaerat nemo non sunt quasi aut
          illo assumenda et animi nemo. Ea molestiae amet aut rerum fugiat ut
          nobis aspernatur sit ipsam doloremque.
        </span>
      </Segment>
      <Segment raised clearing className="segment-container" inverted>
        <Container>
          <Form onSubmit={onSubmit} style={{ padding: "5px" }}>
            <TextArea
              value={values}
              onChange={(e) => setValues(e.target.value)}
              placeholder="Enter your data here..."
              style={{ marginBottom: "10px", backgroundColor: "#eff6e0" }}
            />
            {/* <Input placeholder="Keyword to sort by..." /> */}
            <Dropdown
              button
              className="icon"
              floating
              multiple
              selection
              labeled
              icon="key"
              search
              placeholder="Keywords"
              options={keywordOptions}
              style={{ marginBottom: "5px", backgroundColor: "#eff6e0" }}
            />
            <Button floated="right" positive>
              Sort Me!
            </Button>
          </Form>
          <Divider />
          <Form style={{ padding: "5px" }}>
            <TextArea
              value={results}
              placeholder="Results..."
              style={{ marginBottom: "10px", backgroundColor: "#eff6e0" }}
            />
            <Button floated="right" color="blue" onClick={onCopy}>
              Copy Results
            </Button>
          </Form>
        </Container>
      </Segment>
    </Container>
  );
};

export default Omnisort;
