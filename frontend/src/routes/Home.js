import React, { Component } from 'react';
import FilterableProductList from '../components/FilterableProductList';

export default class Home extends Component {
  render() {
    return (
      <div>
        <FilterableProductList/>
      </div>
    )
  }
}