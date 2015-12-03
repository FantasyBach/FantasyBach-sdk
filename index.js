var uritemplate = require('uri-template').parse;
console.log(uritemplate);
var utils = require('./lib/utils');
var apiGatewayClientFactory = require('./lib/apiGatewayClient');

module.exports = {
    newClient : function (config) {
        var apigClient = {};
        if (config === undefined) {
            config = {
                accessKey: '',
                secretKey: '',
                sessionToken: '',
                region: '',
                defaultContentType: 'application/json',
                defaultAcceptType: 'application/json'
            };
        }
        if (config.accessKey === undefined) {
            config.accessKey = '';
        }
        if (config.secretKey === undefined) {
            config.secretKey = '';
        }
        if (config.sessionToken === undefined) {
            config.sessionToken = '';
        }
        if (config.region === undefined) {
            config.region = 'us-east-1';
        }
        //If defaultContentType is not defined then default to application/json
        if (config.defaultContentType === undefined) {
            config.defaultContentType = 'application/json';
        }
        //If defaultAcceptType is not defined then default to application/json
        if (config.defaultAcceptType === undefined) {
            config.defaultAcceptType = 'application/json';
        }

        if (config.stage === undefined) {
            config.stage = 'dev';
        }


        var endpoint = 'https://kku30n0xzl.execute-api.us-east-1.amazonaws.com/' + config.stage;
        var parser = document.createElement('a');
        parser.href = endpoint;

        //Use the protocol and host components to build the canonical endpoint
        endpoint = parser.protocol + parser.host;

        //Store any path components that were present in the endpoint to append to API calls
        var pathComponenent = parser.pathname;

        var sigV4ClientConfig = {
            accessKey: config.accessKey,
            secretKey: config.secretKey,
            sessionToken: config.sessionToken,
            serviceName: 'execute-api',
            region: config.region,
            endpoint: endpoint,
            defaultContentType: config.defaultContentType,
            defaultAcceptType: config.defaultAcceptType
        };

        var authType = 'NONE';
        if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
            authType = 'AWS_IAM';
        }

        var simpleHttpClientConfig = {
            endpoint: endpoint,
            defaultContentType: config.defaultContentType,
            defaultAcceptType: config.defaultAcceptType
        };

        var apiGatewayClient = apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);


        apigClient.login = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['token'], ['body']);

            var loginGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/login').expand(utils.parseParametersToObject(params, [])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, ['token']),
                body: body
            };


            return apiGatewayClient.makeRequest(loginGetRequest, authType, additionalParams);
        };


        apigClient.getContestants = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId'], ['body']);

            var seasonSeasonIdContestantGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/contestant').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, []),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdContestantGetRequest, authType, additionalParams);
        };


        apigClient.getContestantById = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'id'], ['body']);

            var seasonSeasonIdContestantGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/contestant').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, ['id']),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdContestantGetRequest, authType, additionalParams);
        };


        apigClient.getContestantsById = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'ids'], ['body']);

            var seasonSeasonIdContestantGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/contestant').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, ['ids']),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdContestantGetRequest, authType, additionalParams);
        };


        apigClient.getRoles = function (params, body, additionalParams) {
            console.log('getting roles');
            console.log(uritemplate);
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId'], ['body']);

            var seasonSeasonIdRoleGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/role').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, []),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdRoleGetRequest, authType, additionalParams);
        };


        apigClient.getRoleById = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'id'], ['body']);

            var seasonSeasonIdRoleGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/role').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, ['id']),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdRoleGetRequest, authType, additionalParams);
        };


        apigClient.getRolesById = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'ids'], ['body']);

            var seasonSeasonIdRoleGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/role').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, ['ids']),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdRoleGetRequest, authType, additionalParams);
        };


        apigClient.getRounds = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId'], ['body']);

            var seasonSeasonIdRoundGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/round').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, []),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdRoundGetRequest, authType, additionalParams);
        };


        apigClient.getRoundById = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'id'], ['body']);

            var seasonSeasonIdRoundGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/round').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, ['id']),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdRoundGetRequest, authType, additionalParams);
        };


        apigClient.getRoundsById = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'ids'], ['body']);

            var seasonSeasonIdRoundGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/round').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, ['ids']),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdRoundGetRequest, authType, additionalParams);
        };


        apigClient.postNickname = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, [], ['body']);

            var seasonSeasonIdRoundRoundIdPickPostRequest = {
                verb: 'post'.toUpperCase(),
                path: pathComponenent + uritemplate('/nickname').expand(utils.parseParametersToObject(params, [])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, []),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdRoundRoundIdPickPostRequest, authType, additionalParams);
        };


        apigClient.postPick = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'roundId'], ['body']);

            var seasonSeasonIdRoundRoundIdPickPostRequest = {
                verb: 'post'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/round/{roundId}/pick').expand(utils.parseParametersToObject(params, ['seasonId', 'roundId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, []),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdRoundRoundIdPickPostRequest, authType, additionalParams);
        };


        apigClient.deletePick = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'roundId'], ['body']);

            var seasonSeasonIdRoundRoundIdPickDeleteRequest = {
                verb: 'delete'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/round/{roundId}/pick').expand(utils.parseParametersToObject(params, ['seasonId', 'roundId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, []),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdRoundRoundIdPickDeleteRequest, authType, additionalParams);
        };


        apigClient.getTopUsers = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'numberOfUsers'], ['body']);

            var seasonSeasonIdTopUsersGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/topUsers').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, ['numberOfUsers']),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdTopUsersGetRequest, authType, additionalParams);
        };


        apigClient.getCurrentUser = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId'], ['body']);

            var seasonSeasonIdUserGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/user').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, []),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdUserGetRequest, authType, additionalParams);
        };


        apigClient.getUserById = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'id'], ['body']);

            var seasonSeasonIdUserGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/user').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, ['id']),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdUserGetRequest, authType, additionalParams);
        };


        apigClient.getUsersById = function (params, body, additionalParams) {
            if(additionalParams === undefined) { additionalParams = {}; }

            utils.assertParametersDefined(params, ['seasonId', 'ids'], ['body']);

            var seasonSeasonIdUserGetRequest = {
                verb: 'get'.toUpperCase(),
                path: pathComponenent + uritemplate('/season/{seasonId}/user').expand(utils.parseParametersToObject(params, ['seasonId'])),
                headers: utils.parseParametersToObject(params, []),
                queryParams: utils.parseParametersToObject(params, ['ids']),
                body: body
            };


            return apiGatewayClient.makeRequest(seasonSeasonIdUserGetRequest, authType, additionalParams);
        };


        return apigClient;
    }
};
