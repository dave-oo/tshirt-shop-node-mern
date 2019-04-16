import React, {Component} from 'react';
import ProductListFilter from './ProductListFilter'
import ProductList from "./ProductList";

export default class FilterableProductList extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-3">
          <ProductListFilter/>
        </div>
        <div className="col-9">
          <ProductList/>
        </div>
      </div>
    )
  }
}