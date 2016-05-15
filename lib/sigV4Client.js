var CryptoJS = require('crypto-js');
var moment = require('moment');
var _defaults = require('lodash/defaults');
var utils = require('./utils');
var makeRequest = require('./makeRequest');

var AWS_SHA_256 = 'AWS4-HMAC-SHA256';
var AWS4_REQUEST = 'aws4_request';
var AWS4 = 'AWS4';
var DATE_FORMAT = 'YYYYMMDD';
var TIME_FORMAT = 'HHmmss';
var X_AMZ_DATE = 'x-amz-date';
var X_AMZ_SECURITY_TOKEN = 'x-amz-security-token';
var HOST = 'host';
var AUTHORIZATION = 'Authorization';

var SigV4Client = module.exports.SigV4Client = function(config) {
    _defaults(this, config);
};

SigV4Client.prototype = {
    _hash : function(value) {
        return CryptoJS.SHA256(value);
    },

    _hexEncode : function(value) {
        return value.toString(CryptoJS.enc.Hex);
    },

    _hmac : function(secret, value) {
        return CryptoJS.HmacSHA256(value, secret, {asBytes: true});
    },

    _buildCanonicalRequest : function(method, path, queryParams, headers, payload) {
        return method + '\n' +
            this._buildCanonicalUri(path) + '\n' +
            this._buildCanonicalQueryString(queryParams) + '\n' +
            this._buildCanonicalHeaders(headers) + '\n' +
            this._buildCanonicalSignedHeaders(headers) + '\n' +
            this._hexEncode(this._hash(payload));
    },

    _hashCanonicalRequest : function(request) {
        return this._hexEncode(this._hash(request));
    },

    _buildCanonicalUri : function(uri) {
        return encodeURI(uri);
    },

    _buildCanonicalQueryString : function(queryParams) {
        if (Object.keys(queryParams).length < 1) {
            return '';
        }

        var sortedQueryParams = [];
        for (var property in queryParams) {
            if (queryParams.hasOwnProperty(property)) {
                sortedQueryParams.push(property);
            }
        }
        sortedQueryParams.sort();

        var canonicalQueryString = '';
        for (var i = 0; i < sortedQueryParams.length; i++) {
            canonicalQueryString += sortedQueryParams[i] + '=' + encodeURIComponent(queryParams[sortedQueryParams[i]]) + '&';
        }
        return canonicalQueryString.substr(0, canonicalQueryString.length - 1);
    },

    _buildCanonicalHeaders : function(headers) {
        var canonicalHeaders = '';
        var sortedKeys = [];
        for (var property in headers) {
            if (headers.hasOwnProperty(property)) {
                sortedKeys.push(property);
            }
        }
        sortedKeys.sort();

        for (var i = 0; i < sortedKeys.length; i++) {
            canonicalHeaders += sortedKeys[i].toLowerCase() + ':' + headers[sortedKeys[i]] + '\n';
        }
        return canonicalHeaders;
    },

    _buildCanonicalSignedHeaders : function(headers) {
        var sortedKeys = [];
        for (var property in headers) {
            if (headers.hasOwnProperty(property)) {
                sortedKeys.push(property.toLowerCase());
            }
        }
        sortedKeys.sort();

        return sortedKeys.join(';');
    },

    _buildStringToSign : function(date, credentialScope, hashedCanonicalRequest) {
        return AWS_SHA_256 + '\n' +
            this._buildXAmzDate(date) + '\n' +
            credentialScope + '\n' +
            hashedCanonicalRequest;
    },

    _buildCredentialScope : function(date, region, service) {
        return date.format(DATE_FORMAT) + '/' + region + '/' + service + '/' + AWS4_REQUEST
    },

    _calculateSigningKey : function(secretKey, date, region, service) {
        return this._hmac(this._hmac(this._hmac(this._hmac(AWS4 + secretKey, date.format(DATE_FORMAT)), region), service), AWS4_REQUEST);
    },

    _calculateSignature : function(key, stringToSign) {
        return this._hexEncode(this._hmac(key, stringToSign));
    },

    _buildXAmzDate : function(date) {
        return date.format(DATE_FORMAT) + 'T' + date.format(TIME_FORMAT) + 'Z';
    },

    _buildAuthorizationHeader : function(accessKey, credentialScope, headers, signature) {
        return AWS_SHA_256 + ' Credential=' + accessKey + '/' + credentialScope + ', SignedHeaders=' + this._buildCanonicalSignedHeaders(headers) + ', Signature=' + signature;
    },

    makeRequest : function(request) {
        var verb = request.verb;
        var path = request.path;
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
        if (body === undefined || verb === 'GET') { // override request body and set to empty when signing GET requests
            body = '';
        } else {
            body = JSON.stringify(body);
        }

        //If there is no body remove the content-type header so it is not included in SigV4 calculation
        if (body === '' || body === undefined || body === null) {
            delete headers['Content-Type'];
        }

        var date = moment.utc();
        headers[X_AMZ_DATE] = this._buildXAmzDate(date);
        var parser = document.createElement('a');
        parser.href = this.endpoint;
        headers[HOST] = parser.host;

        var canonicalRequest = this._buildCanonicalRequest(verb, path, queryParams, headers, body);
        var hashedCanonicalRequest = this._hashCanonicalRequest(canonicalRequest);
        var credentialScope = this._buildCredentialScope(date, this.region, this.serviceName);
        var stringToSign = this._buildStringToSign(date, credentialScope, hashedCanonicalRequest);
        var signingKey = this._calculateSigningKey(this.secretKey, date, this.region, this.serviceName);
        var signature = this._calculateSignature(signingKey, stringToSign);
        headers[AUTHORIZATION] = this._buildAuthorizationHeader(this.accessKey, credentialScope, headers, signature);
        if (this.sessionToken !== undefined && this.sessionToken !== '') {
            headers[X_AMZ_SECURITY_TOKEN] = this.sessionToken;
        }
        delete headers[HOST];

        var url = this.endpoint + path;
        var queryString = this._buildCanonicalQueryString(queryParams);
        if (queryString != '') {
            url += '?' + queryString;
        }

        //Need to re-attach Content-Type if it is not specified at this point
        if (headers['Content-Type'] === undefined) {
            headers['Content-Type'] = this.defaultContentType;
        }

        var signedRequest = {
            method: verb,
            url: url,
            headers: headers,
            data: body
        };


        return makeRequest(signedRequest);
    }
};
