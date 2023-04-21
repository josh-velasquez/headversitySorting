import { Container, Header, Menu, Icon } from "semantic-ui-react";
import { InView } from "react-intersection-observer";
import React from "react";

const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  transition: "box-shadow 0.5s ease, padding 0.5s ease",
};

const fixedMenuStyle = {
  backgroundColor: "#000",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
};

class NavBar extends React.Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
  };

  toggleOverlay = (inView: any) => this.setState({ overlayFixed: !inView });
  toggleTopMenu = (inView: any) => this.setState({ menuFixed: !inView });
  render() {
    const { menuFixed } = this.state;
    return (
      <InView onChange={this.toggleTopMenu}>
        <Menu
          inverted
          borderless
          fixed={menuFixed ? "top" : undefined}
          style={menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container text>
            <Menu.Item>
              <Icon name="sort alphabet down" />
            </Menu.Item>
            <Menu.Item>
              <Header inverted as="h1"> Sorting</Header>
            </Menu.Item>
          </Container>
        </Menu>
      </InView>
    );
  }
}

export default NavBar;
