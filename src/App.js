import React, { Component } from 'react';
import Header from './Components/Header/Header';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inventory: [],
      selectedProduct: null
    }
  }

  componentDidMount = () => {
    this.retrieveInventory()
  }

  retrieveInventory = () => {
    axios.get('/api/inventory')
    .then(res => {
      this.setState({
        inventory: res.data
      })
    })
    .catch(err => console.log(err))
  };

  selectHandler = (product) => {
    this.setState({
      selectedProduct: product
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="inventory">
        <Dashboard inventoryList={this.state.inventory} retrieveInventory={this.retrieveInventory} selectHandler={this.selectHandler}/>
        <Form retrieveInventory={this.retrieveInventory} selectedProduct={this.state.selectedProduct} inventoryList={this.state.inventory}/>
        </div>
      </div>
    )
  }
}

export default App;