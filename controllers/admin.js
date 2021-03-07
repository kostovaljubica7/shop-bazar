const Product = require('../models/product');

exports.getAddProduct = ( req, res, next ) => {
    res.render('admin/add-product', { 
        pageTitle : "Add Product",
        isAuthenticated : req.session.isLoggedIn
     });
}

exports.postAddProduct = ( reg, res, next ) => {
    const product = new Product(reg.body.name);
    product.save();
    res.redirect('/');
}