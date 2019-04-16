import React, {Component} from 'react';
import {getCategories, getDepartments} from "../api";
import {connect} from "react-redux";
import {ProductList} from "./ProductList";
import {setActiveCategory, setActiveDepartment} from "../store/actions";

export class ProductListFilter extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeDepartment: null,
      activeCategory: null,
      departments: {},
      categories: {},
      minPrice: 0,
      maxPrice: 1000
    }
  }
  
  componentDidMount = () => {
    getDepartments().then(departments => {
      this.setState({
        departments
      });
    });
  };

  getCategories = department => {
    getCategories({
      department
    }).then(categories => this.setState({
      categories
    }));
  };

  setDepartment = department => {
    this.setState({activeDepartment: department.department_id}, () => {
      this.props.setActiveDepartment(this.state.activeDepartment);
      this.props.setActiveCategory('');
      this.getCategories(this.state.activeDepartment)
    });
  };

  setCategory = category => {
    this.setState({activeCategory: category.category_id}, () => {
      this.props.setActiveDepartment(this.state.activeDepartment);
      this.props.setActiveCategory(this.state.activeCategory);
    })
  };
  
  unsetActiveDepartment = () => {
    this.setState({
      activeDepartment: '',
      activeCategory: ''
    }, () => {
      this.props.setActiveDepartment(this.state.activeDepartment);
      this.props.setActiveCategory(this.state.activeCategory);
    });
  };
  
  render = () => {
    const {departments, categories, activeDepartment} = this.state;
    
    return (
      <div>
        <div className="card card-filter">
          <article className="card-group-item">
            <header className="card-header">
              <a className="" aria-expanded="true" href="##" data-toggle="collapse" data-target="#collapseDepartment">
                <i className="icon-action fa fa-chevron-down"></i>
                <h6 className="title">By Department</h6>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapseDepartment">
              <div className="card-body">
                <ul className="list-unstyled list-lg">
                  <li key="all" onClick={() => this.unsetActiveDepartment()}>
                    <a href="##">All Departments</a>
                  </li>
                  {departments.length > 1 && departments.map(department => (
                    <li key={department.department_id} onClick={() => this.setDepartment(department)}>
                      <a href="##">{department.name} <span className="float-right badge badge-light round">{department.product_count}</span></a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
          <article className="card-group-item">
            <header className="card-header">
              <a className="" aria-expanded="true" href="##" data-toggle="collapse" data-target="#collapseCategory">
                <i className="icon-action fa fa-chevron-down"></i>
                <h6 className="title">By Category</h6>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapseCategory">
              <div className="card-body">
                {activeDepartment ?
                  <ul className="list-unstyled list-lg">
                    {categories.length > 0 && categories.map(category => (
                      <li key={category.category_id} onClick={() => this.setCategory(category)}>
                        <a href="##">
                          {category.name} <span className="float-right badge badge-light round">{category.product_count}</span>
                        </a>
                      </li>
                    ))}
                  </ul> : "Select a department first."}
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setActiveDepartment: department => dispatch(setActiveDepartment(department)),
  setActiveCategory: category => dispatch(setActiveCategory(category))
});

const ConnectedFilter = connect(null, mapDispatchToProps)(ProductListFilter);

export default ConnectedFilter;