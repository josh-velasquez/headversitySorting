import React, { useState, ChangeEvent, useRef, MutableRefObject } from "react";
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
  Input,
} from "semantic-ui-react";
import * as _ from "lodash";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import FileInput from "./FileInput";
import Intro from "./Intro";

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
  // const [results, setResults] = useState("");
  const [sortOrder, setSortOrder] = useState<string[]>([]);
  const [sortKeyword, setSortKeyword] = useState("");
  const { requestApi } = useActions();
  const { data, error, loading } = useTypedSelector((state) => state.results);
  const [file, setFile] = useState<File>();

  const onUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.warn("Values: " + values);
    console.warn("Keyword: " + sortKeyword);
    console.warn("Sort Order: " + sortOrder);
    requestApi(values, sortKeyword ?? "", sortOrder);
    // if (!error && !loading && data) {
    //   // TODO: Destructure this to JSON object
    //   setResults(JSON.stringify(data));
    // }
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
    navigator.clipboard.writeText(JSON.stringify(data));
  };

  const onExport = () => {};

  const onCustomKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setSortKeyword(event.target.value);
  };

  const onDropdownSelect = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (!data.value) {
      return;
    }
    if (Array.isArray(data.value)) {
      const selectedItems: string[] = data.value.map((i, _) => {
        if (typeof i === "number") {
          return keywords[i];
        }
        return keywords[0];
      });
      setSortOrder(selectedItems);
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
      <Intro />
      <Segment raised clearing className="segment-container" inverted>
        <Form onSubmit={onSubmit} style={{ padding: "5px" }}>
          <Grid relaxed="very">
            <Grid.Row columns={2}>
              <Grid.Column>
                <TextArea
                  value={values}
                  onChange={(e) => setValues(e.target.value)}
                  placeholder="Enter your data here..."
                  style={{ marginBottom: "10px", backgroundColor: "#eff6e0" }}
                />
              </Grid.Column>
              <Grid.Row>
                <Divider inverted vertical>
                  Or
                </Divider>
              </Grid.Row>
              <Grid.Column
                verticalAlign="middle"
                style={{ textAlign: "Center" }}
              >
                <FileInput onUploadFile={() => onUploadFile} file={file} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} relaxed="very">
              <Grid.Column>
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
                  style={{ marginBottom: "5px", backgroundColor: "#f1faee" }}
                />
                {sortOrder.some((order) => order === "Custom keyword") && (
                  <Input
                    placeholder="Custom keyword..."
                    onChange={onCustomKeyword}
                  />
                )}
              </Grid.Column>
              <Grid.Column>
                <Button floated="right" positive>
                  Sort Me!
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        <Divider />
        <Form>
          <TextArea
            value={onUpdateResults()}
            placeholder="Results..."
            style={{ marginBottom: "5px", backgroundColor: "#f1faee" }}
          />
          <Button floated="right" color="blue" onClick={onExport}>
            Download Results
          </Button>
          <Button floated="right" color="blue" onClick={onCopy}>
            Copy Results
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default Omnisort;
