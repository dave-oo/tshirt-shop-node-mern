const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize('turing', 'root', 'root', {
  define: {timestamps: false},
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const Product = sequelize.import(__dirname + "/models/product");

const productRoutes = express.Router();

productRoutes.route('/').get(function (req, res) {
  let {activePage, pageLength, searchQuery, category, department} = req.query;

  activePage = parseInt(activePage);
  pageLength = parseInt(pageLength);
  category = parseInt(category);
  department = parseInt(department);

  const firstRow = activePage * pageLength - pageLength;

  if (activePage && pageLength) {
  if (searchQuery) {
      sequelize.query('call catalog_search(?, ?, ?, ?, ?)', {
        model: Product,
        replacements: [searchQuery, '', 0, pageLength, firstRow]
      }).then(function (products) {
        sequelize.query('call catalog_count_search_result(?, ?)', {
          replacements: [searchQuery, '']
        }).then(data => {
          const count = data[0]['count(*)'];
          const rows = products[0];
          res.json({count, rows});
        });
      });
    } else if (category) {
      sequelize.query('call catalog_get_products_in_category(?, ?, ?, ?)', {
        model: Product,
        replacements: [category, 0, pageLength, firstRow]
      }).then(products => {
        sequelize.query('call catalog_count_products_in_category(?)', {
          replacements: [category]
        }).then(data => {
          const count = data[0]['categories_count'];
          const rows = products[0];
          res.json({count, rows});
        });
      });
    } else if (department) {
      sequelize.query('call catalog_get_products_on_department(?, ?, ?, ?)', {
        model: Product,
        replacements: [department, 0, pageLength, firstRow]
      }).then(products => {
        sequelize.query('call catalog_count_products_on_department(?)', {
          replacements: [department]
        }).then(data => {
          const count = data[0]['products_on_department_count'];
          const rows = products[0];
          res.json({count, rows});
        });
      });
    } else {
      sequelize.query('call catalog_get_products_on_catalog(?, ?, ?)', {
        model: Product,
        replacements: [0, pageLength, firstRow]
      }).then(products => {
        sequelize.query('call catalog_count_products_on_catalog()').then(data => {
          const count = data[0]['products_on_catalog_count'];
          const rows = products[0];
          res.json({count, rows});
        });
      });
    }
  } else {
    res.status(400).send({error: 'Invalid query format'});
  }
});

export {productRoutes};
