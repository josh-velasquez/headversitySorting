import { Button, Form, Icon, TextArea } from "semantic-ui-react";

interface ResultsPayload {
  disableDownload: boolean;
  onUpdateResults: () => string;
  onDownloadResults: () => void;
  onCopy: () => void;
}

const Results: React.FC<ResultsPayload> = ({
  disableDownload,
  onUpdateResults,
  onDownloadResults,
  onCopy,
}) => {
  return (
    <Form>
      <TextArea
        rows={20}
        value={onUpdateResults()}
        placeholder="Results..."
        style={{ marginBottom: "5px", backgroundColor: "#f1faee" }}
      />
      <Button
        floated="right"
        color="orange"
        disabled={disableDownload}
        onClick={onDownloadResults}
      >
        <Icon name="download" />
        Download Results
      </Button>
      <Button floated="right" color="pink" onClick={onCopy}>
        <Icon name="copy" />
        Copy Results
      </Button>
    </Form>
  );
};

export default Results;
