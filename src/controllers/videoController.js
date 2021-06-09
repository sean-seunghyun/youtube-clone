const user = {
    name: "sean",
    loggedIn: false
}

const videos = [
    {
        title: "Magical power",
        author: "sean",
        comments: 3,
        createdAt: "2021.06.28",
        view: 55,
        star: 3,
        id: 1
    },
    {
        title: "Yerin Baek songs",
        author: "John",
        comments: 3,
        createdAt: "2021.06.18",
        view: 1,
        star: 3.4,
        id: 2
    },
    {
        title: "classical music",
        author: "pikachu",
        comments: 3,
        createdAt: "2021.06.08",
        view: 1,
        star: 2.2,
        id: 3
    }
];

export const trending = (req, res) => {
    return res.render('home', { pageTitle: "home", videos, user } );
}

export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render('watch', {pageTitle: `watching ${video.title}`, video} );
}

export const edit = (req, res) => res.render('edit', {pageTitle: "edit"} );

export const search = (req, res) => res.send("search videos");

export const remove = (req, res) => res.send(`remove videos: ${req.params.id}`);

export const upload = (req, res) => res.send("upload videos");