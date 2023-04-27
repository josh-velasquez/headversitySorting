import React, { useState, ChangeEvent } from "react";
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
  Icon,
} from "semantic-ui-react";
import * as _ from "lodash";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import FileInput from "./FileInput";
import Intro from "./Intro";
import Results from "./Results";

enum Keywords {
  Alphabet = "Alphabet",
  CustomKeyword = "Custom keyword",
  Number = "Number",
  Grouping = "Grouping",
}

const Omnisort: React.FC = () => {
  const [values, setValues] = useState("");
  const [sortOrder, setSortOrder] = useState<string[]>([]);
  const [sortKeyword, setSortKeyword] = useState("");
  const [file, setFile] = useState<File>();
  const { data, error, loading } = useTypedSelector((state) => state.results);
  const { requestApi } = useActions();
  const { requestApiFileUpload } = useActions();
  const keywords: string[] = Object.values(Keywords);
  const keywordOptions: DropdownItemProps[] = _.map(
    keywords,
    (keyword: string, index: number) => ({
      key: index,
      text: keyword,
      value: index,
    })
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file !== undefined) {
      requestApiFileUpload(file, sortKeyword ?? "", sortOrder);
    } else {
      requestApi(values, sortKeyword ?? "", sortOrder);
    }
  };

  const onUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const onResetFile = () => {
    setFile(undefined);
  };

  const onUpdateResults = (): string => {
    if (error) {
      return "Oops something went wrong 🙁...";
    } else if (loading) {
      return "Fetching sorting results...";
    } else if (!error && !loading && data) {
      // TODO: Destructure this to JSON object
      // TODO: if its a file then show a download link for this
      return JSON.stringify(data);
    } else {
      return "Your results here...";
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data));
  };

  const onDownloadResults = () => {
    console.warn("Download file");
  };

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
                <FileInput
                  onUploadFile={onUploadFile}
                  onResetFile={onResetFile}
                  file={file}
                />
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
        <Results
          onUpdateResults={onUpdateResults}
          onDownloadResults={onDownloadResults}
          onCopy={onCopy}
        />
      </Segment>
    </Container>
  );
};

export default Omnisort;
