import { Button, Form, Icon, TextArea } from "semantic-ui-react";

interface ResultsPayload {
  onUpdateResults: () => string;
  onDownloadResults: () => void;
  onCopy: () => void;
}

const Results: React.FC<ResultsPayload> = ({
  onUpdateResults,
  onDownloadResults,
  onCopy,
}) => {
  return (
    <Form>
      <TextArea
        value={onUpdateResults()}
        placeholder="Results..."
        style={{ marginBottom: "5px", backgroundColor: "#f1faee" }}
      />
      <Button floated="right" color="orange" onClick={onDownloadResults}>
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
