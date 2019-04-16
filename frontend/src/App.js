import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from 'react-redux';
import Home from './routes/Home';
import Cart from './routes/Cart';
import Auth from './routes/Auth';
import Product from './routes/Product';
import {setSearchQuery} from "./store/actions";

export class App extends Component {
  setActiveDepartment = (event) => {
  
  };
  
  setActiveCategory = (event) => {
  
  };

  setSearchQuery = (event) => {
    const searchQuery = event.target.value;
    if (searchQuery.length > 3) {
      this.props.setSearchQuery(searchQuery);
    }
  };
  
  render = () => {
    return (
      <div>
        <header className="section-header">
          <section className="header-main shadow">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-3 col-sm-4">
                  <div className="brand-wrap">
                    <img className="logo" src="images/logo-dark.png" alt="logo"/>
                    <h2 className="logo-text">LOGO</h2>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-8">
                  <form action="#" className="search-wrap">
                    <div className="input-group w-100">
                      <input type="text" className="form-control" placeholder="Search" onChange={(e) => this.setSearchQuery(e)}/>
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-3 col-sm-12">
                  <a href="##" className="widget-header float-md-right">
                    <div className="icontext">
                      <div className="icon-wrap mr-1"><i className="flip-h fa-lg fa fa-lock"></i></div>
                      Login
                    </div>
                  </a>
                  <a href="##" className="widget-header float-md-right">
                    <div className="icontext">
                      <div className="icon-wrap mr-1"><i className="flip-h fa-lg fa fa-shopping-cart"></i></div>
                      My Cart
                      <span className="badge badge-danger ml-1">4</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </header>
        <section className="section-content bg padding-y">
          <div className="container-fluid">
            <Router>
              <Route path="/" exact render={props => <Home {...props}/>}/>
              <Route path="/auth" render={props => <Auth {...props}/>}/>
              <Route path="/products" render={props => <Product {...props}/>}/>
              <Route path="/cart/:id" render={props => <Cart {...props}/>}/>
            </Router>
          </div>
        </section>
      </div>
    );
  }
}

// const mapStateToProps = store => ({
//   products: store.products,
//   numberOfProducts: store.numberOfProducts,
//   productsLoadError: store.productsLoadError
// });

const mapDispatchToProps = dispatch => ({
  setSearchQuery: (searchQuery) => dispatch(setSearchQuery(searchQuery))
});

const ConnectedApp = connect(null, mapDispatchToProps)(App);

export default ConnectedApp;
