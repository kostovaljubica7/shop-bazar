exports.get404 = ( reg, res, next ) => {
    res.status(404).render('404',{
        pageTitle:'404 Error',
        isAuthenticated : reg.session.isLoggedIn
    });
}