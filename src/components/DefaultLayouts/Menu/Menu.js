import React from "react";
import "./Menu.css";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuChecked: false,
    };
  }

  handleMenuChange = (e) => {
    this.setState({ menuChecked: e.target.checked });
  };

  render() {
    return (
      <div id="webapp_cover">
        <div id="menu_button">
          <input
            type="checkbox"
            id="menu_checkbox"
            checked={this.state.menuChecked}
            onChange={this.handleMenuChange}
          />
          <label htmlFor="menu_checkbox" id="menu_label">
            <div id="menu_text_bar"></div>
          </label>
        </div>
      </div>
    );
  }
}

export default Menu;
