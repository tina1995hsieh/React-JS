import React, { PureComponent } from "react";
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


class EmojiResultsRow extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    symbol: PropTypes.string
  };

  render() {
    const codePointHex = this.props.symbol.codePointAt(0).toString(16);
    const src = `//cdn.jsdelivr.net/emojione/assets/png/${codePointHex}.png`;
    return (
      <div
        className="component-emoji-result-row copy-to-clipboard"
        data-clipboard-text={this.props.symbol}
      >
        <img alt={this.props.title} src={src} />
        <span className="title">{this.props.title}</span>
        <span className="info">Click to copy emoji</span>
      </div>
    );
  }
}

class Results extends PureComponent {
  static propTypes = {
    Data: PropTypes.array
  };

  componentDidMount() {
    this.clipboard = new Clipboard(".copy-to-clipboard");
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
      <div className="component-emoji-results">
        {this.props.Data.map(function (Data) {
          <EmojiResultsRow
            key={Data.title}
            symbol={Data.symbol}
            title={emData.title}
          />
        })}
      </div>
    );
  }
}


class Search extends PureComponent {
  static propTypes = {
    text: PropTypes.func
  };

  handleChange (event) {
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

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filtered: filterMissing("", 100)
    };
  }

  handleSearchChange (event) {
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
        <Results emojiData={this.state.filtered} />
      </div>
    );
  }
}

export default App;
