import ModalRecipe from './ModalRecipe';
import { PanelGroup, Panel, ListGroup, ListGroupItem, Button, ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const Ingredients = (props) => {
    let styleObj = {
        textAlign: 'left',
    }
    let ingredients = props.recipe.ingredients.map((e,index) => {
        return (
            <ListGroupItem key={index}>{e}</ListGroupItem>
        )
    })
    return (
        <div>
            Ingredients
            <hr />
            <ListGroup style={styleObj}>
                {ingredients} 
            </ListGroup>
            <ButtonToolbar>
                <Button
                    bsStyle="danger"
                    bsSize="small"
                    onClick={props.onDelete.bind(null, props.recipe.id)}
                >
                Delete</Button>
                <ModalRecipe recipe={props.recipe} onUpdate={props.onUpdate} />
            </ButtonToolbar>
        </div>
    );
}
Ingredients.propTypes = {
    recipe: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
}


class RecipesList extends Component {
    constructor() {
        super()
        this.state = {
            activeKey: false
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.deleteRecipe = this.deleteRecipe.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    handleSelect(activeKey) {
        this.state.activeKey === activeKey ? this.setState({ activeKey: false }) : this.setState({ activeKey })
    }
    deleteRecipe(id) {
        this.props.onDelete(id)
    }
    handleUpdate(recipe) {
        console.log('RecipesList', recipe)
        this.props.onUpdate(recipe)
    }
    render() {
        let allRecipes = this.props.recipes.map((recipe) => {
            return (
                <Panel bsStyle='success' key={recipe.id} header={recipe.name} eventKey={recipe.id}>
                    <Ingredients
                        recipe={recipe}
                        onDelete={this.deleteRecipe}
                        onUpdate={this.handleUpdate}
                    />
                </Panel>
            );
        })
        return (
            <div className="RecipesList">
                <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                    {allRecipes}
                </PanelGroup>
                <ModalRecipe onUpdate={this.handleUpdate} />
            </div>
        );
    }
}

RecipesList.propTypes = {
    recipes: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}

export default RecipesList;