import { ChangeEvent } from "react";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { Button, Container, Form, Icon, Input } from "semantic-ui-react";

interface FileInformation {
  file: File | undefined;
  onResetFile: () => void;
  onUploadFile: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInformation> = ({
  onUploadFile,
  onResetFile,
  file,
}) => {
  return (
    <Container>
      <Form.Field>
        <Button
          as="label"
          htmlFor="file"
          animated="fade"
          type="button"
          color="teal"
        >
          <Button.Content visible>
            <Icon name="upload" />
          </Button.Content>
          <Button.Content hidden>Upload file</Button.Content>
        </Button>
        <input type="file" id="file" hidden onChange={onUploadFile} />
        <Container textAlign="right">
          <Button as="div" labelPosition="left">
            <Label style={{ width: "auto" }} pointing="right" as="a" basic>
              {file ? file.name : "File name..."}
            </Label>
            <Button type="button" icon negative onClick={onResetFile} compact>
              <Icon name="remove" />
            </Button>
          </Button>
        </Container>
      </Form.Field>
    </Container>
  );
};

export default FileInput;
