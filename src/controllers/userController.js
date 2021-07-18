import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";


export const getEdit = (req, res) => {
    return res.render('users/userEdit', {pageTitle: 'Edit Profile'});
}

export const postEdit = async (req, res) => {
    console.log(req.file);
    const {
        session: {
            user: {_id, avatarUrl},
        },
        body: {name, emailAddress, location},
        file
    } = req;

    const updatedUser = await User.findByIdAndUpdate(_id, {
        avatarUrl: file ? file.path : avatarUrl,
        name,
        emailAddress,
        location
    }, {new: true});
    req.session.user = updatedUser;
    return res.redirect('/users/edit');
}

export const remove = (req, res) => {
    res.send("remove users");
}

export const getJoin = (req, res) => {

    return res.render('join', {pageTitle: 'Join'});
}

export const postJoin = async (req, res) => {
    const {emailAddress, password1, password2, name, location} = req.body;

    if (password1 !== password2) return res.status(400).render('join', {joinError: 'password incorrect!'});
    if (await User.exists({emailAddress})) return res.status(400).render('join', {
        joinError: 'email already exists!',
        pageTitle: 'Join'
    });

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
    return res.render("login", {pageTitle: 'Log in'});
}
export const postLogin = async (req, res) => {

    try {
        const {emailAddress, password} = req.body;
        const user = await User.findOne({emailAddress, socialSignUp: false});
        if (!user) {
            return res.status(400).render('login', {
                logInError: 'login Failed, please check email again.',
                pageTitle: 'log In'
            });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.status(400).render('login', {
            logInError: 'login Failed, please check password again.',
            pageTitle: 'log In'
        });

        req.session.loggedIn = 'true';
        req.session.user = user;

        return res.redirect('/');
    } catch (e) {
        return res.status(404).render({pageTitle: '404Error'});
    }

}

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect('/');
}
export const see = (req, res) => {
    res.send("see users");
}

export const startGithubLogin = (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const config = {
        client_id: 'c3df5bb74f57219db0b6',
        scope: 'read:users users:email',
        allow_signup: false
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    // console.log(finalUrl);
    res.redirect(finalUrl);
}

export const finishGithubLogin = async (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/access_token';
    const config = {
        client_id: 'c3df5bb74f57219db0b6',
        client_secret: '6239a9bf918063ecedaac67c06237ae87736bff1',
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString();

    let finalUrl = `${baseUrl}?${params}`;

    let tokenRequest = await (await fetch(finalUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        }
    })).json();

    if ("access_token" in tokenRequest) {
        const {access_token} = tokenRequest;

        const apiUrl = 'https://api.github.com/user'

        const userData = await (
            await fetch(apiUrl, {
                headers: {
                    'Authorization': `token ${access_token}`,
                },
            })).json();
        // console.log(userData);

        const emailData = await (
            await fetch(`${apiUrl}/emails`, {
                headers: {
                    'Authorization': `token ${access_token}`,
                },
            })).json();
        // console.log(emailData);

        const email = emailData.find((email) => email.primary === true && email.verified === true);
        if (!email) res.redirect('/login');
        // console.log(email);


        const user = await User.findOne({emailAddress: email.email});
        if (!user) {
            //sign up
            const user = new User({
                emailAddress: email.email,
                password: '',
                name: userData.login,
                location: userData.location,
                socialSignUp: true,
                avatarUrl: userData.avatar_url
            })
            await user.save();
        }
        req.session.loggedIn = 'true';
        // console.log(`users is ...? ${users}`);
        req.session.user = user;
        // console.log(`session is ...? ${JSON.stringify(req.session.users)}`);
        return res.redirect('/');

    } else {
        return res.redirect('/login')
    }


}

export const getChangePassword = (req, res) => {

    return res.render('users/changePassword', {pageTitle: 'Change password'});
}

export const postChangePassword = async (req, res) => {
    const {
        session: {
            user: {
                _id
            }
        },
        body: {
            oldPassword,
            newPassword1,
            newPassword2
        }
    } = req;
    const user = await User.findById(_id);
    const checkPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkPassword) {
        return res.status(400).render('changePassword', {error: 'password is incorrerct'});
    }
    if (newPassword1 !== newPassword2) {
        return res.status(400).render('changePassword', {error: 'new passwords are not matching'});
    }
    user.password = newPassword1;
    await user.save();
    req.session.user.password = user.password;
    return res.redirect('logout')
}