var apigClientFactory = require('fantasybach-sdk');

/*
 * This expires frequently.
 * A new one can be generated here: https://developers.facebook.com/tools/explorer/307416292730318
 */
var fbToken = 'CAAEXlZB7tJc4BAOqebfBOTT0Qa0f5NapzchbGCF1Tg3TrkwVi796p9S0yZASyu47fQbKEROCA2LBbNpmdAaOfUsBEOlCzeValoi0dUU4Kmwza04pN7WIGPC7UwcLLaVJxiQbqbnCV6yAyCQEQXJ9VPdSUF0hBWJbEg8Q4W0QsV0RTJEhDv64UVCBldaVQv2E48ZB2ivt5CiaZCYEwQR7';

var seasonId = '100905a6-90d7-11e5-8994-feff819cdc9f';

var apigClient = apigClientFactory.newClient();
apigClient.login({token : fbToken}, {}).then(function(result) {
    console.log('login GET success');
    console.log(result);

    apigClient = apigClientFactory.newClient({
        accessKey: result.data.accessKey,
        secretKey: result.data.secretKey,
        sessionToken: result.data.sessionToken
    });

    apigClient.getRoles({ seasonId : seasonId }, {}).then(function(result) {
        console.log('roles GET success');
        console.log(result);
    }).catch(function(result) {
        console.log('roles GET failure');
        console.log(result);
    });
    
}).catch(function(result) {
    console.log('login GET failure');
    console.log(result);
});