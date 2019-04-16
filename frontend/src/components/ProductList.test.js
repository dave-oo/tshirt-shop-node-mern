import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {ProductList} from './ProductList';

describe('ProductList', () => {
  Enzyme.configure({adapter: new Adapter()});

  function setup() {
    const props = {
      products: [{
        "product_id": 1,
        "name": "Arc d'Triomphe",
        "description": "This beautiful and iconic T-shirt will no doubt lead you to your own triumph.",
        "price": 14.99,
        "discounted_price": 0,
        "image": "arc-d-triomphe.gif",
        "image_2": "arc-d-triomphe-2.gif",
        "thumbnail": "arc-d-triomphe-thumbnail.gif",
        "display": 0
      }],
        getProductsPage: jest.fn(),
        getNumberOfProducts: jest.fn()
    };
    const enzymeWrapper = shallow(<ProductList {...props} />);

    return {
      props,
      enzymeWrapper
    }
  }

  it('should render self and subcomponents', () => {
    const {enzymeWrapper} = setup();

    expect(enzymeWrapper.find(".row").length).toBe(2);
  });
});
