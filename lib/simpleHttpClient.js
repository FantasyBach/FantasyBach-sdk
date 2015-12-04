var utils = require('./utils');
var axios = require('axios');

var SimpleHttpClient = module.exports.SimpleHttpClient = function(config) {
    _.defaults(this, config);
};

SimpleHttpClient.prototype = {

    makeRequest : function(request) {
        var queryParams = utils.copy(request.queryParams);
        if (queryParams === undefined) {
            queryParams = {};
        }
        var headers = utils.copy(request.headers);
        if (headers === undefined) {
            headers = {};
        }

        //If the user has not specified an override for Content type the use default
        if (headers['Content-Type'] === undefined) {
            headers['Content-Type'] = this.defaultContentType;
        }

        //If the user has not specified an override for Accept type the use default
        if (headers['Accept'] === undefined) {
            headers['Accept'] = this.defaultAcceptType;
        }

        var body = utils.copy(request.body);
        if (body === undefined || body === '' || body === null || Object.keys(body).length === 0) {
            body = undefined;
        }

        var url = this.endpoint + request.path;
        var queryString = this._buildCanonicalQueryString(queryParams);
        if (queryString != '') {
            url += '?' + queryString;
        }
        var simpleHttpRequest = {
            method: request.verb,
            url: url,
            headers: headers,
            data: body
        };
        return axios(simpleHttpRequest);
    },

    _buildCanonicalQueryString : function(queryParams) {
        //Build a properly encoded query string from a QueryParam object
        if (Object.keys(queryParams).length < 1) {
            return '';
        }

        var canonicalQueryString = '';
        for (var property in queryParams) {
            if (queryParams.hasOwnProperty(property)) {
                canonicalQueryString += encodeURIComponent(property) + '=' + encodeURIComponent(queryParams[property]) + '&';
            }
        }

        return canonicalQueryString.substr(0, canonicalQueryString.length - 1);
    }

};

