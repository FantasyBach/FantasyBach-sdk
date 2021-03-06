var uritemplate = require('uri-template').parse;
var _ = require('lodash');
var utils = require('./lib/utils');
var SigV4Client = require('./lib/sigV4Client').SigV4Client;
var SimpleHttpClient = require('./lib/simpleHttpClient').SimpleHttpClient;
var getXhrObject = require('./lib/getXhrObject');

var FantasyBachSdk = module.exports.FantasyBachSdk = function(config) {
    if (config === undefined) { config = {}; }
    config = utils.copy(config);
    this.config = _.defaults(config, {
        accessKey : '',
        secretKey : '',
        serviceName : 'execute-api',
        sessionToken : '',
        region : 'us-east-1',
        defaultContentType : 'application/json; charset=UTF-8',
        defaultAcceptType : 'application/json',
        endpoint : 'https://api.fantasybach.com',
        parentDomain : 'fantasybach.com',
        stage : 'dev'
    });

    //Store any path components that were present in the endpoint to append to API calls
    this.pathComponent = '/' + config.stage;

    getXhrObject.init(this.config);
};

FantasyBachSdk.prototype = {
    login : function(params, body) {
        utils.assertParametersDefined(params, ['token']);

        var loginGetRequest = {
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/login').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, ['token']),
            body: body
        };

        var thiz = this;
        return new SimpleHttpClient(this.config).makeRequest(loginGetRequest).then(function(result) {
            thiz.config.accessKey = result.accessKey;
            thiz.config.secretKey = result.secretKey;
            thiz.config.sessionToken = result.sessionToken;
            return result;
        });
    },
    
    getContestants : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);
    
        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/contestant').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    getContestantById : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'id']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/contestant').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, ['id']),
            body: body
        });
    },

    getContestantsById : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'ids']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/contestant').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    getRoles : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/role').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    getRoleById : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'id']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/role').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, ['id']),
            body: body
        });
    },

    getRolesById : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'ids']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/role').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, ['ids']),
            body: body
        });
    },

    getRounds : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/round').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    getRoundById : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'id']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/round').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, ['id']),
            body: body
        });
    },

    getRoundsById : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'ids']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/round').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, ['ids']),
            body: body
        });
    },

    postNickname : function (params, body) {
        utils.assertParametersDefined(params, []);

        return new SigV4Client(this.config).makeRequest({
            verb: 'post'.toUpperCase(),
            path: this.pathComponent + uritemplate('/nickname').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    postPick : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'roundId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'post'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/round/{roundId}/pick').expand(utils.parseParametersToObject(params, ['seasonId', 'roundId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    deletePick : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'roundId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'delete'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/round/{roundId}/pick').expand(utils.parseParametersToObject(params, ['seasonId', 'roundId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    getTopUsers : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/topUsers').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    getCurrentUser : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/user').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    getUserById : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'id']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/user').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, ['id']),
            body: body
        });
    },

    getUsersById : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'ids']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'get'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/user').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, ['ids']),
            body: body
        });
    },

    postAction : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'post'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/admin/action').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    postRose : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'post'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/admin/rose').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    postElimination : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'post'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/admin/eliminate').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    postPrepareRound : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'post'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/admin/prepareRound').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    postOptimalLineup : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'post'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/admin/optimalLineup').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    // postUpdateScores : function (params, body) {
    //     utils.assertParametersDefined(params, ['seasonId']);
    //
    //     return new SigV4Client(this.config).makeRequest({
    //         verb: 'post'.toUpperCase(),
    //         path: this.pathComponent + uritemplate('/season/{seasonId}/updateScores').expand(utils.parseParametersToObject(params, ['seasonId'])),
    //         headers: utils.parseParametersToObject(params, []),
    //         queryParams: utils.parseParametersToObject(params, []),
    //         body: body
    //     });
    // },
    //
    // postUpdatePicks : function (params, body) {
    //     utils.assertParametersDefined(params, ['seasonId']);
    //
    //     return new SigV4Client(this.config).makeRequest({
    //         verb: 'post'.toUpperCase(),
    //         path: this.pathComponent + uritemplate('/season/{seasonId}/updatePicks').expand(utils.parseParametersToObject(params, ['seasonId'])),
    //         headers: utils.parseParametersToObject(params, []),
    //         queryParams: utils.parseParametersToObject(params, []),
    //         body: body
    //     });
    // },

    postLeague : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'post'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/league').expand(utils.parseParametersToObject(params, ['seasonId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    },

    postLeagueJoin : function (params, body) {
        utils.assertParametersDefined(params, ['seasonId', 'leagueId']);

        return new SigV4Client(this.config).makeRequest({
            verb: 'post'.toUpperCase(),
            path: this.pathComponent + uritemplate('/season/{seasonId}/league/{leagueId}/join').expand(utils.parseParametersToObject(params, ['seasonId', 'leagueId'])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        });
    }
};
