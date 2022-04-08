const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/products');

const productRouter = express.Router();

productRouter
    .route('/')
    .get((req, res, next) => {
        const limit = Number(req.query.limit) || 0;
        const sort = req.query.sort === 'desc' ? -1 : 1;

        Product.find()
            .limit(limit)
            .sort({ title: sort })
            .then((products) => res.json(products))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        console.log(req.body === true);
        if (req.body) {
            Product.create(req.body)
                .then((product) => res.json(product))
                .catch((err) => next(err));
        }
    })
    .put((req, res) => res.end(`PUT operation not supported on /products`))
    .delete((req, res) => res.end(`DELETE operation not supported on /products`));

productRouter
    .route('/:id')
    .all((req, res, next) => {
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (isValidId) next();
        else res.end(`Product ID: ${req.params.id} not found`);
    })
    .get((req, res, next) => {
        Product.findOne({ _id: req.params.id })
            .then((product) => res.json(product))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((product) => res.json(product))
            .catch((err) => next(err));
    })
    .patch((req, res, next) => {
        Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((product) => res.json(product))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Product.findByIdAndDelete(req.params.id)
            .then((response) => res.json(response))
            .catch((err) => next(err));
    })
    .post((req, res) => res.end(`PUT operation not supported on /products/${req.params.id}`));

module.exports = productRouter;
