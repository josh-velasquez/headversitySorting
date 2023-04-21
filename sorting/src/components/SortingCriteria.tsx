import React from "react";
import { Input } from "semantic-ui-react";

class SortingCriteria extends React.Component {
  render() {
    return (
        <div>
            <Input placeholder="Keyword to sort by..."/>
        </div>
    );
  }
}

export default SortingCriteria;