import Video from "../models/Video";




export const home = async (req, res) => {
    const videos = await Video.find().sort({createdAt: 'desc'});
    return res.render('home', { pageTitle: "home", videos } );
}

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(video === null){
        return res.status(404).render('404', {pageTitle: '404 Error'});
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
        return res.status(404).render('404', {pageTitle: '404 Error'});
    }

    await Video.findByIdAndUpdate(id, {
            title,
            description,
            hashTags: Video.formatHashTags(hashTags)
        })

    return res.redirect(`/videos/${id}`);
}

export const search = async (req, res) => {
    const { keyword } = req.query;

    let videos = await Video.find({title: {$regex: keyword, $options: 'i' }});
    console.log(videos);
    return res.render('search', {pageTitle: 'Search', videos});
}

export const remove = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await Video.findOneAndDelete({_id: id});

    return res.redirect('/');
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: 'Upload'});
}

export const postUpload = async (req, res) => {
    try{
        const { title, description, hashTags } = req.body;
        console.log(req.file);
        const {path : url}=req.file;
        console.log(url);
        const video = new Video({
            url,
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