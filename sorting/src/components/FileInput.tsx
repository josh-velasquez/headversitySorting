import { Button, Container, Form, Icon } from "semantic-ui-react";

interface FileInformation {
  file: File | undefined;
  onUploadFile: () => void;
}

const FileInput: React.FC<FileInformation> = ({ onUploadFile, file }) => {
  return (
    <Container>
      <Form.Field>
        <Button as="label" htmlFor="file" animated="fade" type="button">
          <Button.Content visible>
            <Icon name="upload" />
          </Button.Content>
          <Button.Content hidden>Upload file</Button.Content>
        </Button>
        <input type="file" id="file" hidden onChange={onUploadFile} />
        <Form.Input
          style={{ backgroundColor: "#f1faee" }}
          readOnly
          placeholder="File name..."
          value={file ? file.name : "File name..."}
        />
      </Form.Field>
    </Container>
  );
};

export default FileInput;
