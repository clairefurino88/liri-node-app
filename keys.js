
// console.log('this is loaded');
exports.twitter = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  };
  
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};console.log('this is loaded');

/*var twitterKeys = {
  consumer_key: 'q2pSYI6kcwRz7wFxWVgckEMt0',
  consumer_secret: 'jdRnZJ0Xc7lBTJGwILeFuvKnsIL9yk4EiuXO1CiULZXNpAUnQY',
  access_token_key: '982733063632359424-d09ZQiMNfiw3WC4GNeu6I4EAMFvvwKP',
  access_token_secret: 'JZfJwCoX7pTIeTxu4cHx0ejL4WNpTogkJyl33JV5tsoql',
}

var spotifyKeys = {
	id: 'd201f130448c47e3b551a64fa79d44e8',
	secret: '980867c962d94046a8314b37b3b78dae',
}

module.exports = {
	twitterKeys: twitterKeys,
	spotifyKeys: spotifyKeys
}