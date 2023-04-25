import { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { Button, Container, Form, Icon, TextArea } from "semantic-ui-react";

const FileInput: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<File>();
  const onUploadFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileName(event.target.files[0]);
    }
  };
  return (
    <Container>
      <Form.Field>
        <Button as="label" htmlFor="file" animated="fade" type="button">
          <Button.Content visible>
            <Icon name="upload" />
          </Button.Content>
          <Button.Content hidden>Upload file</Button.Content>
        </Button>
        <input type="file" id="file" hidden onChange={onFileChange} />
      </Form.Field>
      {/* <Form.Field>
        <Button
          type="button"
          as="label"
          htmlFor="file"
          style={{ width: "100%" }}
          animated="fade"
          onClick={onUploadFile}
        >
          <Button.Content visible>
            <Icon name="upload" />
          </Button.Content>
          <Button.Content hidden>Upload file</Button.Content>
        </Button> */}
      {/* <input onChange={onFileChange} type="file" id="file" hidden /> */}
      {/* <input type="file" id="file" hidden onChange={onFileChange} /> */}

      {/* <TextArea value={fileName?.name} /> */}
      {/* </Form.Field> */}
    </Container>
  );
};

export default FileInput;
