import React, { Component } from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";
import missingList from "./missingList.json";
import "./App.css";

function filterMissing(searchText, maxResults) {
  return missingList
    .filter(function(personal) {
      const fullName = personal.name.first + " " + personal.name.last;
      const missingPlace = [personal.location.city.toLowerCase(), personal.location.state.toLowerCase(), personal.location.country.toLowerCase()];
      if (fullName.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      if (missingPlace.includes(searchText.toLowerCase())) {
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
      <div className="search">
        <div>
          <input
            placeholder="Search the missing people by name or missing place..."
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
    const phoneNumber = this.props.contact;
    return (
      <div
        className="result-row copy-to-clipboard .col-lg-2 col-md-3 col-sm-6"
        data-clipboard-text={phoneNumber}
      >
        <div className="card">
          <img alt={this.props.first} src={this.props.picture} />
          <div className="content">
            <h2 className="name">
              {this.props.first} {this.props.last}
            </h2>
            <mark>Gender: {this.props.gender}</mark>
            <p>Missing Location:</p>
            <ul class="list-group">
              <li class="list-group-item">City: {this.props.missingCity}</li>
              <li class="list-group-item">State: {this.props.missingState}</li>
              <li class="list-group-item">
                Country: {this.props.missingCountry}
              </li>
            </ul>
            <p>Contact phone: {this.props.contact}</p>
            <span className="info">Click to copy the phone numbers</span>
          </div>
        </div>
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
      <div className="container">
        <div className="row">
          {this.props.Data.map(function(Data) {
            return (
              <ResultsRow
                first={Data.name.first}
                last={Data.name.last}
                missingCity={Data.location.city}
                missingState={Data.location.state}
                missingCountry={Data.location.country}
                gender={Data.gender}
                picture={Data.picture.large}
                contact={Data.phone}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: filterMissing("", 300),
      gender: false
    };
  }

  handleSearchChange = event => {
    this.setState({
      filtered: filterMissing(event.target.value, 300)
    });
  };

  handleGenderChange = gender => {
    this.setState({
      gender: gender
    });
  };

  render() {
    return (
      <div>
        <header className="header col-md-12 col-sm-12">
          <img
            src="https://acenewsdesk.files.wordpress.com/2014/12/bvyhgl.jpg"
            alt="missing-ppl"
          />
        </header>
        <Search
          text={this.handleSearchChange}
          gender={this.handleGenderChange}
        />
        <Results Data={this.state.filtered} sex={this.state.gender} />
      </div>
    );
  }
}

export default App;
