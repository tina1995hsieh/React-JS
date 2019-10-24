import React, { Component } from "react";
import PropTypes from "prop-types";

//import SearchInput from "./SearchInput";
//import EmojiResults from "./EmojiResults";
//import filterName from "./filterName";

class SearchInput extends React.Component {
  static propTypes = {
    textChange: PropTypes.func
  };

  handleChange(event) {
    this.props.textChange(event);
  }

  render() {
    return (
      <div className="component-search-input">
        <div>
          <input onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredName: filterName("", 50)
    };
  }

  handleSearchChange(event) {
    this.setState({
      filteredName: filterName(event.target.value, 50)
    });
  }

  render() {
    return (
      <div>
        <header className="component-header">
          <img
            src="https://pngimage.net/wp-content/uploads/2018/06/missing-png.png"
            width="32"
            height="32"
            alt="missing"
          />
          Missing People Search
          <img
            src="https://pngimage.net/wp-content/uploads/2018/06/missing-png.png"
            width="32"
            height="32"
            alt="missing"
          />
        </header>
        <SearchInput textChange={this.handleSearchChange} />
        <EmojiResults NameData={this.state.filteredName} />
      </div>
    );
  }
}
export default App;
