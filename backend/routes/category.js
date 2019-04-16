import {productRoutes} from "./product";

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

const Category = sequelize.import(__dirname + "/models/category");

const categoryRoutes = express.Router();

categoryRoutes.route('/').get(function (req, res) {
  let {department} = req.query;

  department = parseInt(department);

  if (department) {
    sequelize.query('call catalog_get_department_categories(?)', {
      model: Category,
      replacements: [department],
    }).then(categories => {
      const rows = categories[0];
      const rowsWithCounts = [];
      return rows.map((row, index) => {
        sequelize.query('call catalog_count_products_in_category(?)', {
          replacements: [row.dataValues.category_id]
        }).then(data => {
          const count = data[0]['categories_count'];
          rowsWithCounts[index] = Object.assign({}, row.dataValues, {product_count: count});
          if (index === rows.length - 1) {
            res.json(rowsWithCounts);
          }
        });
      });
    });
  } else {
    sequelize.query('call catalog_get_categories()', {
      model: Category
    }).then(categories => {
      const rows = categories[0];
      const rowsWithCounts = [];
      return rows.map((row, index) => {
        sequelize.query('call catalog_count_products_in_category(?)', {
          replacements: [row.dataValues.category_id]
        }).then(data => {
          const count = data[0]['categories_count'];
          rowsWithCounts[index] = Object.assign({}, row.dataValues, {product_count: count});
          if (index === rows.length - 1) {
            res.json(rowsWithCounts);
          }
        });
      });
    });
  }
});

export {categoryRoutes};
