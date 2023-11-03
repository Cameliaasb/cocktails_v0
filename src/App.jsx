import './App.css';
import './components/filters.css';
import './components/cocktailCard.css';
import './components/searchbar.css';
import React, { Component } from 'react';
import CocktailCard from './components/cocktailCard';


// Algolia
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits } from 'react-instantsearch';
import Filters from './components/filters';


class App extends Component {
  render() {
    // public tokens from algolia
    const searchClient = algoliasearch('1BABPQ8ZYD', '8964a6a84d958d081b29b12090f152d9');

    return (
      <div>
        {/* Algolia InstantSearch from the cocktail index stored in algolia app */}
        <InstantSearch searchClient={searchClient} indexName="cocktails">

        {/* Search bar and filters to click on */}
        <Filters />

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
