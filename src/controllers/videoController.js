import Video from "../models/video";

const user = {
    name: "sean",
    loggedIn: false
}


export const trending = async (req, res) => {
    const videos = await Video.find();
    return res.render('home', { pageTitle: "home", videos, user } );
}

export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render('watch', {pageTitle: `Watching ${video.title}`, video} );
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render('edit', {pageTitle: `Editing ${video.title}`, video} );
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title = title;
    return res.redirect(`/videos/${id}`);
}

export const search = (req, res) => res.send("search videos");

export const remove = (req, res) => res.send(`remove videos: ${req.params.id}`);

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: 'Upload'});
}

export const postUpload = async (req, res) => {
    try{
        const { title, description, hashTags } = req.body;
        const video = new Video({
            title,
            description,
            hashTags: hashTags.split(',').map(hashtag => '#'+hashtag),
        });
        await video.save();
        return res.redirect('/');
    }catch (e) {
       return res.render("upload", {pageTitle:'upload', error:e})
    }

}