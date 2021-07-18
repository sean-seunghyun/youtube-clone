import multer from "multer"

export const localsMiddleware = (req, res, next) => {
    res.locals.title = 'Wetube';
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.user = req.session.user || {};
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return next();
    }
    else{
        return res.redirect('/login');
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next();
    }else{
        return res.redirect('/');
    }
}

export const uploadFileMiddleware = multer({dest: 'uploads/'})