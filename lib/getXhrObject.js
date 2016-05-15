var Q = require('q');

module.exports.promise = null;

module.exports.init = function(config) {
    module.exports.promise = Q.Promise(function(resolve, reject) {
        if (document.domain.indexOf(config.parentDomain) < 0) {
            resolve(XMLHttpRequest);
            return;
        }
        document.domain = config.parentDomain;
        var iframe = document.createElement('iframe');
        iframe.onload = function() {
            try {
                resolve(iframe.contentWindow.XMLHttpRequest);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        };
        iframe.onerror = reject;
        iframe.src = config.endpoint + '/' + config.stage + '/receiver';
        document.head.appendChild(iframe);
    });
};