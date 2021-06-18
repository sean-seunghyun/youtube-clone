import Video from "../models/video";

const user = {
    name: "sean",
    loggedIn: false
}

export const home = async (req, res) => {
    const videos = await Video.find();
    return res.render('home', { pageTitle: "home", videos, user } );
}

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(video === null){
        return res.render('404', {pageTitle: '404 Error'});
    }
    return res.render('watch', {pageTitle: `Watching ${video.title}`, video} );
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    return res.render('edit', {pageTitle: `Editing ${video.title}`, video} );
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashTags } = req.body;

    const exists = await Video.exists({
        _id: id
    })
    if(!exists){
        return res.render('404', {pageTitle: '404 Error'});
    }

    await Video.findByIdAndUpdate(id, {
            title,
            description,
            hashTags: Video.formatHashTags(hashTags)
        })

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
            hashTags:Video.formatHashTags(hashTags)
        });
        console.log(video);
        await video.save();
        return res.redirect('/');
    }catch (e) {
       return res.render("upload", {pageTitle:'upload', error:e})
    }

}