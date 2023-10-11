import React from 'react'
import "./cocktail.css"

class Cocktail extends React.Component {
  render() {
    const name = this.props.cocktail.name;
    const style = {
      backgroundImage: `url('${this.props.cocktail.imageUrl}')`
    };

    return (
      <div className="cocktail">
        <div className="cocktail-img" style={style}> </div>
        <div className="cocktail-name"> <h3>{name}</h3> </div>
      </div>

    )
  }
}

export default Cocktail;
