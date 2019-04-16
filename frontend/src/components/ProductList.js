import React, {Component} from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import Alert from 'react-bootstrap/Alert';
import {getProducts} from "../api";

export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      activePage: 1,
      pageLength: 6,
      numberOfProducts: 0,
      numberOfPages: 0,
      productsLoadError: false,
    }
  }

  getProducts = () => {
    const {activePage, pageLength} = this.state;
    const {activeCategory, activeDepartment, searchQuery} = this.props;

    try {
      getProducts({
        activePage,
        pageLength,
        category: activeCategory,
        department: activeDepartment,
        searchQuery
      }).then(data => {
        this.setState({
          products: data.rows,
          numberOfProducts: data.count,
          numberOfPages: Math.ceil(data.count / pageLength),
        })
      });
    } catch (e) {
      this.setState({
        productsLoadError: true,
        products: []
      })
    }
  };

  setActivePage = (activePage = this.state.activePage) => {
    this.setState({activePage}, () => this.getProducts());
  };

  componentDidMount = () => {
    this.getProducts()
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.searchQuery !== this.props.searchQuery ||
      prevProps.activeCategory !== this.props.activeCategory ||
      prevProps.activeDepartment !== this.props.activeDepartment) {
      this.setState({activePage: 1}, () => this.getProducts());
    }
  };

  render = () => {
    const {activePage, numberOfPages, products, numberOfProducts, productsLoadError} = this.state;
    const {searchQuery} = this.props;
    const diff = numberOfPages - activePage + 1;

    return (
      <div className="row">
        {productsLoadError ?
          <div className="col-auto mx-auto">
            <Alert variant="danger">
              There was a problem loading results.
            </Alert>
          </div> : null}
        {searchQuery !== '' ?
          <div className="col-12">
            <div className="row">
              <div className="col-auto mx-auto">
                <Alert variant="info">
                  {numberOfProducts !== 1 ?
                    <div><span className="font-weight-bold">{numberOfProducts} </span>items were found</div> :
                    <div><span className="font-weight-bold">1 </span>item was found</div>}
                </Alert>
              </div>
            </div>
          </div> : null}
        {products.map(product => (
          <div className="col-md-4" key={product.product_id}>
            <figure className="card card-product">
              <div className="img-wrap"><img src="images/items/4.jpg" alt={product.name}/></div>
              <figcaption className="info-wrap">
                <h6 className="title font-weight-bold">{product.name}</h6>
                <div className="rating-wrap">
                  <ul className="rating-stars">
                    <li className="stars-active">
                      <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                      className="fa fa-star"></i><i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                      className="fa fa-star"></i><i className="fa fa-star"></i>
                    </li>
                  </ul>
                  <div className="label-rating ml-2">132 reviews</div>
                </div>
              </figcaption>
              <div className="bottom-wrap">
                <div className="price-wrap h5">
                  <span
                    className="price-new small">${product.discounted_price !== 0 ? product.discounted_price : product.price}</span>
                  {product.discounted_price !== 0 &&
                  <del className="price-old small">${product.discounted_price !== 0 ? product.price : null}</del>}
                </div>
              </div>
            </figure>
          </div>
        ))}
        {this.state.numberOfPages > 1 ?
          <div className="col-12">
            <div className="row">
              <div className="col-auto mx-auto">
                <Pagination>
                  <Pagination.First onClick={() => this.setActivePage(1)}/>
                  {activePage > 6 && diff < 2 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage - 6)}>{activePage - 6}</Pagination.Item> : null}
                  {activePage > 5 && diff < 3 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage - 5)}>{activePage - 5}</Pagination.Item> : null}
                  {activePage > 4 && diff < 4 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage - 4)}>{activePage - 4}</Pagination.Item> : null}
                  {activePage > 3 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage - 3)}>{activePage - 3}</Pagination.Item> : null}
                  {activePage > 2 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage - 2)}>{activePage - 2}</Pagination.Item> : null}
                  {activePage > 1 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage - 1)}>{activePage - 1}</Pagination.Item> : null}
                  <Pagination.Item active>{activePage}</Pagination.Item>
                  {diff > 1 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage + 1)}>{activePage + 1}</Pagination.Item> : null}
                  {diff > 2 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage + 2)}>{activePage + 2}</Pagination.Item> : null}
                  {diff > 3 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage + 3)}>{activePage + 3}</Pagination.Item> : null}
                  {diff > 4 && activePage < 4 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage + 4)}>{activePage + 4}</Pagination.Item> : null}
                  {diff > 5 && activePage < 3 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage + 5)}>{activePage + 5}</Pagination.Item> : null}
                  {diff > 7 && activePage < 2 ? <Pagination.Item
                    onClick={() => this.setActivePage(activePage + 6)}>{activePage + 6}</Pagination.Item> : null}
                  <Pagination.Last onClick={() => this.setActivePage(numberOfPages)}/>
                </Pagination>
              </div>
            </div>
          </div> : null}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  searchQuery: store.searchQuery,
  activeDepartment: store.activeDepartment,
  activeCategory: store.activeCategory
});

const ConnectedList = connect(mapStateToProps)(ProductList);

export default ConnectedList;