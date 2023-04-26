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
      <h3>Sorting made easy</h3>
      <Divider />
      <span>
        <i>Omnisort</i> provides the simplest, most practical and inclusive
        digital experiences in sorting.
      </span>
    </Segment>
  );
};

export default Intro;
