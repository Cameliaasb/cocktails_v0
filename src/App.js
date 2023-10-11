import './App.css';
import './components/filters.css';
import React, { Component } from 'react';

// Algolia
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch';


class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     cocktails: []
  //   }
  // };

  render() {
    const searchClient = algoliasearch('1BABPQ8ZYD', '8964a6a84d958d081b29b12090f152d9');

    const transformItems = (items) => {
      return items.map((item) => ({
        ...item,
        label: item.label.charAt(0).toUpperCase() + item.label.slice(1),
      }));
    };

    function Hit({ hit }) {
      const style = {
        backgroundImage: "url('https://images.unsplash.com/photo-1632739186171-b2a442047bcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2592&q=80)"
      };

      return (
        <div class="cocktail-card">
          <div className="cocktail-img" style={style}> </div>
          <h3>{hit.name}</h3>
          <div class="cocktail-description">
            {hit.ingredients.map((ingredient, index) => (
              <div key={index}>
                {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
              </div>
            ))}
            <p> {hit.preparation} </p>

          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <InstantSearch searchClient={searchClient} indexName="cocktails">

          {/* Search bar */}
          <div className="searchBar">
            <SearchBox />
          </div>

          {/* Filters */}
          <div className="filters">

            <div className="filter-block">
              <h3> Category</h3>
              <RefinementList attribute="category" sortBy={['count:desc', 'name:asc']} />
            </div>

            <div className="filter-block">
              <h3> Glass</h3>
              <RefinementList attribute="glass"   sortBy={['count:desc', 'name:asc']} transformItems={transformItems} />
            </div>

          </div>

          {/* Results */}
          <Hits hitComponent={Hit} />

        </InstantSearch>
      </div>
    );
  }

}

export default App;
