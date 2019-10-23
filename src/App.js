import React, { Component } from 'react';
import SearchInput from "./SearchInput";
import EmojiResults from "./EmojiResults";
import filterName from "./filterName";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredName: filterName("", 20)
    };
  }

  handleSearchChange(event){
    this.setState({
      filteredName: filterName(event.target.value, 20)
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchInput textChange={this.handleSearchChange} />
        <EmojiResults NameData={this.state.filteredName} />
      </div>
    );
  }
}
