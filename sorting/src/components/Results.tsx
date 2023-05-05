import { Button, Form, Icon, TextArea } from "semantic-ui-react";

interface ResultsPayload {
  disableButton: boolean;
  sortedData: string;
  onDownloadResults: () => void;
  onCopy: () => void;
}

const Results: React.FC<ResultsPayload> = ({
  disableButton,
  sortedData,
  onDownloadResults,
  onCopy,
}) => {
  return (
    <Form>
      <TextArea
        className="input-styling"
        rows={20}
        disabled={true}
        value={sortedData ?? "Data"}
        placeholder="Results..."
      />
      <Button
        floated="right"
        color="orange"
        disabled={disableButton}
        onClick={onDownloadResults}
      >
        <Icon name="download" />
        Download Results
      </Button>
      <Button
        floated="right"
        color="pink"
        onClick={onCopy}
        disabled={disableButton}
      >
        <Icon name="copy" />
        Copy Results
      </Button>
    </Form>
  );
};

export default Results;
