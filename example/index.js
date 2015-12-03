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
    var userId = result.data.userId;

    apigClient = apigClientFactory.newClient({
        accessKey: result.data.accessKey,
        secretKey: result.data.secretKey,
        sessionToken: result.data.sessionToken
    });

    apigClient.postNickname({}, { nickname : 'MixMasterMitch' }).then(function(result) {
        console.log('nickname POST success');
        console.log(result);
    }).catch(function(result) {
        console.log('nickname POST failure');
        console.log(result);
    });

    apigClient.getUserById({ seasonId : seasonId, id : userId }, {}).then(function(result) {
        console.log('user GET success');
        console.log(result);
    }).catch(function(result) {
        console.log('user GET failure');
        console.log(result);
    });

    apigClient.getContestants({ seasonId : seasonId }, {}).then(function(result) {
        console.log('contestants GET success');
        console.log(result);
    }).catch(function(result) {
        console.log('contestants GET failure');
        console.log(result);
    });

    apigClient.deletePick({ seasonId : seasonId, roundId : 'bfcf0ace-90ed-11e5-8994-feff819cdc9f' }, {
        roleId : '5773fd3c-90d8-11e5-8994-feff819cdc9f',
        contestantId : '3b74275c-caad-4a94-9e1e-26cdea0ac050'
    }).then(function(result) {
        console.log('pick DELETE success');
        console.log(result);
    }).catch(function(result) {
        console.log('pick DELETE failure');
        console.log(result);
    });
    
}).catch(function(result) {
    console.log('login GET failure');
    console.log(result);
});