import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";


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

export const startGithubLogin = (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const config = {
        client_id: 'c3df5bb74f57219db0b6',
        scope: 'read:user user:email',
        allow_signup: false
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    console.log(finalUrl);
    res.redirect(finalUrl);
}

export const finishtGithubLogin = async (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/access_token';
    const config = {
        client_id: 'c3df5bb74f57219db0b6',
        client_secret:'6239a9bf918063ecedaac67c06237ae87736bff1',
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString();

    let finalUrl = `${baseUrl}?${params}`;

    let tokenRequest = await (await fetch(finalUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        }
        })).json();

    if("access_token" in tokenRequest){
        const {access_token} = tokenRequest;

        const apiUrl = 'https://api.github.com/user'

        const userData = await (
            await fetch(apiUrl,{
            headers: {
                'Authorization': `token ${access_token}`,
            },
        })).json();
        console.log(userData);

        const emailData = await (
            await fetch(`${apiUrl}/emails`,{
            headers: {
                'Authorization': `token ${access_token}`,
            },
        })).json();
        console.log(emailData);

       const email = emailData.find((email) => email.primary === true && email.verified === true);
       if(!email) res.redirect('/login');
       console.log(email);


    }else{
        return res.redirect('/login')
    }


}