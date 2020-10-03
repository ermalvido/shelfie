import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            name: '',
            price: 0,
            editId: null
        }
    }

    addProduct = () => {
        axios.post('/api/inventory', {
            image: this.state.image,
            name: this.state.name,
            price: this.state.price
        })
        .then(res => {
            this.setState({
                image: res.data,
                name: res.data,
                price: res.data
            });
            this.props.retrieveInventory().then( () => {
                this.resetState();
            });
        })
        .catch(err => console.log(err));
    }

    updateProduct = () => {
        axios.put(`/api/inventory/${this.state.editId}`, {
            image: this.state.image,
            name: this.state.name,
            price: this.state.price
        })
        .then(res => {
            this.props.retrieveInventory().then( () => {
                this.resetState();
            });
        })
        .catch(err => console.log(err));
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.selectedProduct !== this.props.selectedProduct) {
            const {id, image, name, price} = this.props.inventoryList.find(product => product.id === this.props.selectedProduct);
            this.setState({
                editId: id, name, price, image
            });
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    resetState = () => {
        this.setState({
            image: '',
            name: '',
            price: 0,
            editId: null
        })
    }

    render() {
        const {id, image, name, price} = this.state;
        return (
            <div className="form">
                <div className="image-box">
                    {!image ?
                    <img className="default" alt="noImage" src="https://us.123rf.com/450wm/pe3check/pe3check1710/pe3check171000054/88673746-stock-vector-no-image-available-sign-internet-web-icon-to-indicate-the-absence-of-image-until-it-will-be-download.jpg?ver=6"/>
                    : <img className="default" alt="prod" src={`${image}`}/>
                    }
                </div>
                <input placeholder="Image URL" name="image" value={image} onChange={this.handleInput}/>
                <input placeholder="Product Name" name="name" value={name} onChange={this.handleInput}/>
                <input placeholder="0" name="price" value={price} onChange={this.handleInput}/>
                <button onClick={this.resetState}>Cancel</button>
                {this.state.editId == null ? (
                <button onClick={this.addProduct}>Add to Inventory</button>
                ) : (
                <button onClick={this.updateProduct}>Save Changes</button>
                )}
            </div>
        )
    }
}

export default Form;