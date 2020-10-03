import React, { Component } from 'react';

class Product extends Component {
    constructor(props) {
        super(props);
    }
    handleDelete = () => {
        this.props.deleteProduct(this.props.id)
    }
    handleEdit = () => {
        this.props.editProduct(this.props.product)
    }

    render() {
        let {product} = this.props
        return (
            <div>
                <div>
                    <img height='200' src={product.image} />
                </div>
                <div>
                    <h2>{product.name}</h2>
                    <h3>{`$ ${product.price}`}</h3>
                </div>
                <div>
                    <button onClick={this.handleDelete}>Delete</button>
                    <button onClick={this.handleEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

export default Product;