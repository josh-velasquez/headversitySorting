import React from "react";
import { Segment } from "semantic-ui-react";

class SortFormatSamples extends React.Component {
  render() {
    return (
      <div>
        <Segment secondary>['red','blue','green','red','red','green']</Segment>
        <Segment secondary>[[8,4,19,3],[9,18,[2,0,1]],[[6,2],9,9,1]]</Segment>
        <Segment secondary>[😃,🤪,🥸,😍,😭]</Segment>
        <Segment secondary>[''b','d','a','K','r'']</Segment>
        <Segment secondary>[5,3,10,7,12,56]</Segment>
        <Segment secondary>
          <pre>
            {JSON.stringify(
              {
                id: 0,
                name: "John Doe",
                age: 20,
                weight: "175 (lbs)",
                height: "188 (cm)",
              },
              null,
              2
            )}
            ,
            {JSON.stringify(
              {
                id: 1,
                name: "Jane Smith",
                age: 22,
                weight: "120 (lbs)",
                height: "155 (cm)",
              },
              null,
              2
            )}
          </pre>
        </Segment>
      </div>
    );
  }
}
export default SortFormatSamples;
