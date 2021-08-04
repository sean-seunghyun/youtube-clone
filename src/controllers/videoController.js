import Video from "../models/Video";
import User from "../models/User"



export const home = async (req, res) => {
    const videos = await Video.find().sort({createdAt: 'desc'}).populate('owner');
    return res.render('home', { pageTitle: "home", videos } );
}

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate('owner');
    console.log(video);
    if(video === null){
        return res.status(404).render('404', {pageTitle: '404 Error'});
    }
    return res.render('watch', {pageTitle: `Watching ${video.title}`, video} );
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.session.user;
    const video = await Video.findById(id);
    if(!video){
        return res.status('404').render('404', {pageTitle: 'video not found'});
    }
    if(String(_id) !== String(video.owner)){
        return res.status('403').redirect('/');
    }

    return res.render('edit', {pageTitle: `Editing ${video.title}`, video} );
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.session.user;
    const { title, description, hashTags } = req.body;

    const video = await Video.findOne({_id:id});

    if(!video){
        return res.status(404).render('404', {pageTitle: '404 Error'});
    }

    if(String(_id) !== String(video.owner)){
        return res.status('403').redirect('/');
    }

    const updatedVideo = await Video.findByIdAndUpdate(id, {
            title,
            description,
            hashTags: Video.formatHashTags(hashTags)
        }, {new:true});
    await console.log(updatedVideo);

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
    console.log(req.session.user);
    //console.log(req.sessions.user);
    const { user:{ _id } }= req.session;
    const video = await Video.findOneAndDelete({_id: id});

       if(String(video.owner) !== String(_id)){
           return res.status('403').redirect('/');
       }
       return res.redirect('/');
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: 'Upload'});
}

export const postUpload = async (req, res) => {
    try{
        const { title, description, hashTags } = req.body;
        const {user:{_id}} = req.session;
        console.log(req.file);
        const {path : url}=req.file;
        console.log(url);
        const video = new Video({
            url,
            title,
            description,
            hashTags:Video.formatHashTags(hashTags),
            owner: _id
        });
        const user = await User.findById(_id);
        user.videos.push(video._id);
        await user.save();
        await video.save();
        return res.redirect('/');
    }catch (e) {
       return res.render("upload", {pageTitle:'upload', error:e})
    }

}

export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus('404');
    }
    video.meta.views = video.meta.views + 1;
    await video.save();

    return res.sendStatus('200');
}