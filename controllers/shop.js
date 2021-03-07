const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    
    const products = Product.fetchAll();

    console.info('main page: ',req.session);
    
    res.render('shop/product-list',{ 
        products: products, 
        pageTitle: 'Shop',
        isAuthenticated: req.session.isLoggedIn 
    });
}

exports.getProduct = (req, res, next) => {
    
    const prodId = req.params.productId;

    Product.findById(prodId, product => {
        console.info(product);
        res.render('shop/product-detail',{ 
            product: product, 
            pageTitle: 'Product Details',
            isAuthenticated : req.session.isLoggedIn
        });
    });
}

exports.getIndex = (req, res, next) => {
    
    const products = Product.fetchAll();
    
    console.info('from inex: ', req.session);

    if(!req.session.isLoggedIn){
        return res.render('welcome',{ 
            pageTitle: 'Shop',
            isAuthenticated : false
        });
    }else {
    
    return res.render('shop/index',{ 
        products: products, 
        pageTitle: 'Shop',
        isAuthenticated : req.session.isLoggedIn
    });
    }
}

exports.getCard = (req, res, next) => {    
    res.render('shop/card',{ 
        pageTitle: 'Card',
        isAuthenticated : req.session.isLoggedIn
    });
}