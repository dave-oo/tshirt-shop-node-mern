import {categoryRoutes} from "./category";

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

const Department = sequelize.import(__dirname + "/models/department");

const departmentRoutes = express.Router();

departmentRoutes.route('/').get(function (req, res) {
  sequelize.query('call catalog_get_departments()', {
    model: Department
  }).then(departments => {
    const rows = departments[0];
    const rowsWithCounts = [];
    return rows.map((row, index) => {
      sequelize.query('call catalog_count_products_on_department(?)', {
        replacements: [row.dataValues.department_id]
      }).then(data => {
        const count = data[0]['products_on_department_count'];
        rowsWithCounts[index] = Object.assign({}, row.dataValues, {product_count: count});
        if (index === rows.length - 1) {
          res.json(rowsWithCounts);
        }
      });
    });
  });
});

export {departmentRoutes};
