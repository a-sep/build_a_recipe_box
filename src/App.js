import React, { Component } from 'react';
import RecipesList from './Components/RecipesList';
import uuid from 'uuid'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      recipesOnStart: [
        { id: 1, name: 'pizza', ingredients: ['cheese', 'bacon', 'egg'] },
        { id: 2, name: 'sandwich', ingredients: ['tomato', 'cheese', 'lettuce'] },
        { id: 3, name: 'soup', ingredients: ['tomato', 'onion', 'pasta'] },
      ],
      recipes: [],
    }
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  deleteRecipe(id) {
    let recipes = this.state.recipes
    let index;
    // if browser is not supporting findIndex (ex.IE)
    if (!Array.prototype.findIndex) {
      for (var i = 0; i < recipes.length; ++i) {
        if (recipes[i].id === id) {
          index = i;
          break;
        }
      }
    } else {
      index = recipes.findIndex(elem => elem.id === id)
    }

    recipes.splice(index, 1)
    this.setState({ recipes: recipes })
    localStorage.clear()
    localStorage.setItem('recipes', JSON.stringify(recipes))
  }

  handleUpdate(recipe) {
    let recipes = this.state.recipes
    let index;
    // if browser is not supporting findIndex (ex.IE)
    if (!Array.prototype.findIndex) {
      for (var i = 0; i < recipes.length; ++i) {
        if (recipes[i].id === recipe.id) {
          index = i;
          break;
        }
      }
    } else {
      index = recipes.findIndex(elem => elem.id === recipe.id)
    }

    if (index >= 0) {
      recipes[index] = recipe
    } else {
      
      recipe.id = uuid.v4() // generate id for new recipe
      recipes.push(recipe)
    }
    this.setState({ recipes: recipes }) // zamiast tego zachowac do localStorage
    localStorage.clear()
    localStorage.setItem('recipes', JSON.stringify(recipes))
  }

  componentWillMount() {
    localStorage.clear();
    // if localStorage is empty save to it data from recipesOnStart
    // and after that setup this.state.recipes equal with localStorage
    if (!localStorage.getItem('recipes')) {
      localStorage.setItem("recipes", JSON.stringify(this.state.recipesOnStart))
      this.setState({ recipes: JSON.parse(localStorage.recipes) })
    } else {
      this.setState({ recipes: JSON.parse(localStorage.recipes) })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Recipe Box App</h2>
        </div>
        <RecipesList
          recipes={this.state.recipes}
          onDelete={this.deleteRecipe}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
