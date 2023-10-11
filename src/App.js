import './App.css';
import React, { Component } from 'react';
import Cocktail from "./components/cocktail";

 class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cocktails: []
    }
  };

  componentDidMount() {
    const url = "https://raw.githubusercontent.com/teijo/iba-cocktails/master/recipes.json"
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState( {
          cocktails: data
        })
      )
  }

  render() {
    const cocktail =   {
      "name": "Vesper",
      "glass": "martini",
      "category": "Before Dinner Cocktail",
      "imageUrl": "https://images.unsplash.com/photo-1632739186171-b2a442047bcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2592&q=80",
      "ingredients": [
        { "unit": "cl",
        "amount": 6,
        "ingredient": "Gin" },
        { "unit": "cl",
        "amount": 1.5,
        "ingredient": "Vodka" },
        { "unit": "cl",
        "amount": 0.75,
        "ingredient": "Lillet Blonde" }
      ],
      "garnish": "Lemon twist",
      "preparation": "Shake and strain into a chilled cocktail glass."
    }



    return (
      <div className="App">
        <div className="search"> </div>
        <div className="cocktails">
          { this.state.cocktails.map( (cocktail) => {
            return <Cocktail cocktail={cocktail} />
            })
          }
        </div>
      </div>
    );
  }

}

export default App;
