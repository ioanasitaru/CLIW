const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.twitter = functions.https.onRequest((request, response) => {

    let Twit = require('twit');

    let T = new Twit({
        consumer_key: "MeJLR7J88nyosJOPSI7UUUbtO",
        consumer_secret: "2LgACJlkUtPyuZFJKsLW3COGXSlpp1ByZ6kDA4JcEHnRxqJoeF",
        access_token: request.body.token,
        access_token_secret: request.body.secret,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    });

    let b64content = request.body.img;

    // first we must post the media to Twitter
    T.post('media/upload', {media_data: b64content}, function (err, data, resp) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string;

        let message = "I just scored " +  request.body.score  + " in "  + request.body.module  +  "! Think you can beat me? Head over to https://asle-b7a2d.firebaseapp.com and try!";
        let params = { status: message, media_ids: [mediaIdStr] }

        T.post('statuses/update', params, function (err, data, resp) {
            console.log(data);
            response.send("done");
        })
    });

});
