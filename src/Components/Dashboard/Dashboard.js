import React, { Component } from 'react';
import Product from '../Product/Product';
import axios from 'axios';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {};
    }

    deleteProduct = (id) => {
        axios.delete(`/api/inventory/${id}`)
        .then( () => {
            this.props.retrieveInventory();
        })
    }

    render() {
        return (
            <div className="dashboard">
                {this.props.inventoryList.map((product, index) => {
                    return (
                        <div className="product">
                            <Product key={index} product={product} products={product.id} deleteProduct={this.deleteProduct} selectHandler={this.props.selectHandler} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Dashboard;