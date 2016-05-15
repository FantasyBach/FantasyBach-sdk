var Q = require('q');
var _each = require('lodash/each');
var getXhrObject = require('./getXhrObject');

module.exports = function(params) {
    return Q.Promise(function(resolve, reject) {
        getXhrObject.promise.then(function(XMLHttpRequest) {
            var request = new XMLHttpRequest();
            params.verb = params.verb || 'GET';

            request.open(params.verb, params.url, true);
            // console.log(params.verb + ' ' + params.url);
            _each(params.headers, function(value, header) {
                // console.log(header + ':' + value);
                request.setRequestHeader(header, value);
            });
            request.onload = onload;
            request.onerror = onerror;
            request.send(params.data);

            function onload() {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(new Error("Status code was " + request.status));
                }
            }

            function onerror() {
                reject(new Error("Can't XHR " + JSON.stringify(params.url)));
            }
        });
    });
};