import { Divider, Segment } from "semantic-ui-react";

const Intro: React.FC = () => {
  return (
    <Segment
      textAlign="center"
      raised
      inverted
      clearing
      className="segment-container"
    >
      <h3>Lorem ipsum dolor sit amet!</h3>
      <Divider />
      <span>
        Lorem ipsum dolor sit amet. Ea omnis consequatur aut exercitationem
        quisquam qui voluptates obcaecati et quaerat nemo non sunt quasi aut
        illo assumenda et animi nemo. Ea molestiae amet aut rerum fugiat ut
        nobis aspernatur sit ipsam doloremque.
      </span>
    </Segment>
  );
};

export default Intro;
