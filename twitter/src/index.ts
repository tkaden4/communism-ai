import apiConfig from "../api.json";
import Twit from "twit";


const twit = new Twit({
    consumer_key: apiConfig.consumerKey,
    consumer_secret: apiConfig.consumerSecretKey,
    access_token: apiConfig.accessToken,
    access_token_secret: apiConfig.accessTokenSecret
});

function postTweet(t: Twit, status: string): Promise<object> {
    return new Promise((resolve, reject) => t.post("statuses/update", { status }, (err, data) => {
        if(err) {
            reject(err);
        } else {
            resolve(data);
        }
    }));
}

