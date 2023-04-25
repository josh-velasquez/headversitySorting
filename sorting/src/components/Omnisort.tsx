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
  DropdownProps,
  Grid,
  Icon,
} from "semantic-ui-react";
import * as _ from "lodash";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import FileInput from "./FileInput";

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
  const [customKeywords, setCustomKeyword] = useState<string[]>([]);
  const { requestApi } = useActions();
  const { data, error, loading } = useTypedSelector((state) => state.results);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    requestApi(values, customKeywords);
    if (!error && !loading && data) {
      // TODO: Destructure this to JSON object
      setResults(JSON.stringify(data));
    }
  };

  const onUpdateResults = (): string => {
    if (error) {
      return "Oops something went wrong 🙁...";
    } else if (loading) {
      return "Fetching sorting results...";
    } else if (!error && !loading && data) {
      // TODO: Destructure this to JSON object
      return JSON.stringify(data);
    } else {
      return "Your results here...";
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(results);
  };

  const onDropdownSelect = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (!data.value) {
      return;
    }
    if (Array.isArray(data.value)) {
      const selectedItems: string[] = data.value.map((_, j) => {
        return keywords[j];
      });
      setCustomKeyword(selectedItems);
    }
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
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
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
                  onChange={onDropdownSelect}
                  style={{ marginBottom: "5px", backgroundColor: "#eff6e0" }}
                />
              </Grid.Column>
              <Grid.Column
                verticalAlign="middle"
                style={{ textAlign: "Center" }}
              >
                <FileInput />
              </Grid.Column>
            </Grid>
            <Button floated="right" positive>
              Sort Me!
            </Button>
            <Divider inverted vertical>
              Or
            </Divider>
          </Form>
          <Divider />
          <Form style={{ padding: "5px" }}>
            <TextArea
              value={onUpdateResults()}
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
