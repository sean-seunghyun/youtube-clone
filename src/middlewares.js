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
        req.flash('error', 'please log in');
        return res.redirect('/login');
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next();
    }else{
        req.flash('error', 'Already logged in');
        return res.redirect('/');
    }
}

export const uploadAvatarMiddleware = multer({dest: 'uploads/users', limits:{fileSize:5000000}})

export const uploadVideoMiddleware = multer({dest: 'uploads/videos', limits:{fileSize:100000000}})

