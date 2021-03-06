const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetsSchema = new Schema({
    content: {type: String, required: true},
    imageUrl: String,
    imageGroup: String,
    author: {
        name: {type: String, required: true},
        username: {type: String, required: true},
        location: String,
        bio: String,
        avatarUrl: {type: String, default: '/img/webdxd.png'}
    },
    createdAt: {type: Date, required: true, default: Date.now},
    modifiedAt: {type: Date, required: true, default: Date.now}
});

// const TweetsSchema = new Schema({
//     content: {type: String, required: true},
//     imageUrl: String,
//     imageGroup: String,
//     author: {type:Schema.Types.ObjectId, ref:'Users'},
//     createdAt: {type: Date, required: true, default: Date.now},
//     modifiedAt: {type: Date, required: true, default: Date.now}
// });

const Tweets = mongoose.model('Tweets', TweetsSchema);

module.exports = Tweets;