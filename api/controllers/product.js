const mongoose = require('mongoose');
const Product = require('../models/product');

exports.productGet = (req, res, next) => {
    Product.find()
        .select('name, price _id')
        .exec()
        .then(doc => {
            const response = {
                count: doc.length,
                product: doc.map(docs => {
                    return {
                        name: docs.name,
                        price: docs.price,
                        _id: docs.id,
                        url: {
                            type: 'GET',
                            url: 'http://localhost:3000/products' + docs._id
                        }
                    }
                })
            };
            //if (doc >= 0) {
                res.status(200).json(response);
            // } else {
            //     res.status(404).json({ message: 'No entries found' });
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.productPost = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Product Saved Successfully!',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    url: {
                        type: 'POST',
                        url: 'http://localhost:3000/products' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.productGetById = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name, price, _id')
        .exec()
        .then(doc => {
            console.log("From the database",doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/:productId'
                    }
                });  
            } else {
                res.status(404).json({ message: "No Valid entry for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.productUpdate = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Updated product',
                request: {
                    type: 'PUT',
                    url: 'http://localhost:3000/products'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};

exports.productDelete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product Deleted successfully',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    body: {name: 'String', price: 'Number'},
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};