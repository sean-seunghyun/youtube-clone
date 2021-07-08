import User from "../models/User";
import bcrypt from "bcrypt";



export const edit = (req, res) => {
    res.send("edit user");
}

export const remove = (req, res) => {
    res.send("remove user");
}


export const getJoin = (req, res) => {

    return res.render('join', {pageTitle: 'Join'});
}

export const postJoin = async (req, res) => {
    const { emailAddress, password1, password2, name, location } = req.body;

    if(password1 !== password2) return res.status(400).render('join', {joinError: 'password incorrect!'});
    if(await User.exists({emailAddress})) return res.status(400).render('join', {joinError: 'email already exists!', pageTitle:'Join'});

    const user = new User({
        emailAddress,
        password: password1,
        name,
        location
    })
    await user.save();
    return res.redirect('/');
}


export const getLogin = (req, res) => {
    return res.render("login", {pageTitle:'Log in'});
}
export const postLogin = async (req, res) => {

    try{
        const { emailAddress, password } = req.body;
        const exists = await User.exists({emailAddress});
        if(!exists) return res.status(400).render('login', {logInError: 'email does not exists!', pageTitle:'Log in'});

        const user = await User.findOne({emailAddress});
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.status(400).render('login', {logInError: 'password does not match!', pageTitle:'Log in'});

        req.session.loggedIn = 'true';
        req.session.user = user;

        res.locals.loggedIn = req.session.loggedIn;
        res.locals.user = user;


        return res.redirect('/');
    }catch (e) {
        return res.status(404).render({pageTitle:'404Error'});
    }

}

export const logout = (req, res) => {
    res.send("logout user");
}
export const see = (req, res) => {
    res.send("see user");
}