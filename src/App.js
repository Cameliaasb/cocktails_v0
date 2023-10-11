import './App.css';
import React, { Component } from 'react';

// Algolia
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';


class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     cocktails: []
  //   }
  // };

  render() {
    const searchClient = algoliasearch('1BABPQ8ZYD', '8964a6a84d958d081b29b12090f152d9');

    function Hit({ hit }) {
      const style = {
        backgroundImage: "url('https://images.unsplash.com/photo-1632739186171-b2a442047bcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2592&q=80)"
      };

      return (
        <div class="cocktail-card">
          <div className="cocktail-img" style={style}> </div>
          <h3>{hit.name}</h3>
        </div>
      );
    }

    return (
      <div className="App">
        <InstantSearch searchClient={searchClient} indexName="cocktails">
          <div className="search">  <SearchBox /> </div>

            <Hits hitComponent={Hit} />
        </InstantSearch>
      </div>
    );
  }

}

export default App;
