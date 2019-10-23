import React, { Component } from 'react';
import SearchInput from "./SearchInput";
import EmojiResults from "./EmojiResults";
import filterName from "./filterName";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredName: filterName("", 50)
    };
  }

  handleSearchChange(event){
    this.setState({
      filteredName: filterName(event.target.value, 50)
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
export default App;