import './App.css';
import './components/filters.css';
import React, { Component } from 'react';


// Algolia
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch';


class App extends React.Component {
  render() {
    const searchClient = algoliasearch('1BABPQ8ZYD', '8964a6a84d958d081b29b12090f152d9');

    const transformItems = (items) => {
      return items.map((item) => ({
        ...item,
        label: item.label.charAt(0).toUpperCase() + item.label.slice(1),
      }));
    };


    function Hit({ hit }) {

      return (
        <div className="cocktail-card">
          <h3>{hit.name}</h3>
          <div className="cocktail-description">
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
