import React, { Component } from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";
import missingList from "./missingList.json";
import "./App.css";

function filterMissing(searchText, maxResults) {
  return missingList
    .filter(function(personal) {

      const fullName = personal.name.first + " " + personal.name.last;
      if (fullName.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      if (personal.phone.includes(searchText)) {
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
          <input
            placeholder="Search the missing people"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

class ResultsRow extends Component {
  static propTypes = {
    first: PropTypes.string,
    last: PropTypes.string,
    picture: PropTypes.string,
    missingCity: PropTypes.string,
    missingState: PropTypes.string,
    missingCountry: PropTypes.string,
    gender: PropTypes.string,
    contact: PropTypes.string
  };

  render() {
    const name = this.props.first + " " + this.props.last;
    return (
      <div
        className="component-emoji-result-row copy-to-clipboard"
        data-clipboard-text={name}
      >
        <img alt={this.props.first} src={this.props.picture} />
        <span className="name">
          {this.props.first} {this.props.last}
        </span>
        <p>Gender: {this.props.gender}</p>
        <p>Missing Location:</p>
        <ul class="list-group">
          <li class="list-group-item">City: {this.props.missingCity}</li>
          <li class="list-group-item">State: {this.props.missingState}</li>
          <li class="list-group-item">Country: {this.props.missingCountry}</li>
        </ul>
        <p>Contact phone: {this.props.contact}</p>
        <span className="info">Click to copy the name</span>
      </div>
    );
  }
}

class Results extends Component {
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
        {this.props.Data.map(function(Data) {
          return (
            <ResultsRow
              first={Data.name.first}
              last={Data.name.last}
              missingCity={Data.location.city}
              missingState={Data.location.state}
              missingCountry={Data.location.country}
              gender={Data.gender}
              picture={Data.picture.medium}
              contact={Data.phone}
            />
          );
        })}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: filterMissing("", 20)
    };
  }

  handleSearchChange = event => {
    this.setState({
      filtered: filterMissing(event.target.value, 20)
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
