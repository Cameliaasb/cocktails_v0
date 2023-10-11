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

      const cocktailName = hit.name ;
      // client.photos.search({ query, per_page: 1 }).then(photos => console.log(photos["photos"][0].url));

      // fetch(`https://www.google.com/search?sca_esv=572573644&sxsrf=AM9HkKlFPGBolRPXW9ZwpiAQSuLuTJegJw:1697045941501&q=${cocktailName}&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjUr4rkxO6BAxWMTKQEHa9GCVQQ0pQJegQICRAB&biw=1680&bih=933&dpr=2`)
      // .then(response => response.json())
      // .then(data => console.log(data))

      const style = {
        backgroundImage: "url('https://images.unsplash.com/photo-1632739186171-b2a442047bcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2592&q=80)"
      };

      return (
        <div className="cocktail-card">
          <div className="cocktail-img" style={style}> </div>
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
