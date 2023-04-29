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
} from "semantic-ui-react";
import * as _ from "lodash";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import FileInput from "./FileInput";
import Intro from "./Intro";
import Results from "./Results";

enum Keywords {
  Number = "Number",
  Alphabet = "Alphabet",
  Grouping = "Grouping",
  CustomKeyword = "Custom Keyword",
}

const Omnisort: React.FC = () => {
  const [values, setValues] = useState("");
  const [sortType, setSortType] = useState<string>(Keywords.Number);
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

  // TODO: Auto detect the type of the array to sort easier

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file !== undefined) {
      requestApiFileUpload(file, sortKeyword ?? "", sortType);
    } else {
      requestApi(values, sortKeyword ?? "", sortType);
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
      return "Oops something went wrong 🙁...: ";
    } else if (loading) {
      return "Fetching sorting results...";
    } else if (!error && !loading && data) {
      // TODO: Destructure this to JSON object
      // TODO: if its a file then show a download link for this
      return JSON.stringify(data).replace(/['"]+/g, "");
    } else {
      return "Your results here...";
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data).replace(/['"]+/g, ""));
  };

  const onDownloadResults = () => {
    // TODO: enable this if a file is ready to download
    console.warn("Download file");
  };

  const onCustomKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO: FIX CUSTOM KEYWORD STYLING
    setSortKeyword(event.target.value);
  };

  const onDropdownSelect = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (data.value === null) {
      return;
    }
    if (typeof data.value === "number") {
      console.warn(keywords[data.value]);
      setSortType(keywords[data.value]);
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
                  selection
                  selectOnBlur={true}
                  labeled
                  icon="key"
                  defaultValue={0}
                  options={keywordOptions}
                  onChange={onDropdownSelect}
                  style={{ marginBottom: "5px", backgroundColor: "#f1faee" }}
                />
                {sortType === "Custom Keyword" && (
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
