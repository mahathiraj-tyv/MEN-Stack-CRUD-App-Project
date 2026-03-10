function isAuthenticated(req, res, next) {
    if(req.session.userId) return next();
    res.redirect('/login');
}

function isAdmin(req, res, next) {
    if(req.session.userRole === 'admin') return next();
    res.status(403).send('Access Denied');
}

function isCustomer(req, res, next) {
    if(req.session.userRole === 'customer') return next();
    res.status(403).send('Access Denied');
}

module.exports = { isAuthenticated, isAdmin, isCustomer };