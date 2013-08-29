var http = require('http');
var url = require('url');

/**
 * Clone simple object to avoid references
 */
function clone(source){
    var target = {};
    for(var i in source){
        if(source.hasOwnProperty(i)){
            target[i] = source[i];
        }
    }
    return target;
}

/**
 * Kred constructor
 *
 * @param {String} appId
 * @param {String} appKey
 * @param {Object} [options] Override default values for protocol, host and port
 */
function Kred(appId, appKey, options){
    options = options || {};
    if(!appId) throw new Error('Please provide an app id to constructor');
    if(!appKey) throw new Error('Please provide an app key to constructor');
    this.appId = appId;
    this.appKey = appKey;
    this.protocol = options.protocol || 'http';
    this.host = options.host || 'api.kred.com';
    this.port = options.port || 80;
}

/**
 * Known API endpoints
 */
var endpoints = [
    'kredscore', 'kred', 'kredentials', 'dailyscore', 'dailypoints', 'activity-stream',
    'FriendStream', 'kredinfluence', 'kredoutreach', 'kredretweetinfluence'
];
endpoints.forEach(function(endpoint){
    var name = endpoint.replace(/-([a-z])/g, function($){ return $[1].toUpperCase(); }); // activity-stream becomes activityStream
    name = name[0].toLowerCase() + name.slice(1); // FriendStream becomes friendStream
    Kred.prototype[name] = function(parameters, callback){
        this.request(endpoint, parameters, callback);
    };
});

/**
 * Fetch data from custom endpoint
 *
 * @param {String} endpoint
 * @param {Object} parameters
 * @param {Function} callback
 */
Kred.prototype.request = function(endpoint, parameters, callback){

    // Prepare uri
    var query = clone(parameters || {});
    query.app_id = this.appId;
    query.app_key = this.appKey;
    var uri = url.format({
        protocol: this.protocol,
        hostname: this.host,
        port: this.port,
        pathname: endpoint,
        query: query
    });

    // Make call to API
    var rawData = '';
    var request = http.get(uri, function(response){

        // Collect returned data
        response.on('data', function(chunk){
            rawData += chunk.toString();
        });

        // Parse collected data
        response.on('end', function(){
            var data;
            try{
                data = JSON.parse(rawData);
            }catch(e){}

            if(data && response.statusCode === 200){
                callback(undefined, data);
            }else{
                callback(new Error(response.statusCode + ', Error requesting details'));
            }
        });
    });

    request.on('error', function(e){
        callback(e);
    });
};

module.exports = Kred;
