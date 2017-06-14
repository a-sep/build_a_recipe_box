
import { Button, ButtonToolbar, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ModalRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    close() {
        this.setState({ showModal: false });
    }
    open() {
        this.setState({ showModal: true });
    }
    handleSubmit() {
        this.props.onUpdate({
            id: !!this.props.recipe ? this.props.recipe.id : null,
            name: this.recipeName.value,
            ingredients: this.recipeIngredients.value.split(','),
        })

        this.setState({ showModal: false });
    }
    render() {
        return (
            <div>
                <Button
                    className="margin-left"
                    bsStyle={!this.props.recipe ? "primary" : "default"}
                    bsSize="small" onClick={this.open}
                >
                    {!this.props.recipe ? "Add Recipe" : "Edit Recipe"}
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{!this.props.recipe ? "Add Recipe" : "Edit Recipe"}</Modal.Title>
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Recipe</ControlLabel>
                                <FormControl
                                    inputRef={ref => { this.recipeName = ref }}
                                    type="text"
                                    placeholder="Recipe Name"
                                    defaultValue={!this.props.recipe ? '' : this.props.recipe.name}
                                />
                            </FormGroup>
                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Ingredients</ControlLabel>
                                <FormControl
                                    inputRef={ref => { this.recipeIngredients = ref }}
                                    componentClass="textarea"
                                    placeholder="Enter ingredients,Separeted,By commas"
                                    defaultValue={!this.props.recipe ? '' : this.props.recipe.ingredients}
                                />
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonToolbar className="buttons-in-modal">
                                <Button
                                    bsSize="small"
                                    bsStyle="primary"
                                    onClick={this.handleSubmit}
                                >
                                    {!this.props.recipe ? "Add Recipe" : "Edit Recipe"}
                                </Button>
                                <Button
                                    bsSize="small"
                                    onClick={this.close}
                                >
                                    Close
                                </Button>
                            </ButtonToolbar>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

ModalRecipe.propTypes = {
    recipe: PropTypes.object,
    onUpdate: PropTypes.func,
}

export default ModalRecipe;



