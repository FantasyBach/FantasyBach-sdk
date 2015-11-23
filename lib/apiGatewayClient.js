var utils = require('./utils');
var sigV4ClientFactory = require('./sigV4Client');
var simpleHttpClientFactory = require('./simpleHttpClient');
module.exports = {
    newClient : function (simpleHttpClientConfig, sigV4ClientConfig) {
        var apiGatewayClient = {};
        //Spin up 2 httpClients, one for simple requests, one for SigV4
        var sigV4Client = sigV4ClientFactory.newClient(sigV4ClientConfig);
        var simpleHttpClient = simpleHttpClientFactory.newClient(simpleHttpClientConfig);

        apiGatewayClient.makeRequest = function (request, authType, additionalParams) {
            //Default the request to use the simple http client
            var clientToUse = simpleHttpClient;

            //If an auth type was specified inject the appropriate auth client
            if (authType === 'AWS_IAM') {
                clientToUse = sigV4Client;
            }

            if (request.body === '' || request.body === null || Object.keys(request.body).length === 0) {
                request.body = undefined;
            }

            // If the user specified any additional headers or query params that may not have been modeled
            // merge them into the appropriate request properties
            request.headers = utils.mergeInto(request.headers, additionalParams.headers);
            request.queryParams = utils.mergeInto(request.queryParams, additionalParams.queryParams);

            //Call the selected http client to make the request, returning a promise once the request is sent
            return clientToUse.makeRequest(request);
        };
        return apiGatewayClient;
    }
};
