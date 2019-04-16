import {productRoutes} from "./routes/product";
import {categoryRoutes} from "./routes/category";
import {departmentRoutes} from "./routes/department";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/departments', departmentRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});