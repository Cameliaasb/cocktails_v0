import './App.css';
import './components/filters.css';
import './components/drinks.css';
import './components/searchbar.css';
import React, { Component } from 'react';


// Algolia
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch';


class App extends React.Component {
  render() {
    // public tokens from algolia
    const searchClient = algoliasearch('1BABPQ8ZYD', '8964a6a84d958d081b29b12090f152d9');

    // Glasses are in downcase and we want to display them correctly
    const transformItems = (item) => {
      return item.charAt(0).toUpperCase() + item.slice(1)
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
            <p> <strong> Glass:</strong>  {transformItems(hit.glass)} </p>

          </div>

        </div>
      );
    }



    return (
      <div>
      {/* Algolia InstantSearch from the cocktail index stored in algolia app */}
        <InstantSearch searchClient={searchClient} indexName="cocktails">

          <div className="filters">

            {/* Search bar */}
            <div className="search-bar">
              <div className="search-prompt yellow-bg"> SEARCH BY INGREDIENT </div>
              <SearchBox />
            </div>

            {/* Filter by category */}
            <RefinementList attribute="category" sortBy={['count:desc', 'name:asc']} />

          </div>

          {/* Results */}
          <div className="container">
            <Hits hitComponent={Hit} />
          </div>

        </InstantSearch>
      </div>
    );
  }

}

export default App;
