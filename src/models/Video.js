import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
    url: {type:String, required:true},
    title: {type: String, maxlength:128, required: true},
    description: {type: String, minlength:4, required: true},
    createdAt: { type: Date, default: Date.now },
    hashTags: [{type:String}],
    meta : {
        views: {type: Number, default:0},
        rating: {type: Number, default:0},
    },
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});


videoSchema.static('formatHashTags',function(hashTags){
    return hashTags.split(",").map(hashTag => hashTag.startsWith('#')? hashTag : `#${hashTag}`);

})

const Video = mongoose.model("Video", videoSchema);
export default Video;
