import './App.css';
import './components/filters.css';
import './components/drinks.css';
import React, { Component } from 'react';


// Algolia
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch';


class App extends React.Component {
  render() {
    // public tokens from algolia
    const searchClient = algoliasearch('1BABPQ8ZYD', '8964a6a84d958d081b29b12090f152d9');

    // Glasses are in downcase and we want to display them correctly
    const transformItems = (items) => {
      return items.map((item) => ({
        ...item,
        label: item.label.charAt(0).toUpperCase() + item.label.slice(1),
      }));
    };



    // ALGOLIA: hit = results
    function Hit({ hit }) {

      return (
        <div className="cocktail-card">

          <div className="title-block yellow-bg"> {hit.name.toUpperCase()}</div>

          <div className="cocktail-description">

            <div> {hit.ingredients
              // filter empty igredient lines
              .filter(ingredient => ingredient.amount || ingredient.unit || ingredient.ingredient)
              // display ingredients in a list
              .map((ingredient, index) => (
                <div key={index}>
                  <strong> ∙ {ingredient.amount} {ingredient.unit} {ingredient.ingredient} </strong>
                </div>
              ))} </div>

            <p> {hit.preparation} </p>

          </div>

        </div>
      );
    }



    return (
      <div className="App">
        {/* Algolia InstantSearch from the cocktail index stored in algolia app */}
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
