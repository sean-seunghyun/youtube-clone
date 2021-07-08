export const localsMiddleware = (req, res, next) => {
    res.locals.title = 'Wetube';
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.user = req.session.user;
    next();
}