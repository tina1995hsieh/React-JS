import React, { Component } from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";
import emojiList from "./emojiList.json";
import "./App.css";

function filterMissing(searchText, maxResults) {
  return emojiList
    .filter(function (emoji){
      if (emoji.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      if (emoji.keywords.includes(searchText)) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
}

class Search extends Component {
  static propTypes = {
    text: PropTypes.func
  };

  handleChange = event => {
    this.props.text(event);
  };

  render() {
    return (
      <div className="component-search-input">
        <div>
          <input placeholder="Search the missing people" onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: filterMissing("", 100)
    };
  }

  handleSearchChange = event => {
    this.setState({
      filtered: filterMissing(event.target.value, 100)
    });
  };

  render() {
    return (
      <div>
        <header className="component-header">
          <img
            src="https://acenewsdesk.files.wordpress.com/2014/12/bvyhgl.jpg"
            alt="missing-ppl"
          />
        </header>
        <Search text={this.handleSearchChange} />
        <Results Data={this.state.filtered} />
      </div>
    );
  }
}

export default App;
