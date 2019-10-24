import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";
import emojiList from "./emojiList.json";
import "./App.css";

function filterEmoji(searchText, maxResults) {
  return emojiList
    .filter(emoji => {
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

class EmojiResults extends PureComponent {
  static propTypes = {
    emojiData: PropTypes.array
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
        {this.props.emojiData.map(emojiData => (
          <EmojiResultsRow
            key={emojiData.title}
            symbol={emojiData.symbol}
            title={emojiData.title}
          />
        ))}
      </div>
    );
  }
}


class SearchInput extends PureComponent {
  static propTypes = {
    textChange: PropTypes.func
  };

  handleChange = event => {
    this.props.textChange(event);
  };

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

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filteredEmoji: filterEmoji("", 20)
    };
  }

  handleSearchChange = event => {
    this.setState({
      filteredEmoji: filterEmoji(event.target.value, 20)
    });
  };

  render() {
    return (
      <div>
        <header className="component-header">
          <img
            src="https://pngimage.net/wp-content/uploads/2018/06/missing-png.png"
            width="30%"
            height="30%"
            alt=""
          />
          Emoji Search
        </header>
        <SearchInput textChange={this.handleSearchChange} />
        <EmojiResults emojiData={this.state.filteredEmoji} />
      </div>
    );
  }
}

export default App;
