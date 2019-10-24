import React, { Component } from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";

//import SearchInput from "./SearchInput";
//import EmojiResults from "./EmojiResults";
//import filterName from "./filterName";

import missingList from "../missingList.json";

function filterName(searchText, maxResults) {
  return missingList.filter(list => {
      if (list.name.includes(searchText)) {
        return true;
      }
      if (list.location.includes(searchText)) {
        return true;
      }
      return false;
    }).slice(0, maxResults);
}


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

class Results extends React.Component {
  static propTypes = {
    nameData: PropTypes.array
  };

  componentDidMount() {
    this.clipboard = new Clipboard(".copy-to-clipboard");
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
      <div className="component-missing-results">
        {this.props.nameData.map(function(nameData) {
          <EmojiResultRow
            key={emojiData.title}
            symbol={emojiData.symbol}
            title={emojiData.title}
          />
          })}
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
        <Results NameData={this.state.filteredName} />
      </div>
    );
  }
}
export default App;
