const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/products');

const categoryRouter = express.Router();

categoryRouter
    .route('/')
    .get((req, res, next) => {
        Product.distinct('category')
            .then((category) => res.json(category))
            .catch((err) => next(err));
    })
    .post((req, res) => res.end(`DELETE operation not supported on /products/categories`))
    .put((req, res) => res.end(`DELETE operation not supported on /products/categories`))
    .delete((req, res) => res.end(`DELETE operation not supported on /products/categories`));

// Get Products per Category
categoryRouter
    .route('/:category')
    .get((req, res, next) => {
        Product.find({ category: req.params.category })
            .then((products) => res.json(products))
            .catch((err) => next(err));
    })
    .post((req, res) => res.end(`DELETE operation not supported on /products/categories/${req.params.category}`))
    .put((req, res) => res.end(`DELETE operation not supported on /products/categories/${req.params.category}`))
    .delete((req, res) => res.end(`DELETE operation not supported on /products/categories/${req.params.category}`));

module.exports = categoryRouter;
