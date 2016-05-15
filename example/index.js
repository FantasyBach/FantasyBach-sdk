var FantasyBachSdk = require('../').FantasyBachSdk;

/*
 * This expires frequently.
 * A new one can be generated here: https://developers.facebook.com/tools/explorer/307416292730318
 */
var fbToken = 'EAAEXlZB7tJc4BAGE56UYwgZAZBs4ZC65TZBdTuuYDftdwcNy1srsr4oSF0dYP3BH6RcSaeQcS5G9YRRHDa6kUyWSHUOZAaxlnZAfbl0zYiK9cXkv4aSfn9KIdHcUi9owVqCqXEoJxdyYgJz5Vfs5Xp2ZAJBAzZBQrC9pCvGrlnJTd8QZDZD';

var seasonId = 'season:NJWJTpZ8x';

var apigClient = new FantasyBachSdk();
apigClient.login({token : fbToken}).then(function(result) {
    console.log('login GET success');
    console.log(result);
    var userId = result.userId;

    apigClient.postNickname({}, { nickname : 'MixMasterMitch' }).then(function(result) {
        console.log('nickname POST success');
        console.log(result);
    }).catch(function(result) {
        console.log('nickname POST failure');
        console.log(result);
    });

    apigClient.getCurrentUser({ seasonId : seasonId }, {}).then(function(result) {
        console.log('user GET success');
        console.log(result);
    }).catch(function(result) {
        console.log('user GET failure');
        console.log(result);
    });

    apigClient.getRoles({ seasonId : seasonId }, {}).then(function(result) {
        console.log('roles GET success');
        console.log(result);
    }).catch(function(result) {
        console.log('roles GET failure');
        console.log(result);
    });

    apigClient.getContestants({ seasonId : seasonId }, {}).then(function(result) {
        console.log('contestants GET success');
        console.log(result);
    }).catch(function(result) {
        console.log('contestants GET failure');
        console.log(result);
    });

    apigClient.postRose({ seasonId : seasonId }, {
        contestantId : '3b74275c-caad-4a94-9e1e-26cdea0ac050',
        roundId : '55baf478-90ec-11e5-8994-feff819cdc9f',
        countDelta : 1
    }).then(function(result) {
        console.log('rose POST success');
        console.log(result);
    }).catch(function(result) {
        console.log('rose POST failure');
        console.log(result);
    });

    apigClient.postPick({ seasonId : seasonId, roundId : 'bfcf0ace-90ed-11e5-8994-feff819cdc9f' }, {
        roleId : '5773fd3c-90d8-11e5-8994-feff819cdc9f',
        contestantId : '3b74275c-caad-4a94-9e1e-26cdea0ac050'
    }).then(function(result) {
        console.log('pick POST success');
        console.log(result);

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
        console.log('pick POST failure');
        console.log(result);
    });

}).catch(function(result) {
    console.log('login GET failure');
    console.log(result);
});
