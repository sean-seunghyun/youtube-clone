import User from "../models/user";




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
    if(await User.exists({emailAddress})) return res.status(400).render('join', {joinError: 'email already exists!'});

    const user = new User({
        emailAddress,
        password: password1,
        name,
        location
    })
    await user.save();
    return res.redirect('/');
}

export const login = (req, res) => {
    res.send("logIn user");
}
export const logout = (req, res) => {
    res.send("logout user");
}
export const see = (req, res) => {
    res.send("see user");
}