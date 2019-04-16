const express = require('express');
const mysql = require('mysql');

const productRoutes = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'turing'
});
connection.connect(error => {
  if (error) throw error;
});

productRoutes.route('/').get(function (req, res) {
  let {activePage, pageLength, searchQuery} = req.query;
  activePage = parseInt(activePage);
  pageLength = parseInt(pageLength);
  const firstRow = activePage * pageLength - pageLength;

  let sqlQuery = '';

  if (searchQuery) {
    sqlQuery = `where name like '%${searchQuery}%' or description like '%${searchQuery}%'`;
  }

  if (firstRow !== undefined && activePage && pageLength) {
    sqlQuery = `${sqlQuery} limit ${firstRow},${pageLength} `;
  }

  connection.query(`select * from product ${sqlQuery}`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

productRoutes.route('/count').get(function (req, res) {
  let {searchQuery} = req.query;

  let sqlQuery = ' ';

  if (searchQuery) {
    sqlQuery += `where name like '%${searchQuery}%' or description like '%${searchQuery}%'`;
  }
  connection.query(`select count(*) from product ${sqlQuery}`, function (error, results, fields) {
    if (error) throw error;
    res.json(results[0]['count(*)']);
  });
});

export {productRoutes};