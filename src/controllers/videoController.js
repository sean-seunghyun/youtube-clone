const user = {
    name: "sean",
    loggedIn: false
}


export const trending = (req, res) => {
    const videos = [
        {
        title: "#1",
        author: "sean",
        comments: 3,
        createdAt: "20210608",
        view: 55,
        star: 3
        },
        {
        title: "check out #2",
        author: "John",
        comments: 3,
        createdAt: "20210608",
        view: 56,
        star: 3.4
        },
        {
        title: "#3 videos",
        author: "Tesla",
        comments: 3,
        createdAt: "20210608",
        view: 56,
        star: 2.2
        }
    ];
    return res.render('home', { pageTitle: "home", videos, user } );
}

export const watch = (req, res) => res.render('watch', {pageTitle: "watch"} );

export const edit = (req, res) => res.render('edit', {pageTitle: "edit"} );

export const search = (req, res) => res.send("search videos");

export const remove = (req, res) => res.send(`remove videos: ${req.params.id}`);

export const upload = (req, res) => res.send("upload videos");