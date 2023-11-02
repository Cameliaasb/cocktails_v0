import './App.css';
import './components/filters.css';
import './components/drinks.css';
import './components/searchbar.css';
import React, { Component } from 'react';


// Algolia
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch';
import CocktailCard from './components/cocktailCard';


class App extends Component {
  render() {
    // public tokens from algolia
    const searchClient = algoliasearch('1BABPQ8ZYD', '8964a6a84d958d081b29b12090f152d9');

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
            <Hits hitComponent={CocktailCard} />
          </div>

        </InstantSearch>
      </div>
    );
  }

}

export default App;
