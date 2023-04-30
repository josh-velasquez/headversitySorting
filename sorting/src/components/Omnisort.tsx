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

enum SortDirections {
  Ascending = "Ascending",
  Descending = "Descending",
}

const Omnisort: React.FC = () => {
  const [values, setValues] = useState("");
  const [sortType, setSortType] = useState<string>(Keywords.Number);
  const [sortKeyword, setSortKeyword] = useState("");
  const [sortDirection, setSortDirection] = useState<string>(
    SortDirections.Ascending
  );
  const [disableDownload, setDisabledDownload] = useState<boolean>(true);
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

  const sortDirections: string[] = Object.values(SortDirections);
  const sortDirectionOptions: DropdownItemProps[] = _.map(
    sortDirections,
    (sort: string, index: number) => ({
      key: index,
      text: sort,
      value: index,
    })
  );

  // TODO: Auto detect the type of the array to sort easier

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file !== undefined) {
      requestApiFileUpload(file, sortDirection, sortKeyword ?? "", sortType);
    } else {
      requestApi(values, sortDirection, sortKeyword ?? "", sortType);
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
      if (data.length !== 0) {
        // setDisabledDownload(false);
      }
      // return JSON.parse(JSON.stringify(data));
      return JSON.stringify(data);
    } else {
      return "Your results here...";
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(JSON.parse(JSON.stringify(data)));
  };

  const onDownloadResults = () => {
    // TODO: enable this if a file is ready to download
    // if file download then high
    const strData = JSON.parse(JSON.stringify(data));
    const blob = new Blob([strData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.click();
    console.warn("Download file");
  };

  const onCustomKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setSortKeyword(event.target.value);
  };

  const onSortOrderSelect = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (data.value === null) {
      return;
    }
    if (typeof data.value === "number") {
      setSortDirection(sortDirections[data.value]);
    }
  };

  const onSortBySelect = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (data.value === null) {
      return;
    }
    if (typeof data.value === "number") {
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
                  onChange={onSortBySelect}
                  style={{ marginBottom: "5px", backgroundColor: "#f1faee" }}
                />
                {sortType === "Custom Keyword" && (
                  <Input
                    placeholder="Custom keyword..."
                    onChange={onCustomKeyword}
                  />
                )}
                <Dropdown
                  button
                  className="icon"
                  floating
                  selection
                  labeled
                  selectOnBlur={true}
                  defaultValue={0}
                  onChange={onSortOrderSelect}
                  style={{ marginBottom: "5px", backgroundColor: "#f1faee" }}
                  icon="sort"
                  options={sortDirectionOptions}
                />
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
          disableDownload={disableDownload}
          onUpdateResults={onUpdateResults}
          onDownloadResults={onDownloadResults}
          onCopy={onCopy}
        />
      </Segment>
    </Container>
  );
};

export default Omnisort;
