module.exports = {


    'googleAuth' : {
        'clientID': process.env.Google_OAuth_App_ClientID,
        'clientSecret'  : process.env.Google_OAuth_App_ClientSecret,
        'callbackURL'   : 'https://hangman-royale.herokuapp.com/login/authorized'
        // 'callbackURL'   : 'http://127.0.0.1:5000/login/authorized'
    },

    'googleAuth2' : {
        'clientID': process.env.Google_OAuth_App_ClientID,
        'clientSecret'  : process.env.Google_OAuth_App_ClientSecret,
        'callbackURL'   : 'https://hangman-royale.herokuapp.com/login/authorized'
        // 'callbackURL'   : 'http://127.0.0.1:5000/login/authorized'
    },


};
